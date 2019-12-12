class UI{
	constructor(canvas, objects, physic){
		// init canvas and array of objects and physics core
		this.physic = physic
		this.canvas = canvas;
		this.objects = objects;
		this.gravyTrig = false;
		// Functions of moving or changing zoom (add event listeners)
		this.MoveDesktop();
		this.MoveMobile();
		this.ZoomDesktop();
		this.UpdateCanv();
		this.ChangeGravy();
	}
	MoveDesktop(){
		// Moving by arrows (transition)
		document.onkeydown = (e) => {
			// delta x and delta y
			let dx = 0, dy = 0;
			// init deltas
			if(e.key == "ArrowDown") dy = -1;
			if(e.key == "ArrowUp") dy = 1;
			if(e.key == "ArrowRight") dx = -1;
			if(e.key == "ArrowLeft") dx = 1;

			// New position and drawing all
			this.objects[0].NewPos(dx, dy, true);
			this.canvas.DrawAll(this.objects);
		}
	}
	MoveMobile(){
		// coords of touch start
		let startX, startY;
		// Moving by swipes
		document.ontouchstart = (e) => {
			// init start touch coords
			startX = e.touches[0].screenX;
			startY = e.touches[0].screenY;
		}

		document.ontouchmove = (e) => {
			// Get deltas
			let dx = -Math.round((startX - e.touches[0].screenX) / this.canvas.zoom * 2);
			let dy = -Math.round((startY - e.touches[0].screenY) / this.canvas.zoom * 2);
			// Move and Draw
			this.objects[0].NewPos(dx, dy, true);
			this.canvas.DrawAll(this.objects);
			// Update Start coords
			startX = e.touches[0].screenX;
			startY = e.touches[0].screenY;
		}
	}
	ZoomDesktop(){
		// Changing zoom on scroll with shift
		document.onmousewheel = (e) => {
			if(e.shiftKey){
				// Get Delta
				let delta = e.wheelDeltaY / 120;
				// Change zoom
				this.canvas.zoom += delta;
				// Min and max control
				if(this.canvas.zoom < 10) 	this.canvas.zoom = 10;
				if(this.canvas.zoom > 100) 	this.canvas.zoom = 100;
				// Start to center
				this.objects[0].NewPos(Math.floor(window.innerWidth / 2 / this.canvas.zoom) - 1, Math.floor(window.innerHeight / 2 / this.canvas.zoom));
				// Draw All
				this.canvas.DrawAll(this.objects);
			}
		}
	}
	UpdateCanv(){
		// Updating canvas size
		window.onresize = () => {
			// Width
			this.canvas.canvas.width = window.innerWidth;
			// And height
			this.canvas.canvas.height = window.innerHeight;
			// Drawwing all to see updates
			this.canvas.DrawAll(this.objects);
		}
	}
	ChangeGravy(){
		// trigger to gravitation
		const trig 		= document.querySelector(".change_gravy .gravy_trig");
		// visible part of trigger
		const visible = document.querySelector(".change_gravy .visible");
		// catching click on it
		trig.addEventListener("click", () => {
			// To Do styles for trigger
			
			visible.classList.toggle("active");

			// Inverting trig of gravitation
			this.physic.gravTrig = trig.checked;
			this.physic.ChangeGravitation();
		});
	}
}