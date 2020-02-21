// Setup function
function Main(){
	// Canvas
	const canv 	= new Canvas(30);
	// Objects
	let objects = [new Obj(Math.floor(canv.canvas.width / 2 / canv.zoom), Math.floor(canv.canvas.height / 2 / canv.zoom), "#ccc", "square", false, canv), new Obj(7, 8, "lime", "circle")];
	objects[0].BindCanvas(canv);

	// Drawing all
	canv.DrawAll(objects);

	objects[1].NewSpeed(2, 0, false, true);

	// Physic lib
	const physic = new Physic(canv, objects);
	// User interface
	const ui = new UI(physic);

}

// Setting Up )
Main();
