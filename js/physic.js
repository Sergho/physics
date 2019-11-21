class Physic{
	constructor(canvas, objects){
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
				this.Return()
			}
		};
	}
	Iteration(){
		this.canvas.Clear();
		this.objects.forEach((obj) => {
			obj.NewPos(obj.speedX / this.fps, obj.speedY / this.fps, true);
			this.canvas.DrawObj(obj);
		})
	}
	Return(){
		this.objects[1].NewPos(this.objects[1].StartPosX, this.objects[1].StartPosY, false);
		this.canvas.DrawAll(this.objects);
	}
}
