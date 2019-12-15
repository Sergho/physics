class Physic{
	constructor(canvas, objects){
		// Flag of gravitation
		this.gravTrig = false;
		// init canvas and array of objects
		this.canvas 	= canvas;
		this.objects 	= objects;
		this.simulate = false;
		this.fps 			= 60;
		// Checking button for click and then simulate
		this.Simulate();
	}
	Simulate(){
		// button of simulating
		const simulate = document.querySelector(".simulate button");
		// checking if button clicked
		simulate.onclick = () => {
			// changing the state of simulate flag
			this.simulate = !this.simulate;
			if(this.simulate){
				simulate.innerHTML = 'Stop';
				// start interval if flag works
				this.timer = setInterval(() => {
					// Making iteration with frequency of 60fps
					this.Iteration();
				}, 1000/this.fps);
			} else {
				simulate.innerHTML = 'Start';
				// clearing interval if flag was disabled
				clearInterval(this.timer);
				this.Return();
			}
		};
	}
	// One iteration
	Iteration(){
		// Clearing canvas
		this.canvas.Clear();
		// Doing action eith all of objects
		this.objects.forEach((obj) => {
			// Setting a new position
			obj.NewPos(obj.speedX / this.fps, obj.speedY / this.fps, true);
			// Setting a new speed
			obj.NewSpeed(obj.accelX / this.fps, obj.accelY / this.fps, true);
			// Drawing all
			this.canvas.DrawObj(obj);
		})
	}
	Return(){
		// Returning to start position and speed
		this.objects.forEach((object) => {
			object.NewPos(object.StartPosX, object.StartPosY, false);
			object.NewSpeed(object.StartSpeedX, object.StartSpeedY, false);
		});
		// Drawing all
		this.canvas.DrawAll(this.objects);
	}
	ChangeGravitation(){	// Changing gravitation by checking value from gravTrigger
		if(this.gravTrig){	// if trigger is true adding g for all of objects
			this.objects.forEach((obj) => {
				obj.NewAcceleration(0, -10, true);
			});	
			// removing acceleration from start of coords
			this.objects[0].NewAcceleration(0, 0);
		} else {	// if no trigger removing g from all
			this.objects.forEach((obj) => {
				obj.NewAcceleration(0, 0);
			});	
		}
	}
}
