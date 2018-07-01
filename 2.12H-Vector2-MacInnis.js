class Vector2 
{
	//INITIALIZATION: default constructor.
	constructor(x,y)
	{
		this.x = x;
		this.y = y;
	}

	//OUTPUT: print the coordinates of this vector.
	print() {
		console.log('(' + this.x + ',' + this.y + ')');
	}
}