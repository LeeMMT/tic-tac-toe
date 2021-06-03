const game = (function() {
    
})();

const gameBoard = (function() {
    let gridCells = ['O', '', '', '', 'X', '', '', '', ''];
    const updateBoard = function() {
        gridCells.forEach(element => {
        document.querySelector(`div[data-cell="${gridCells.indexOf(element)}"] p`).textContent = element;
    })
    }
    const addMarker = function(e) {
        if (!e.target.children[0].textContent) {
            e.target.children[0].textContent = players.player2.marker;
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

document.querySelector('#game-board').addEventListener('click', gameBoard.addMarker);