const Rounds = 7;
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

function prepareGame(){
  Colors.forEach((move) => {
    var block = document.createElement('div')
    block.classList.add(`box-control`)
    block.classList.add(`box`)
    block.classList.add(`${move}`)
    block.classList.add(`off`)
    block.addEventListener('click', userDoes)
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
  e.target.classList.remove('off')
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
        //Refactor this to just update the value
        var text = document.createTextNode(same);
        container.appendChild(text)
      };
      count++
    })
    if (same === UserMoves.length){
     return true
    }
  }
}

function playRound(){
    currentRound++
    var currentPlayer = 'User';
    var moves = UserMoves
    var move = userMove;

    var tempWin = checkSequence();

    if (!tempWin) {
      console.log('Computer says: no - empty bucket');
      UserMoves = [];
    }

    winner = tempWin && UserMoves.length === SimonMoves.length;

    if (winner || currentRound === 1)  {
      currentPlayer = 'Simon';
      move = simonDoes();
      moves = SimonMoves;
      setTimeout(playMoves, 1000);
      UserMoves = []
      console.log('Computer says:' + moves[0].className );
    }
}

function offButton(element) {
  element.classList.add('off')
}

function onButton(element){
  element.classList.remove('off')
  setTimeout(function() {
     offButton(element)
   }, 1000);
}


//Refactor delay
function playMoves(){
  if (SimonMoves.length > 0) {
    SimonMoves.forEach((move, index) => {
      setTimeout(function(){
        onButton(move.element)
      }, 1000 * index);
    });
  }
}

prepareGame()
