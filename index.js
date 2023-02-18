// global variables
const playerO = 'O'
const playerX = 'X'
let turn = 1
let gameActive = false
let easyMode = false
let oMoves = []
let xMoves = []
let cpu = false
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

// handles game active and click events
function handleClick(event) {

  console.log("clicked")

  if (cpu === false) {
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
  } else {
    if (easyMode){
      if (gameActive === true){
        if (turn === 1 && event.target.innerText === ''){
          event.target.innerText = 'X'
          xMoves.push(event.target.id)
          turn = 2
          console.log(xMoves)
          handleResult()

          if(gameActive === true){
            handleClick()
          }
        }else {
          let cpuChoice = Math.floor(Math.random() * 9);

          while (document.getElementById(cpuChoice.toString()).innerText !== ''){
            cpuChoice = Math.floor(Math.random() * 9)
          }
          setTimeout(() => {
            document.getElementById(cpuChoice.toString()).innerText = 'O'
            oMoves.push(cpuChoice.toString)
            turn = 1
            console.log("CPU Choice", oMoves)
            handleResult()
          }, 1000)
        }
      }
    }else {
      if (gameActive === true){
        if (turn === 1){
          for (let i = 0; i < winCombos.length; i++){
            let zero = winCombos[i][0].toString()
            let one = winCombos[i][1].toString()
            let two = winCombos[i][2].toString()
            let cpuChoice;
            let runCPULogicResponse = runCPULogic(zero, one, two)
            console.log(runCPULogicResponse)
          
            if (runCPULogicResponse.shouldRun){
              if (zero === runCPULogicResponse.currentO){
                if (document.getElementById(one).innerText === ""){
                  document.getElementById(one).innerText = "O"
                  cpuChoice = one
                }else {
                  document.getElementById(two).innerText = "O"
                  cpuChoice = two
                }
              }else if (one === runCPULogicResponse.currentO){
                if (document.getElementById(zero).innerText === ""){
                  document.getElementById(zero).innerText = "O"
                  cpuChoice = zero
                }else {
                  document.getElementById(two).innerText = "O"
                  cpuChoice = two
                }
              }else{
                if (document.getElementById(zero).innerText === ""){
                  document.getElementById(zero).innerText = "O"
                  cpuChoice = zero
                }else {
                  document.getElementById(one).innerText = "O"
                  cpuChoice = one
                }
              }
              oMoves.push(cpuChoice)
              turn = 2
              console.log("CPU Choice", oMoves)
              handleResult()
              return;
            }
          }

          let cpuChoice = Math.floor(Math.random() * 9);

          while (document.getElementById(cpuChoice.toString()).innerText !== ''){
            cpuChoice = Math.floor(Math.random() * 9)
          }
          document.getElementById(cpuChoice.toString()).innerText = 'O'
          oMoves.push(cpuChoice.toString)
          turn = 2
          console.log("CPU Choice", oMoves)
          handleResult()

        }else {
          if (turn === 2 && event.target.innerText === ''){
            event.target.innerText = 'X'
            xMoves.push(event.target.id)
            turn = 1
            console.log(xMoves)
            handleResult()

            if(gameActive === true){
              handleClick()
            }
          }
        }
      }
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

  if((xMoves.length === 5 || oMoves.length === 5) && winner === ""){
    winner = "Tie"
    gameActive = false
    console.log('winner:', winner)
    return;
  }
}

let runCPULogic = (zero, one, two) => {

  let response = {
    shouldRun: false,
    currentO: ""
  }

  if (
      document.getElementById(zero).innerText === "O" &&
      (document.getElementById(one).innerText === "" || document.getElementById(one).innerText === "O") &&
      (document.getElementById(two).innerText === "" || document.getElementById(two).innerText === "O")
    )
    {
      response.shouldRun = true
      response.currentO = zero

    }else if (
      document.getElementById(one).innerText === "O" && 
      (document.getElementById(zero).innerText === "" || document.getElementById(zero).innerText === "O") &&
      (document.getElementById(two).innerText === "" || document.getElementById(two).innerText === "O")
    ){
      response.shouldRun = true
      response.currentO = one
    }else if (
      document.getElementById(two).innerText === "O" && 
      (document.getElementById(zero).innerText === "" || document.getElementById(zero).innerText === "O") &&
      (document.getElementById(one).innerText === "" || document.getElementById(one).innerText === "O")
    ){
      response.shouldRun = true
      response.currentO = two
    }

    return response

}

let toggleDifficultytoHard = () => {
  easyMode = false
  resetGame()
  cpu = true
  console.log(easyMode)
}

let toggleDifficultytoEasy = () => {
  easyMode = true
  resetGame()
  cpu = true
  console.log(easyMode)
}

let resetGame = () => {
  document.querySelectorAll('.cell').forEach((cell) => {
    cell.innerHTML = ''
  })

  turn = 1
  gameActive = false
  oMoves = []
  xMoves = []
  cpu = false
  winner = ''
}

let startGame = () => {
  gameActive = true
  if (!easyMode && cpu){
    handleClick()
  }
}

let set1Player = () => {
  cpu = false
  resetGame()
}

let set2Player = () => {
  resetGame()
  cpu = true
}


// event listener
document.querySelectorAll('.cell').forEach(function (cell) {
  cell.addEventListener('click', handleClick)
})

document.getElementById('easy-button').addEventListener('click', toggleDifficultytoEasy)
document.getElementById('hard-button').addEventListener('click', toggleDifficultytoHard)
document.getElementById('start-button').addEventListener('click', startGame)
document.getElementById('1player-button').addEventListener('click', set1Player)
document.getElementById('2player-button').addEventListener('click', set2Player)

