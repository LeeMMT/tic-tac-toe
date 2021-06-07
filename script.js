const game = (function() {
    let playerTurn;
    let gameStarted = false;
    let winner = null;
    const startOrReset = function(e) {
        if (this.children[0].textContent === "Start") {
            game.gameStarted = true;
            this.children[0].textContent = "Reset";
            gameBoard.swapMarkerBtn.addEventListener('animationend', () => {
                if (game.gameStarted === true) {
                    gameBoard.swapMarkerBtn.style.visibility = "hidden"
                }
            });
            gameBoard.swapMarkerBtn.classList.add('fade-out');
        } else {
            gameBoard.swapMarkerBtn.classList.remove('fade-out');
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
    const swapMarkerBtn = document.querySelector('#icon-swap')
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
        game.gameStarted = false;
        document.querySelector('p.fade-in').style.visibility = "hidden";
        swapMarkerBtn.style.display = "initial";
        document.querySelector('p.fade-in').remove();
        swapMarkerBtn.style.visibility = "visible";
        gameBoard.cells.forEach(element => element.classList.remove('blink-border'));
        
        if (game.winner) {
            game.winner.cells.forEach(element => element.children[0].classList.remove(`blink-${game.winner.marker}`));
            game.winner = null;
        }
        
        cells.forEach(element => {
            if (element.children[0].classList.contains('x-marker')) {
                element.children[0].classList.remove('x-marker');
            }
            if (element.children[0].classList.contains('o-marker')) {
                element.children[0].classList.remove('o-marker');
            }
        })
        updateBoard();
        e.children[0].textContent = "Start";
        game.playerTurn = players.player1;
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

        arrayChecker(topRow);
        arrayChecker(midRow);
        arrayChecker(botRow);
        arrayChecker(leftCol);
        arrayChecker(midCol);
        arrayChecker(rightCol);
        arrayChecker(firstDiag);
        arrayChecker(secDiag);

        if (game.winner) {
            game.winner.cells.forEach(element => element.children[0].classList.add(`blink-${game.winner.marker}`));
            const resultText = document.createElement('p');
            resultText.classList.add('fade-in');
            resultText.textContent = `${game.winner.name} is the winner`;
            swapMarkerBtn.style.display = "none";
            document.querySelector('#flex-row').appendChild(resultText);
        } else if (gridCells.every(element => element.length > 0)) {
            const resultText = document.createElement('p');
            resultText.classList.add('fade-in');
            resultText.textContent = "It's a draw";
            swapMarkerBtn.style.display = "none";
            document.querySelector('#flex-row').appendChild(resultText);
            gameBoard.cells.forEach(element => element.classList.add('blink-border'));
        }
    }

    return {
        cells, gridCells, swapMarkerBtn, addMarker, resetBoard, updateBoard, winCheck
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
    const p1Name = document.querySelector('#p1div');
    const p2Name = document.querySelector('#p2div');
    const p1NameInput = document.querySelector('#p1');
    const p2NameInput = document.querySelector('#p2');
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
    const toggleFocus = function(e) {
        this.children[1].focus();
    }
    return {
        player1, player2, p1Name, p2Name, p1NameInput, p2NameInput, swapMarkers, toggleFocus
    }
})();

function onPageLoad() {
    gameBoard.swapMarkerBtn.addEventListener('click', players.swapMarkers);
    document.querySelector('#game-board').addEventListener('click', gameBoard.addMarker);
    document.querySelector('#start-reset').addEventListener('click', game.startOrReset);
    document.querySelector('#start-reset').addEventListener('animationend', () => document.querySelector('#start-reset').classList.toggle('blink-bg'));
    game.playerTurn = players.player1;
    players.p1Name.addEventListener('click', players.toggleFocus);
    players.p2Name.addEventListener('click', players.toggleFocus);
    players.p1NameInput.addEventListener('input', () => players.player1.name = players.p1NameInput.value);
    players.p2NameInput.addEventListener('input', () => players.player2.name = players.p2NameInput.value);
    players.p1NameInput.addEventListener('keydown', e => {
        if (e.key === "Enter") {
            players.p1NameInput.blur();
        }
    });
    players.p2NameInput.addEventListener('keydown', e => {
        if (e.key === "Enter") {
            players.p2NameInput.blur();
        }
    });
}

onPageLoad();