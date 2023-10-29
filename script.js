const tiles = document.querySelectorAll(".tile");
const arrTiles = Array(tiles.length);
arrTiles.fill(null);
const strike = document.getElementById("strike");
const playerMove = new Audio("sounds/click.wav");
const gameOverSound = new Audio("sounds/game_over.wav");

const playerX = "X";
const playerO = "O";
let turn = playerX;

function setHover() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });

  const hoverClasss = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText === "") {
      tile.classList.add(hoverClasss);
    }
  });
}

setHover();

tiles.forEach((tile) => {
  tile.addEventListener("click", tileClick);
});

function tileClick(event) {
  if (gameArea1.classList.contains("visible")) {
    return;
  }

  const tile = event.target;
  const tileNumber = tile.dataset.index;

  if (tile.innerText != "") {
    return;
  }

  if (turn === playerX) {
    tile.innerText = playerX;
    turn = playerO;
    arrTiles[tileNumber - 1] = playerX;
  } else {
    tile.innerText = playerO;
    turn = playerX;
    arrTiles[tileNumber - 1] = playerO;
  }
  strikeFn();
  setHover();
  playerMove.play();
}

function strikeFn() {
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;

    tileValue1 = arrTiles[combo[0] - 1]; //x
    tileValue2 = arrTiles[combo[1] - 1];
    tileValue3 = arrTiles[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue1 === tileValue3
    ) {
      strike.classList.add(strikeClass);
      gameOver(tileValue1);
      return;
    }
  }

  const allFilled = arrTiles.every((tile) => tile !== null);
  if (allFilled) {
    gameOver(null);
  }
}

const gameArea1 = document.querySelector(".gameArea");
const gameOverText = document.querySelector(".h1GameOverText");

function gameOver(winnerText) {
  if (winnerText === null) {
    let text = "Draw";
    gameArea1.classList = "visible gameArea";
    gameOverText.innerText = text;
  }

  if (winnerText !== null) {
    gameArea1.classList = "visible gameArea";
    gameOverText.innerText = `Winner is ${winnerText}`;
  }

  gameOverSound.play();
}

const playAgain = document.querySelector(".playAgain");
playAgain.addEventListener("click", startAgain);

function startAgain() {
  tiles.forEach((tile) => {
    tile.innerText = "";
  });

  arrTiles.fill(null);
  turn = playerX;
  gameArea1.className = "hidden gameArea";
  strike.className = "strike";
}

const winningCombinations = [
  //rows
  { combo: [1, 2, 3], strikeClass: "strike-row-1" },
  { combo: [4, 5, 6], strikeClass: "strike-row-2" },
  { combo: [7, 8, 9], strikeClass: "strike-row-3" },
  //columns
  { combo: [1, 4, 7], strikeClass: "strike-column-1" },
  { combo: [2, 5, 8], strikeClass: "strike-column-2" },
  { combo: [3, 6, 9], strikeClass: "strike-column-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "strike-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "strike-diagonal-2" },
];
