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
promessa.then(mostrarQuizzes)
promessa.then(renderizarQuizz);

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
    document.querySelector(`#quizz${i}`).style.backgroundImage = `linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 64.58%,
        #000000 100%
      ),
      url(${dados[i].image})`;
  }
}

function renderizarQuizz(quizzesLoucos){
    const arrayQuizzes = quizzesLoucos.data;
    const quizz = arrayQuizzes[0];
    console.log(quizz)
    const titulo = quizz.title;
    const pergunta1 = quizz.questions[0].title
    console.log(pergunta1)

    // criar um for para pegar todas as perguntas
    // e dentro dele criar um for para pegar todas as respostas referentes a essa pergunta
    
    const botaoNaoClicado = document.querySelectorAll('.selecionado');
    console.log(botaoNaoClicado)
   if(botaoNaoClicado.length === 0){
   botao.classList.add('selecionado');
   }
}

