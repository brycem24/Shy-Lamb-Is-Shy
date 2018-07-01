//INITIALIZE: objects are defined here.
var player = new Player("pugID", 500, 300);
var lamb1 = new Entity("lamb1ID", 200, 200);
var lamb2 = new Entity("lamb2ID", 400, 200);
var lamb3 = new Entity("lamb3ID", 300, 500);
var lamb4 = new Entity("lamb4ID", 600, 100);
var lamb5 = new Entity("lamb5ID", 300, 100);

//Game object used to store global variables.
var game = { 
	entities: [ player, lamb1, lamb2, lamb3, lamb4, lamb5 ],
	lambs: [ lamb1, lamb2, lamb3, lamb4, lamb5 ],
	raindrops: [],
	numRainDrops: 10,
	sheepAlive: 5,
	currentScene: 0,
	gameStarted: false,
}

//INPUT: Register a keypress
window.onkeydown = function(event) {
	Input.handleInput(event);
	if (Input.isTriggered)
		player.bark(game.lambs);
} 

//INPUT: Signal that a key was released.
window.onkeyup = Input.releaseInput;

//INPUT: When the user clicks, close the pug's eyes.
window.onmousedown = function() {
	Animations.pugChangeEyes("closed");
}

//INPUT: When the user releases the mouse, open the pug's eyes.
window.onmouseup = function() {
	Animations.pugChangeEyes("open");
}

//PROCESSING: End the game.
function gameOver() { 
	gameStarted = false;
	setTimeout(loadScene(4), 5000);
}

//MAIN: the main function called every frame.
var mainProcedure = function() {
	if (game.gameStarted) {
		player.movePlayer();
		player.updatePosition();
		player.animate();

		for (var i = 0; i < game.lambs.length; i++) {
			var lamb = game.lambs[i];
			lamb.animate();
			lamb.moveToRandomPoint(1,1);
			lamb.updatePosition();
		}

		Rendering.sortZIndex(game.entities);
		Rendering.renderBackToFront(game.entities);
	}

	console.log("# RAINDROPS: " + game.numRainDrops);
}

//Forces game to be capped at ~60fps.
var TIME_TO_RENDER_FRAME = 16.7;
setInterval(mainProcedure, TIME_TO_RENDER_FRAME);

//MAIN: the main function called at initialization only.
var start = function() {
	setTimeout(
		generateRaindrops(game.entities)
	, 2000);

	//After 30 seconds, keep adding 2 new raindrops every 10 seconds.
	setTimeout(function() {
		if (game.gameStarted)
			game.numRainDrops += 2;

		setInterval(function() {
			if (game.gameStarted)
				game.numRainDrops += 2;
		}, 10000);
	}, 30000);


	loadScene(game.currentScene);
}


$(document).ready(start());