import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyATsq3CR2HNLNNwcCGL61F-kP-M7lT_owk",
  authDomain: "estacionamento-89fbe.firebaseapp.com",
  projectId: "estacionamento-89fbe",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const vagasContainer = document.getElementById("vagasContainer");

// Cria visual das 5 vagas
function renderVagas(vagasData, userEmail) {
  vagasContainer.innerHTML = "";
  for (let i = 1; i <= 5; i++) {
    const vaga = vagasData[`vaga${i}`] || { status: "livre", usuario: "" };

    const div = document.createElement("div");
    div.classList.add("vaga", vaga.status === "livre" ? "livre" : "ocupada");
    div.textContent = `Vaga ${i}\n${vaga.status === "livre" ? "🟢 Livre" : "🔴 Em uso"}`;
    div.style.whiteSpace = "pre-line";

    div.addEventListener("click", async () => {
      if (vaga.status === "livre") {
        // Ocupa a vaga
        await setDoc(doc(db, "vagas", `vaga${i}`), {
          status: "ocupada",
          usuario: userEmail,
        });
      } else if (vaga.usuario === userEmail) {
        // Libera a vaga
        await setDoc(doc(db, "vagas", `vaga${i}`), {
          status: "livre",
          usuario: "",
        });
      } else {
        alert("❌ Essa vaga está sendo usada por outro usuário!");
      }
    });

    vagasContainer.appendChild(div);
  }
}

// Verifica login
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  // Atualiza as vagas em tempo real
  const unsub = onSnapshot(doc(db, "estado", "vagas"), (snapshot) => {
    const vagasData = snapshot.exists() ? snapshot.data() : {};
    renderVagas(vagasData, user.email);
  });
});

// Logout
document.getElementById("logout").addEventListener("click", () => {
  signOut(auth).then(() => (window.location.href = "login.html"));
});
