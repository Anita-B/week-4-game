

$(document).ready(function() {

// Make our variables global to the runtime of our application
var playerName = "";
var opponentName = "";
var opponentCounter = 0;
var player = "";
var won = false;


var Twilight_Sparkle = {
	"name": "Twilight_Sparkle",
	"namePrint": "Twilight Sparkle",
	"healthPoints": 120,
	"playerBasePower": 8,
	"playerPower": 8,
	"opponentCounterPower": 10,
}
var Rainbow_Dash = {
	"name": "Rainbow_Dash",
	"namePrint": "Rainbow Dash",
	"healthPoints": 100,
	"playerBasePower": 9,
	"playerPower": 9,
	"opponentCounterPower": 5
}
var Applejack = {
	"name": "Applejack",
	"namePrint": "Applejack", 
	"healthPoints": 150,
	"playerBasePower": 5,
	"playerPower": 5,
	"opponentCounterPower": 10
}
var Fluttershy = {
	"name": "Fluttershy",
	"namePrint": "Fluttershy",
	"healthPoints": 160,
	"playerBasePower": 7,
	"playerPower": 7,
	"opponentCounterPower": 25
}

var convertStringtoVariable = {
	"Twilight_Sparkle" : Twilight_Sparkle,
	"Rainbow_Dash" : Rainbow_Dash,
	"Applejack" : Applejack,
	"Fluttershy" : Fluttershy
}


	// Use a function to initialize our game.
    // This way when the user hits clear, we can guarantee a reset of the app.
    function initializeGame() {
    	player = "";
        opponent = "";
        playerName = "";
        opponentName = "";
        isPlayerChosen = false;
        isOpponentChosen = false;

        $("#gamePlayPlayer, #gamePlayOpponent, #VS").empty();
        $(".gameScore").removeClass("showYes").addClass("showNo");
        $(".gameRestart").removeClass("showYes").addClass("showNo");
        $("#gamePlayPlayer").removeClass("chosenPlayer");
        $("#gamePlayOpponent").removeClass("chosenOpponent");
    }


    // Add an on click listener to all elements that have the class "player"
    $(".player").on("click", function() {

    	// If player is chosen, we should be choosing the opponent, otherwise, the player
        if (isPlayerChosen && !isOpponentChosen) {
          opponent = this;
          opponentName = $(this).attr('value'); //get name of opponent
          $("#gamePlayOpponent").html(opponent); //put opponent in opponent area
          $(this).addClass("chosenOpponent"); //add background color
          $(".gameScore").removeClass("showNo").addClass("showYes"); //display button, game info
          isOpponentChosen = true;

        }
        else if (!isPlayerChosen) {
          player = this; 
          playerName = $(this).attr('value'); //why doesn't this.value work???
          $("#gamePlayPlayer").html(player); //put player in player area
          $("#VS").html("<h1>VS</h1>"); //add VS
          $(this).addClass("chosenPlayer"); //add background color
          isPlayerChosen = true;
          $("#title").html("<h2>YOUR OPPONENTS</h2>"); //add new title to opponents
        }


    });  

    // Add an on click listener to the challenge button 
    $("#challenge").on("click", function() {

    	//playerName is a string and not a variable name here so it won't reference the object fields
    	//stackoverflow said this[] or window[] would work but it didn't!
    	//so we have to change it to a variable with convertStringtoVariable object
    
    	//if everyone's healthPoints are greater than or equal to 0, keep playing 
    	if(convertStringtoVariable[playerName].healthPoints > 0 && convertStringtoVariable[opponentName].healthPoints > 0){

    		//console.log(convertStringtoVariable[playerName].healthPoints + "  " + convertStringtoVariable[opponentName].healthPoints);
    		//Calculate for the Player
			convertStringtoVariable[playerName].healthPoints -= convertStringtoVariable[opponentName].opponentCounterPower; 
			
			//Selects all <div> elements with a value attribute value equal to playerName like "Twilight_Sparkle", 
			//then the child 'p'
			$("div[value=" + playerName + "] p").html(convertStringtoVariable[playerName].healthPoints);
			//console.log(convertStringtoVariable[playerName].healthPoints);
			$("#playerSkill").html(convertStringtoVariable[opponentName].namePrint + " won " + convertStringtoVariable[opponentName].opponentCounterPower + " points from you!");


	    	//Calculate for the Opponent
	    	convertStringtoVariable[opponentName].healthPoints -= convertStringtoVariable[playerName].playerPower;
	    	

	    	//Selects all <div> elements with a value attribute value equal to playerName like "Twilight_Sparkle", 
			//then the child 'p'
	    	$("div[value=" + convertStringtoVariable[opponentName].name + "] p").html(convertStringtoVariable[opponentName].healthPoints);
	    	//console.log(convertStringtoVariable[opponentName].healthPoints);
	    	$("#opponentSkill").html("You won " + convertStringtoVariable[playerName].playerPower + " points from " + convertStringtoVariable[opponentName].namePrint + "!");
	    	convertStringtoVariable[playerName].playerPower += convertStringtoVariable[playerName].playerBasePower;

    	}

    	// player won
    	else if (convertStringtoVariable[playerName].healthPoints > convertStringtoVariable[opponentName].healthPoints){
    		

    		$("#gamePlayOpponent").removeClass("chosenOpponent");
    		$("#gamePlayOpponent").empty();



    		//don't know how to stop counter from incrementing when the user 
    		//is clicking it repeatedly after having won a game
    		
    			opponentCounter++;

    	

    		//if not all opponents have been bested
    		if (opponentCounter !== 3){

    			//reset game for next opponent
    			isOpponentChosen = false;
    			$("#playerSkill").html("You won! Choose another opponent!");
    			$("#opponentSkill").html("");
    		}
    		else if (opponentCounter === 3) {
    			$("#title").html("");
    			$("#gamePlayPlayer").empty();
    			$("#VS").html(player);
    			$("#" + playerName + " p").html("YOU WON!!!");
    			$(".gameScore").removeClass("showYes").addClass("showNo");
    			$(".gameRestart").removeClass("showNo").addClass("showYes"); //display button, game info
    			//launch restart button
    			$("#restart").on("click", function() {
    				location.reload();
    			});
    		}

    	}

    	// opponent won
    	else if (convertStringtoVariable[playerName].healthPoints < convertStringtoVariable[opponentName].healthPoints){
    		$("#playerSkill").html(convertStringtoVariable[opponentName].namePrint + " won! GAME OVER!" );

    		$(".gameScore").removeClass("showYes").addClass("showNo"); //hide challenge button, game info
    		$(".gameRestart").removeClass("showNo").addClass("showYes"); //display button, game info
    		//launch restart button
    		$("#restart").on("click", function() {
    			location.reload();
    		});

    	}
    	


    });	

    // Call initializeGame so we can set the state of our app
    initializeGame();

});	