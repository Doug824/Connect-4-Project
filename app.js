const HEIGHT = 6;
const WIDTH = 7;
const resetbtn = document.getElementById('reset');
const startbtn = document.getElementById('start');
let currPlayer = 1;
let board = [];
let player = document.getElementById('player');

function makeBoard() {
  for (let y = 0; y < HEIGHT; y++) {
    board.push(Array.from({ length: WIDTH }));
  }
};

function makeHtmlBoard() {
  const htmlBoard = document.querySelector('#board');
  const top = document.createElement("tr");  
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);
  
  for (let x = 0; x < WIDTH; x++) {
    const headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  for (let y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (let x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

function findSpotForCol(x) {
  for(let y = HEIGHT -1; y > -1; y--) {
    if(!board[y][x]) {
      return y;
    }
  }
}

function placeInTable(y, x) {
  const playerPiece = document.createElement('div');
  playerPiece.classList.add('piece');
  if(currPlayer === 1) {
    playerPiece.classList.add('p1');
  } else {
    playerPiece.classList.add('p2');
  }
  const position = document.getElementById(`${y}-${x}`);
  position.append(playerPiece);
}

/** endGame: announce game end */
function endGame(message){
  setTimeout(function(){
      if(confirm(message)){
        window.location.reload();
      }
    }, 100);
  
  let game = document.getElementById('game');
  game.classList.add('done');
    
}

function handleClick(e) {
  const x = e.target.id;
  currPlayer;
  if(currPlayer === 1) {
    player.textContent = `Player ${2}'s turn!`;
    player.style.color = 'rgb(42, 24, 199)';
  } else {
    player.textContent = `Player ${1}'s turn!`;
    player.style.color = 'rgb(207, 35, 35)';
  }
  const y = findSpotForCol(x);
  board[y][x] = currPlayer;
  placeInTable(y, x);
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won! Do you want to restart?`);
  } 
  if(board.every(cell => cell.every(row => row))){
    return endGame('The game is tied');
  }
    currPlayer = currPlayer === 1 ? 2 : 1;  
};

function checkForWin() {
  function _win(cells) {
    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }
  for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
      const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
        return true;
      }
    }
  }
};

startbtn.addEventListener('click', function start(){
    makeBoard();
    makeHtmlBoard();
    player.textContent = `Player ${1}'s turn!`;
    player.style.color = ' rgb(207, 35, 35)';
    startbtn.disabled = true;
});

resetbtn.addEventListener('click', function again(){
  window.location.reload();
});