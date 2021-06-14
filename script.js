const game = (function() {
    let playerTurn;
    let vsPlayer = true;
    let gameStarted = false;
    let winner = null;
    let isDraw = false;
    let timeoutOn = false;

    const changeMode = function(e) {
        if (game.gameStarted === true) {
            return;
        }
        if (this.children[0].textContent === "Player") {
            game.vsPlayer = false;
            this.children[0].textContent = "Computer";
        } else {
            game.vsPlayer = true;
            this.children[0].textContent = "Player";
        }
    }

    const startOrReset = function(e) {
        if (this.children[0].textContent === "Start") {
            document.querySelector('#game-board').classList.toggle('game-board-started');
            gameBoard.cells[5].classList.toggle('mode-selector');
            game.gameStarted = true;
            document.querySelector('#vs').style.display = "none";
            document.querySelectorAll('.mode-text').forEach(element => element.style.display = "none");
            this.children[0].textContent = "Reset";
            gameBoard.swapMarkerBtn.addEventListener('animationend', () => {
                if (game.gameStarted === true) {
                    gameBoard.swapMarkerBtn.style.visibility = "hidden"
                }
            });
            gameBoard.swapMarkerBtn.classList.add('fade-out');
        } else {
            document.querySelector('#game-board').classList.toggle('game-board-started');
            gameBoard.cells[5].classList.toggle('mode-selector');
            gameBoard.swapMarkerBtn.classList.remove('fade-out');
            gameBoard.resetBoard(this);
            document.querySelectorAll('p.mode-text').forEach(element => element.style.display = "initial");
            document.querySelector('#vs').style.display = "initial";
        }
    }

    return {
        playerTurn, gameStarted, changeMode, startOrReset, winner, isDraw, timeoutOn
    }    
})();

const gameBoard = (function() {
    const cells = document.querySelectorAll('div#game-board div');
    let gridCells = ['', '', '', '', '', '', '', '', ''];
    const swapMarkerBtn = document.querySelector('#icon-swap')
    const updateBoard = function() {
        cells.forEach(element => {
            if (element.children[1]) {
                element.children[1].textContent = gameBoard.gridCells[element.getAttribute('data-cell')];
                if (element.children[1].textContent) {
                    let marker = element.children[1].textContent;
                element.children[1].classList.add(`${marker}-marker`);
                }
            }
            if (!element.children[1]) {
                element.children[0].textContent = gameBoard.gridCells[element.getAttribute('data-cell')];
                if (element.children[0].textContent) {
                    let marker = element.children[0].textContent;
                    element.children[0].classList.add(`${marker}-marker`);
                }
            }
    })
    winCheck();
    }

    const computerMove = function() {
        let availableCells = [];
        
        for (let i = 0; i < 9; i++) {
            if (!gameBoard.gridCells[i]) {
                availableCells.push(i);
            } else {
                availableCells.push(false);
            }
        }
        availableCells = availableCells.filter(element => element !== false);
        gameBoard.gridCells[[availableCells[Math.floor(Math.random() * availableCells.length)]]] = players.player2.marker;
        updateBoard();
        game.timeoutOn = false;
    }
    
    const addMarker = function(e) {
        if (game.gameStarted === false) {
            document.querySelector('#start-reset').classList.toggle('blink-bg');
        }  
        if (game.gameStarted === true && !game.winner && !game.isDraw && Array.from(e.target.children).every(element => element.textContent !== "X"
        && element.textContent !== "O" && game.timeoutOn === false)) {
            gameBoard.gridCells[e.target.getAttribute('data-cell')] = game.playerTurn.marker;
            updateBoard();
            if (game.vsPlayer === false && gameBoard.gridCells.some(element => element === "") && !game.winner) {
                game.playerTurn = players.player2;
                game.timeoutOn = true;
                setTimeout(computerMove, 500);
            }
        (game.playerTurn === players.player1) ? game.playerTurn = players.player2 : game.playerTurn = players.player1;
        }
    }

    const resetBoard = function(e) {
        gameBoard.gridCells = ['', '', '', '', '', '', '', '', ''];
        game.gameStarted = false;
        game.isDraw = false;
        if (document.querySelector('p.fade-in')) {
            document.querySelector('p.fade-in').style.visibility = "hidden";
            document.querySelector('p.fade-in').remove();
        }
        if (game.winner) {
            game.winner.cells.forEach(element => element.children[0].classList.remove(`blink-${game.winner.marker}`));
            game.winner.cells.forEach(element => {
                (element.children[1]) ? element.children[1].classList.remove(`blink-${game.winner.marker}`) :
                element.children[0].classList.remove(`blink-${game.winner.marker}`)
            });
            game.winner = null;
        }

        swapMarkerBtn.style.display = "initial";
        swapMarkerBtn.style.visibility = "visible";
        gameBoard.cells.forEach(element => element.classList.remove('blink-border'));
        
        cells.forEach(element => {
            if (element.children[0].textContent === "X" || element.children[0].textContent === "O") {
                let marker = element.children[0].textContent;
                element.children[0].classList.remove(`${marker}-marker`);
            } else if (element.children[1] && element.children[1].textContent) {
                let marker = element.children[1].textContent;
                element.children[1].classList.remove(`${marker}-marker`);
            }
        })

        updateBoard();
        e.children[0].textContent = "Start";
        game.playerTurn = players.player1;
    }

    const arrayChecker = (obj) => {
        const marker = obj.array[0];
        if (marker === "") return false;
        if (obj.array.every(element => element === marker)) {
            game.winner = (marker === players.player1.marker) ? players.player1 : players.player2;
            game.winner.cells = [cells[obj.cells[0]], cells[obj.cells[1]], cells[obj.cells[2]]];
            return true;
    }    
    }

    const winCheck = function() {
            const topRow = {
                array: gameBoard.gridCells.slice(0, 3),
                cells: [0, 1, 2]
            };
            const midRow = {
                array: gameBoard.gridCells.slice(3, 6),
                cells: [3, 4, 5]
            };
            const botRow = {
                array: gameBoard.gridCells.slice(6),
                cells: [6,7,8]
            };
            const leftCol = {
                array: [gameBoard.gridCells[0], gameBoard.gridCells[3], gameBoard.gridCells[6]],
                cells: [0, 3, 6]
            };
            const midCol = {
                array: [gameBoard.gridCells[1], gameBoard.gridCells[4], gameBoard.gridCells[7]],
                cells: [1, 4, 7]
            };
            const rightCol = {
                array: [gameBoard.gridCells[2], gameBoard.gridCells[5], gameBoard.gridCells[8]],
                cells: [2, 5, 8]
            };
            const firstDiag = {
                array: [gameBoard.gridCells[0], gameBoard.gridCells[4], gameBoard.gridCells[8]],
                cells: [0, 4, 8]
            };
            const secDiag = {
                array: [gameBoard.gridCells[2], gameBoard.gridCells[4], gameBoard.gridCells[6]],
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
            game.winner.cells.forEach(element => {
                (element.children[1]) ? element.children[1].classList.add(`blink-${game.winner.marker}`) :
                element.children[0].classList.add(`blink-${game.winner.marker}`);
            });

            const resultText = document.createElement('p');
            resultText.classList.add('fade-in');
            resultText.textContent = `${game.winner.name} is the winner`;
            swapMarkerBtn.style.display = "none";
            document.querySelector('#flex-row').appendChild(resultText);
        } else if (gameBoard.gridCells.every(element => element.length > 0)) {
            const resultText = document.createElement('p');
            resultText.classList.add('fade-in');
            resultText.textContent = "It's a draw";
            swapMarkerBtn.style.display = "none";
            document.querySelector('#flex-row').appendChild(resultText);
            gameBoard.cells.forEach(element => element.classList.add('blink-border'));
            game.isDraw = true;
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
    gameBoard.cells[5].addEventListener('click', game.changeMode);
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