const rankingButton = document.getElementById('redirect-login');

rankingButton.addEventListener('click', () => {
    window.location = '/index.html';
});

document.addEventListener("DOMContentLoaded", () => {
    // Recupera o ranking do localStorage
    const ranking = JSON.parse(localStorage.getItem('ranking')) || [];

    // Obtém o corpo da tabela onde o ranking será inserido
    const rankingBody = document.getElementById('ranking-body');

    // Itera sobre o ranking e insere cada jogador na tabela
    ranking.forEach((player, index) => {
        const row = document.createElement('tr');

        const positionCell = document.createElement('td');
        positionCell.textContent = index + 1;

        const nameCell = document.createElement('td');
        nameCell.textContent = player.name;

        const timeCell = document.createElement('td');
        timeCell.textContent = player.time;

        row.appendChild(positionCell);
        row.appendChild(nameCell);
        row.appendChild(timeCell);

        rankingBody.appendChild(row);
    });
});
