class Obj{
	// Coordinates of start of coordinates
	static StartX;
	static StartY;
	// Flag if object is start object (will returned to false after each object construct)
	static start = true;
	constructor(posX, posY, color){
		// Start postion of objects to return after simulating
		this.StartPosX = posX;
		this.StartPosY = posY;
		// Start speed of object
		this.StartSpeedX = 0;
		this.StartSpeedY = 0;
		// Setting a position and color and flag of object
		this.posX 	= posX;
		this.posY 	= Obj.start ? posY : -posY;
		this.color 	= color;
		this.start  = Obj.start;
		// Speed x and y
		this.speedX = 0;
		this.speedY = 0;
		// Acceleration x and y
		this.accelX = 0;
		this.accelY = 0;
		// Setting static coord of start point
		if(this.start){
			Obj.StartX = posX;
			Obj.StartY = posY;
			Obj.start  = false;
		}
	}
	NewPos(posX, posY, delta){	// New position for object
		// Checking delta, if true - incrementing position
		if(!delta){
			this.posX = posX;
			this.posY = this.start ? posY : -posY;
		} else {		// else setting a new position
			this.posX += posX;
			this.posY += this.start ? posY : -posY;
		}
		if(this.start){		// if it is the start point - setting new start of coordinates
			Obj.StartX = this.posX;
			Obj.StartY = this.posY;
		}
	}
	NewSpeed(speedX, speedY, delta, start){	// New speed and start speed for objects nearly same with position, so check it higher
		if(!delta){
			this.speedX = speedX;
			this.speedY = speedY;
		} else {
			this.speedX += speedX;
			this.speedY += speedY;
		}
		if(start){				// Setting start speed if start flag is true
			this.StartSpeedX = speedX;
			this.StartSpeedY = speedY;
		}
	}
	NewAcceleration(accelX, accelY, delta){	// Setting a new acceleration for object
		if(!delta){
			this.accelX = accelX;
			this.accelY = accelY;
		} else {
			this.accelX += accelX;
			this.accelY += accelY;
		}
	}
	ChangeGravitation(){
		if(Obj.gravTrig){

		}
	}
}