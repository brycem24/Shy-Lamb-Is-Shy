//Static class containing functions that help AI establish boundaries in the map.
class Boundaries {
	//PROCESSING: Return the distance between two points.
	static getDistanceOfPoints(x1,x2, y1,y2) {
		var dy = y2-y1;
		var dx = x2-x1;

		return Math.sqrt(dx * dx + dy * dy);
	}

	//PROCESSING: Return the distance from the origin of the circle.
	static getDistanceFromCenter(x,y) {
		var dx = x - this.CIRCLE_CENTER_X;
		var dy = y - this.CIRCLE_CENTER_Y;

		return Math.sqrt(dx * dx + dy * dy);
	} 

	//PROCESSING: Returns if the point is within the circle. 
	static isInBounds(x,y) {
		var distance = this.getDistanceFromCenter(x,y);
		if (distance < this.CIRCLE_RADIUS)
			return true;
		else
			return false;
	}

	//PROCESSING: Returns a point on the circumference of a circle given angle and radius.
	static getPointOnCircumference(radians, radius) {
		var point = new Vector2();

		point.x = 	Boundaries.CIRCLE_CENTER_X
					+ radius
					* Math.cos(radians);
		
		point.y = 	Boundaries.CIRCLE_CENTER_Y
					+ radius
					* Math.sin(radians);

		point.x = Math.round(point.x);
		point.y = Math.round(point.y);
		
		return point;
	}

	// PROCESSING: Return a random point inside the circle.
	static getRandomPoint() {
		var angle = Math.random()
					* Math.PI 
					* 2;

		var radius = Math.random() * Boundaries.CIRCLE_RADIUS;
	
		var point = this.getPointOnCircumference(angle, radius);
		return point;
	}
}

//INITIALIZATION: Properties of the circle boundary around map.
Boundaries.CIRCLE_DIAMETER = 768;
Boundaries.CIRCLE_RADIUS = Boundaries.CIRCLE_DIAMETER / 2;
Boundaries.CIRCLE_CENTER_X = 400;
Boundaries.CIRCLE_CENTER_Y = 400;