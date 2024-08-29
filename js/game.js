const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');
const reloadButton = document.getElementById("reload-button");
const rankingButton = document.getElementById('ranking-button');

// arrey dos nomes de cada imagem 
const characters = [
    'bmo',
    'caroco',
    'finn',
    'flame',
    'gelado',
    'jake',
    'jujuba',
    'marceline',
    'slime',
    'susan',

]

// Função para padronizar a criação de elementos HTML e atribuição de classe
function createElement(tag, className) {
    // Cria um elemento HTML de acordo com a tag informada
    const element = document.createElement(tag);
    // Atribui uma classe ao elemento que foi criado
    element.className = className;
    // Retorna o elemento criado com a classe
    return element;
}

// variaveis para verificação das cartas
let firstCard = '';
let secondCard = '';

// Função que verifique se o jogo acabou
function checkEndGame() {
    const disableCards = document.querySelectorAll('.disable-card');

    if (disableCards.length === 20) {
        clearInterval(this.loop);

        //Aplica o conteudo da Tag a variavel
        const playerName = spanPlayer.innerHTML;
        const finalTime = timer.innerHTML;

        // Cria um objeto para salvar  as informações do jogador em um objeto
        const playerData = {
            name: playerName,
            time: parseInt(finalTime, 10)
        };
        
        //Recupera o Ranking exitente em localStorage ou cria um
        const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

        //Adiciona as informações do jogador ao array de objetos
        ranking.push(playerData);

        // Organiza os objetos dentro do array pelo "time" (menor -> maior)
        ranking.sort((a, b) => a.time - b.time);

        // Salva o array atualizado e reordenado dentro de localStorage
        localStorage.setItem('ranking', JSON.stringify(ranking));

        // Atualiza a mensagem do pop-up
        const endGameMessage = `Congratulations ${playerName}! \nYour time was ${finalTime} seconds.`;
        document.getElementById('endGameMessage').textContent = endGameMessage;

        // Exibe o pop-up
        document.getElementById('endGamePopup').style.display = 'flex';

    
        // Botão que redireciona (recarrega) para jogo
        document.getElementById('restartGame').addEventListener('click', () => {
            
            location.reload(); // Simplesmente recarrega a página
        });

        // Redireciona para a página de ranking
        document.getElementById('viewRanking').addEventListener('click', () => {
            window.location = 'ranking.html'; 
        });

        //Botão para fecharo pop-up
        document.getElementById('closePopup').addEventListener('click', () => {
            document.getElementById('endGamePopup').style.display = 'none';
        });

        // Fecha o pop-up ao clicar em qualquer lugar na tela fora dele
        window.addEventListener('click', (event) => {
            if (event.target === document.getElementById('endGamePopup')) {
                document.getElementById('endGamePopup').style.display = 'none';
            }
        });
    }
}


// Função que verifica se as cartas são iguais e aplica o efeito de acerto
function checkCards() {
    // Pega o atributo do elemento card que foi definido na variavel na função revealCard
    const firstCharacter = firstCard.getAttribute('data-character')
    const secondCharacter = secondCard.getAttribute('data-character')

    //Verifica se as cartas viradas são iguais
    if (firstCharacter === secondCharacter) {

        // adiciona o atributo para alteração exibição da imagem do backgrond
        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');

        // Apaga a carta que esta armazenada na variavel
        firstCard = '';
        secondCard = '';

        //Verifica se o jogo acabou
        checkEndGame()

    } else {
        // espera um tempo para execução entre um comando e outro - so executa apos amabas selecionadas
        setTimeout(() => {
            // remove o atributo que vira a carta - volta ela ao normal
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            // Apaga a carta que esta armazenada na variavel
            firstCard = '';
            secondCard = '';

        }, 500)

    }

}

// função que revela a carta ao clicar nela e salva o elemento na variavel 
function revealCard({ target }){

    // Verifica se a carta ja esta viranda, confirmando a existencia da classe "reveal-card"
    if (target.parentNode.className.includes('reveal-card')) {
        // se possuir não faz nada
        return;
    }

    // verifica se é a primeira ou segunda carda e compara ambas
    if (firstCard === '') {
        // Vira a carta (adiciona a classe ".reveal-card) e adiciona ela a variavel
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    } else if (secondCard === '') {
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards()

    }
}

// função para criação da carta (que é um elemento HTML)
function createCard(characters) {
    // Cria um elemento HTML com sua respectiva classe
    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    //atribui uma imagem ao front usdando a variavel "characters"
    front.style.backgroundImage = `url('../img/${characters}.png')`

    // Atribui os elementos filhos ("front" e "back") a div pai "card"
    card.appendChild(front);
    card.appendChild(back);

    // adiciona um evento de clique que executa a função de virar a carta
    card.addEventListener('click', revealCard);

    //adiciona o atributo criado a carta que tem o valor de acordo com "characters"
    card.setAttribute('data-character', characters)

    // Retorna o estrutura HTML criada que é o "card"
    return card;
}

// Função para o carregamento do jogo 
function loadGame() {

    // Duplica o conteudo de "characters" usado o espalhador em um novo array
    const duplicateCharacters = [ ...characters, ...characters ]

    // Torna a ordem dos personagens no array aleatoria
    const shuffledArray = duplicateCharacters.sort(
        () => Math.random() - 0.5
    );

    // Faz uma busca no meu array de personagens que esta duplicado e aleatorio
    shuffledArray.forEach((characters) => {

        //Faz a criação da carta para cada item do array selecionando a imagem de fundo
        const cards = createCard(characters)
        // Adiciona o card criado dentro do grid
        grid.appendChild(cards)

    });

};

//Funcionamento do contatdor do jogo
function startTimer() {

    // Reseta o intervalo atual antes de iniciar a contagem quando a função é executada 
    clearInterval(this.loop)

    // Executa a função de somar o tempo a cada 1s
    // coloca o contatdor dentro do escopo geral do "this"
    this.loop = setInterval(() => {

        const currentTimer = Number(timer.innerHTML)
        timer.innerHTML = currentTimer + 1

    }, 1000);

}

//Executa os comandos detro somente depois do carregamento da pagina
window.onload = () => {
    //Mostra o nome do jogador que est salvo no localstorage no span player
    spanPlayer.innerHTML = localStorage.getItem('player')

    // Executa o jogo
    loadGame();
    // Incia o contador 
    startTimer();

}

// Funçoa para reinicar o jogo
function resetGame() {
    // Limpa o grid para gerar as cartas novamente
    grid.innerHTML = '';
    
    // Reseta o timer do jogo
    clearInterval(this.loop);
    timer.innerHTML = '0';

    // Reseta as variáveis das cartas para que possam ser selcionadas
    firstCard = '';
    secondCard = '';

    // Recarrega o jogo e o contador novamente
    loadGame();
    startTimer();
}

// adiciona o evento de resete do jogo ao botão
reloadButton.addEventListener("click", resetGame );

// adiciona o evento de redirecionamento ao botão
rankingButton.addEventListener('click', () => {
    window.location.href = 'ranking.html';
});
