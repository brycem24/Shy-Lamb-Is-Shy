//SINGLETON CLASS THAT HANDLES ALL ANIMATIONS.
class Animations {

    //OUTPUT: Flips the sprite of the entity
    static flipEntity(entity, direction) {
        var element = document.getElementById(entity.id);

        if (direction == "left")
            element.classList.remove("flippedClass");
        else if (direction == "right")
            element.classList.add("flippedClass");
    }

    //OUTPUT: Opens/closes the eyes of the pug
    static pugChangeEyes(option) {
        if (option == "open")
            document.getElementById("pugID").src = "images/pug.png";
        else if (option == "closed")
            document.getElementById("pugID").src = "images/pug_blink.png";
    }

    //OUTPUT: Displays the appropriate sprite for hurt animations.
    static hurtEntity(entity) {
        var element = entity.instance;

        if (entity.type == "Pug") {
            element.src = "images/pug_hurt.png";
            element.classList.add("hurtClass");

            setTimeout(function() {
            	element.src = "images/pug.png";
            	element.classList.remove("hurtClass");
            }, 600);
        }
        else if (entity.type == "Lamb") {
            element.src = "images/lamb_hurt.png";
            element.classList.add("deathClass");
        }
    }
}