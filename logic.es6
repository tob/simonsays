const internetconnection = false;
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

const wrapper = document.querySelector('.wrapper');
const container = document.querySelector('#message');
const bottomCenter = document.querySelector('#bottomCenter');
const upper = document.querySelector('#upper');
const bottom = document.querySelector('#bottom');
const left = document.querySelector('#left');
const right = document.querySelector('#right');

const gameState = {
  buttons: [
    {
      key: 'w',
      node: document.querySelector('#upper'),
      color: '#ff0000',
    },
    {
      key: 'a',
      node: document.querySelector('#left'),
      color: '#ffff00'
    },
    {
      key: 's',
      node: document.querySelector('#bottom'),
      color: '#006600'
    },
    {
      key: 'd',
      node: document.querySelector('#right'),
      color: '#0033cc'
    }
  ],
  correct: 0,
  move: {},
  moves: [],
  pcMoves: [],
  player: 'User',
  round: 0,
  speed: 1000,
  tempWin: true,
  winner: false,
  message: '',
}

let playLettersTime;
let pressButtons;
let releaseButtons;
let setPlayer;
let userKey;

var {
  buttons,
  correct,
  message,
  move,
  moves,
  pcMoves,
  player,
  round,
  speed,
  tempWin,
  winner,
} = {...gameState}

function addListeners() {
  document.addEventListener('keydown', userDoes, true);
  // upper.addEventListener('click',() => userDoes(), true);
}

function clearContainer(){
  clearTimeout(pressButtons);
  clearTimeout(releaseButtons);
  clearTimeout(playLettersTime);
  clearTimeout(setPlayer);
  container.innerHTML = '';

  for (var i = 0; i < buttons.length; i++) {
    buttons[i].node.innerHTML = '';
    buttons[i].node.classList.add('off');
  }
  player = 'Computer';
}

function playLetters(moves, duration = speed){
  if (moves.length > 0) {
    moves.forEach((move, index) => {
      pressButtons = setTimeout(function(){
        renderText(move.key, move.node, duration, player);
      }, duration * index);
    });
  }
}

function renderNoConnection(){
  container.innerHTML = noConnectionMessage;
  var list = document.querySelector('ul')
  var helpMessage = document.createElement('li');
  var startLetter = document.createElement('button');
  startLetter.innerHTML = 'Y'
  startLetter.addEventListener('click', userDoes, true);
  helpMessage.innerHTML = `Asking your browser `
  helpMessage.append(startLetter);
  list.appendChild(helpMessage);
}

function renderRound() {
  console.log(`player: ${player}, currentLetter: ${move}, array: ${pcMoves.map(a => a.key)}`);

  clearContainer();
  moves = [];
  player = 'Computer';
  playLettersTime = setTimeout( function() {
    playLetters(pcMoves, speed);
  }, speed);

  setPlayer = setTimeout( function() {
    player = 'User';
    playRound('User');
  }, pcMoves.length * speed);

}

function renderText(string, node, duration = speed, player = 'Computer') {
  node.classList.remove('off');
  // node.innerHTML = string;
  releaseButtons = setTimeout(function(){
      node.classList.add('off')
      node.innerHTML = '';
    }, duration - 200);
}


function shake(node) {
  node.classList.add('shake')
  setTimeout(function(){
    node.classList.remove('shake')
  }, speed)
}

function updateBackground(move = buttons[0]){
  correct++
  console.log(`CORRECT: ${correct}`);
  snowfallConfig.particles.number.value = pcMoves.length
  snowfallConfig.particles.line_linked.distance = 300 * pcMoves.length
  snowfallConfig.particles.shape.polygon.nb_sides = 3 + correct
  if (buttons.length > 0) {
    snowfallConfig.particles.color.value = move.color
  }
  particlesJS("snowfall",{...snowfallConfig})
}



// Logic starts here
function computerChooseLetter() {
  let randNumb = Math.floor(Math.random() * buttons.length)
  computerMove = buttons[randNumb];
  pcMoves.push(computerMove);
  return computerMove;
}

function userDoes(e) {
  if (round === 1) {
    container.classList.remove('message')
  }

  if (player === 'Computer') {
    moves = [];
    console.log('not your turn, now is time of' + player);
    shake(wrapper)
    clearContainer();
    setTimeout(function() {
      renderRound();
    }, speed);
    return
  }

  if (player === 'User') {
    userKey = e.key || e.target.innerHTML;
    console.info(userKey)
    var move = {};
    switch (userKey) {
      case 'w':
      case 'ArrowUp':
          move = buttons[0]
        break;
      case 'a':
      case 'ArrowLeft':
          move = buttons[1]
        break;
      case 's':
      case 'ArrowDown':
          move = buttons[2]
        break;
      case 'd': 
      case 'ArrowRight':
          move = buttons[3]
        break;
      default:
       move = {
         key: '',
         node: bottomCenter
       }
    }
    moves.push(move)

    clearContainer();
    renderText(move.key, move.node, 500, player);
    playRound('User')
  }
  return move
}

function playRound(player){
    var firstRound = round === 0;
    let tempWin = 'wrong';
    if (player === 'User') {
      tempWin = checkSequence();
    }
    if (tempWin === 'wrong' && player === 'User') {
      renderRound()
    }

    winner = tempWin && moves.length === pcMoves.length;
    if (firstRound || tempWin === 'tempWin'){
      if (firstRound || winner)  {
        move = computerChooseLetter();
        moves = [];
        player = 'Computer';

        setTimeout(function(){
          clearContainer()
          for (var i = 0; i < buttons.length; i++) {
            buttons[i].node.classList.remove('off');
          }
          setTimeout(renderRound, speed)
          
          round++
          updateBackground(move) 
        }, speed/2);
      }
    }
}

function checkSequence(){
  if (moves.length > 0 && pcMoves.length > 0) {
    let count = 0;
    let same = 0;
    moves.forEach(move  => {
      if (move.key === pcMoves[count].key){
        same++;
        player = 'User'
      };
      count++
    })
    if (same === moves.length){
     return 'tempWin'
    }
    correct--
    shake(wrapper)
    return 'wrong'
  }
}


renderNoConnection()
addListeners()
// wetransfer.appHide();
