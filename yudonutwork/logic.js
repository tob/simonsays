// import snowfallConfig from 'snowfall.js';

const stringsBucket = ['Y'];
const lettersBucket = '';
const letterPoll = 'WASD';
const internetconnection = false;

const snowfallConfig = {
  "particles": {
    "number": {
      "value": 7,
      "density": {
        "enable": false,
        "value_area": 100
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 10,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 3
      },
    },
    "opacity": {
      "value": 1,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 20,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 0,
        "size_min": 0.1,
        "sync": true
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 400,
      "color": "#ffffff",
      "opacity": 0.9,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "bounce",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 881.8766334760375,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "window",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 207.079689136843,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 146.17389821424212,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

let Round = 0;
let computerLetter;
let computerLetters = [];
let computerStrings = [];
let computerMoves = []
let currentPlayer = 'User';
let userLetter;
let userMoves = [];
let userStrings = [];
let winner;
let currentRound = 0;
let correct = 0;
let pressButtons;

var container = document.querySelector('#message');
var bottomCenter = document.querySelector('#bottomCenter');
var upper = document.querySelector('#upper');
var bottom = document.querySelector('#bottom');
var left = document.querySelector('#left');
var right = document.querySelector('#right');

const MovesPoll = [
  {
    letter: 'W',
    node: upper,
    color: '#ff0000'
  },
  {
    letter: 'A',
    node: left,
    color: '#FFFF00'
  },
  {
    letter: 'S',
    node: bottom,
    color: '#008000'
  },
  {
    letter: 'D',
    node: right,
    color: '#0000ff'
  }
]


function addListeners() {
  document.addEventListener('keydown', userDoes, true);
}

function userDoes(e) {
  if (currentPlayer === 'Computer') {
    console.log('not your turn, now is time of' + currentPlayer);
    bottomCenter.innerHTML = '<h1>NOT YOUR TURN</h1>'
    clearTimeout(pressButtons);
    return
  }

  userLetter = e.key;

  //if user Clicks on button
  if (e.target.innerHTML === stringsBucket[0]){
    userLetter = e.target.innerHTML
  }

  clearContainer();

  var move = {};
  switch (userLetter) {
    case 'w':
        move = MovesPoll[0]
      break;
    case 'a':
        move = MovesPoll[1]
      break;
    case 's':
        move = MovesPoll[2]
      break;
    case 'd':
        move = MovesPoll[3]
      break;
    default:
     move = {
       letter: '###',
       node: bottomCenter
     }
  }

  userMoves.push(move)
  renderText(move.letter, move.node, 200, currentPlayer);
  playRound()

  return move
}

function renderNoConnection(){
  const noConnectionMessage = `<div id="main-message">
        <h1>There is no Internet connection</h1>
        <div id="suggestions-list">
          <p>Try:</p>
          <ul>
            <li >Checking the network cables, modem and router</li>
            <li >Reconnecting to Wi-Fi</li>
            <li ><a>Running Network Diagnostics</a></li>
          </ul>
        </div>
        <div class="error-code">ERR_INTERNET_DISCONNECTED</div>
      </div>`;

  container.innerHTML = noConnectionMessage;

  var list = document.querySelector('ul')
  var helpMessage = document.createElement('li');
  var startLetter = document.createElement('button');
  startLetter.innerHTML = stringsBucket[Round]
  startLetter.addEventListener('click', userDoes, true);
  helpMessage.innerHTML = `Asking your browser `
  helpMessage.append(startLetter);
  list.appendChild(helpMessage);
}

function computerChooseLetter() {
  let letter = Math.floor(Math.random() * letterPoll.length)
  computerMove = MovesPoll[letter];
  computerLetters.push(computerMove.letter.toLowerCase());
  computerMoves.push(computerMove)
  return computerMove.letter;
}

function updateBackground(move = MovesPoll[0]){
  console.log(correct);
  snowfallConfig.particles.number.value = correct
  snowfallConfig.particles.line_linked.distance = 300 * computerMoves.length
  snowfallConfig.particles.shape.polygon.nb_sides = 3 + computerMoves.length
  if (MovesPoll.length > 0) {
    snowfallConfig.particles.color.value = move.color
  }
  particlesJS("snowfall",{...snowfallConfig})
}

function checkSequence(){
  if (userMoves.length > 0 && computerMoves.length > 0) {
    let count = 0;
    let same = 0;

    userMoves.forEach(move  => {
      if (move.letter === computerMoves[count].letter){
        same++;
      };
      count++
    })

    if (same === userMoves.length){
      correct++
      updateBackground()
     return 'tempWin'
    }
    correct--
    updateBackground()
    return 'wrong'
  }
}

function clearContainer(){
  container.innerHTML = '';
  container.classList.remove('message')
}

function playWin(){
  //flash buttons
  for (var i = 0; i <= lettersBucket.length; i++) {
    setTimeout(function() {
      playLetters(MovesPoll, 1000)
    }, 1200 * i)
  }
}

function renderText(string, node, duration = 1000, currentPlayer = 'Computer') {
  node.classList.remove('off')
  node.innerHTML = `<h2>${string}</h2>`;
  pressButtons = setTimeout(function(){
      node.classList.add('off')
      node.innerHTML = '';
    }, duration);
  return pressButtons;
}

function playLetters(moves, duration = 1000){
  if (moves.length > 0) {
    moves.forEach((move, index) => {
      setTimeout(function(){
        renderText(move.letter, move.node, duration, currentPlayer);
      }, duration * index);
    });
  }
}

function playRound(){
    var firstRound = currentRound === 0;
    var tempWin = checkSequence();

    if (tempWin === 'wrong' && currentPlayer === 'User') {
      renderText(`let me repeat`, bottomCenter, 1000, 'User');
      userMoves = [];
      currentPlayer = 'Computer'
      setTimeout( function() {
        playLetters(computerMoves, 1000)
      }, 1000);
      setTimeout( function() {
        currentPlayer = 'User';
      }, computerMoves.length * 1000)
      currentRound++
    }

    winner = tempWin && userMoves.length === computerMoves.length;
    if (firstRound || tempWin === 'tempWin' && userStrings.length <= currentRound ){
      if (firstRound || winner)  {
        currentPlayer = 'Computer';
        move = computerChooseLetter();
        userMoves = [];
        console.log(`currentPlayer: ${currentPlayer}, currentLetter: ${move}, array: ${computerLetters}`);
          setTimeout( function() {
            playLetters(computerMoves, 1000)
          }, 1000);
        setTimeout( function() {
          currentPlayer = 'User';
        }, computerMoves.length * 1000)
      }
    }

}

renderNoConnection()
addListeners()
// wetransfer.appHide();
