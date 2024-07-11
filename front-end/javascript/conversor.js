// Definindo a URL da API
const isLocalHost = window.location.hostname === 'localhost';
const API_URL = isLocalHost ? 'http://localhost:3000' : 'https://seu-projeto-no-heroku.herokuapp.com';

// Função para evitar que tenha a mesma opção em outro select
function remover_select_duplicado(valor_remover, valorComparar) {
    for (var i = valor_remover.options.length - 1; i >= 1; i--) {
        if (valor_remover.options[i].value == valorComparar) {
            valor_remover.options[i].style.display = 'none';
        } else{
            valor_remover.options[i].style.display = 'block';
        }
    }
}
// Função para evitar que tenha a mesma opção em outro select

// Pegando os valores do select
var select1 = document.getElementById("select1");
var select2 = document.getElementById("select2");

// Chamando a função para evitar selec duplicado
select1.addEventListener("change", function () {
    var selectedValue = select1.value;
    remover_select_duplicado(select2, selectedValue);
});


select2.addEventListener("change", function () {
    var selectedValue = select2.value;
    remover_select_duplicado(select1, selectedValue);
});
//Chamando a função para evitar selec duplicado

// Fazendo a requisição no back-end 

function requisicao_back(moeda1,moeda2, callback){
  fetch(`${API_URL}/${moeda1}/${moeda2}`)
  .then(response => response.json()) 
  .then(data => {
    const cotacao = parseFloat(data.valor);
    const cotacao_arredondada = cotacao.toFixed(2); 
    const cotacao_arredondada_virgula = cotacao_arredondada.replace(".",","); 
    console.log(cotacao_arredondada);
    calculando_conversao(cotacao_arredondada)
    callback(cotacao_arredondada);
    callback(cotacao_arredondada_virgula);
  })
  .catch(error => {
    console.error('Ocorreu um erro na solicitação:', error);
  });
}

// Fazendo a requisição no back-end 

// Calculando a conversão de valores

function calculando_conversao(cotacao_arredondada,cotacao_arredondada_virgula){
    valor_original = document.getElementById("valor");
    valor_convertido = valor_original.value*cotacao_arredondada;
    valor_convertido = valor_convertido.toFixed(2).replace(".",",");
    imprimindo_os_valores();
}

// Calculando a conversão de valores

//Imprimindo os valores convertido

function imprimindo_os_valores(cotacao_arredondada,cotacao_arredondada_virgula){
    const resultado = document.getElementById("resultado");
    const resultado_valor = document.getElementById("resultado_valor");
    const resultado_texto = document.getElementById("resultado_texto");
    resultado.style.display = 'block';
    resultado_valor.innerHTML = valor_convertido;
    console.log(cotacao_arredondada_virgula);
    resultado_texto.innerHTML = 'Resultado convertido com base na cotação do ' + select1.value + '-' + select2.value + ', valendo: ' + cotacao_arredondada;
}

//Imprimindo os valores convertido

// Pegando variaveis para envio
const botao = document.getElementById("btn");
const valor = document.getElementById("valor");

// Verificando se o formulário não tem nenhum campo vázio
botao.addEventListener('click', function(){
    if(select1.value === ''){
        alert("A primeira moeda está vazia!")
    }
    if(select2.value === ''){
        alert("A segunda moeda está vazia!")
    } 
    if(valor.value === ''){
        alert("O valor para ser convertido está vazio!")
    } else {
      requisicao_back(select2.value,select1.value,function (cotacao_arredondada,cotacao_arredondada_virgula){
        imprimindo_os_valores(cotacao_arredondada,cotacao_arredondada_virgula);
      });

    }
})
// Verificando se o formulário não tem nenhum campo vázio
