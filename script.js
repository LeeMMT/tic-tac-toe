let player1;
let player2;

const gameFlow = (function() {
    
})();

const gameBoard = (function() {
    let gridCells = ['O', '', '', '', 'X', '', '', '', ''];
    const updateBoard = function() {
        gridCells.forEach(element => {
        document.querySelector(`div[data-cell="${gridCells.indexOf(element)}"]`).textContent = element;
    })
    }
    return {
        updateBoard
    };
})();

const player = function(name, marker) {
    return {name, marker}
}