class Player {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.type = "Pug";
        this.instance = document.getElementById(id);
        //Initial set of position
        this.instance.style.left = x + "px";
        this.instance.style.top = y + "px"; 
    }

    //PROCESSING: Move the entity, if in bounds, by keyboard input.
    movePlayer() {
        this.simulatedXPosition = this.x + 1.5 * Input.x;
        this.simulatedYPosition = this.y + 1.5 * Input.y;

        var inBounds = Boundaries.isInBounds(
                this.simulatedXPosition,
                this.simulatedYPosition
            );

        if (inBounds) {
             this.x = this.simulatedXPosition;
             this.y = this.simulatedYPosition;
        }
    }

    //PROCESSING: Call the hurt animation when injured.
    hurt() {
         Animations.hurtEntity(this);
    }
    
    //PROCESSING: Bark at any lambs near by.
    bark(lambs) {
        for (var i = 0; i < lambs.length; i++)
        {
            var lamb = lambs[i];

            //The distance between the lamb and the pug.
            var distance = Boundaries.getDistanceOfPoints(
                    lamb.x, this.x,
                    lamb.y, this.y
            )

            //Only allows lambs to be panicked once at a time.
            if (distance < 100 && !lamb.isPanicked) {
                lamb.panic();
            }
        }
    }

    //PROCESSING: Flips the player depending on horizontal movement.
    animate() {
        if (Input.x > 0)
            Animations.flipEntity(this, "right");
        else if (Input.x < 0)
            Animations.flipEntity(this, "left");
    }

    //OUTPUT: Changes the position of the sprite to match the x,y position.
    updatePosition() {
        this.instance.style.left = parseInt(this.x) - 75 + "px";
        this.instance.style.top = parseInt(this.y) - 50 + "px";
    }
}
