class Physic{
	constructor(canvas, objects){
		// Flag of gravitation
		this.gravTrig = false;
		// init canvas and array of objects
		this.canvas 	= canvas;
		this.objects 	= objects;
		this.simulate = false;
		this.fps 			= 120;
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
				simulate.classList.toggle("active")
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
			if(!obj.fixed) obj.NewPos(obj.speedX / this.fps, obj.speedY / this.fps, true);
			// Setting a new speed
			if(!obj.fixed) obj.NewSpeed(obj.accelX / this.fps, obj.accelY / this.fps, true);
			// Drawing all
			this.canvas.DrawObj(obj);
		});
		// Collisions

		this.objects.forEach((obj1) => {
			this.objects.forEach((obj2) => {
				if(obj1.form == "circle"){
					// ball and rect
					if(obj2.form.substring(0, 4) == "rect"){
						const width = +obj2.form.substring(4).split(":")[0];
						const height = +obj2.form.substring(4).split(":")[1];
						// let over is bool flag wnich true when ball is over or under rect
						let over = obj1.posX >= obj2.posX && obj1.posX <= obj2.posX + width;
						// I let rects to have walls which have thickness equal 1 meter, and we check if ball is in wall(top wall)
						let wall_top = obj1.posY + 1 >= obj2.posY && obj1.posY <= obj2.posY;
						// I let rects to have walls which have thickness equal 1 meter, and we check if ball is in wall(bottom wall)
						let wall_bottom = obj1.posY - 1 <= obj2.posY + height - 1 && obj1.posY >= obj2.posY + height - 1;
						// Horizontal rect
						if(over && wall_top){
							//Setting new position in edge of wall
							obj1.posY = obj2.posY - 1;
							// Change speed
							obj1.speedY = -obj1.speedY * 0.7;
						}
						if(over && wall_bottom){

							obj1.posY = obj2.posY + height;

							obj1.speedY = -obj1.speedY * 0.7;
						}
						// let over is bool flag wnich true when ball is left or right from rect
						let behind = obj1.posY >= obj2.posY && obj1.posY <= obj2.posY + height;
						// I let rects to have walls which have thickness equal 1 meter, and we check if ball is in wall(left wall)
						let wall_left = obj1.posX + 1 >= obj2.posX&& obj1.posX <= obj2.posX;
						// I let rects to have walls which have thickness equal 1 meter, and we check if ball is in wall(left wall)
						let wall_right = obj1.posX - 1 <= obj2.posX + width - 1 && obj1.posX >= obj2.posX + width - 1;
						// Vertical rect
						if(behind && wall_left){
							obj1.posX = obj2.posX - 1;
							// Change speed
							obj1.speedX = -obj1.speedX;
						}
						if(behind && wall_right){
							obj1.posX = obj2.posX + width;
							// Change speed
							obj1.speedX = -obj1.speedX * 0.7;
						}
					}
				}
			});
		});

	}
	Return(){
		// Returning to start position and speed
		for(let i = 1; i < this.objects.length; i++){
			this.objects[i].NewPos(this.objects[i].StartPosX, this.objects[i].StartPosY, false);
			this.objects[i].NewSpeed(this.objects[i].StartSpeedX, this.objects[i].StartSpeedY, false);
		}
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
