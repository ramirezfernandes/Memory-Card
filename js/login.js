const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login-form')
const rankingButton = document.getElementById('ranking-button');


// Função para determinar se o "input" foi preenchido da forma corrta e habilitar o "button"
function validateInput({ target }) {
    // Valida a quantidade de caractares através targuet (retorna o valor informado)
    if (target.value.length > 2) {
        button.removeAttribute('disabled'); // remove a propriedade "disable"
    } else {
        button.setAttribute('disabled', ''); // adiciona a propriedade "disable"
    }
}


// Função que salva o valor informado em "input" e redireciona para pagina do jogo
function handleSubmit(event) {

    // Impede que a pagina recarrega ao cicar no "button"
    event.preventDefault(); 

    // Seta no local storege como a chave "player" o valor de input
    localStorage.setItem('player', input.value); 

    // Redireciona para a Pagina do Game
    window.location = 'pages/game.html'

}


// Cria o botão que redireciona para Ranking
rankingButton.addEventListener('click', () => {
    window.location.href = 'pages/ranking.html';
});


input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);