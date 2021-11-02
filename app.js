// Set API
const api = `https://pokeapi.co/api/v2/pokemon/`;

// Select DOM
const button = document.querySelector('#btn');
const display = document.querySelector('#display');
const attDisplay = document.getElementById('attributeDisplay');
const idDisplay = document.querySelector('.idDisplayInner');
const typeDisplayer = document.querySelector('#typeOfPokemon');

let sound = new Audio();
sound.src = '/sounds/save.mp3';

// Event Listeners
button.addEventListener('click', Pokemon);

// Handling API Call
async function Pokemon() {
  clear();
  let id = idGenerator();
  const res = await fetch(api + id);
  const data = await res.json();
  runsEverything(data);
}

// This function executes all together
function runsEverything(data) {
  yellowToggle();
  greenToggle();
  redToggle();
  bigLightToggle();
  setTimeout(function () {
    generatePokemonImage(data);
  }, 1500);
  setTimeout(function () {
    displayAttributes(data);
    pokemonId(data);
    typeDisplay(data);
  }, 2000);
  playSound();
}

// Gives you a random ID
function idGenerator() {
  return (ids = Math.floor(Math.random() * 250 + 1));
}

// Get the image of the pokemon with that ID and display
function generatePokemonImage(data) {
  let imgSprite = data.sprites.front_default;
  const newPokemon = document.createElement('div');
  newPokemon.innerHTML = `<img id="Pokemon" src=${imgSprite}></img>`;
  display.appendChild(newPokemon);
}

// Toggles yellow flicker
function yellowToggle() {
  let yellow = document.querySelector('.yellowNotifier');
  if (yellow.style.animationPlayState !== 'paused') {
    yellow.style.animationPlayState = 'running';
  }
}

// Toggles green flicker
function greenToggle() {
  let green = document.querySelector('.greenNotifier');
  if (green.style.animationPlayState !== 'paused') {
    green.style.animationPlayState = 'running';
  }
}

// Toggles red flicker
function redToggle() {
  let red = document.querySelector('.redNotifier');
  if (red.style.animationPlayState !== 'paused') {
    red.style.animationPlayState = 'running';
  }
}

// Toggles big flicker
function bigLightToggle() {
  let inner = document.querySelector('.innerNotifierRadius');
  if (inner.style.animationPlayState !== 'paused') {
    inner.style.animationPlayState = 'running';
  } else {
    inner.style.animationPlayState = 'paused';
  }
}

// Pokemon stats are displayed
function displayAttributes(data) {
  let pokemonName = data.name;
  let pokemonHeight = data.height;
  let pokemonWeight = data.weight;
  let hp = data.stats[0].base_stat;
  let attack = data.stats[1].base_stat;
  let defence = data.stats[2].base_stat;
  let speed = data.stats[3].base_stat;

  const newAttributes = document.createElement('div');
  newAttributes.innerHTML = `<h1>${pokemonName}</h1>
                              <div class="rightDisplayTopDiv d-flex">
                                <p><i class="fas fa-ruler-combined"></i> ${pokemonHeight}</p>
                                <p><i class="fas fa-weight-hanging"></i> ${pokemonWeight}</p>
                              </div>
                              <div class="container">
                                <div class="progress mt-2 mb-2">
                                  <div 
                                    class="progress-bar progress-bar-striped bg-success" 
                                    role="progressbar" 
                                    style="width: ${hp}%" 
                                    aria-valuenow=${hp} 
                                    aria-valuemax="100"
                                    >
                                    HP
                                  </div>
                                </div>
                                <div class="progress mt-2 mb-2">
                                  <div 
                                    class="progress-bar progress-bar-striped bg-info" 
                                    role="progressbar" 
                                    style="width: ${attack}%" 
                                    aria-valuenow=${attack} 
                                    aria-valuemax="100"
                                    >
                                    ATCK
                                  </div>
                                </div>
                                <div class="progress mt-2 mb-2">
                                  <div 
                                    class="progress-bar progress-bar-striped bg-danger" 
                                    role="progressbar" 
                                    style="width: ${defence}%" 
                                    aria-valuenow=${defence} 
                                    aria-valuemax="100"
                                    >
                                    DEF
                                  </div>
                                </div>
                                <div class="progress mt-2 mb-2">
                                  <div 
                                    class="progress-bar progress-bar-striped" 
                                    role="progressbar" 
                                    style="width: ${speed}%" 
                                    aria-valuenow=${speed} 
                                    aria-valuemax="100"
                                    >
                                    SPD
                                  </div>
                                </div>
                              </div>                      
                              `;
  attDisplay.appendChild(newAttributes);
}

// Displaying the unique id of that pokemon
function pokemonId(data) {
  let id = data.id;
  idDisplay.innerHTML = `<div class="pokemonID">${id}</div>`;
}

// Displays the type of that pokemon
function typeDisplay(data) {
  let pokemonType = data.types[0].type.name;
  typeDisplayer.innerHTML = `<p class="uppercaseType">${pokemonType}</p>`;
}

// Will clear all displays
function clear() {
  idDisplay.innerHTML = '';
  display.innerHTML = '';
  attDisplay.innerHTML = '';
}

// Plays the sound when pokemon is revealed by Pokedex
function playSound() {
  setTimeout(function () {
    sound.play();
  }, 2000);
}
