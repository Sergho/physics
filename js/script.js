// Setup function
function Main(){
	// Canvas
	const canv 	= new Canvas(3);
	// Objects
	let objects = [new Obj(Math.floor(canv.canvas.width / 2 / canv.zoom), Math.floor(canv.canvas.height / 2 / canv.zoom), "#ccc", "rect", "1:1", false, canv), new Obj(0, 0, "lime", "circle", "40:"), new Obj(50, 35, "lime", "rect", "1:100", true), new Obj(-50, 35, "lime", "rect", "1:100", true), new Obj(-50, 50, "lime", "rect", "100:1", true), new Obj(-50, -70, "lime", "rect", "100:1", true)];
	objects[0].BindCanvas(canv);

	// Drawing all
	canv.DrawAll(objects);

	objects[1].NewSpeed(50, 20, false, true);

	// Physic lib
	const physic = new Physic(canv, objects);
	// User interface
	const ui = new UI(physic);

}

// Setting Up )
Main();
