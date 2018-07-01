//Entity class for passive AI characters. (e.g., Lambs)
class Entity {

    //INITIALIZATION: Constructor
	constructor(id, x, y) {
        this.id = id;

        //Variables that store the position
        this.x = x;
        this.y = y;

        //Used to differentiate between Lamb vs other Entities
        this.type = "Lamb";

        this.isAlive = true;

        //Stores the direction the character is facing.
        this.direction = 0;

        //Used to trigger panicking AI movements when true.
        this.isPanicked = false;

        //Used to keep the short clean and concise.
        this.instance = document.getElementById(id);

        //Initial set of position for the sprite.
        this.instance.style.left = x + "px";
        this.instance.style.top = y + "px";
        
        this.distanceToPlayer = 0;

        //Changes at an interval to make random movement for lambs.
        this.randomPoint = Boundaries.getRandomPoint();
    }

    //OUTPUT: Update the sprite to match the x,y position of the Entity.
 	updatePosition() {
 		this.instance.style.left = parseInt(this.x) + "px";
 		this.instance.style.top = parseInt(this.y) + "px";
 	}

    //PROCESSING: Move the entity to a random point
 	moveToRandomPoint(speed, maxDistance) {

        var targetPosX = this.randomPoint.x;
        var targetPosY = this.randomPoint.y;

        var dx = targetPosX - this.x;
        var dy = targetPosY - this.y;

        var distance = Math.sqrt(dx * dx + dy * dy);

        var directionX = Math.cos(Math.atan2(dy, dx));
        var directionY = Math.sin(Math.atan2(dy, dx));

        this.direction = directionX;

        //PLAYER IS NOT AT TARGET
        if (distance > maxDistance) {
            this.x += speed * directionX;
            this.y += speed * directionY;
        } 

        //PLAYER IS AT TARGET
        else
            this.goToNewPoint();
    }

    //PROCESSING: Return a random distance between 50 and 110.
    getRandomDistance() {
        return Math.floor(Math.random() * 60) + 50;
    }

    //PROCESSING: Returns a random Vector with x,y values from [-1,1]
    getRandomVector2() {
        var vector = new Vector2(0,0);
        vector.x = Math.floor(Math.random() * 3) - 1;
        vector.y = Math.floor(Math.random() * 3) - 1;
        return vector;
    }

    //PROCESSING: Flips the entity depending on direction sprite is facing.
    animate() {
        if (this.direction < 0) {
            Animations.flipEntity(this, "right");
        }  
        
        else {
            Animations.flipEntity(this, "left");
        }
    }

    //PROCESSING: Move the entity to a new location when not panicked.
    goToNewPoint() {
        this.randomPoint = Boundaries.getRandomPoint();
    }

    //PROCESSING: Moves the position of a Lamb randomly within bounds.
    panic() {

        //Let it be known, this entity is literally freaking out.
        this.isPanicked = true;

        //Prevent the lamb from going back after getting herded.
        this.goToNewPoint();

        //Choose which direction to move (up/left/down/right)
        var directionVector = this.getRandomVector2();

        while (directionVector.x == 0 && directionVector.y == 0) {
            directionVector = this.getRandomVector2();
        }

        //Get a random distance to move by.
        var distance = this.getRandomDistance();

        //The new position the sheep is going towards.
        var finalPos = new Vector2(this.x, this.y);
      
        //The new position the sheep is moving towards, BEFORE it moves.
        var simulatedPos = new Vector2(this.x, this.y);
        simulatedPos.x += directionVector.x * distance;
        simulatedPos.y += directionVector.y * distance;

        //Make sure the target position is in bounds.
        while (!Boundaries.isInBounds(simulatedPos.x,simulatedPos.y))
        {
            directionVector = this.getRandomVector2();
            distance = this.getRandomDistance();

            simulatedPos = new Vector2(this.x, this.y);
            simulatedPos.x += directionVector.x * distance;
            simulatedPos.y += directionVector.y * distance;
        }

        //Prioritizing left/right movements first.
        if (directionVector.x != 0) {
            this.direction = directionVector.x;
            finalPos.x = this.x + distance * directionVector.x;
            //OUTPUT: Uses jQuery to animate the lamb to the new position.
            //APPROVED BY DRAPAK
            $("#" + this.id).animate({left: Math.round(finalPos.x) + "px"});    
        }
        else if (directionVector.y != 0) {
            finalPos.y = this.y + distance * directionVector.y;
            //OUTPUT: Uses jQuery to animate the lamb to the new position.
            //APPROVED BY DRAPAK
            $("#" + this.id).animate({top: Math.round(finalPos.y) + "px"});
        }
        
        //Stop panicking after the lamb moves and update x,y coordinates.
        var lamb = this;
        setTimeout(function() {
            lamb.x = finalPos.x;
            lamb.y = finalPos.y;
            lamb.isPanicked = false;
            lamb.updatePosition(); 
        }, 400);
    }
}