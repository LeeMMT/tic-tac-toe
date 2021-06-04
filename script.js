const game = (function() {
    let playerTurn;
    let gameStarted = false;
    return {
        playerTurn, gameStarted
    }    
})();

const gameBoard = (function() {
    const cells = document.querySelectorAll('div#game-board div');
    let gridCells = ['', '', '', '', '', '', '', '', ''];
    const updateBoard = function() {
        cells.forEach(element => {
        element.children[0].textContent = gridCells[element.getAttribute('data-cell')];
    })
    }
    const addMarker = function(e) {
        if (!e.target.children.textContent) {
            gridCells[e.target.getAttribute('data-cell')] = game.playerTurn.marker;
            updateBoard();
            (game.playerTurn === players.player1) ? game.playerTurn = players.player2: game.playerTurn = players.player1;
        }   
    }
    return {
        addMarker
    };
})();

const players = (function() {
    let player1 = {
        name: "Player 1",
        marker: "X",
        markerColor: "#DF1674"
    }
    let player2 = {
        name: "Player 2",
        marker: "O",
        markerColor: "#0E79B2"
    }
    swapMarkers = function() {
        if (gameStarted) {
            return
        }
        if (player1.marker === "X") {
            player1.marker = "O";
            player2.marker = "X";
        } else {
            player1.marker = "X";
            player2.marker = "O";
        }
    }
    return {
        player1, player2, swapMarkers
    }
})();

const player = function(name, marker) {
    return {name, marker}
}

function onPageLoad() {
    swapMarkerBtn = document.querySelector('#icon-swap').addEventListener('click', swapMarkers);
    document.querySelector('#game-board').addEventListener('click', gameBoard.addMarker);
    game.playerTurn = players.player1;
}

onPageLoad();