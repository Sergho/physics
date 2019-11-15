class Obj{
	constructor(posX, posY, color){
		// Setting a position and color of object
		this.posX = posX;
		this.posY = posY;
		this.color = color;
	}
	Draw(ctx, zoom){

		// Drawing object
		ctx.fillStyle = this.color;
		ctx.fillRect(this.posX * zoom, this.posY * zoom, zoom, zoom);
	}
	NewPos(posX, posY){
		this.posX = posX;
		this.posY = posY;
	}
}