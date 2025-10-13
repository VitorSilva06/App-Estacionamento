import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyATsq3CR2HNLNNwcCGL61F-kP-M7lT_owk",
    authDomain: "estacionamento-89fbe.firebaseapp.com",
    projectId: "estacionamento-89fbe",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById("loginForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("id_email").value;
    const senha = document.getElementById("id_senha").value;

    signInWithEmailAndPassword(auth, email, senha)
        .then(() => {
            alert("Login realizado!");
            window.location.href = "index.html";
        })
        .catch(err => alert("E-mail ou Senha incorretos. Verifique!"));
});
