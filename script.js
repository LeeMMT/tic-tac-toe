const game = (function() {
    let playerTurn;
    return {
        playerTurn
    }    
})();

const gameBoard = (function() {
    const cells = document.querySelectorAll('div#game-board div');
    let gridCells = ['', '', '', '', '', '', '', '', ''];
    const updateBoard = function() {
        cells.forEach(element => {
        element.children[0].textContent = gridCells[element.getAttribute('data-cell')];
    })
    console.log(gridCells);
    }
    const addMarker = function(e) {
        if (!e.target.children.textContent) {
            gridCells[e.target.getAttribute('data-cell')] = game.playerTurn.marker;
            updateBoard();
        }   
    }
    return {
        addMarker
    };
})();

const players = (function() {
    let player1 = {
        name: "Player 1",
        marker: "X"
    }
    let player2 = {
        name: "Player 2",
        marker: "O"
    }
    return {
        player1, player2
    }
})();

const player = function(name, marker) {
    return {name, marker}
}

function onPageLoad() {
    document.querySelector('#game-board').addEventListener('click', gameBoard.addMarker);
    game.playerTurn = players.player1;
}

onPageLoad();