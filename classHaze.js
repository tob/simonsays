const Rounds = 7;
const MovesPoll = ['yellow', 'red', 'blue', 'green', 'pink', 'black'];
let UserMoves = [];
let SimonMoves = [];
let currentRound = 0;
// const simonPast = [];

let simonMove;
let userMove;
let userRounds;
let winner;

function prepareGame(){
  var container = document.querySelector('#MovesPoll')
  MovesPoll.forEach((move) => {
    var block = document.createElement('div')
    block.classList.add(`box-control`)
    block.classList.add(`box`)
    block.classList.add(`${move}`)
    block.classList.add(`off`)
    block.addEventListener('click', userDoes)
    container.appendChild(block)
  })
  playRound();
}

function userDoes() {
  this.classList.remove('off')
  setTimeout(offButtons, 1000)
  userMove = this.className.slice(16);
  UserMoves.push(userMove);
  console.log(simonMove);
  setTimeout(playRound, 2000)
  return userMove
}

function simonDoes() {
  let move = Math.floor(Math.random() * MovesPoll.length)
  simonMove = MovesPoll[move];
  SimonMoves.push(simonMove);
  onButton(simonMove)
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

function onButton(move){
  // this.classList.remove('off')
  var buttons = document.querySelectorAll('.box-control')
  buttons.forEach(button => {
    buttonClass = button.className.slice(16, -4);
    if (move == buttonClass) {
      button.classList.remove('off')
      setTimeout(offButtons, 1000)
    }
  });
}



function flashButtons(){
    onButtons();
    setTimeout(onButtons, 1500);
}

function playMoves(moves){
  var buttons = document.querySelectorAll('.box-control')
  buttons.forEach((button, i )=> {
    if (moves[i] === SimonMoves[i])
    setTimeout(function(){
      button.classList.remove('off')
      setTimeout(function(){
        button.classList.add('off')
      });
    }, 1000);
  });
}

function selectButton(){}
function colorButton(){}

prepareGame()
