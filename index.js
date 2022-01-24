// global variables
const playerO = 'O'
const playerX = 'X'
let turn = 1
let gameActive = true
const oMoves = []
const xMoves = []
let winner = ''
const winCombos = [
  [0, 1, 2], // winning rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6], // winning columns
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], //winning diagonals
  [2, 4, 6]
]

// handles game activen and click events
function handleClick(event) {
  if (gameActive === true) {
    if (turn === 1 && event.target.innerText === '') {
      event.target.innerText = 'X'
      xMoves.push(event.target.id)
      turn = 2
      console.log(xMoves)
      handleResult()
    } else if (turn === 2 && event.target.innerText === '') {
      event.target.innerText = 'O'
      oMoves.push(event.target.id)
      console.log(oMoves)
      turn = 1
      handleResult()
    }
  }
}

// handles checking result and ending game
function handleResult() {
  winCombos.forEach((combo) => {
    let zero = combo[0].toString()
    let one = combo[1].toString()
    let two = combo[2].toString()
    if (
      document.getElementById(zero).innerHTML === 'O' &&
      document.getElementById(one).innerHTML === 'O' &&
      document.getElementById(two).innerHTML === 'O'
    ) {
      winner = 'O'
      gameActive = false
      console.log('winner:', winner)
    } else if (
      document.getElementById(zero).innerHTML === 'X' &&
      document.getElementById(one).innerHTML === 'X' &&
      document.getElementById(two).innerHTML === 'X'
    ) {
      winner = 'X'
      gameActive = false
      console.log('winner:', winner)
    }
  })
}

// event listener
document.querySelectorAll('.cell').forEach(function (cell) {
  cell.addEventListener('click', handleClick)
})

handleResult()
