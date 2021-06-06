const game = (function() {
    let playerTurn;
    let gameStarted = false;
    let winner = null;
    const startOrReset = function(e) {
        if (this.children[0].textContent === "Start") {
            game.gameStarted = true;
            this.children[0].textContent = "Reset";
        } else {
            gameBoard.resetBoard(this);
        }
    }
    return {
        playerTurn, gameStarted, startOrReset, winner
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
        if (!e.target.children.textContent && game.gameStarted === true && !game.winner) {
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
        game.winner = null;
    }

    const arrayChecker = (obj) => {
        const marker = obj.array[0];
        //return (marker !== "" && collection[0] === collection[1] && collection[0] === collection[2]);
        if (marker === "") return false;
        if (obj.array.every(element => element === marker)) {
            game.winner = (marker === players.player1.marker) ? players.player1 : players.player2;
            game.winner.cells = [cells[obj.cells[0]], cells[obj.cells[1]], cells[obj.cells[2]]];
            return true;
    }    
    }

    const winCheck = function() {
        const topRow = {
            array: gridCells.slice(0, 3),
            cells: [0, 1, 2]
        };
        const midRow = {
            array: gridCells.slice(3, 6),
            cells: [3, 4, 5]
        };
        const botRow = {
            array: gridCells.slice(6),
            cells: [6,7,8]
        };
        const leftCol = {
            array: [gridCells[0], gridCells[3], gridCells[6]],
            cells: [0, 3, 6]
        };
        const midCol = {
            array: [gridCells[1], gridCells[4], gridCells[7]],
            cells: [1, 4, 7]
        };
        const rightCol = {
            array: [gridCells[2], gridCells[5], gridCells[8]],
            cells: [2, 5, 8]
        };
        const firstDiag = {
            array: [gridCells[0], gridCells[4], gridCells[8]],
            cells: [0, 4, 8]
        };
        const secDiag = {
            array: [gridCells[2], gridCells[4], gridCells[6]],
            cells: [2, 4, 6]
        };

        if (arrayChecker(topRow)) {
            console.log(`${game.winner.name} is the winner!`);
        } else if (arrayChecker(midRow)) {
            console.log(`${game.winner.name} is the winner!`);
        } else if (arrayChecker(botRow)) {
            console.log(`${game.winner.name} is the winner!`);
        } else if (arrayChecker(leftCol)) {
            console.log(`${game.winner.name} is the winner!`);
        } else if (arrayChecker(midCol)) {
            console.log(`${game.winner.name} is the winner!`);
        } else if (arrayChecker(rightCol)) {
            console.log(`${game.winner.name} is the winner!`);
        } else if (arrayChecker(firstDiag)) {
            console.log(`${game.winner.name} is the winner!`);
        } else if (arrayChecker(secDiag)) {
            console.log(`${game.winner.name} is the winner!`);
        };
        if (game.winner) {
            game.winner.cells.forEach(element => element.children[0].classList.toggle(`blink-${game.winner.marker}`));
        }
    }
    return {
        cells, gridCells, addMarker, resetBoard, updateBoard, winCheck
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