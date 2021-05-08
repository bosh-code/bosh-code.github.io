document.addEventListener('DOMContentLoaded', startGame)
const TEST_MODE = false

// Disable Selection
$(document).ready(function () {
  $('.notSelectable').disableSelection()
})

$.fn.extend({
  disableSelection: function () {
    this.each(function () {
      $(this).css('-moz-user-select', 'none')
      $(this).css('-webkit-user-select', 'none')
    })
  }
})

// Global vars
let wonState = false
let boardSize = 3
let board = {
  cells: []
}
let mineCount = 0

let startTime
let endTime
let seconds

// These apply a handicap by removing the corresponding number of mines
const difficultyValues = {
  1: 6,
  2: 5,
  3: 4
}

const difficultyLabels = {
  1: 'Easy',
  2: 'Medium',
  3: 'Hard'
}

const sizeValues = {
  1: 3,
  2: 4,
  3: 5
}

const sizeLabels = {
  1: 'Small',
  2: 'Medium',
  3: 'Large'
}

// Sliders
let diffSlider = document.getElementById('diff-slider')
let diffOutput = document.getElementById('diff-label')
let sizeSlider = document.getElementById('size-slider')
let sizeOutput = document.getElementById('size-label')
diffOutput.innerHTML = difficultyLabels[diffSlider.value]
sizeOutput.innerHTML = sizeLabels[sizeSlider.value]

// Update slider
diffSlider.oninput = function () {
  diffOutput.innerHTML = difficultyLabels[this.value]
  resetGame()
}

sizeSlider.oninput = function () {
  sizeOutput.innerHTML = sizeLabels[this.value]
  boardSize = sizeValues[this.value]
  console.log('board size: ' + boardSize)
  resetGame()
}

function createBoard () {
  const difficulty = (boardSize / difficultyValues[diffSlider.value]) * (diffSlider.value) + boardSize - (1.5)
  console.log('Difficulty' + difficulty)
  console.log('BoardSize' + boardSize)
  for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMarked: false,
        isMine: false,
        hidden: true
      })
    }
  }
  if (TEST_MODE) {addMinesOverride(difficulty)} else {addMines(difficulty)}
}

/*
Makes cell 0 a mine for testing win logic
TODO: Remove me
 */
function addMinesOverride () {
  board.cells[0].isMine = true
  mineCount = 1
}

function addMines (difficulty) {
  for (let i = 0; i < difficulty; i++) {
    let randomCell = Math.floor(Math.random() * Math.pow(boardSize, 2))
    board.cells[randomCell].isMine = true
    ++mineCount
  }
}

function startGame () {
  $('.notSelectable').disableSelection()
  createBoard()
  board.cells.forEach(c => {
    c['surroundingMines'] = countSurroundingMines(c)
  })

  manageListeners(true)
  lib.initBoard()

  startTimer()
}

// Used to kill or add back the listeners on game end
function manageListeners (state) {
  if (state) {
    document.addEventListener('click', checkForWin)
    document.addEventListener('contextmenu', checkForWin)
    document.addEventListener('long-press', checkForWin)
  } else {
    document.removeEventListener('click', checkForWin)
    document.removeEventListener('contextmenu', checkForWin)
    document.removeEventListener('long-press', checkForWin)
  }
}

function checkForWin () {
  if (!wonState) {
    for (let c of board.cells) {
      if (c.isMine && !c.isMarked) {
        return false
      } else if (!c.isMine && c.hidden) {
        return false
      }
    }
    endGame(true, 'You win!')
  }
}

function countSurroundingMines (cell) {
  let surrounding = getSurroundingCells(cell.row, cell.col)
  let mineCount = 0
  surrounding.forEach(c => {
    if (c.isMine) {
      ++mineCount
    }
  })
  return mineCount
}

function endGame (win, message) {
  endTimer()
  manageListeners(false)
  wonState = win
  updateModalColours()
  updateModalTitleText(message)
  updateModalBody()
  $('#modal').modal('show')
}

function resetGame () {
  board.cells = []
  wonState = false
  mineCount = 0
  seconds = 0 // sanity check
  document.getElementById('board').innerHTML = ''
  document.getElementById('time').innerHTML = 'You took '
  document.getElementById('mines').innerHTML = 'There was '
  manageListeners(true)
  startGame()
}

function startTimer () {
  startTime = new Date()
}

function endTimer () {
  endTime = new Date()
  let timeDiff = endTime - startTime // ms
  timeDiff /= 1000
  seconds = Math.round(timeDiff)
}

function updateModalTitleText (titleText) {
  let element = document.getElementById('modal-title')
  element.innerHTML = titleText
}

function updateModalBody () {
  if (seconds === 1) {
    updateModalElementText('time', seconds, ' second.')
  } else {
    updateModalElementText('time', seconds, ' seconds.')
  }

  if (mineCount === 1) {
    updateModalElementText('mines', mineCount, ' mine.')
  } else {
    updateModalElementText('mines', mineCount, ' mines.')
  }
}

function updateModalColours () {
  let background = document.getElementById('modal-header')
  if (wonState === true) {
    background.classList.remove('bg-danger')
    background.classList.add('bg-success')
  } else {
    background.classList.remove('bg-success')
    background.classList.add('bg-danger')
  }
}

function updateModalElementText (id, value, appendText) {
  let element = document.getElementById(id) // get the paragraph
  let text = document.createTextNode(value + appendText) // get the text to append to the paragraph
  element.appendChild(text) // append text
}
