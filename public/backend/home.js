import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import {
  getFirestore,
  collection,
  onSnapshot,
  setDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Configuração Firebase
const firebaseConfig = {
  apiKey: "AIzaSyATsq3CR2HNLNNwcCGL61F-kP-M7lT_owk",
  authDomain: "estacionamento-89fbe.firebaseapp.com",
  projectId: "estacionamento-89fbe",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const vagasContainer = document.getElementById("vagasContainer");
const logoutBtn = document.getElementById("logout");

// Função de alertas customizados
function showAlert(message, type = "success") {
  const container = document.getElementById("alertContainer");
  if (!container) return;

  const div = document.createElement("div");
  div.className = `alert alert-${type}`;
  div.textContent = message;
  container.appendChild(div);

  setTimeout(() => div.remove(), 3500);
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => (window.location.href = "login.html"));
  });
}

// Renderiza as vagas
function renderVagas(vagas, userEmail) {
  vagasContainer.innerHTML = "";

  vagas.forEach((vaga) => {
    const data = vaga.data();
    const vagaId = vaga.id;

    const status = data.status?.trim().toLowerCase() || "livre";

    const div = document.createElement("div");
    div.classList.add("vaga");
    div.classList.add(status === "livre" ? "livre" : "ocupada");

    div.innerHTML = `
      <strong>${vagaId.toUpperCase()}</strong><br>
      ${status === "livre" ? "🟢 Livre" : "🔴 Ocupada"}<br>
      ${
        data.usuario
          ? `<small>Reservada por: <span>${data.usuario}</span></small>`
          : "<small>Sem reserva</small>"
      }
    `;

    div.addEventListener("click", async () => {
      const vagaRef = doc(db, "vagas", vagaId);

      if (status === "livre") {
        // Reservar vaga
        await setDoc(vagaRef, {
          status: "ocupada",
          usuario: userEmail,
        });
        showAlert(`✅ Você reservou a vaga ${vagaId.toUpperCase()}`, "success");
      } else if (data.usuario === userEmail) {
        // Liberar vaga automaticamente
        await setDoc(vagaRef, {
          status: "livre",
          usuario: "",
        });
        showAlert(`⚪ Você liberou a vaga ${vagaId.toUpperCase()}`, "success");
      } else {
        showAlert("❌ Essa vaga já está reservada por outro usuário!", "error");
      }
    });

    vagasContainer.appendChild(div);
  });
}

// Verifica login e escuta em tempo real
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const vagasRef = collection(db, "vagas");
  onSnapshot(vagasRef, (snapshot) => {
    renderVagas(snapshot.docs, user.email);
  });
});
