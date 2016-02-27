
//////////////////////GLOBAL VARIABLES/////////////////////////////////////
var themes = [superheroes, babies, sports, movies, spellingbee];
var superheroes = ["batman", "spiderman", "black widow", "wonder woman", "iron man", "superman"];
var babies = ["diaper", "bottle", "stroller", "formula" , "insomnia", "car seat"];
var sports = ["grand slam", "tennis", "stadium", "cricket", "curling", "scrimmage"];
var movies = ["scarface", "ferris bueller's day off", "something about mary", "back to school", "the last dragon", "a series of unfortunate events"];
var spellingbee = ["dichotomy", "plethora", "hypochondria", "concierge", "vicissitude", "centripetal"];
var themeChoice = "";












////////////////////JUMBOTRON/WELCOME//////////////////////////////
// var jumboclick = function(event){
// 	console.log("clicked play now");
// 	var jumbotrick = document.getElementsByClassName("jumbotron");
// 	jumbotrick.display="none";
// ;
// }
// var button = document.querySelector(".btn");
// button.addEventListener("click",jumboclick);


// alert("Welcome to my Hangman Demo. Select a theme.");
///////////////////GET THEME CHOICE///////////////////////////////////////////
function setThemeChoice(theme){
	themeChoice = theme;
	document.getElementById("theme-select").innerHTML = themeChoice;
	document.getElementsByClassName("btn").disabled = true;
	console.log(themeChoice);
	game.configureGameBoard(themeChoice);
}

////////////////////////////GAME BOARD////////////////////////////////////////////
var game = {
	gameBoard:[],
	gameWord:"",
	guessesRemaining:11,
	userWrongGuesses:[],

	configureGameBoard:function(theme){
		console.log(theme == "superheroes");
		switch(theme){ //generate a game word based on user's theme selection
			case "superheroes":
				this.gameWord = superheroes[Math.floor(Math.random()*superheroes.length)];
				break;
			case "babies":
				this.gameWord = babies[Math.floor(Math.random()*babies.length)];
				break;
			case "sports":
				this.gameWord = sports[Math.floor(Math.random()*sports.length)];
				break;
			case "movies":
				this.gameWord = movies[Math.floor(Math.random()*movies.length)];
				break;
			case "spellingbee":
				this.gameWord = spellingbee[Math.floor(Math.random()*spellingbee.length)];
				break;
			default:
				this.gameWord = "NotSet";
				break;
		}
		for (i=0;i<this.gameWord.length;i++){ //gameBoard is the hidden representation of the gameWord
			//console.log(this.gameWord[i]); //for testing
			if(this.gameWord[i]=="-"||this.gameWord[i]=="'"||this.gameWord[i]==" "){
				this.gameBoard.push(this.gameWord[i]);
			}
			else {
				this.gameBoard.push("_");
			}
		}
		// document.getElementById("game-board").innerHTML=this.gameBoard.join(" ");

	},
	processGuess:function(guess){
		var correctGuess = false;
		var gameWordArray = this.gameWord.split("");
		for (i=0;i<this.gameWord.length;i++){
			if(guess == this.gameWord[i]){
				this.gameBoard[i] = this.gameWord[i];
				correctGuess = true;
				document.getElementById("game-board").innerHTML = this.gameBoard.join(" ");
			}
		}
		if (!correctGuess){
			document.getElementById("guesses-left").innerHTML = --this.guessesRemaining;
			this.userWrongGuesses.push(guess);
			document.getElementById("current-guesses").innerHTML = this.userWrongGuesses.join(",");
		}
		if(this.guessesRemaining==0){
			alert("Sorry, You Lost");
		}
		else if(JSON.stringify(this.gameBoard) == JSON.stringify(gameWordArray)){
			alert("YOU WON!!");
		}
	}

}









///////////////////////MAIN EXECUTION///////////////////////////////////////////



// game.configureGameBoard(themeChoice);
// console.log(typeof themeChoice);
// console.log(themeChoice);
// console.log(game.gameWord);
// console.log(game.gameBoard);

// console.log(gameWordArray);

document.onkeyup = function(event){
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	game.processGuess(userGuess);
}