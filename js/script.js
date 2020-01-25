// Setup function
function Main(){
	// Canvas
	const canv 	= new Canvas(30);
	// Objects
	let objects = [new Obj(Math.floor(canv.canvas.width / 2 / canv.zoom), Math.floor(canv.canvas.height / 2 / canv.zoom), "#ccc", "square"), new Obj(0, 0, "red", "circle"), new Obj(-5, -5, "lime", "rect10:1", 1), new Obj(-4, 5, "lime", "rect10:1", 1), new Obj(-5, 5, "lime", "rect1:10", 1), new Obj(5, 4, "lime", "rect1:10", 1)];

	// Drawing all
	canv.DrawAll(objects);

	objects[1].NewSpeed(100, 200, false, true);

	// Physic lib
	const physic = new Physic(canv, objects);
	// User interface
	const ui = new UI(canv, objects, physic);

}

// Setting Up )
Main();
