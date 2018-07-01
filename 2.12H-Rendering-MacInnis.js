//CLASS: sorts the drawing order for sprites.
class Rendering {
	//OUTPUT: Change the Z-Index of an element.
	static changeZIndex(id, value) {
		document.getElementById(id).style.zIndex = value;
	}

	//PROCESSING: Sorting function that compares entities by Z-index.
	static sortZIndex(entities) {
		entities.sort(function(a,b){return a.y-b.y});
	}

	//PROCESSING: Dynamically render sprites from back to front.
	static renderBackToFront() {
		Rendering.sortZIndex(game.entities);

		for (var i = 0; i < game.entities.length; i++) {
			var entity = game.entities[i];
			this.changeZIndex(entity.id, i + 1);
		}
	}
}
