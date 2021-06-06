const game = (function() {
    let playerTurn;
    let gameStarted = false;
    const startOrReset = function(e) {
        if (this.children[0].textContent === "Start") {
            game.gameStarted = true;
            this.children[0].textContent = "Reset";
        } else {
            gameBoard.resetBoard(this);
        }
    }
    return {
        playerTurn, gameStarted, startOrReset
    }    
})();

const gameBoard = (function() {
    const cells = document.querySelectorAll('div#game-board div');
    let gridCells = ['', '', '', '', '', '', '', '', ''];
    const updateBoard = function() {
        cells.forEach(element => {
            element.children[0].textContent = gridCells[element.getAttribute('data-cell')];
            if (element.children[0].textContent === "X") {
                element.children[0].classList.add('x-marker')
            } else if (element.children[0].textContent === "O") {
                element.children[0].classList.add('o-marker')
        }
    })
    winCheck();
    }
    const addMarker = function(e) {
        if (!e.target.children.textContent && game.gameStarted === true) {
            gridCells[e.target.getAttribute('data-cell')] = game.playerTurn.marker;
            updateBoard();
            (game.playerTurn === players.player1) ? game.playerTurn = players.player2: game.playerTurn = players.player1;
        } else if (game.gameStarted === false) {
            document.querySelector('#start-reset').classList.toggle('blink-bg');
        }  
    }
    const resetBoard = function(e) {
        gridCells = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(element => {
            if (element.children[0].classList.contains('x-marker')) {
                element.children[0].classList.remove('x-marker');
            }
            if (element.children[0].classList.contains('o-marker')) {
                element.children[0].classList.remove('o-marker');
            }
        })
        updateBoard();
        game.gameStarted = false;
        e.children[0].textContent = "Start";
        game.playerTurn = players.player1;
    }

    const arrayChecker = (collection) => {
        const marker = collection[0];
        return (marker !== "" && collection[0] === collection[1] && collection[0] === collection[2]);
    }

    const winCheck = function() {
        const topRow = gridCells.slice(0, 3);
        const midRow = gridCells.slice(3, 6);
        const botRow = gridCells.slice(6);
        const leftCol = [gridCells[0], gridCells[3], gridCells[6]];
        const midCol = [gridCells[1], gridCells[4], gridCells[7]];
        const rightCol = [gridCells[2], gridCells[5], gridCells[8]];
        const firstDiag = [gridCells[0], gridCells[4], gridCells[8]];
        const secDiag = [gridCells[2], gridCells[4], gridCells[6]];

        if (arrayChecker(topRow)) {
            const winningPlayer = (players.player1.marker == topRow[0]) ? players.player1.name : players.player2.name;
            console.log(`${winningPlayer} is the winner!`);
        } else if (arrayChecker(midRow)) {
            const winningPlayer = (players.player1.marker === midRow[0]) ? players.player1.name : players.player2.name;
            console.log(`${winningPlayer} is the winner!`);
        } else if (arrayChecker(botRow)) {
            const winningPlayer = (players.player1.marker === botRow[0]) ? players.player1.name : players.player2.name;
            console.log(`${winningPlayer} is the winner!`);
        } else if (arrayChecker(leftCol)) {
            const winningPlayer = (players.player1.marker === leftCol[0]) ? players.player1.name : players.player2.name;
            console.log(`${winningPlayer} is the winner!`);
        } else if (arrayChecker(midCol)) {
            const winningPlayer = (players.player1.marker === midCol[0]) ? players.player1.name : players.player2.name;
            console.log(`${winningPlayer} is the winner!`);
        } else if (arrayChecker(rightCol)) {
            const winningPlayer = (players.player1.marker === rightCol[0]) ? players.player1.name : players.player2.name;
            console.log(`${winningPlayer} is the winner!`);
        } else if (arrayChecker(firstDiag)) {
            const winningPlayer = (players.player1.marker === firstDiag[0]) ? players.player1.name : players.player2.name;
            console.log(`${winningPlayer} is the winner!`);
        } else if (arrayChecker(secDiag)) {
            const winningPlayer = (players.player1.marker === secDiag[0]) ? players.player1.name : players.player2.name;
            console.log(`${winningPlayer} is the winner!`);
        };
    }
    return {
        gridCells, addMarker, resetBoard, updateBoard, winCheck
    };
})();

const players = (function() {
    let player1 = {
        name: "Player 1",
        marker: "X",
    }
    let player2 = {
        name: "Player 2",
        marker: "O",
    }
    const swapMarkers = function() {
        if (game.gameStarted) {
            return
        }
        if (player1.marker === "X") {
            player1.marker = "O";
            player2.marker = "X";
            document.querySelector('#p1-icon').style.color = "#0E79B2";
            document.querySelector('#p2-icon').style.color = "#DF1674";
        } else {
            player1.marker = "X";
            player2.marker = "O";
            document.querySelector('#p1-icon').style.color = "#DF1674";
            document.querySelector('#p2-icon').style.color = "#0E79B2";
        }
    }
    return {
        player1, player2, swapMarkers
    }
})();

function onPageLoad() {
    swapMarkerBtn = document.querySelector('#icon-swap').addEventListener('click', players.swapMarkers);
    document.querySelector('#game-board').addEventListener('click', gameBoard.addMarker);
    document.querySelector('#start-reset').addEventListener('click', game.startOrReset);
    document.querySelector('#start-reset').addEventListener('animationend', () => document.querySelector('#start-reset').classList.toggle('blink-bg'));
    game.playerTurn = players.player1;
}

onPageLoad();