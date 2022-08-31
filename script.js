let titulo = "";
let imgURL = "";
let qntdPerguntas = "";
let qntdNiveis = "";

const quizzes = document.querySelector(".quizzes");
let quizz = "";

function addInfo() {
  titulo = document.querySelector(".titulo").value;
  imgURL = document.querySelector(".img-url").value;
  qntdPerguntas = document.querySelector(".qntd-perguntas").value;
  qntdNiveis = document.querySelector(".qntd-niveis").value;
}

const promessa = axios.get(
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
);
promessa.then(mostrarQuizzes);

function mostrarQuizzes(resposta) {
  const dados = resposta.data;
  console.log(dados);
  quizzes.innerHTML = "";
  for (i = 0; i<dados.length; i++) {
    quizz = `
    <li id="quizz${i}" class="quizz">
        <p class="texto-quizz">${dados[i].title}</p>
    </li>`;
    quizzes.innerHTML = quizzes.innerHTML + quizz;
    document.querySelector(`#quizz${i}`).style.background = `linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 64.58%,
        #000000 100%
      ),
      url(${dados[i].image})`;
  }
}


