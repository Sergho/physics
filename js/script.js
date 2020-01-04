// Setup function
function Main(){
	// Canvas
	const canv 	= new Canvas(30);
	// Objects
	let objects = [new Obj(Math.floor(canv.canvas.width / 2 / canv.zoom), Math.floor(canv.canvas.height / 2 / canv.zoom), "#ccc", "square"), new Obj(2, 1, "red", "circle"), new Obj(-6, 3, "black", "rect120:1", true), new Obj(-6, -3, "black", "rect120:1", true)];

	// Drawing all
	canv.DrawAll(objects);

	objects[1].NewSpeed(3, 100, false, true);

	// Physic lib
	const physic = new Physic(canv, objects);
	// User interface
	const ui = new UI(canv, objects, physic);

}

// Setting Up )
Main();
