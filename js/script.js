// zoom integer
let zoom = 10;
// Setup function 
function Main(){
	// Canvas
	const canv = new Canvas();
	// Draw a cordinat NET
	canv.DrawNet();

	// New object as start of coord
	let start = new Obj(Math.floor(canv.canvas.width / 2 / zoom) - 1, Math.floor(canv.canvas.height / 2 / zoom), "#ccc");
	// Draw it
	start.Draw(canv.ctx, zoom);

	// Objects
	let objects = [new Obj(100, 100, "red"), new Obj(110,100, "red"), new Obj(120,100, "red"), new Obj(110,110, "red")];

	// Moving by arrows
	document.onkeydown = Test;
	function Test(e){
		// delta x and delta y
		let dx = 0, dy = 0;
		// init deltas
		if(e.key == "ArrowDown") dy = -1;
		if(e.key == "ArrowUp") dy = 1;
		if(e.key == "ArrowRight") dx = -1;
		if(e.key == "ArrowLeft") dx = 1;
		// Setting a new position for start of coord
		start.NewPos(start.posX + dx, start.posY + dy);
		// Drawing all
		canv.Clear();
		canv.DrawNet();
		start.Draw(canv.ctx, zoom);
		objects.forEach(function(obj){
			obj.NewPos(obj.posX + dx, obj.posY + dy);
			obj.Draw(canv.ctx, zoom);
		});
	}
}

// Setting Up )
Main();