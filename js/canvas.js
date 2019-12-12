class Canvas{
	constructor(zoom){	// constructor
		// Getting DOM canvas
		this.canvas = document.querySelector("canvas");
		// Setting canvas attributes
		this.canvas.width 	= window.innerWidth;
		this.canvas.height 	= window.innerHeight;
		// Getting canvas context
		this.ctx 		= this.canvas.getContext("2d");
		// Zoom
		this.zoom = zoom;
	}
	DrawNet(){ //Drawing a coord net
		//Begin Path of net
		this.ctx.beginPath();
		// Horizontal
		for (let x = 0; x < this.canvas.width; x += this.zoom) {
			this.ctx.moveTo(x, 0);
			this.ctx.lineTo(x, this.canvas.height);
		}

		// Vertical
		for (let y = 0; y < this.canvas.height; y += this.zoom) {
			this.ctx.moveTo(0, y);
			this.ctx.lineTo(this.canvas.width, y);
		}

		// Draw
		this.ctx.lineWidth = 0.2;
		this.ctx.strokeStyle = "black";
		this.ctx.stroke();
	}
	DrawObj(obj){
		// Drawing object
		this.ctx.fillStyle = obj.color;
		if(obj.start) this.ctx.fillRect(obj.posX * this.zoom, obj.posY * this.zoom, this.zoom, this.zoom);
		else this.ctx.fillRect((Obj.StartX + obj.posX) * this.zoom, (Obj.StartY + obj.posY) * this.zoom, this.zoom, this.zoom)
	}
	DrawAll(objects){
		this.Clear();
		this.DrawNet(this.zoom);
		DrawObjS(objects);
	}
	DrawObjS(objects){
		objects.forEach((obj) => {
			this.DrawObj(obj, this.zoom);
		})
	}

	Clear(){
		// Clear screen
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}
}
