let titulo = "";
let imgURL = "";
let qntdPerguntas = "";
let qntdNiveis = "";
let tituloPergunta = "";
let cor = "";
let resposta1 = "";
let img1 = "";
let resposta2 = "";
let img2 = "";
let resposta3 = "";
let img3 = "";
let resposta4 = "";
let img4 = "";
let obj = "";
let perguntas = [];


const quizzes = document.querySelector(".quizzes");
let dadosRecebidos;

function addInfo() {
  let basicInfo = document.querySelector(".basic-info-container");
  let criarPerguntas = document.querySelector(".criar-perguntas-container")
  titulo = document.querySelector(".titulo").value;
  imgURL = document.querySelector(".img-url").value;
  qntdPerguntas = document.querySelector(".qntd-perguntas").value;
  qntdNiveis = document.querySelector(".qntd-niveis").value;
  const reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
	
  if(titulo.length < 20 || titulo.length > 65 || reg.test(imgURL) === false || qntdPerguntas < 3 || qntdNiveis < 2) {
    alert("Preencha os dados corretamente!");
   } else {
    renderizarCriarPerguntas();
    basicInfo.classList.add("hidden");
    criarPerguntas.classList.remove("hidden");
   }
}

function renderizarCriarPerguntas() {
  let criarPerguntas = document.querySelector(".criar-perguntas");
  for(let i = 1; i <= qntdPerguntas; i++) {
    criarPerguntas.innerHTML += `<fieldset><div class="campo-pergunta"><h2>Pergunta ${i}</h2><input class="tituloPergunta${i}" type="text" placeholder="Texto da pergunta (mínimo: 20 caracteres)"><input class="cor${i}" type="text" placeholder="Cor de fundo da pergunta (formato: #123456)"></div><div class="campo-correta"><h2>Resposta correta</h2><input class="correta${i}" type="text" placeholder="Resposta correta"><input class = "resposta${i}-img1" type="text" placeholder="URL da imagem"></div><div class="campo-incorretas"><h2>Respostas incorretas</h2><div class="incorretas"><div class="incorreta1"><input class="incorreta1-pergunta${i}" type="text" placeholder="Resposta incorreta 1"><input class = "resposta${i}-img2" type="text" placeholder="URL da imagem 1"></div><div class="incorreta2"><input class="incorreta2-pergunta${i}" type="text" placeholder="Resposta incorreta 2"><input class = "resposta${i}-img3" type="text" placeholder="URL da imagem 2"></div><div class="incorreta3"><input class="incorreta3-pergunta${i}" type="text" placeholder="Resposta incorreta 3"><input class = "resposta${i}-img4" type="text" placeholder="URL da imagem 3"></div></div></div></fieldset>`
  }
  criarPerguntas.innerHTML += '<button onclick="guardarPerguntas()">Prosseguir para criar níveis</button>'
}

function guardarPerguntas() {
  for(i = 1; i <= qntdPerguntas; i++) {
    tituloPergunta = document.querySelector(`.tituloPergunta${i}`).value;
    cor = document.querySelector(`.cor${i}`).value;
    resposta1 = document.querySelector(`.correta${i}`).value;
    img1 = document.querySelector(`.resposta${i}-img1`).value;
    resposta2 = document.querySelector(`.incorreta1-pergunta${i}`).value;
    img2 = document.querySelector(`.resposta${i}-img2`).value;
    resposta3 = document.querySelector(`.incorreta2-pergunta${i}`).value;
    img3 = document.querySelector(`.resposta${i}-img3`).value;
    resposta4 = document.querySelector(`.incorreta3-pergunta${i}`).value;
    img4 = document.querySelector(`.resposta${i}-img4`).value;
    if(resposta3 === "" && resposta4 === "") {
      obj = {
        title: `${tituloPergunta}`,
        color: `${cor}`,
        answers: [
          {
            text: `${resposta1}`,
            image: `${img1}`,
            isCorrectAnswer: true
          },
          {
            text: `${resposta2}`,
            image: `${img2}`,
            isCorrectAnswer: false
          }
        ]
      }
    } else if(resposta4 === "") {
      obj = {
        title: `${tituloPergunta}`,
        color: `${cor}`,
        answers: [
          {
            text: `${resposta1}`,
            image: `${img1}`,
            isCorrectAnswer: true
          },
          {
            text: `${resposta2}`,
            image: `${img2}`,
            isCorrectAnswer: false
          },
          {
            text: `${resposta3}`,
            image: `${img3}`,
            isCorrectAnswer: false
          }
        ]
      }
    } else {
    obj = {
			title: `${tituloPergunta}`,
			color: `${cor}`,
			answers: [
				{
					text: `${resposta1}`,
					image: `${img1}`,
					isCorrectAnswer: true
				},
				{
					text: `${resposta2}`,
					image: `${img2}`,
					isCorrectAnswer: false
				},
				{
					text: `${resposta3}`,
					image: `${img3}`,
					isCorrectAnswer: false
				},
				{
					text: `${resposta4}`,
					image: `${img4}`,
					isCorrectAnswer: false
				}
			]
		}
  }
    perguntas.push(obj);
  }
  // console.log(perguntas);
}

const promessa = axios.get(
  "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
);
promessa.then(mostrarQuizzes);
promessa.then(renderizarQuizz);
promessa.then(mostrarQuizzes)
// promessa.then(renderizarQuizz);

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

      `#quizz${i}`
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
const adicionarPerguntas = document.querySelector(".pagina2");
function renderizarQuizz(quizzesLoucos) {
  const arrayQuizzes = quizzesLoucos.data;
  const quizes = arrayQuizzes[0];
  console.log(quizes);

  let body = `
  <img class="bannerquiz" src="${quizes.image}">
    <div class="tituloQuiz">${quizes.title}</div>
  </img>
  `;

  for (const question of quizes.questions) {
    body += `
        <div class="Perguntaquiz">
            <div class="textoPergunta">
                ${question.title}
            </div>
    `;

    for (const answer of question.answers) {
        body += `
        <div class="caixa1">
            <img class="img1" src="${answer.image}" />
            <div class="titulocaixa">${answer.text}</div>
        </div>
        ` 
    }

    body += `</div>`;
  }
    adicionarPerguntas.innerHTML = adicionarPerguntas.innerHTML + body;
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

