
//PROCESSING: Generate a random number between 1 and 4.
function generateRandomNumber() {
	var number = Math.ceil(Math.random() * 4)
	return number;
}

//PROCESSING: Pick a random quote to display at the end of the game.
function getRandomQuote() {
	var quoteNumber = generateRandomNumber();
	switch (quoteNumber) {
		case 1:
			return "Mary had a little lamb. " + 
			"Until she did not.";
		case 2:
			return "There were only five sheep hurt in the making of this game.";
		case 3:
			return "Fortunately, none of the sheep were brides of a Welsh man.";
		case 4:
			return "Those sheep are counting themselves for eternity.";
		default:
			return "ERROR: No quote found.";
	}
}

//OUTPUT: Display the HTML for the first menu screen.
function loadScene0() {
	document.getElementById("musicID").pause();
	document.getElementById("rainAudioID").pause(); 
	document.getElementById("prefaceWindowID").style.visibility = "visible";
}

//OUTPUT: Display the HTML for the second menu screen.
function loadScene1() {
	document.getElementById("prefaceImageID").src = "images/pug.png";
	document.getElementById("prefaceTextID").innerHTML =
		"Fed up with " + 
		"<span class='emphasisClass'>humanity, </span>" +
		"The dogs decided to stay in the cosmos. " +
		"Unfortunately for Max. " +
		"His home is about to be destroyed by space rain. <br><br>" +
		"Like any good boy, he must herd the " +
		"<span class='emphasisClass'>galactic sheep </span>" +
		"to safety.";

	document.getElementById("prefaceImageID").onmouseover = function() {
		document.getElementById("prefaceImageID").src = "images/pug_blink.png";
	}

	document.getElementById("prefaceImageID").onmouseout = function() {
		document.getElementById("prefaceImageID").src = "images/pug.png";
	}
}

//OUTPUT: Display the HTML for the instruction screen.
function loadScene2() {
	$("#prefaceImageID").remove();
	document.getElementById("prefaceTextID").innerHTML =
		"Move Max using " +
		"<span class='emphasisClass'>W,A,S,D</span> " +
		"or the " +
		"<span class='emphasisClass'>Arrow Keys</span>" +
		"<br><br>" +
		"Keep the lambs away from the shadows on the ground! That's " +
		"<span class='emphasisClass'>space rain!</span>" +
		"<br><br>" +
		"Herd the sheep by pressing " +
		"<span class='emphasisClass'>ENTER</span> " +
		" or " +
		"<span class='emphasisClass'>SPACE BAR</span>" +
		"<br><br>" + 
		"Keep all your sheep alive!" +
		"<br><br>";
}

//OUTPUT: Display the HTML for the Game Window.
function loadScene3() {
	document.getElementById("musicID").play();
	document.getElementById("rainAudioID").play(); 

	$("#prefaceWindowID").remove();
	game.gameStarted = true;
}

//OUTPUT: Display the HTML for the Game Over screen.
function loadScene4() {
	document.getElementById("gameWindowID").style.visibility = "hidden";
	document.getElementById("gameOverWindowID").style.visibility = "visible";
	document.getElementById("gameOverQuoteID").innerHTML = getRandomQuote();
}

//PROCESSING: Load a scene.
function loadScene(sceneNumber) {
	if (sceneNumber == 0)
		loadScene0();
	else if (sceneNumber == 1)
		loadScene1();
	else if (sceneNumber == 2)
		loadScene2();
	else if (sceneNumber == 3)
		loadScene3();
	else if (sceneNumber == 4)
		loadScene4();
}

//PROCESSING: Load the next scene in the sequence.
var loadNextScene = function() {
	game.currentScene++;
	loadScene(game.currentScene);
}

//INPUT: When the Next... button is pushed, load the next scene.
document.getElementById("prefaceButtonID").onclick = loadNextScene;

