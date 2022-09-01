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
promessa.then(renderizarQuizz);

function mostrarQuizzes(resposta) {
  const dados = resposta.data;
  quizzes.innerHTML = "";
  for (i = 0; i < dados.length; i++) {
    quizz = `
    <li id="quizz${i}" class="quizz">
        <p class="texto-quizz">${dados[i].title}</p>
    </li>`;
    quizzes.innerHTML = quizzes.innerHTML + quizz;
    document.querySelector(
      `#quizz${i}`
    ).style.backgroundImage = `linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 64.58%,
        #000000 100%
      ),
      url(${dados[i].image})`;
  }
}
let perguntas = "";
const adicionarPerguntas = document.querySelector(".pagina2");
function renderizarQuizz(quizzesLoucos) {
  const arrayQuizzes = quizzesLoucos.data;
  const quizes = arrayQuizzes[0];
  console.log(quizes);

  let body = `
  <img class="bannerquiz" src="${quizes.image}">
    <div class="tituloQuiz"><h1>${quizes.title}</h1></div>
  </img>
  `;

  for (const question of quizes.questions) {
    body += `
        <div class="Perguntaquiz">
            <div class="textoPergunta">
                <h1>${question.title}</h1>
            </div>
    `;

    for (const answer of question.answers) {
        body += `
        <div class="caixa1">
            <img class="img1" src="${answer.image}" />
            <div class="titulocaixa"><h1>${answer.text}</h1></div>
        </div>
        ` 
    }

    body += `</div>`;
  }
    adicionarPerguntas.innerHTML = adicionarPerguntas.innerHTML + body;
}
