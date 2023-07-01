/*
 * Author: Dan Choy
 * Contact: yatshing_choy@student.uml.edu
 * Source: 
 * https://www.youtube.com/watch?v=vEROU2XtPR8
 * https://www.dropbox.com/s/9k0r4cqv5kdsu8u/hw6_grader_lecture.m4v?dl=0
 * 
 * 
 * This project, a Scrabble game simulation, is an interactive and dynamic web-based application built primarily 
 * using JavaScript along with jQuery and jQuery UI for the front-end interface. The main goal is to provide users 
 * with a Scrabble-like experience, where they can drag tiles from their tile rack onto the game board to form words 
 * and score points. Our project approach includes the following key elements:
 * 1. Game Initialization: When the page loads, random Scrabble tiles are generated and loaded onto the user's tile 
 * rack. The game board is also initialized with droppable targets where the user can place their tiles. This 
 * initialization is performed in the 'load_scrabble_pieces' and 'load_droppable_targets' functions. 
 * 2. Tile Drag-and-Drop: To create an engaging and interactive user experience, we have implemented a drag-and-drop 
 * feature using jQuery UI. This allows users to physically move the tiles from their rack to the game board. 
 * 3. Word Formation and Checking: As tiles are placed on the game board, the 'find_word' function is triggered to 
 * automatically form and display the current word. When the user is ready, they can submit their word, which is then 
 * checked against a dictionary file for validity using the 'submitWord' function. 
 * 4. Scoring: Once a valid word is formed and submitted, the application calculates the score based on the value of 
 * the letters used in the word, updating the game's score. 
 * 5. Game Reset: At any point, the user can reset the game, which clears the board, re-initializes the tile rack, 
 * and resets the score. 
 */



// Declaration of game data arrays
var pieces = [];
var game_tiles = [];
var game_board = [];

// The document ready function wraps all the jQuery code and ensures it only runs once the DOM is fully loaded.
$( document ).ready(function() {
  // An asynchronous function named start is defined.
  async function start() {
      // An instance of XMLHttpRequest object is created.
      var xhr = new XMLHttpRequest();
      // Setting up the request URL and HTTP method.
      xhr.open('GET', '../src/json/pieces.json', true);

      // An event listener for readystatechange event of the xhr object.
      xhr.onreadystatechange = function () {
          // Checking if the request has been completed and was successful.
          if (xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
          // Parsing the received JSON data.
          var jsonData = JSON.parse(xhr.responseText)

          // Loading the game data from the parsed JSON.
          pieces = jsonData.pieces;
          game_tiles = jsonData.game_tiles;
          game_board = jsonData.game_board;

          // Loading the scrabble pieces and the droppable targets.
          load_scrabble_pieces();
          load_droppable_targets();
          }
      };
      // Sending the request.
      xhr.send();
  }
  
  // Calling the start function.
  start();
});

// A function to load JSON data using the Fetch API
async function loadJSON() {
  try {
    const response = await fetch('../src/json/pieces.json');
    // Checking if the request was successful.
    if (!response.ok) {
      throw new Error('Failed to load JSON file');
    }
    // Parsing the received JSON data.
    const jsonData = await response.json();
    // Loading the pieces data.
    pieces = jsonData.pieces
    console.log(pieces);

  } catch (error) {
    console.error(error);
  }
}

// A function to find the current word based on the state of the game board.
function find_word() {
  var word = "";
  var score = 0;
  // Looping over the game board to collect the current word and score.
  for(var i = 0; i < 15; i++) {
    if(game_board[i].tile != "pieceX") {
      word += find_letter(game_board[i].tile);
      score += find_score(game_board[i].tile);
    }
  }
  // Checking if the score should be doubled.
  score += (score * should_double());
  // Updating the score on the UI.
  $("#score").html(score);
  // Updating the word on the UI.
  $("#word").html(word !== "" ? word : "____");
}

// A function to check if the score should be doubled based on the positions of the tiles.
function should_double() {
  return [2, 12].some(index => game_board[index].tile !== "pieceX");
}

// A function to find the score of a given tile.
function find_score(given_id) {
  const letter = find_letter(given_id);
  var score = 0;
  // Looping over the pieces to find the score of the given tile.
  for(let i = 0; i < 27; i++) {
    let obj = pieces[i];
    if(obj.letter === letter) {
      score = obj.value;
      score += (score * should_double_letter(given_id));
      return score;
    }
  }
  return -1;
}

// A function to check if the score of a given tile should be doubled.
function should_double_letter(given_id) {
  const dropID = find_tile_pos(given_id);
  return dropID === "drop6" || dropID === "drop8" ? 1 : 0;
}

// A function to find the letter of a given tile.
function find_letter(given_id) {
  for(let i = 0; i < 7; i++) {
    if(game_tiles[i].id === given_id) {
      return game_tiles[i].letter;
    }
  }
  return -1;
}

// A function to find the position of a given tile on the game board.
function find_board_pos(given_id) {
  for(let i = 0; i < 15; i++){
    if(game_board[i].id === given_id) {
      return i;
    }
  }
  return -1;
}

// A function to find the position of a given tile on the droppable targets.
function find_tile_pos(given_id) {
  for(let i = 0; i < 15; i++){
    if(game_board[i].tile === given_id) {
      return game_board[i].id;
    }
  }
  return -1;
}

// A function to load the scrabble pieces on the UI.
function load_scrabble_pieces() {
  const base_url = "../src/img/scrabble/Scrabble_Tile_";   
  const rackPosition = $("#the_rack").position();
  const imgTop = -130;

  // Looping to create the tiles for the game.
  for(let i = 0; i < 7; i++) {
    let random_num;
    do {
      random_num = getRandomInt(0, 26);
    } while(pieces[random_num].amount === 0);
    
    // Decreasing the amount of the chosen piece.
    pieces[random_num].amount--;
    // Creating the HTML for the tile and adding it to the rack.
    const pieceHTML = `<img class='pieces' id='piece${i}' src='${base_url}${pieces[random_num].letter}.jpg'></img>`;
    const piece_ID = `#piece${i}`;
    const imgLeft = -165 + (50 * i);
    game_tiles[i].letter = pieces[random_num].letter;

    $("#rack").append(pieceHTML);
    $(piece_ID).css({left: imgLeft, top: imgTop, position: "relative"});
    $(piece_ID).draggable({revert: "invalid"});
  }
}

// A function to load the droppable targets on the UI.
function load_droppable_targets() {
  const img_url = "../src/img/scrabble/Scrabble_Droppable.png";
  const boardPosition = $("#the_board").position();
  const imgTop = -125;

  // Looping to create the droppable targets for the game.
  for(let i = 0; i < 15; i++) {
    const dropHTML = `<img class='droppable' id='drop${i}' src='${img_url}'></img>`;
    const drop_ID = `#drop${i}`;
    const imgLeft = 0;

    $("#board").append(dropHTML);
    $(drop_ID).css({left: imgLeft, top: imgTop, position: "relative"});

    // Setting up the drop event listener for each droppable target.
    $(drop_ID).droppable({
      drop: function(event, ui) {
        const draggableID = ui.draggable.attr("id");
        const droppableID = $(this).attr("id");
        console.log(`Tile: ${draggableID} - dropped on ${droppableID}`);
        game_board[find_board_pos(droppableID)].tile = draggableID;
        find_word();
      },
      out: function(event, ui) {
        const draggableID = ui.draggable.attr("id");
        const droppableID = $(this).attr("id");

        if(draggableID !== game_board[find_board_pos(droppableID)].tile) {
          console.log("FALSE ALARM DETECTED.");
          return;
        }

        console.log(`Tile: ${draggableID} - removed from ${droppableID}`);
        game_board[find_board_pos(droppableID)].tile = "pieceX";
        find_word();
      }
    });
  }
}

// A function to generate a random integer within a given range.
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// A function to check the validity of a word against a dictionary.
async function submitWord() {
const response = await fetch('../src/files/dictionary.txt');
const fileContents = await response.text();
const words = fileContents.split('\n');

const messageElement = $("#messages").show();
const word = $("#word").text();

if (word === "____") {
  messageElement.html("<br><div class='highlight_centered_error'>Sorry, but you need to play a tile before I can check the word for you!</div>");
  console.log("Please play some tiles first.");
  return;
}

const ret = words.filter(w=> w.startsWith(word.toLowerCase()));

if (ret.length > 0) {
  messageElement.html(`<br><div class='highlight_centered_success'>Nice job! "${word}" is considered a word by the game's dictionary!<br><br>`);
} else {
  messageElement.html(`<br><div class='highlight_centered_error'>Sorry. "${word}" is not a word in the English dictionary. I suggest trying a different word. Or try resetting your tiles and trying again.</div>`);
}
}

// A function to reset the game board.
function reset() {
console.log("reset title=======");

$("#word").html("____");
$("#score").html(0);

for(let i = 0; i < 7; i++) {
  const tileID = `#piece${i}`;
  $(tileID).draggable("destroy").remove();
}

for(let i = 0; i < 15; i++) {
  const drop_ID = `#drop${i}`;
  $(drop_ID).remove();
}

$('#messages').hide();

load_scrabble_pieces();
load_droppable_targets();
}

