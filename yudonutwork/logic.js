const stringsBucket = ['y'];
const lettersBucket = '';
const letterPoll = 'YUDonutWork';
const internetconnection = false;
const messages = [
  `° ͜ʖ °`,
  ` ͡ ° ͜ʖ ͡ °`,
  `( ͡ ° ͜ʖ ͡ ° )`
  ]

let Round = 0;
let computerLetter;
let computerLetters = ['y'];
let computerStrings = [];
let userLetter;
let userLetters = [];
let userStrings = [];
let winner;
let currentRound = 0;


var container = document.querySelector('#center');

function addListeners() {
  document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    userDoes(event)
  });
}

function userDoes(e) {
    clearContainer()
  userLetter = e.key;
  //if user Clicks on button
  if (e.target.innerHTML === stringsBucket[0]){
    userLetter = e.target.innerHTML
  }

  userLetters.push(userLetter)
  playRound()
  return userLetter
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
  computerLetter = letterPoll[letter];
  computerLetters.push(computerLetter.toLowerCase());
  return computerLetter;
}

//Refactor this - avoid to go through all of them
//or find a way to stop it immediatly when wrong
function checkSequence(){
  if (userLetters.length > 0) {
    let count = 0;
    let same = 0;

    userLetters.forEach(letter  => {
      if (letter === computerLetters[count]){
        same++;
        clearContainer();
        let message = messages[count] || `correct + ${count}`;
        renderText(message, 1000, 'user')
      };
      count++
    })
    if (same === userLetters.length && internetconnection) {
      renderText('Computer says: all good, continuing with a new sequence', 5000, 'Computer')
      return 'win'
    }
    if (same === userLetters.length){
     return 'tempWin'
    }
    return 'wrong'
  }
}

function clearContainer(){
  container.innerHTML = '';
}

function playWin(){
  //flash buttons
  for (var i = 0; i <= lettersBucket.length; i++) {
    setTimeout(function() {
      playLetters(lettersBucket, 1000)
    }, 1200 * i)
  }
}

function renderText(string, duration = 1000, currentPlayer = 'Computer') {
  var letter = document.createElement('button');
  letter.innerHTML = `<h2>${string}</h2>`;
  container.appendChild(letter)
  if (currentPlayer = 'Computer'){
    setTimeout(function(){
      try {
          container.removeChild(letter)
      } catch (e) {
        console.log(`${letter.innerHTML}was already deleted`);
      }
    }, duration);
  }
}

//Refactor delay ?
function playLetters(moves, duration = 1000){
  if (moves.length > 0) {
    moves.forEach((letter, index) => {
      setTimeout(function(){
        renderText(letter);
      }, duration * index);
    });
  }
}

function playRound(){
    currentRound++
    var currentPlayer = 'User';
    var letters = userLetters
    var letter = userLetter;
    var firstRound = currentRound === 1
    var tempWin = checkSequence();

    if (tempWin === 'wrong' && currentPlayer === 'User') {
      renderText(`let's try something easier`, 1000, 'User')
      userLetters = [];
      currentRound
    }

    winner = tempWin && userLetters.length === computerLetters.length;
    if (firstRound || tempWin === 'tempWin' && userStrings.length <= currentRound ){
      if (firstRound || winner)  {
        currentPlayer = 'Computer';
        move = computerChooseLetter();
        moves = computerLetters;
        userLetters = [];
        console.log(`currentPlayer: ${currentPlayer}, currentLetter: ${move}, array: ${computerLetters}`);
        setTimeout( function() {
          playLetters(computerLetters, 1000)
        }, 1000);

      }
    }

    if (tempWin === 'win'){ //Winner
      playWin();
      currentPlayer = 'User'
      return
    }
}

renderNoConnection()
addListeners()
