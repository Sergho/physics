class Obj{
	static StartX;
	static StartY;
	static start = true;
	static gravTrig = false;
	constructor(posX, posY, color){
		// Start postion of objects to return after simulating
		this.StartPosX = posX;
		this.StartPosY = posY;
		// Start speed of object
		this.StartSpeed = 0;
		this.StartSpeed = 0;
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
			Obj.start  = false
		}
	}
	NewPos(posX, posY, delta){
		if(!delta){
			this.posX = posX;
			this.posY = this.start ? posY : -posY;
		} else {
			this.posX += posX;
			this.posY += this.start ? posY : -posY;
		}
		if(this.start){
			Obj.StartX = this.posX;
			Obj.StartY = this.posY;
		}
	}
	NewSpeed(speedX, speedY, delta){
		if(!delta){
			this.speedX = speedX;
			this.speedY = speedY;
		} else {
			this.speedX += speedX;
			this.speedY += speedY;
		}
	}
	NewAcceleration(accelX, accelY){
		this.accelX = accelX;
		this.accelY = accelY;
	}
}