// zoom integer
let zoom = 10;
// Setup function 
function Main(){
	// Canvas
	const canv = new Canvas();
	// Draw a cordinat NET
	canv.DrawNet();
	// New object in center
	let center = new Obj(Math.floor(canv.canvas.width / 2 / zoom), Math.floor(canv.canvas.height / 2 / zoom), "black");
	// Draw it!
	center.Draw(canv.ctx, zoom);
	// New object as start of coord
	let start = new Obj(Math.floor(canv.canvas.width / 2 / zoom) - 1, Math.floor(canv.canvas.height / 2 / zoom), "red");

	start.Draw(canv.ctx, zoom);

	// Bool if mouse button is pressed
	let pressed = false;
	canv.canvas.addEventListener("mousedown", function(){pressed = true; console.log(pressed)});
	canv.canvas.addEventListener("mouseup", function(){pressed = false;console.log(pressed)});
	canv.canvas.addEventListener("mousemove", function(e){
		if(pressed) Move(e.movementX, e.movementY);
	})
	// function of moving
	function Move(x, y){
		if(x > 0) x = 1;
		if(y > 0) y = 1;
		if(x < 0) x = -1;
		if(y < 0) y = -1;
		start.NewPos(start.posX + x, start.posY + y);
		canv.Clear();
		canv.DrawNet();
		start.Draw(canv.ctx, zoom);
		center.Draw(canv.ctx, zoom);
	}
}

// Setting Up )
Main();