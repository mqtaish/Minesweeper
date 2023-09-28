const rows = 8;
const cols = 8;
const board = [];
const minesNumber = 5;
const minesSpot = [];
let IsFlagEnabled = false;
let gameOver = false;
let squareClicked = 0;
let checkedSquares = new Set()

window.onload = function () {
    PlayGame();
}

function PlayGame() {
    document.getElementById('flag-btn').addEventListener("click", setFlag)
    document.getElementById('mines-count').innerText = minesNumber;
    setMines();
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            let square = document.createElement('div');
            square.id = i.toString() + '-' + j.toString();
            document.getElementById("board").append(square);
            row.push(square);
            square.addEventListener('click', clickSquare);
        }
        board.push(row);
    }

}

function setMines() {

    let minesLeft = minesNumber;

    while (minesLeft > 0) {
        let r = Math.floor(Math.random() * rows);
        let c = Math.floor(Math.random() * cols);
        let id = r.toString() + "-" + c.toString();

        if (!minesSpot.includes(id)) {
            minesSpot.push(id);
            minesLeft -= 1;
        }
    }
}

function setFlag() {
    if (IsFlagEnabled) {
        IsFlagEnabled = false;
        document.getElementById("flag-btn").style.backgroundColor = "skyblue";
    } else {
        IsFlagEnabled = true;
        document.getElementById("flag-btn").style.backgroundColor = "black";
    }

}

function clickSquare() {

    if (gameOver || this.classList.contains("square-clicked")) {
        return;
    }

    let square = this;

    if (IsFlagEnabled) {
        square.innerText = (square.innerText === '') ? '🚩' : '';
        return;
    }


    if (minesSpot.includes(square.id)) {
        alert("Game is Over");
        gameOver = true;
        revealedMines();
        // this.innerText = '💣';        
        return;
    }

    let coordinates = square.id.split("-");
    let row = parseInt(coordinates[0]);
    let col = parseInt(coordinates[1]);
    checkMines(row, col);
}


function revealedMines() {
  
    for (let i  = 0 ; i < minesSpot.length ;  i++){
        let c = minesSpot[i].split('-');
        let row = parseInt(c[0]);
        let col = parseInt(c[1]);
        console.log(row);
        console.log(col);
        console.log(board[row][col]);
        board[row][col].innerText = '💣';
    }
    
}


function checkSquares(r, c) {
    if (r < 0 || c >= cols || r >= rows || c < 0)
        return 0;

    if (minesSpot.includes(r.toString() + "-" + c.toString()))
        return 1;

    return 0;
}


function checkMines(r, c) {

    let numMinesFound = 0;



    if (r < 0 || r >= rows || c < 0 || c >= cols) {
        return 0;
    }

    if (checkedSquares.has(board[r][c])) {
        return;
    } else {
        checkedSquares.add(board[r][c])
    }

    board[r][c].classList.add("square-clicked");
    squareClicked++;

    numMinesFound += checkSquares(r - 1, c - 1);
    numMinesFound += checkSquares(r - 1, c);
    numMinesFound += checkSquares(r - 1, c + 1);
    numMinesFound += checkSquares(r, c + 1);
    numMinesFound += checkSquares(r, c - 1);
    numMinesFound += checkSquares(r + 1, c - 1);
    numMinesFound += checkSquares(r + 1, c);
    numMinesFound += checkSquares(r + 1, c + 1);

    if (numMinesFound > 0) {
        board[r][c].innerText = numMinesFound;
        board[r][c].classList.add("n" + numMinesFound.toString());
    }
    else {
        board[r][c].innerText = "";
        checkMines(r - 1, c - 1);
        checkMines(r - 1, c);
        checkMines(r - 1, c + 1);
        checkMines(r, c - 1);
        checkMines(r, c + 1);
        checkMines(r + 1, c - 1);
        checkMines(r + 1, c);
        checkMines(r + 1, c + 1);
    }

    if (squareClicked === rows * cols - minesNumber) {
        gameOver = true;
        alert('YOU WIN!');
        return;
    }

}



