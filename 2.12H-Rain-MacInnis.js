class Raindrop {
	constructor(id) {
		this.x = 0;
		this.y = 0;
		this.id = id;
		this.setRandomPosition();
	}

	//Returns the position of the raindrop
	getPosition() {
		return new Vector2(this.x, this.y);
	}

	//Make the raindrop spawn at a random point.
	setRandomPosition() {
		var point = Boundaries.getRandomPoint();
		this.x = point.x;
		this.y = point.y;

		document.getElementById(this.id).style.left = this.x + "px";
		document.getElementById(this.id).style.top = this.y + "px";
	}
}

//PROCESSING: Kill an entity
function hurt(entity) {
	Animations.hurtEntity(entity);

	if (entity.type == "Lamb" && entity.isAlive) {
		entity.isAlive = false;
		game.sheepAlive--;
	}

	return;
}

//PROCESSING: Check for any raindrop->entity collisions.
function checkRaindropCollisions(entities) {
	for (var i = 0; i < entities.length; i++) {
		for (var j = 0; j < game.raindrops.length; j++) {
			var entity = entities[i];
			var raindrop = game.raindrops[j];
			
			var distance = Boundaries.getDistanceOfPoints(
						   entity.x, raindrop.x,
						   entity.y, raindrop.y);

			if (distance < 50) {
				hurt(entity);
				return;
			}

			if (game.sheepAlive == 0)
				gameOver();
		}
	}
}

//PROCESSING: Deletes all of the raindrops
function resetRaindrops() {
	for (var i = 0; i < game.raindrops.length; i++) {
		var id = "rainDrop" + (i + 1);
		$('#' + id).remove();
	}

	game.raindrops = [];
}

//OUTPUT: Instantiates Raindrop elements into the DOM
function instantiateRaindrops() {
	for (var i = 1; i <= game.numRainDrops; i++) {
		var leftTop = 0;
		var rightTop = 0;

		var rainDropElement = $("<img id='rainDrop" + i + "' src='images/shadow.png' class='shadowClass'>");
		$("#rainDropsID").append(rainDropElement);

		var raindrop = new Raindrop("rainDrop" + i);
		game.raindrops.push(raindrop);
	}
}

//PROCESSING: Generates the Raindrops that hurt the lambs.
function generateRaindrops(entities) {
	//Instantiates raindrops dynamically
	instantiateRaindrops();

	//At a raindrop's half-life check for collisions
	setTimeout(function() {
		if (game.gameStarted)
			checkRaindropCollisions(entities);
	}, 5000);

	//Remove all the raindrops, and try again.
	setTimeout(function() {
		resetRaindrops();
		generateRaindrops(entities);
	}, 10000);
}

