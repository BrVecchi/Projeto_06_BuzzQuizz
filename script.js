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
let quizzSelecionado;

let arrayQuizzesCriados = [];
let arrayResposta = [];
let quizzCriado;
if (localStorage.getItem("quizzes_pessoal") !== null) {
  arrayResposta = JSON.parse(localStorage.getItem("quizzes_pessoal"));
  for (let i = 0; i < arrayResposta.length; i++) {
    arrayQuizzesCriados.push(arrayResposta[i].data);
  }
}

let quizzes = document.querySelector(".quizzes");
let quizzes_pessoal = document.querySelector(".quizzes-pessoal");
let dadosRecebidos;

//---------------------------INICIO PAGINA 1-----------------------------------------------
carregar();
pegarQuizzes();

function carregar() {
  document.querySelector(".pagina-loading").classList.remove("hidden");
}

function pegarQuizzes() {
  const promessa = axios.get(
    "https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes"
  );
  promessa.then(mostrarQuizzes);
  promessa.then(() => {
    document.querySelector(".pagina-loading").classList.add("hidden");
    document.querySelector(".pagina1").classList.remove("hidden");
  });
  promessa.then(filtrarStore);
}

function filtrarStore(resposta) {
  const dados = resposta.data;
  let arrayFiltrados = [];
  if (arrayResposta[0] !== undefined) {
    for (let i = 0; i < dados.length; i++) {
      for (let j = 0; j < arrayResposta.length; j++) {
        if (dados[i].id === arrayResposta[j].data.id) {
          arrayFiltrados.push(arrayResposta[j]);
        }
      }
    }
    arrayResposta = arrayFiltrados;
    const arrayRespostaSerializado = JSON.stringify(arrayResposta);
    localStorage.setItem("quizzes_pessoal", `${arrayRespostaSerializado}`);
    arrayQuizzesCriados = [];
    if (localStorage.getItem("quizzes_pessoal") !== null) {
      arrayResposta = JSON.parse(localStorage.getItem("quizzes_pessoal"));
      for (let i = 0; i < arrayResposta.length; i++) {
        arrayQuizzesCriados.push(arrayResposta[i].data);
      }
    }
  }
}

function mostrarQuizzes(resposta) {
  document.querySelector(".pagina1").classList.add("hidden");
  let quizz = "";
  let quizz_pessoal = "";
  const dados = resposta.data;
  dadosRecebidos = dados;
  quizzes.innerHTML = "";
  quizzes_pessoal.innerHTML = "";
  let existeQuizzPessoal = false;
  for (let i = 0; i < dados.length; i++) {
    if (arrayQuizzesCriados[0] !== undefined) {
      for (let j = 0; j < arrayQuizzesCriados.length; j++) {
        if (dados[i].id !== arrayQuizzesCriados[j].id) {
          quizz = `
            <li id="quizz${dados[i].id}" class="quizz" onclick="selecionarQuizz(this)">
              <p class="texto-quizz">${dados[i].title}</p>
            </li>`;
        } else {
          quizz_pessoal = `
            <li id="quizz${dados[i].id}" class="quizz-pessoal" onclick="selecionarQuizz(this)">
              <div class="deletar-editar">
                <button class="botao-editar"><ion-icon name="create-outline"></ion-icon></button>
                <button id="deletar${dados[i].id}" class="botao-deletar" onclick="deletarQuizz(this)"><ion-icon name="trash-outline"></button>
              </div>
              <p class="texto-quizz">${dados[i].title}</p>
            </li>`;
          quizzes_pessoal.innerHTML = quizzes_pessoal.innerHTML + quizz_pessoal;
          existeQuizzPessoal = true;
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

  if (existeQuizzPessoal) {
    document.querySelector(".quizzes-pessoal-vazio").classList.add("hidden");
    document
      .querySelector(".quizzes-pessoal-container")
      .classList.remove("hidden");
  }
}
let id_quizz_selecionado = 0;
function selecionarQuizz(quizz) {
  id_quizz_selecionado = quizz.id.replace(/[^0-9]/g, "");
  for (let i = 0; i < dadosRecebidos.length; i++) {
    if (id_quizz_selecionado == dadosRecebidos[i].id) {
      quizzSelecionado = dadosRecebidos[i];
    }
  }
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

function deletarQuizz(botao_deletar) {
  document.querySelector(".pagina1").classList.add("hidden");
  carregar();
  let identificador = Number(botao_deletar.id.replace(/[^0-9]/g, ""));
  let header;
  let posicao_array;
  for (let i = 0; i < arrayResposta.length; i++) {
    if ((arrayResposta[i].data.id = identificador)) {
      header = arrayResposta[i].data.key;
      posicao_array = i;
    }
  }
  axios
    .delete(
      `https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${identificador}`,
      { headers: { "Secret-Key": `${header}` } }
    )
    .then(function () {
      arrayResposta = JSON.parse(localStorage.getItem("quizzes_pessoal"));
      for (let i = 0; i < arrayResposta.length; i++) {
        if ((arrayResposta[i].data.id = identificador)) {
          arrayResposta = arrayResposta.filter((element) => {
            return element !== arrayResposta[i];
          });
        }
      }
      for (let i = 0; i < arrayResposta.length; i++) {
        arrayQuizzesCriados.push(arrayResposta[i].data);
      }
      window.location.reload();
    });
}
//---------------------------INICIO PAGINA 3-----------------------------------------------


function addInfo() {
  let basicInfo = document.querySelector(".basic-info-container");
  let criarPerguntas = document.querySelector(".criar-perguntas-container");
  titulo = document.querySelector(".titulo");
  let titulo_alert = document.querySelector(".titulo-alerta");
  imgURL = document.querySelector(".img-url");
  let imgURL_alert = document.querySelector(".img-url-alerta");
  qntdPerguntas = document.querySelector(".qntd-perguntas");
  let qntdPerguntas_alert = document.querySelector(".qntd-perguntas-alerta");
  qntdNiveis = document.querySelector(".qntd-niveis");
  let qntdNiveis_alert = document.querySelector(".qntd-niveis-alerta");
  let validos = 0;
  const reg =
    /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (titulo.value.length < 20 || titulo.value.length > 65) {
    titulo.classList.add("invalido");
    titulo_alert.classList.remove("hidden");
  } else {
    titulo.classList.remove("invalido");
    titulo_alert.classList.add("hidden");
    validos++;
  }
  
  if(reg.test(imgURL.value) === false) {
    imgURL.classList.add("invalido");
    imgURL_alert.classList.remove("hidden");
  } else {
    imgURL.classList.remove("invalido");
    imgURL_alert.classList.add("hidden");
    validos++;
  }
  if(qntdPerguntas.value < 3) {
    qntdPerguntas.classList.add("invalido");
    qntdPerguntas_alert.classList.remove("hidden");
  } else {
    qntdPerguntas.classList.remove("invalido");
    qntdPerguntas_alert.classList.add("hidden");
    validos++;
  } if (qntdNiveis.value < 2) {
    qntdNiveis.classList.add("invalido");
    qntdNiveis_alert.classList.remove("hidden");
  } else {
    qntdNiveis.classList.remove("invalido");
    qntdNiveis_alert.classList.add("hidden");
    validos++;
  }
  
   if(validos === 4) {
        renderizarCriarPerguntas();
       basicInfo.classList.add("hidden");
       criarPerguntas.classList.remove("hidden");
   }
}

function renderizarCriarPerguntas() {
  let criarPerguntas = document.querySelector(".criar-perguntas");
  for (let i = 2; i <= qntdPerguntas.value; i++) {
    criarPerguntas.innerHTML += `<fieldset>
    <div class="pergunta-title">
      <h2>Pergunta ${i}</h2>
      <img class ="icon-edit" onclick="mostrarCampos(this)" src="./imgs_pg1/Icone-editar.png" alt="icone">
    </div>
    <div class="form-container hidden">
      <div class="form">
        <div class="campo-pergunta">
          <input class="tituloPergunta${i}" type="text" placeholder="Texto da pergunta (mínimo: 20 caracteres)">
          <p class = "tituloPergunta${i}-alerta hidden">O texto da pergunta deve ter no mínimo 20 caracteres</p>
          <input class="cor${i}" type="text" placeholder="Cor de fundo da pergunta (formato: #123456)">
          <p class = "cor${i}-alerta hidden">A cor precisa ser um hexadecimal no formato: #123456</p>
        </div>
        <div class="campo-correta">
          <h2>Resposta correta</h2>
          <input class="correta${i}" type="text" placeholder="Resposta correta">
          <p class="correta${i}-alerta hidden">Campo obrigatório</p>
          <input class = "resposta${i}-img1" type="text" placeholder="URL da imagem">
          <p class = "resposta${i}-img1-alerta hidden">O valor informado não é uma URL válida</p>
        </div>
        <div class="campo-incorretas">
          <h2>Respostas incorretas</h2>
          <div class="incorretas">
            <div class="incorreta1">
              <input class="incorreta1-pergunta${i}" type="text" placeholder="Resposta incorreta 1">
              <p class="incorreta1-pergunta${i}-alerta hidden">Campo obrigatório</p>
              <input class = "resposta${i}-img2" type="text" placeholder="URL da imagem 1">
              <p class = "resposta${i}-img2-alerta hidden">O valor informado não é uma URL válida</p>
            </div>
            <div class="incorreta2">
              <input class="incorreta2-pergunta${i}" type="text" placeholder="Resposta incorreta 2">
              <input class = "resposta${i}-img3" type="text" placeholder="URL da imagem 2">
              <p class = "resposta${i}-img3-alerta hidden">O valor informado não é uma URL válida</p>
            </div>
            <div class="incorreta3">
              <input class="incorreta3-pergunta${i}" type="text" placeholder="Resposta incorreta 3">
              <input class = "resposta${i}-img4" type="text" placeholder="URL da imagem 3">
              <p class = "resposta${i}-img4-alerta hidden">O valor informado não é uma URL válida</p>
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
  let tituloPergunta_alert;
  let cor_alert;
  let resposta1_alert;
  let resposta2_alert;
  let img1_alert;
  let img2_alert;
  let img3_alert;
  let img4_alert;
  let verificador = 0;
  let invalidos;;
  for (i = 1; i <= qntdPerguntas.value; i++) {
    tituloPergunta = document.querySelector(`.tituloPergunta${i}`);
    tituloPergunta_alert = document.querySelector(`.tituloPergunta${i}-alerta`)
    cor = document.querySelector(`.cor${i}`);
    cor_alert = document.querySelector(`.cor${i}-alerta`);
    resposta1 = document.querySelector(`.correta${i}`);
    resposta1_alert = document.querySelector(`.correta${i}-alerta`);
    img1 = document.querySelector(`.resposta${i}-img1`);
    img1_alert = document.querySelector(`.resposta${i}-img1-alerta`);
    resposta2 = document.querySelector(`.incorreta1-pergunta${i}`);
    resposta2_alert = document.querySelector(`.incorreta1-pergunta${i}-alerta`);
    img2 = document.querySelector(`.resposta${i}-img2`);
    img2_alert = document.querySelector(`.resposta${i}-img2-alerta`);
    resposta3 = document.querySelector(`.incorreta2-pergunta${i}`);
    img3 = document.querySelector(`.resposta${i}-img3`);
    img3_alert = document.querySelector(`.resposta${i}-img3-alerta`);
    resposta4 = document.querySelector(`.incorreta3-pergunta${i}`);
    img4 = document.querySelector(`.resposta${i}-img4`);
    img4_alert = document.querySelector(`.resposta${i}-img4-alerta`);
    invalidos = 0;
    const regURL = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    const regCor = /^#[0-9A-F]{6}$/i;

    if(tituloPergunta.value.length < 20) {
      tituloPergunta.classList.add("invalido");
      tituloPergunta_alert.classList.remove("hidden");
      invalidos++;
      verificador++;
    } else {
      tituloPergunta.classList.remove("invalido");
      tituloPergunta_alert.classList.add("hidden");
      }
      if(regCor.test(cor.value) === false) {
      cor.classList.add("invalido");
      cor_alert.classList.remove("hidden");
      invalidos++;
      verificador++;
    } else {
      cor.classList.remove("invalido");
      cor_alert.classList.add("hidden");
      }
      if (resposta1.value === "") {
      resposta1.classList.add("invalido");
      resposta1_alert.classList.remove("hidden");
      invalidos++;
      verificador++;
    } else {
      resposta1.classList.remove("invalido");
      resposta1_alert.classList.add("hidden");
      }
      if (resposta2.value === "") {
      resposta2.classList.add("invalido");
      resposta2_alert.classList.remove("hidden");
      invalidos++;
      verificador++;
    } else {
      resposta2.classList.remove("invalido");
      resposta2_alert.classList.add("hidden");
      }
       if (regURL.test(img1.value) === false) {
      img1.classList.add("invalido");
      img1_alert.classList.remove("hidden");
      invalidos++;
      verificador++;
    } else {
      img1.classList.remove("invalido");
      img1_alert.classList.add("hidden");
      }
       if (regURL.test(img2.value) === false) {
      img2.classList.add("invalido");
      img2_alert.classList.remove("hidden");
      invalidos++;
      verificador++;
    } else {
      img2.classList.remove("invalido");
      img2_alert.classList.add("hidden");
      }
       if (regURL.test(img3.value) === false && img3.value !== "") {
      img3.classList.add("invalido");
      img3_alert.classList.remove("hidden");
      invalidos++;
      verificador++;
    } else {
      img3.classList.remove("invalido");
      img3_alert.classList.add("hidden");
      } 
      if (regURL.test(img4.value) === false && img4.value !== "") {
      img4.classList.add("invalido");
      img4_alert.classList.remove("hidden");
      invalidos++;
      verificador++;
    } else {
      img4.classList.remove("invalido");
      img4_alert.classList.add("hidden");
    }
    if(invalidos === 0) {
          if (resposta3.value === "" && resposta4.value === "") {
        objQuestions = {
          title: `${tituloPergunta.value}`,
          color: `${cor.value}`,
          answers: [
            {
              text: `${resposta1.value}`,
              image: `${img1.value}`,
              isCorrectAnswer: true,
            },
            {
              text: `${resposta2.value}`,
              image: `${img2.value}`,
              isCorrectAnswer: false,
            },
          ],
        };
      } else if (resposta4.value === "") {
        objQuestions = {
          title: `${tituloPergunta.value}`,
          color: `${cor.value}`,
          answers: [
            {
              text: `${resposta1.value}`,
              image: `${img1.value}`,
              isCorrectAnswer: true,
            },
            {
              text: `${resposta2.value}`,
              image: `${img2.value}`,
              isCorrectAnswer: false,
            },
            {
              text: `${resposta3.value}`,
              image: `${img3.value}`,
              isCorrectAnswer: false,
            },
          ],
        };
      } else {
        objQuestions = {
          title: `${tituloPergunta.value}`,
          color: `${cor.value}`,
          answers: [
            {
              text: `${resposta1.value}`,
              image: `${img1.value}`,
              isCorrectAnswer: true,
            },
            {
              text: `${resposta2.value}`,
              image: `${img2.value}`,
              isCorrectAnswer: false,
            },
            {
              text: `${resposta3.value}`,
              image: `${img3.value}`,
              isCorrectAnswer: false,
            },
            {
              text: `${resposta4.value}`,
              image: `${img4.value}`,
              isCorrectAnswer: false,
            },
          ],
        };
      }
    }
    perguntas.push(objQuestions);
  
  }
  if (verificador === 0) {
      renderizarCriarNiveis();
      criarPerguntas.classList.add("hidden");
      criarNiveis.classList.remove("hidden");
      window.scrollTo(0, 0);
    }
}

function renderizarCriarNiveis() {
  let criarNiveis = document.querySelector(".criar-niveis");
  for (let i = 2; i <= qntdNiveis.value; i++) {
    criarNiveis.innerHTML += `<fieldset>
    <div class="nivel-title">
    <h2>Nível ${i}</h2>
    <img class ="icon-edit" onclick = "mostrarCampos(this)" src="./imgs_pg1/Icone-editar.png" alt="icone">
    </div>
    <div class="form-container hidden">
    <div class="niveis-form">
        <input class="tituloNivel${i}" type="text" placeholder="Título do nível (mínimo: 10 caracteres)">
        <p class="tituloNivel${i}-alerta hidden">O título do nível deve ter no mínimo 10 caracteres</p>
        <input class="porcentagem${i}" type="text" placeholder="% de acerto mínima">
        <p class="porcentagem${i}-alerta hidden">O quizz deve ter um dos níveis com porcentagem mínima de 0%</p>
        <input class="url${i}" type="text" placeholder="URL da imagem do nível">
        <p class="url${i}-alerta hidden">O valor informado não é uma URL válida</p>
        <textarea name="" class="nivel-descricao descricao${i}" placeholder="Descrição do nível (mínimo: 30 caracteres)"></textarea>
        <p class="descricao1-alerta hidden">A descrição deve ter no mínimo 30 caracteres</p>
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
  for (i = 1; i <= qntdNiveis.value; i++) {
    tituloNivel = document.querySelector(`.tituloNivel${i}`).value;
    porcentagemMinima = document.querySelector(`.porcentagem${i}`).value;
    imgURL_nivel = document.querySelector(`.url${i}`).value;
    descricaoNivel = document.querySelector(`.descricao${i}`).value;
    const reg =
      /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
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
    document.querySelector(".pagina3").classList.add("hidden");
    carregar();
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
      quizzCriado = resposta;
      arrayResposta.push(quizzCriado);
      const arrayRespostaSerializado = JSON.stringify(arrayResposta);
      localStorage.setItem("quizzes_pessoal", `${arrayRespostaSerializado}`);
      document.querySelector(".pagina-loading").classList.add("hidden");
      document.querySelector(".pagina3").classList.remove("hidden");
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
  <button onclick="acessarQuizz()">Acessar quizz</button>
  <p onclick="window.location.reload(); ">Voltar pra home</p>`;
}

function acessarQuizz() {
  renderizarQuizz(quizzCriado.data);
  document.querySelector(".pagina3").classList.add("hidden");
  document.querySelector(".pagina2").classList.remove("hidden");
}

//-----------------------------Pagina2-------------------------------------------
let x;
let acertos = 0;
let erros = 0;
let body;
let mudarCor;
let adicionarPerguntas = document.querySelector(".pagina2");

function renderizarQuizz(quizz) {
  quizzSelecionado = quizz;
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
        elementoQueQueroQueApareca.parentElement.scrollIntoView({block :  "center"});
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
  renderizarQuizz(quizzSelecionado);
  window.scrollTo(0, 0);
}

function VoltarPraHome() {
  pegarQuizzes();
  const pagina1 = document.querySelector(".pagina1");
  const pagina2 = document.querySelector(".pagina2");
  const pagina3 = document.querySelector(".pagina3");
  if (pagina1.classList.contains("hidden")) {
    pagina1.classList.remove("hidden");
  }
  if (!pagina2.classList.contains("hidden")) {
    pagina2.classList.add("hidden");
  }
  if (!pagina3.classList.contains("hidden")) {
    pagina3.classList.add("hidden");
  }
  window.scrollTo(0, 0);
}

