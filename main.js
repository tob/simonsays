const Rounds = 7;
const MovesPoll = ['yellow', 'red', 'blue', 'green', 'pink', 'black'];
const UserMoves = [];
const SimonMoves = [];
// const simonPast = [];

let simonMove;
let userMove;


function simonDoes() {
  simonMove = MovesPoll[Math.floor(Math.random() * MovesPoll.length)];
  SimonMoves.push(simonMove);
  return simonMove;
}

function userDoes({target}){
  clearBoard('.wrapper-colors');
  let userMove = target.className.slice(16);
  if (UserMoves.length <= SimonMoves.length) {
    UserMoves.push(userMove);
  };

  setTimeout(play, 2000)
}

function checkSequence(){
  UserMoves.every((move, index) => move === SimonMoves[index])
}

function playMoves(moves) {
  for (move = 0; move < moves.length; move++) {
    setTimeout(function () {
      return moves[move]
    }, 1000);
  }
}

function winner(){
  let userRounds = UserMoves.length;
  let simonRounds = SimonMoves.length;
  var sameMoves = userRounds==simonRounds && UserMoves.every((move,index)=> move === SimonMoves[index])
  return sameMoves
}

function play(){
  var currentPlayer = 'User';
  var moves = UserMoves;
  var move = userMove;

  if (UserMoves.length == SimonMoves.length) {
    currentPlayer = 'Simon';
    move = simonDoes();
    moves = SimonMoves;
    renderMoves(SimonMoves,'colors', '#colors')
  }

  renderGame(currentPlayer, moves, move);
}

var render = function (template = template, node = document.querySelector('#main')) {
  node.innerHTML = template;
};

function clearBoard(selector){
  const wrapper = document.querySelector(selector)
  wrapper.parentNode.removeChild(wrapper)
}

function renderMovesPoll (){
  let buttons = []
  MovesPoll.forEach((move) => {
    let block = `<div class="box box-control ${move}">${move}</div>`
    buttons.push(block)
  })

  var template = `<div class="wrapper-movesPoll wrapper">${buttons.join(' ')}</div>`;
  render(template, document.querySelector('#MovesPoll'));

  document.querySelectorAll('.box-control').forEach(el => {
    el.addEventListener('click', userDoes)
  });
}

function renderMoves(moves, className, node){
  var past = [];
  var template = `<div class="wrapper-${className} wrapper"></div>`;
  render(template, document.querySelector(node));

  if (moves.length <= Rounds ) {
    moves.forEach(function(move){
      let block = document.createElement('div')
      block.className = `box ${move}`
      block.innerHTML = move
      var container = document.querySelector(`.wrapper-${className}`);

      setTimeout(function createBlock() {
          container.appendChild(block);
      },2000)
    });
  }
}


function renderGame (currentPlayer, moves, move) {
  const squareClasses = 'square';
  const textClasses = ['square__text'];
  const template = `<div id=${move}>
      <div id=${move} class=${move}>
        <span class=${textClasses.join(' ')}><h1>${move}</h1></span>
      </div>
      <h2>${currentPlayer}</h2>
    </div>`

    render(template, document.querySelector('#main'));
    renderMovesPoll();
}

play()
