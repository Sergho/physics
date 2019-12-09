// Setup function
function Main(){
	// Canvas
	const canv 	= new Canvas(30);
	// Objects
	let objects = [new Obj(Math.floor(canv.canvas.width / 2 / canv.zoom), Math.floor(canv.canvas.height / 2 / canv.zoom), "#ccc"), new Obj(2, 1, "red")];

	// Drawing all
	canv.DrawAll(objects);

	objects[1].NewAcceleration(1, 2);

	// User interface
	const ui = new UI(canv, objects);
	const physic = new Physic(canv, objects);

}
function toggleGravity(elem) {
	elem.classList.toggle("active");
}


// Setting Up )
Main();
