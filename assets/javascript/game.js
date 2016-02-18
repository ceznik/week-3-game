var themes = [superheroes, babies, sports, movies, spellingbee];

var superheroes = ["batman", "spiderman", "black widow", "wonder woman", "iron man", "superman"];
var babies = ["diaper", "bottle", "stroller", "formula" , "insomnia", "car seat"];
var sports = ["grand slam", "tennis", "stadium", "cricket", "curling", "scrimmage"];
var movies = ["scarface", "ferris bueller's day off", "something about mary", "back to school", "the last dragon", "a series of unfortunate events"];
var spellingbee = ["dichotomy", "plethora", "hypochondria", "concierge", "vicissitude", "centripetal"];
var jumboclick = function(event){
	console.log("clicked play now");
	var jumbotrick = document.getElementsByClassName(".jumbotron");
	jumbotrick.display="none";
}
var button = document.querySelector(".btn");
button.addEventListener("click",jumboclick);


alert("Welcome to my Hangman Demo. Select a theme.");
var themeChoice = prompt("Please select one of the followoing themes: superheroes, babies, sports, movies, spellingbee.");
console.log(themeChoice);
var game = {
	gameBoard:[],
	gameWord:"",
	guessesRemaining:11,
	configureGameBoard:function(theme){
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
			case "spelling-bee":
				this.gameWord = spellingbee[Math.floor(Math.random()*spellingbee.length)];
				break;
			default:
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
	},
	processGuess:function(guess){
		var correctGuess = false;
		for (i=0;i<this.gameWord.length;i++){
			if(guess == this.gameWord[i]){
				this.gameBoard[i] = this.gameWord[i];
				correctGuess = true;
			}
		}
		if (!correctGuess){
			this.guessesRemaining--;
		}
	}

}
game.configureGameBoard(themeChoice);
console.log(game.gameWord);
console.log(game.gameBoard);
var gameWordArray = game.gameWord.split("");
console.log(gameWordArray);

document.onkeyup = function(event){
	var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
	console.log(userGuess);
	game.processGuess(userGuess);
	var html = "<strong>You have chosen the " + themeChoice + " theme. Choose letters to complete the word.</strong>"
+ "<br> <b>Guesses Remaining: </b>" + game.guessesRemaining
+ "<br> <strong>" + game.gameBoard + "</strong>";

	document.querySelector('.gameboard').innerHTML = html;
	if(game.guessesRemaining==0){
		alert("Sorry, You Lost");
	}
	else if(JSON.stringify(game.gameBoard) == JSON.stringify(gameWordArray)){
		alert("YOU WON!!");
	}
}


