const form = document.querySelector("#form");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const jobSelect = document.querySelector("#job");
const messageTextarea = document.querySelector("#message");

const progress = document.querySelector("#progress");

const modal = document.querySelector("#modal");
const closeButton = document.querySelector("#close-button");
const modalMessage = document.querySelector(".modal-message");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  //verifica se o nome está vazio
  if (nameInput.value === "") {
    showModal("Por favor, preencha o seu nome");
    return;
  }

  //Verifica se o e-mail está preenchido e se é válido
  if (emailInput.value === "" || !isEmailValid(emailInput.value)) {
    showModal("Por favor, preencha o seu e-mail");
    return;
  }

  //Verifica se a senha está preenchida
  if (!validatePassword(passwordInput.value, 8)) {
    showModal("A senha precisa ser no mínimo 8 dígitos.");
    return;
  }

  //Verificar se a situação foi selecionada
  if (jobSelect.value === "") {
    showModal("Por favor, selecione a sua situação");
    return;
  }

  //Verifica se a mensagem está preenchida
  if (messageTextarea.value === "") {
    showModal("Por favor, escreva uma mensagem");
    return;
  }

  // se todos os campos estiverem ok, envie
  form.submit();

  progress.value = 0;
})

//Função que valida e-mail
function isEmailValid(email) {

  //cria uma regex para validar e-mail
  const emailRegex = new RegExp(
    //usuario12@host.com.br
    /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]{2,}$/);

    if (emailRegex.test(email)) {
      return true;
    }

    return false;
}

//Função que valida a senha
function validatePassword(password, minDigits) {
  if (password.length >= minDigits) {
    //Senha válida
    return true;
  }

  //Senha inválida
  return false;
}

//Atualiza a barra de progresso ao preencher o formulário
form.addEventListener("input", () => {
  const totalFields = form.elements.length - 1;
  let completedFields = 0;

  //Conta o número de campos preenchidos
  for (let i = 0; i < totalFields; i++) {
    if (form.elements[i].value) {
      completedFields++;
    }
  }

  //Atualiza o valor da barra de progresso
  progress.value = (completedFields / totalFields) * 100;
});

//Exibir modal
function showModal(msg) {
  modalMessage.textContent = msg;
  modal.style.display = "block";
}

//Fechar modal
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});