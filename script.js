let titulo = "";
let imgURL = "";
let qntdPerguntas = "";
let qntdNiveis = "";


function addInfo () {
    titulo = document.querySelector(".titulo").value;
    imgURL = document.querySelector(".img-url").value;
    qntdPerguntas = document.querySelector(".qntd-perguntas").value;
    qntdNiveis = document.querySelector(".qntd-niveis").value;
}
let botaosClicado;
function selecionarquiz(botao){
    console.log(botao);
    const botaoNaoClicado = document.querySelectorAll('.selecionado');
    console.log(botaoNaoClicado)
   if(botaoNaoClicado.length === 0){
   botao.classList.add('selecionado');
   }
}
