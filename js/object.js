class Obj{
	static StartX;
	static StartY;
	static start = true;
	constructor(posX, posY, color){
		// Start postion of objects to return after simulating
		this.StartPosX = posX;
		this.StartPosY = posY;
		// Setting a position and color and flag of object
		this.posX 	= posX;
		this.posY 	= Obj.start ? posY : -posY;
		this.color 	= color;
		this.start  = Obj.start;
		// Speed x and y
		this.speedX = 0;
		this.speedY = 0;
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
}