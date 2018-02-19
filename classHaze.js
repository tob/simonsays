const Rounds = 2;
const Colors = ['yellow', 'red', 'blue', 'green', 'pink', 'black'];
const MovesPoll = [];
const blocks = [];

let currentRound = 0;
let simonMove;
let SimonMoves = [];
let userMove;
let UserMoves = [];
let userRounds;
let winner;

var container = document.querySelector('#MovesPoll');
var text = document.querySelector('#colors')

function prepareGame(){
  Colors.forEach((move) => {
    var block = document.createElement('div')
    block.classList.add(`box-control`)
    block.classList.add(`box`)
    block.classList.add(`${move}`)
    block.classList.add(`off`)
    block.addEventListener('click', userDoes, true)
    blocks.push(block)

    MovesPoll.push(
      {
        className: move,
        element: block,
      }
    )

  })

  container.append(...blocks)
  playRound();
}

function userDoes(e) {
  onButton(e.target);
  userMove = this.className.slice(16);

  UserMoves.push(
    {
      className: userMove,
      element: e.target,
    }
  );
  playRound()
  return userMove
}

function simonDoes() {
  let move = Math.floor(Math.random() * MovesPoll.length)
  simonMove = MovesPoll[move];
  SimonMoves.push(simonMove);
  return simonMove.className;
}

//Refactor this - avoid to go through all of them
function checkSequence(){
  if (UserMoves.length > 0) {
    let count = 0;
    let same = 0;

    UserMoves.forEach(move  => {
      if (move.className === SimonMoves[count].className){
        same++
        renderText(`Computer says: ${same} correct`, 5000)
      };
      count++
    })
    if (same === Rounds) {
      renderText('Computer says: yes', 5000, 'Simon')
      return 'win'
    }
    if (same === UserMoves.length){
     return 'tempWin'
    }
    return 'wrong'
  }
}

function playRound(){
    currentRound++
    var currentPlayer = 'User';
    var moves = UserMoves
    var move = userMove;
    var firstRound = currentRound === 1
    var tempWin = checkSequence();

    if (tempWin === 'wrong' && currentPlayer === 'User') {
      renderText('Computer says: no', 1000, 'NotSimon')
      UserMoves = [];
    }

    winner = tempWin && UserMoves.length === SimonMoves.length;

    if (firstRound || tempWin === 'tempWin' && UserMoves.length <= Rounds ){
      if (firstRound || winner)  {
        currentPlayer = 'Simon';
        move = simonDoes();
        moves = SimonMoves;
        UserMoves = [];
        setTimeout( function() {
          playMoves(SimonMoves, 1000)
        }, 1000);

      }
    }

    if (tempWin === 'win'){ //Winner
      //flash buttons
      for (var i = 0; i < 10; i++) {
        setTimeout(function() {
          playMoves(MovesPoll, 200)
        }, 1200 * i)
      }

      //restart game
      var restart = document.createElement('button')
      var winText = renderText('Restart', 1000, 'NotSimon')
      restart.classList.add(`restart`)
      restart.textContent = 'Restart'
      restart.addEventListener('click', restart, true)
      container.append(restart)

      currentPlayer = 'User'
      return
    }
}

function renderText(string, duration = 500, currentPlayer = 'Simon') {
  text.innerHTML = string
  if (currentPlayer !== 'Simon') {
    setTimeout(function(){
      text.innerHTML = '';
    }, duration)
  }
}

function offButton(element) {
  element.classList.add('off')
}

function onButton(element){
  element.classList.remove('off')
  setTimeout(function() {
     offButton(element)
   }, 500);
}

function disableUI(){
  MovesPoll.forEach((move) => {
    move.element.removeEventListener('click', userDoes, false)
  })
}

function activateUI(){
  MovesPoll.forEach((move) => {
    move.element.addEventListener('click', userDoes)
  })
}

//Refactor delay ?
function playMoves(moves, duration){
  // disableUI()
  if (moves.length > 0) {
    moves.forEach((move, index) => {
      setTimeout(function(){
        renderText(`Computer says: ${move.className}`)
        onButton(move.element)
      }, duration * index);
    });
  }
  // activateUI()
}

function restart(){
  currentRound = 0;
  SimonMoves = [];
  UserMoves = [];
  debugger
  playRound();
}

prepareGame()
