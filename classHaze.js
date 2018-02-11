const Rounds = 7;
const MovesPoll = ['yellow', 'red', 'blue', 'green', 'pink', 'black'];
let UserMoves = [];
let SimonMoves = [];
let currentRound = 0;
// const simonPast = [];

let simonMove;
let userMove;
let userRounds;

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
  userRounds += 1
  this.classList.remove('off')

  userMove = this.className.slice(16);

  UserMoves.push(userMove);

  setTimeout(offButtons, 1000)

  if (UserMoves.length === SimonMoves.length){
    flashButtons()
  }

  setTimeout(playRound(), 1000)
}

function simonDoes() {
  let move = Math.floor(Math.random() * MovesPoll.length)
  simonMove = MovesPoll[move];
  SimonMoves.push(simonMove);
  console.log('simon says: ' + simonMove);
  onButton(move);
  return simonMove;
}

function playRound(){
  if (currentRound <= 14) {
    currentRound = currentRound + 1
    var currentPlayer = 'User';
    var moves = UserMoves
    var move = userMove;

    var winner = checkSequence();

    if (winner)  {
        currentPlayer = 'Simon';
        move= '';
        move = simonDoes();
        moves = SimonMoves;
    }

    console.log(
      `Round of: ${currentPlayer}
        moves: ${moves}
        move: ${moves}

        Current round: ${currentRound}
        Usermoves: ${UserMoves}
        SimonMoves: ${SimonMoves}`);

  }

}

function offButtons(){
  var buttons = document.querySelectorAll('.box-control')
  buttons.forEach(button => {
      button.classList.add('off')
  });
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
  var buttons = document.querySelectorAll('.box-control')
  if (move) {
    console.log('button off');
    buttons[move].classList.remove('off')
  }
}



function flashButtons(){
    setTimeout(onButtons, 500)
    setTimeout(offButtons,1000)
    setTimeout(onButtons, 1500)
    setTimeout(offButtons,2000)
    setTimeout(onButtons, 2500)
    setTimeout(offButtons,3000)
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
