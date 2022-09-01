let titulo = "";
let imgURL = "";
let qntdPerguntas = "";
let qntdNiveis = "";

const quizzes = document.querySelector(".quizzes");
let dadosRecebidos;

function addInfo() {
  titulo = document.querySelector(".titulo").value;
  imgURL = document.querySelector(".img-url").value;
  qntdPerguntas = document.querySelector(".qntd-perguntas").value;
  qntdNiveis = document.querySelector(".qntd-niveis").value;
  const reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	
  if(titulo.length < 20 || titulo.length > 65 || reg.test(imgURL) === false || qntdPerguntas < 3 || qntdNiveis < 2) {
    alert("Preencha os dados corretamente!");
   } else {

   }
}

const promessa = axios.get(
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
);
promessa.then(mostrarQuizzes)
promessa.then(renderizarQuizz);


function mostrarQuizzes(resposta) {
  let quizz = "";
  const dados = resposta.data;
  dadosRecebidos = dados;
  console.log(dados);
  quizzes.innerHTML = "";
  for (i = 0; i < dados.length; i++) {
    quizz = `
    <li id="quizz${dados[i].id}" class="quizz" onclick="selecionarQuizz(this)">
        <p class="texto-quizz">${dados[i].title}</p>
    </li>`;
    quizzes.innerHTML = quizzes.innerHTML + quizz;
    document.querySelector(
      `#quizz${dados[i].id}`
    ).style.backgroundImage = `linear-gradient(
        180deg,
        rgba(255, 255, 255, 0) 0%,
        rgba(0, 0, 0, 0.5) 64.58%,
        #000000 100%
      ),
      url(${dados[i].image})`;
  }
}


function selecionarQuizz(quizz) {
  const identificador = quizz.id.replace(/[^0-9]/g, "");
  console.log(dadosRecebidos[0].id)
  let quizzSelecionado;
  for (let i=0; i<dadosRecebidos.length; i++) {
    if (identificador == dadosRecebidos[i].id) {
      quizzSelecionado = dadosRecebidos[i];
    }
  }
  console.log(quizzSelecionado);

  document.querySelector(".pagina1").classList.add("hidden");
  document.querySelector(".pagina2").classList.remove("hidden");
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

