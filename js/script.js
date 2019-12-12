// Setup function
function Main(){
	// Canvas
	const canv 	= new Canvas(30);
	// Objects
	let objects = [new Obj(Math.floor(canv.canvas.width / 2 / canv.zoom), Math.floor(canv.canvas.height / 2 / canv.zoom), "#ccc"),
	 							new Obj(2, 1, "red"),
								new Obj (-1, 2, "blue")];

	// Drawing all
	canv.DrawAll(objects);

	objects[1].NewSpeed(10, 10, false, true);
	objects[2].NewSpeed(10, 10, false, false);

	// Physic lib
	const physic = new Physic(canv, objects);
	// User interface
	const ui = new UI(canv, objects, physic);

}

// Setting Up )
Main();
