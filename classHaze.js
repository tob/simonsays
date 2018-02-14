const Rounds = 7;
const MovesPoll = ['yellow', 'red', 'blue', 'green', 'pink', 'black'];
let UserMoves = [];
let SimonMoves = [];
let currentRound = 0;
let blocks = []
// const simonPast = [];

let simonMove;
let userMove;
let userRounds;
let winner;


function prepareGame(){
  var container = document.querySelector('#MovesPoll');
  MovesPoll.forEach((move) => {
    var block = document.createElement('div')
    block.classList.add(`box-control`)
    block.classList.add(`box`)
    block.classList.add(`${move}`)
    block.classList.add(`off`)
    block.addEventListener('click', userDoes)
    blocks.push(block)
  })

  container.append(...blocks)
  playRound();
}

function userDoes(e) {
  e.target.classList.remove('off')
  onButton(e.target);
  userMove = this.className.slice(16);
  UserMoves.push(userMove);
  console.log(userMove);
  setTimeout(playRound, 2000)
  return userMove
}

function simonDoes() {
  let move = Math.floor(Math.random() * MovesPoll.length)
  simonMove = MovesPoll[move];
  let block = blocks[move]
  SimonMoves.push(simonMove);
  onButton(block)
  return simonMove;
}

function checkSequence(){
  if (UserMoves.length < 2) {
    let count = -1;
    let same = 0;
    UserMoves.forEach(move  => {
      count++
      var simonCurrent = SimonMoves[count--] //count-- because of array index -1
      if (move === simonCurrent){
        same++
      };
    })

    if (same === UserMoves.length){
     return true
    }
  }
}

function offButtons(){
  var buttons = document.querySelectorAll('.box-control')
  buttons.forEach(button => {
      button.classList.add('off')
  });
}

function playRound(){
    currentRound++
    var currentPlayer = 'User';
    var moves = UserMoves
    var move = userMove;

    winner = UserMoves.join(' ') === SimonMoves.join(' ');
    var tempWin = checkSequence();

    if (winner)  {
      playMoves();
      currentPlayer = 'Simon';
      move = simonDoes();
      moves = SimonMoves;
      UserMoves = []
      console.log('Adding another');
    }

    if (!tempWin) {
      UserMoves = []
      console.log('empty bucket');
    }


    console.log(
      `
      Previous round: ${tempWin ? 'won' : 'lost' }

      Current round: ${currentRound}
      Round of: ${currentPlayer}
      Usermoves: ${UserMoves}
      SimonMoves: ${SimonMoves}`);
}

function onButtons(){
  var buttons = document.querySelectorAll('.box-control')
  buttons.forEach(button => {
      button.classList.remove('off')
      setTimeout(function(){
        button.classList.add('off')
      }, 1000)
  });
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



function flashButtons(){
    onButtons();
    setTimeout(onButtons, 1500);
}

function playMoves(){
  if (SimonMoves > 0) {
    SimonMoves.forEach(move => {
      setTimeout(function(){
        move.classList.remove('off')
      }, 1000);
    });
  }
}

function selectButton(){}
function colorButton(){}

prepareGame()
