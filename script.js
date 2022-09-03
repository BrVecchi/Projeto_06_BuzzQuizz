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
let descricaoNivel;
let niveis = [];
let id_quizzes_usuario = [null];
let id_do_quizz_selecionado;
let quizzSelecionado;

let quizzes = document.querySelector(".quizzes");
let quizzes_pessoal = document.querySelector(".quizzes-pessoal");
let dadosRecebidos;

const arrayIdsSerializadosGlobal = localStorage.getItem("ids_pessoal");
const arrayIdsDeserializados = JSON.parse(arrayIdsSerializadosGlobal);
  
if (arrayIdsSerializadosGlobal !== null) {
  id_quizzes_usuario = arrayIdsDeserializados;
}

//---------------------------INICIO PAGINA 1-----------------------------------------------
function pegarQuizzes() {
  const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promessa.then(mostrarQuizzes);
}
pegarQuizzes();

function mostrarQuizzes(resposta) {
  let quizz = "";
  let quizz_pessoal = "";
  const dados = resposta.data;
  dadosRecebidos = dados;
  quizzes.innerHTML = "";
  quizzes_pessoal.innerHTML = "";

  console.log(id_quizzes_usuario);
  for (let i = 0; i < dados.length; i++) {
    if (id_quizzes_usuario[0] !== null && id_quizzes_usuario[0] !== 0) {
      for (let j = 0; j < id_quizzes_usuario.length; j++) {
        if (dados[i].id !== id_quizzes_usuario[j]) {
          quizz = `
            <li id="quizz${dados[i].id}" class="quizz" onclick="selecionarQuizz(this)">
              <p class="texto-quizz">${dados[i].title}</p>
            </li>`;
        } else {
          quizz_pessoal = `
            <li id="quizz${dados[i].id}" class="quizz" onclick="selecionarQuizz(this)">
              <p class="texto-quizz">${dados[i].title}</p>
            </li>`;
          quizzes_pessoal.innerHTML = quizzes_pessoal.innerHTML + quizz_pessoal;
        }
      }
    } else {
      quizz = `
            <li id="quizz${dados[i].id}" class="quizz" onclick="selecionarQuizz(this)">
              <p class="texto-quizz">${dados[i].title}</p>
            </li>`;
    }
    quizzes.innerHTML = quizzes.innerHTML + quizz;
    document.querySelector(`#quizz${dados[i].id}`).style.backgroundImage = `
        linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%),
        url(${dados[i].image})
      `;
  }
}

function selecionarQuizz(quizz) {
  const identificador = quizz.id.replace(/[^0-9]/g, "");
  console.log(dadosRecebidos[0].id);
  for (let i = 0; i < dadosRecebidos.length; i++) {
    if (identificador == dadosRecebidos[i].id) {
      quizzSelecionado = dadosRecebidos[i];
    }
  }
  console.log(quizzSelecionado);
  renderizarQuizz(quizzSelecionado);
  document.querySelector(".pagina1").classList.add("hidden");
  document.querySelector(".pagina2").classList.remove("hidden");
  window.scrollTo(0, 0);
}

function criarQuizz() {
  document.querySelector(".pagina1").classList.add("hidden");
  document.querySelector(".basic-info-container").classList.remove("hidden");
  document.querySelector(".pagina3").classList.remove("hidden");
}

//---------------------------INICIO PAGINA 3-----------------------------------------------

function addInfo() {
  let basicInfo = document.querySelector(".basic-info-container");
  let criarPerguntas = document.querySelector(".criar-perguntas-container");
  titulo = document.querySelector(".titulo").value;
  imgURL = document.querySelector(".img-url").value;
  qntdPerguntas = document.querySelector(".qntd-perguntas").value;
  qntdNiveis = document.querySelector(".qntd-niveis").value;
  const reg =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (titulo.length < 20 || titulo.length > 65 || reg.test(imgURL) === false || qntdPerguntas < 3 || qntdNiveis < 2) {
    alert("Preencha os dados corretamente!");
  } else {
    renderizarCriarPerguntas();
    basicInfo.classList.add("hidden");
    criarPerguntas.classList.remove("hidden");
  }
}

function renderizarCriarPerguntas() {
  let criarPerguntas = document.querySelector(".criar-perguntas");
  for (let i = 2; i <= qntdPerguntas; i++) {
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
    </fieldset>`;
  }
  criarPerguntas.innerHTML +=
    '<button onclick="guardarPerguntas()">Prosseguir para criar níveis</button>';
}

function mostrarCampos(div) {
  let pai = div.parentNode.parentNode;
  let divSelecionada = pai.querySelector(".form-container");
  divSelecionada.classList.toggle("hidden");
}

function guardarPerguntas() {
  let criarPerguntas = document.querySelector(".criar-perguntas-container");
  let criarNiveis = document.querySelector(".criar-niveis-container");
  let verificador = 0;
  for (i = 1; i <= qntdPerguntas; i++) {
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
    const regURL = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const regCor = /^#[0-9A-F]{6}$/i;
    if (tituloPergunta.length < 20 || regCor.test(cor) === false  || resposta1 === "" || resposta2 === "" || regURL.test(img1) === false ||
      regURL.test(img2) === false || (regURL.test(img3) === false && img3 !== "") || (regURL.test(img4) === false && img4 !== "")) {
      verificador++;
    }
    if (tituloPergunta.length > 10000) {
      verificador++;
    } else {
      if (resposta3 === "" && resposta4 === "") {
        objQuestions = {
          title: `${tituloPergunta}`,
          color: `${cor}`,
          answers: [
            {
              text: `${resposta1}`,
              image: `${img1}`,
              isCorrectAnswer: true,
            },
            {
              text: `${resposta2}`,
              image: `${img2}`,
              isCorrectAnswer: false,
            },
          ],
        };
      } else if (resposta4 === "") {
        objQuestions = {
          title: `${tituloPergunta}`,
          color: `${cor}`,
          answers: [
            {
              text: `${resposta1}`,
              image: `${img1}`,
              isCorrectAnswer: true,
            },
            {
              text: `${resposta2}`,
              image: `${img2}`,
              isCorrectAnswer: false,
            },
            {
              text: `${resposta3}`,
              image: `${img3}`,
              isCorrectAnswer: false,
            },
          ],
        };
      } else {
        objQuestions = {
          title: `${tituloPergunta}`,
          color: `${cor}`,
          answers: [
            {
              text: `${resposta1}`,
              image: `${img1}`,
              isCorrectAnswer: true,
            },
            {
              text: `${resposta2}`,
              image: `${img2}`,
              isCorrectAnswer: false,
            },
            {
              text: `${resposta3}`,
              image: `${img3}`,
              isCorrectAnswer: false,
            },
            {
              text: `${resposta4}`,
              image: `${img4}`,
              isCorrectAnswer: false,
            },
          ],
        };
      }
    }
    perguntas.push(objQuestions);
  }
  if (verificador !== 0) {
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
  for (let i = 2; i <= qntdNiveis; i++) {
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
        <textarea name="" class="nivel-descricao descricao${i}" placeholder="Descrição do nível (mínimo: 30 caracteres)"></textarea>
    </div>
    </div>
</fieldset>`;
  }
  criarNiveis.innerHTML +=
    '<button onclick="finalizarQuizz()">Finalizar Quizz</button>';
}

function finalizarQuizz() {
  let quizzFinalizado = document.querySelector(".quizz-finalizado-container");
  let criarNiveis = document.querySelector(".criar-niveis-container");
  let verificador = 0;
  let porcentagemZero = false;
  let arrayIds = [];
  for (i = 1; i <= qntdNiveis; i++) {
    tituloNivel = document.querySelector(`.tituloNivel${i}`).value;
    porcentagemMinima = document.querySelector(`.porcentagem${i}`).value;
    imgURL_nivel = document.querySelector(`.url${i}`).value;
    descricaoNivel = document.querySelector(`.descricao${i}`).value;
    const reg = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (porcentagemMinima == 0) {
      porcentagemZero = true;
    }
    if (
      tituloNivel.length < 10 ||
      porcentagemMinima > 100 ||
      reg.test(imgURL_nivel) === false ||
      descricaoNivel.length < 30
    ) {
      verificador++;
    } else {
      objLevels = {
        title: `${tituloNivel}`,
        image: `${imgURL_nivel}`,
        text: `${descricaoNivel}`,
        minValue: `${porcentagemMinima}`,
      };
    }
    niveis.push(objLevels);
  }
  if (verificador !== 0 || porcentagemZero === false) {
    niveis.length = 0;
    alert("Preencha os dados corretamente");
  } else {
    let quiz = {
      title: `${titulo}`,
      image: `${imgURL}`,
      questions: perguntas,
      levels: niveis,
    };
    renderizarPaginaFinal();
    const requisicao = axios.post(
      "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes",
      quiz
    );
    requisicao.then(function (resposta) {
      console.log(resposta);
      arrayIds.push(resposta.data.id);
      const arrayIdsSerializados = JSON.stringify(arrayIds);
      localStorage.setItem("ids_pessoal", `${arrayIdsSerializados}`);
    });
    requisicao.catch(function (erro) {
      alert("Erro ao criar quizz");
    });
    criarNiveis.classList.add("hidden");
    quizzFinalizado.classList.remove("hidden");
    window.scrollTo(0, 0);
  }
}

function renderizarPaginaFinal() {
  let quizzFinalizado = document.querySelector(".quizz-finalizado-container");
  quizzFinalizado.innerHTML += `<div class="quizz-finalizado">
  <h1>Seu quizz está pronto!</h1>
  <div class="img-quizz-container">
  <img src="${imgURL}" alt="">
  <div class="img-quizz-finalizado">
      <h2>${titulo}</h2>
  </div>
  </div>
  <button>Acessar quizz</button>
  <p onclick="window.location.reload()">Voltar pra home</p>`;
}

//-----------------------------Pagina2-------------------------------------------
let x;
let acertos = 0;
let erros = 0;
let body;
let mudarCor;
let adicionarPerguntas = document.querySelector(".pagina2");

function renderizarQuizz(quizz) {
  acertos = 0;
  erros = 0;
  x = 0;
  adicionarPerguntas.innerHTML = "";
  body = `
  <div class = topPerguntaQuiz> 
  <div class="bannerquiz"><p class="tituloQuiz">${quizz.title}</p></div>
  </div>
  `;

  for (const question of quizz.questions) {
    body += `
        <div class="Perguntaquiz">
            <p id="indentificador${x}" class="textoPergunta">
                ${question.title}
            </p>
            <div class="divSeguraAsPerguntas ${x}">
    `;

    question.answers.sort(comparador); // Após esta linha, a minhaArray estará embaralhada
    // Esta função pode ficar separada do código acima, onde você preferir
    function comparador() {
      return Math.random() - 0.5;
    }

    for (const answer of question.answers) {
      body += `
        <div class="caixa1" value="${
          answer.isCorrectAnswer
        }" next="indentificador${x + 1}" onclick="respostaSelecionada(this)">
            <img class="img1" src="${answer.image}" />
            <p class="titulocaixa">${answer.text}</p>
        </div>
        `;
    }

    x++;
    body += `</div>  </div>`;
  }
  for (const levels of quizz.levels) {
    console.log(levels);
    body += `
    <div id="${levels.minValue}" class="QuizFinalizado hidden">
      <div class="porcentagemDeAcerto"><span class="textoFinal"></span><p class="tituloFinalQuiz"> ${levels.title}</p></div>
      <div class="imagemEsubtitulo">
        <img class="imagenFinalQuiz" src="${levels.image}"/>
        <div class="SubtituloFinal">${levels.text}</div>
      </div>
    <button class="botaoReproduzirQuiz" onclick="reproduzirQuiz()">Reiniciar Quizz</button>
    <button class="VoltarPraHome" onclick="VoltarPraHome()">Voltar pra home</button>
    </div>
`;
  }
  adicionarPerguntas.innerHTML = adicionarPerguntas.innerHTML + body;
  document.querySelector(
    ".bannerquiz"
  ).style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.57), rgba(0, 0, 0, 0.57)), url(${quizz.image})`;
  trocarCor(quizz);
}
function trocarCor(quizz) {
  for (let i = 0; i < quizz.questions.length; i++) {
    document.querySelector(`#indentificador${i}`).style.backgroundColor =
      quizz.questions[i].color;
  }
}

function respostaSelecionada(respostaEscolhida) {
  const clicked = respostaEscolhida;
  const parent = clicked.parentElement;
  const elementoQueQueroQueApareca = document.getElementById(
    clicked.attributes.next.value
  );

  for (const element of parent.children) {
    element.onclick = () => {};
    // change text color
    if (element.attributes.value.value === "true") {
      element.children[1].className += " color-green";

      if (element === clicked) {
        acertos++;
      } else {
        erros++;
      }
    } else {
      element.children[1].className += " color-red";
    }

    // set opacity for not chosen elements
    if (element !== clicked) {
      element.className += " opacity-60";
    }
  }
  if (acertos + erros === x) {
    setTimeout(finalizandoQuiz, 2000);
  } else {
    elementoQueQueroQueApareca &&
      setTimeout(() => {
        elementoQueQueroQueApareca.scrollIntoView();
      }, 2000);
  }
}

let tt;
let tt2;

function finalizandoQuiz() {
  const elementos = document.getElementsByClassName("QuizFinalizado");
  const elementosArray = Array.from(elementos);

  elementosArray.sort(function (a, b) {
    if (a.id > b.id) {
      return 1;
    }
    if (a.id < b.id) {
      return -1;
    }

    return 0;
  });

  const porcentagem = acertos / x;
  const arredondaPorcentagem = porcentagem.toFixed(2) * 100;

  let elementoQueQueroQueApareca;
  for (let elemento of elementosArray) {
    if (arredondaPorcentagem < parseInt(elemento.id)) {
      break;
    }
    elementoQueQueroQueApareca = elemento;
  }

  elementoQueQueroQueApareca.classList.remove("hidden");
  elementoQueQueroQueApareca.scrollIntoView();

  const textoFinal =
    elementoQueQueroQueApareca.getElementsByClassName("tituloFinalQuiz")[0];
  textoFinal.innerHTML = `${arredondaPorcentagem}% de acerto: ${textoFinal.innerHTML}`;
}

function reproduzirQuiz() {
  console.log(quizzSelecionado);
  renderizarQuizz(quizzSelecionado);
  window.scrollTo(0, 0);
}

function VoltarPraHome() {
  pegarQuizzes();
  const pagina1 = document.querySelector(".pagina1")
  const pagina2 = document.querySelector(".pagina2")
  const pagina3 = document.querySelector(".pagina3")
  if (pagina1.classList.contains("hidden")) {
    pagina1.classList.remove("hidden");
  }
  if (!pagina2.classList.contains("hidden")) {
    pagina2.classList.add("hidden")
  }
  if (!pagina3.classList.contains("hidden")) {
    pagina3.classList.add("hidden")
  }
  window.scrollTo(0, 0);
}
