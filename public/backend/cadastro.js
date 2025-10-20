import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATsq3CR2HNLNNwcCGL61F-kP-M7lT_owk",
    authDomain: "estacionamento-89fbe.firebaseapp.com",
    projectId: "estacionamento-89fbe",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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

// Cadastro
const form = document.getElementById("cadastroForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("id_nome").value.trim();
    const email = document.getElementById("id_email").value.trim();
    const senha = document.getElementById("id_senha").value;

    if (!nome || !email || !senha) {
        showAlert("❌ Preencha todos os campos!", "error");
        return;
    }

    try {
        // Cria usuário no Firebase Auth
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);

        // Atualiza nome do usuário
        await updateProfile(userCredential.user, { displayName: nome });

        showAlert("✅ Cadastro realizado com sucesso!", "success");

        // Redireciona para login após 1.5s
        setTimeout(() => {
            window.location.href = "login.html";
        }, 1500);
    } catch (error) {
        console.error(error);
        if (error.code === "auth/email-already-in-use") {
            showAlert("❌ E-mail já cadastrado!", "error");
        } else if (error.code === "auth/invalid-email") {
            showAlert("❌ E-mail inválido!", "error");
        } else if (error.code === "auth/weak-password") {
            showAlert("❌ Senha muito fraca!", "error");
        } else {
            showAlert("❌ Ocorreu um erro, tente novamente!", "error");
        }
    }
});
