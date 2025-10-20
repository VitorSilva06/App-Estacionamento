import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Configuração Firebase
const firebaseConfig = {
    apiKey: "AIzaSyATsq3CR2HNLNNwcCGL61F-kP-M7lT_owk",
    authDomain: "estacionamento-89fbe.firebaseapp.com",
    projectId: "estacionamento-89fbe",
};

// Inicializa Firebase
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

    // Remove após 3.5s
    setTimeout(() => div.remove(), 3500);
}

// Event listener do formulário de login
document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("id_email").value;
    const senha = document.getElementById("id_senha").value;

    if (!email || !senha) {
        showAlert("Preencha todos os campos!", "error");
        return;
    }

    signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            showAlert("Login realizado!", "success");
            setTimeout(() => {
                window.location.href = "../index.html";
            }, 1000);
        })
        .catch((err) => {
            showAlert("E-mail ou senha incorretos. Verifique!", "error");
            console.error(err);
        });
});
