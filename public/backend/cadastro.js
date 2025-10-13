// Importa os módulos do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";

// Configuração do Firebase (substitua pelos seus dados do Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyATsq3CR2HNLNNwcCGL61F-kP-M7lT_owk",
  authDomain: "estacionamento-89fbe.firebaseapp.com",
  projectId: "estacionamento-89fbe",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Lida com o envio do formulário
document.getElementById("cadastroForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("id_nome").value;
  const email = document.getElementById("id_email").value;
  const senha = document.getElementById("id_senha").value;

  // Cria o usuário no Firebase Auth
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;

      // Atualiza o perfil com o nome
      updateProfile(user, { displayName: nome });

      alert("Cadastro realizado com sucesso!");
      window.location.href = "login.html"; // Redireciona para o login
    })
    .catch((error) => {
      alert("Erro ao cadastrar: " + error.message);
    });
});
