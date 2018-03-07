const Rounds = 3;
const Colors = ['yellow', 'red', 'blue', 'green', 'pink', 'black'];
const MovesPoll = [];
const blocks = [];

let currentRound = 0;
let simonMove;
let AlbertMoves = [];
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
        // sound:,
        // keyElem:,
      }
    )

  })

  container.append(...blocks)
  playRound();
}

function userDoes(e) {
  if (UserMoves.length === Rounds && AlbertMoves.length === Rounds) {
    renderText(
`    _██_\n</br>
 ‹(•¿•)›\n</br>
 ..(█)\n</br>
 .../ I`, 1000, 'NotAlbert')
    return
  }
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
  AlbertMoves.push(simonMove);
  return simonMove.className;
}

//Refactor this - avoid to go through all of them
//or find a way to stop it immediatly when wrong
function checkSequence(){
  if (UserMoves.length > 0) {
    let count = 0;
    let same = 0;

    UserMoves.forEach(move  => {
      if (move.className === AlbertMoves[count].className){
        same++
        renderText(`Computer says: ${same} correct`, 5000)
      };
      count++
    })
    if (same === Rounds) {
      renderText('Computer says: yes', 5000, 'Albert')
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
      renderText('Computer says: no', 1000, 'NotAlbert')
      UserMoves = [];
    }

    winner = tempWin && UserMoves.length === AlbertMoves.length;

    if (firstRound || tempWin === 'tempWin' && UserMoves.length <= Rounds ){
      if (firstRound || winner)  {
        currentPlayer = 'Albert';
        move = simonDoes();
        moves = AlbertMoves;
        UserMoves = [];
        setTimeout( function() {
          playMoves(AlbertMoves, 1000)
        }, 1000);

      }
    }

    if (tempWin === 'win'){ //Winner
      playWin();
      renderRestartBtn();
      currentPlayer = 'User'
      return
    }
}

function renderRestartBtn(){
  var restart = document.createElement('button')
  restart.classList.add(`restart`)
  restart.textContent = '° ͜ʖ ° '
  restart.addEventListener('click', restartGame, true)
  container.append(restart)
}

function playWin(){
  //flash buttons
  for (var i = 0; i <= Rounds; i++) {
    setTimeout(function() {
      playMoves(MovesPoll, 200)
    }, 1200 * i)
  }
}

function renderText(string, duration = 500, currentPlayer = 'Albert') {
  text.innerHTML = string
  if (currentPlayer !== 'Albert') {
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
  disableUI()
  if (moves.length > 0) {
    moves.forEach((move, index) => {
      setTimeout(function(){
        renderText(`Computer says: ${move.className}`);
        onButton(move.element);
      }, duration * index);
    });
  }
  // activateUI()
}

function cheat(){
  document.addEventListener('keydown', (event) => {
  const keyName = event.key;
    if (keyName === 'Alt') {
      return;
    }

    if (event.altKey && keyName === 'Dead') {
      playWin();
    }
  });
}

function restartGame(){
  currentRound = 0;
  AlbertMoves = [];
  UserMoves = [];
  playRound();
}

prepareGame()
cheat()
