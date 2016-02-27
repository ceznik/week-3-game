$(document).ready(function(){


	var themes = [movies, superheroes, tech-companies, cars, football-teams, pets];
	var movies = ["scarface", "ferris bueller's day off", "something about mary", "back to school", "the last dragon", "a series of unfortunate events"];
	var superheroes = ["batman", "spiderman", "black widow", "wonder woman", "iron man", "superman"];
	var tech-companies = ["oracle", "google", "apple", "yahoo", "intel", "microsoft"];
	var football-teams = ["-", "--", "---", "----" , "-----", "------"];
	var pets = ["-", "--", "---", "----", "-----", "------"];
	var themeChoice = "";
	var userGuessArray = [];
	var gameWordArray = this.gameWord.split("");
	var game = {
		gameBoard:[],
		gameWord: "",
		guessesRemaining:11,
		configureGameBoard:function(theme){
			switch(theme){ //generate a game word based on user's theme selection
				case "superheroes":
					this.gameWord = superheroes[Math.floor(Math.random()*superheroes.length)];
					break;
				case "movies":
					this.gameWord = movies[Math.floor(Math.random()*movies.length)];
					break;
				case "tech-companies":
					this.gameWord = sports[Math.floor(Math.random()*tech-companies.length)];
					break;
				case "football-teams":
					this.gameWord = movies[Math.floor(Math.random()*football-teams.length)];
					break;
				case "pets":
					this.gameWord = pets[Math.floor(Math.random()*pets.length)];
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
			}//for

		},//closes configureGameBoard()

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
			$(#guessesRemaining).text(guessesRemaining);
		}//closes processGuess
	}//closes the game object	

//click listener for theme button configures the game for the chosen theme.
	$("#theme").click(function(){
		console.log("User chose a theme");
		configureGameBoard($(this).id());
		alert("You chose a theme. Now try to guess the word");
		$("#correctGuesses").text(game.gameBoard);
	});

	$("input").keyup(function(event){
		game.processGuess(event.which);
		$("#correctGuesses").text(game.gameBoard.join(" "));
		if(game.guessesRemaining==0){
			alert("Sorry, you lost");
		}
		else if(JSON.stringify(game.gameBoard) == JSON.stringify(gameWordArray)){
			alert("YOU WON!!");
		}

	})


});