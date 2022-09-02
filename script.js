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
let objQuestions = "";
let objLevels = "";
let perguntas = [];
let tituloNivel = "";
let PorcentagemMinima = "";
let imgURL_nivel = "";
let descricaoNivel
let niveis = [];


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
  for(let i = 2; i <= qntdPerguntas; i++) {
    criarPerguntas.innerHTML += `<fieldset>
    <div class="pergunta-title">
      <h2>Pergunta ${i}</h2>
      <img class ="icon-edit" onclick = "mostrarCampos(this)" src="/imgs_pg1/Icone-editar.png" alt="icone">
    </div>
    <div class="form-container hidden">
      <div class="form">
        <div class="campo-pergunta">
          <input class="tituloPergunta${i}" type="text" placeholder="Texto da pergunta (mínimo: 20 caracteres)">
          <input class="cor${i}" type="text" placeholder="Cor de fundo da pergunta (formato: #123456)">
        </div>
        <div class="campo-correta">
          <h2>Resposta correta</h2>
          <input class="correta${i}" type="text" placeholder="Resposta correta">
          <input class = "resposta${i}-img1" type="text" placeholder="URL da imagem">
        </div>
        <div class="campo-incorretas">
          <h2>Respostas incorretas</h2>
          <div class="incorretas">
            <div class="incorreta1">
              <input class="incorreta1-pergunta${i}" type="text" placeholder="Resposta incorreta 1">
              <input class = "resposta${i}-img2" type="text" placeholder="URL da imagem 1">
            </div>
            <div class="incorreta2">
              <input class="incorreta2-pergunta${i}" type="text" placeholder="Resposta incorreta 2">
              <input class = "resposta${i}-img3" type="text" placeholder="URL da imagem 2">
            </div>
            <div class="incorreta3">
              <input class="incorreta3-pergunta${i}" type="text" placeholder="Resposta incorreta 3">
              <input class = "resposta${i}-img4" type="text" placeholder="URL da imagem 3">
            </div>
          </div>
        </div>
      </div>
    </div>
    </fieldset>`
  }
  criarPerguntas.innerHTML += '<button onclick="guardarPerguntas()">Prosseguir para criar níveis</button>'
}

function mostrarCampos(div) {
  let pai = (div.parentNode).parentNode;
  let divSelecionada = pai.querySelector(".form-container");
  divSelecionada.classList.toggle("hidden");
}

function guardarPerguntas() {
  let criarPerguntas = document.querySelector(".criar-perguntas-container");
  let criarNiveis = document.querySelector(".criar-niveis-container")
  let verificador = 0;
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
    const reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if(tituloPergunta < 20 || resposta1 === "" || resposta2 === "" || reg.test(img1) === false || reg.test(img2) === false || (reg.test(img3) === false && img3 !== "") || (reg.test(img4) === false && img4 !== "")){
      verificador++;
    } else {
    if(resposta3 === "" && resposta4 === "") {
      objQuestions = {
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
      objQuestions = {
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
    objQuestions = {
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
} 
    perguntas.push(objQuestions);
  }
  if(verificador !== 0) {
    perguntas.length = 0;
    alert("Preencha os dados corretamente");
  } else {
    renderizarCriarNiveis();
    criarPerguntas.classList.add("hidden");
    criarNiveis.classList.remove("hidden");
    window.scrollTo(0, 0);
  }
}

function renderizarCriarNiveis() {
  let criarNiveis = document.querySelector(".criar-niveis");
  for(let i = 2; i <= qntdPerguntas; i++) {
    criarNiveis.innerHTML += `<fieldset>
    <div class="nivel-title">
    <h2>Nível ${i}</h2>
    <img class ="icon-edit" onclick = "mostrarCampos(this)" src="/imgs_pg1/Icone-editar.png" alt="icone">
    </div>
    <div class="form-container hidden">
    <div class="niveis-form">
        <input class="tituloNivel${i}" type="text" placeholder="Título do nível (mínimo: 10 caracteres)">
        <input class="porcentagem${i}" type="text" placeholder="% de acerto mínima">
        <input class="url${i}" type="text" placeholder="URL da imagem do nível">
        <textarea name="" class="nivel-descricao descricao${i}" placeholder="Descrição do nível"></textarea>
    </div>
    </div>
</fieldset>`
  }
  criarNiveis.innerHTML += '<button onclick="finalizarQuizz()">Finalizar Quizz</button>'
}


function finalizarQuizz() {
  let verificador = 0;
  for(i = 1; i <= qntdNiveis; i++) {
    tituloNivel = document.querySelector(`.tituloNivel${i}`).value;
    porcentagemMinima = document.querySelector(`.porcentagem${i}`).value;
    imgURL_nivel = document.querySelector(`.url${i}`).value;
    descricaoNivel = document.querySelector(`.descricao${i}`).value;
    const reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if(tituloNivel < 10 || porcentagemMinima > 100 || reg.test(imgURL_nivel) === false || descricaoNivel < 30){
      verificador++;
    } else {
      objLevels = {
          title: `${tituloNivel}`,
          image: `${imgURL_nivel}`,
          text: `${descricaoNivel}`,
          minValue: `${porcentagemMinima}`
        }
    }
    niveis.push(objLevels);
  }
  if(verificador !== 0) {
    niveis.length = 0;
    alert("Preencha os dados corretamente");
  } else {
    let quiz = {title: `${titulo}`,
    image: `${imgURL}`, questions: perguntas, levels: niveis}
    renderizarPaginaFinal();
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quiz)
    requisicao.then(function(resposta){console.log(resposta)});
    requisicao.catch(function(erro){alert("Deu erro")});
    // criarPerguntas.classList.add("hidden");
    // criarNiveis.classList.remove("hidden");
    window.scrollTo(0, 0);
  }
}

function renderizarPaginaFinal() {

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

