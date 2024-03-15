document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  let scoreDisplay = document.querySelector("#score");
  let startBtn = document.getElementById("start-button");
  const width = 10;
  let timerId;
  let score = 0;
  const color = [
    "orange",
    "red",
    "purple",
    "yellow",
    "cyan",
    "lime",
    "blue",
    "white",
  ];

  const lTetromino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 2, width * 2 + 1],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];
  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width + 1, width, width * 2 + 1],
  ];
  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];
  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];
  const sTetromino = [
    [1, width, width + 1, width * 2],
    [width + 1, width, width * 2 + 2, width * 2 + 1],
    [1, width, width + 1, width * 2],
    [width + 1, width, width * 2 + 2, width * 2 + 1],
  ];
  const jTetromino = [
    [1, width + 1, width * 2 + 1, 0],
    [width, width + 1, width + 2, 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [1, 2, 3, width + 1],
  ];
  const uTetromino = [
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
    [1,1,1,1],
  ];
  const pTetromino = [
    [1, width + 1, width * 2 + 1, 1],
    [width, width + 1, width + 2, width ],
    [1, width + 1, width * 2 + 1,1 ],
    [width, width + 1, width + 2, width],
  ];
  const cTetromino = [
    [1, width, width + 1, width],
    [width + 1, width, width * 2 + 2, width * 2 + 1],
    [1, width, width + 1, width * 2],
    [width + 1, width, width * 2 + 2, width * 2 + 1],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
    sTetromino,
    jTetromino,
    uTetromino,
    pTetromino
  ];

  let currentPosition = 4;
  let currentRotation = 0;

  let random = Math.floor(Math.random() * theTetrominoes.length);
  let current = theTetrominoes[random][currentRotation];

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
      squares[currentPosition + index].style.backgroundColor = color[random];
    });
  }

  function undraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
      squares[currentPosition + index].style.backgroundColor = "";
    });
  }



  function control(e) {
    if (e.keyCode === 37 || e.keyCode === 65) {
      moveLeft();
    } else if (e.keyCode === 38) {
      rotate();
    } else if (e.keyCode === 39 || e.keyCode === 68) {
      moveRight();
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      moveDown();
    }
  }
  document.addEventListener("keyup", control);

  function moveDown() {
    if (
      !current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      undraw();
      currentPosition += width;
      draw();
    } else {
      freeze();
    }
  }

  function freeze() {
    console.log("hahah");

    current.forEach((index) =>
      squares[currentPosition + index].classList.add("taken")
    );
    random = nextRandom;
    nextRandom = Math.floor(Math.random() * theTetrominoes.length);
    current = theTetrominoes[random][currentRotation];
    currentPosition = 4;
    addScore();
    draw();
    displayShape();
    gameOver();
    
  
  }

  function moveLeft() {
    undraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!isAtLeftEdge) currentPosition -= 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition += 1;
    }
    draw();
  }

  function moveRight() {
    undraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === width - 1
    );

    if (!isAtRightEdge) currentPosition += 1;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition -= 1;
    }
    draw();
  }
  function rotate() {
    undraw();
    currentRotation++;
    if (currentRotation === current.length) {
      currentRotation = 0;
    }
    current = theTetrominoes[random][currentRotation];
    draw();
  }

  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  let displayIndex = 0;
  let nextRandom = 0;

  const upNextTerominoes = [
    [1, displayWidth + 1, displayWidth * 2 + 1, 2],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth * 2],
    [1, displayWidth + 1, displayWidth * 2 + 1, 0],
    [1,1,1,1],
    [1, displayWidth + 1, displayWidth * 2 + 1 ]
  ];

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
      square.style.backgroundColor = "";
    });
    upNextTerominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
      displaySquares[displayIndex + index].style.backgroundColor =
        color[nextRandom];
    });
  }

  let speed = 300;

  startBtn.addEventListener("click", () => {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      draw();
      timerId = setInterval(moveDown, speed);
      nextRandom = Math.floor(Math.random() * theTetrominoes.length);
      displayShape();
    }
  });

  function addScore() {
    for (let i = 0; i < 199; i += width) {
      const row = [
        i,
        i + 1,
        i + 1,
        i + 2,
        i + 3,
        i + 4,
        i + 5,
        i + 6,
        i + 7,
        i + 8,
        i + 9,
      ];

      if (row.every((index) => squares[index].classList.contains("taken"))) {
        score += 10;
        speed = speed - 50;
        scoreDisplay.style.color = "white";
        scoreDisplay.innerHTML = score;
        row.forEach((index) => {
          squares[index].classList.remove("taken");
          squares[index].classList.remove("tetromino");
          squares[index].style.backgroundColor = "";
        });
        const squaresRemoved = squares.splice(i, width);
        squares = squaresRemoved.concat(squares);
        squares.forEach((cell) => grid.appendChild(cell));
        console.log(squaresRemoved);
      }
    }
  }

  function gameOver() {
    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      scoreDisplay.innerHTML = "You Lose";
      scoreDisplay.style.color = "red";
      clearInterval(timerId);
      clear();
      undraw();
    }
  }

  function winGame() {
    if (score >= 100) {
      clearInterval(timerId);
      scoreDisplay.innerHTML = "You Won";
      scoreDisplay.style.color = "green";
      scoreDisplay.style.fontweight = "800";
      clear();
    }
  }

 

});
function restart(){
  location.reload()
}