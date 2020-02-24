class UI{
	constructor(physic){
		// init canvas and array of objects and physics core
		this.physic = physic
		this.canvas = physic.canvas;
		this.objects = physic.objects;
		this.control = "mouse";
		// Object in setting process
		this.obj_clicked = undefined;
		// Move mode trigger
		this.move = false;
		// Functions of moving or changing zoom (add event listeners)
		this.MoveDesktop();
		this.MoveMobile();
		this.ZoomDesktop();
		this.UpdateCanv();
		this.ChangeGravy();
		// Aside panel
		this.AsidePanel();
		this.AsidePanelPages();
		// Hover objects
		this.HoverObject();
		// Settings of objects
		this.ObjectSettings();
		// Move of object
		this.ObjectMove();
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
			this.canvas.DrawAll(this.objects, this.physic.simulate ? 1 : 0);
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
			this.canvas.DrawAll(this.objects, this.physic.simulate ? 1 : 0);
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
				this.canvas.DrawAll(this.objects, this.physic.simulate ? 1 : 0);
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
			this.canvas.DrawAll(this.objects, this.physic.simulate ? 1 : 0);
		}
	}
	ChangeGravy(){
		// trigger to gravitation
		const trig 		= document.querySelector(".change_gravy .gravy_trig");
		// visible part of trigger
		const visible = document.querySelector(".change_gravy .visible");
		// catching click on it
		trig.addEventListener("click", () => {
			// Switch class to visible part of trigger
			visible.classList.toggle("active");
			// Inverting trig of gravitation
			this.physic.gravTrig = trig.checked;
			this.physic.ChangeGravitation();
		});
	}
	// Aside panel open-close
	AsidePanel(){
		// Getting button, which opens and closes aside panel
		const btn = document.querySelector("aside .closed");
		// Aside panel
		const panel = document.querySelector("aside");
		// Aside panel content
		const content = panel.querySelector(".content");
		// Adding event listener for open and close
		btn.addEventListener("click", () => {
			if(btn.classList.contains("closed")){
				// Open
				// Btn change
				btn.classList.remove("closed");
				btn.classList.add("opened");
				// Aside panel show
				panel.style.transform = "translate(0, 0)";
				// Show content
				content.style.display = "block";
				setTimeout(() => {content.style.opacity = "1";}, 50);
			} else {
				// Close
				// Btn change
				btn.classList.remove("opened");
				btn.classList.add("closed");
				// Hide content
				content.style.opacity = "0";
				setTimeout(() => {content.style.display = "none"}, 550);
				// Aside panel hide
				panel.style.transform = "translate(75%, 0)";
			}
		});
	}
	// Aside panel pages change
	AsidePanelPages(){
		// All positions in navbar
		const navs = document.querySelectorAll(".pages-nav li");
		// All pages
		const pages = document.querySelectorAll(".pages li");
		// For each position add onclick function
		navs.forEach((nav) => {
			nav.addEventListener("click", () => {
				const index = Array.from(navs).indexOf(nav);
				// Hide all active positions in navbar
				navs.forEach((nav_item) => {
					nav_item.classList.remove("active");
				});
				// Hide all active slides
				pages.forEach((page_item) => {
					page_item.classList.remove("active");
				});
				// Show active position in navbar and active page
				nav.classList.add("active");
				pages[index].classList.add("active");
			});
		});
	}
	SelectControl(control){
		// Select mouse or touchpad
		this.control = control;
	}
	HoverObject(){
		let control = this.control;	// Mouse or touchpad
		const objects = Array.from(document.querySelectorAll(".pages .preview span"));		// All objects in sidebar
		const aside = document.querySelector("aside");		// Aside panel

		// Add action on mouse hover
		objects.forEach((object) => {
				// For desktop
				if(control == "mouse"){
					let startTouch = false;
				// When mouse is on active pos
				object.addEventListener("mousedown", () => {
					startTouch = true;
					if(!this.physic.simulate){
						// Creating a (shadow) of the object
						if(objects.indexOf(object) == 0){ 
							this.objects.push(new Obj(1, 1, "rgba(255, 0, 0, 0.3)", "circle", "1:1"));
							this.objects[this.objects.length - 1].first = true;
							this.canvas.DrawAll(this.objects);
						}
						if(objects.indexOf(object) == 1){
							this.objects.push(new Obj(4, 4, "rgba(0, 255, 0, 0.3)", "rect", "5:5", true));
							this.objects[this.objects.length - 1].first = true;
							this.canvas.DrawAll(this.objects);
						}
					}

				});
				// When mouse is on passive pos
				aside.addEventListener("mouseup", () => {					
					// Removing a (shadow) of the object
					if(startTouch && !this.physic.simulate){
						if(objects.indexOf(object) == 0){ 
							this.objects.pop();
							this.canvas.DrawAll(this.objects);
						}
						if(objects.indexOf(object) == 1){
							this.objects.pop();
							this.canvas.DrawAll(this.objects);
						}
					}
					startTouch = false;

				});
				// Creating new solid object
				this.canvas.canvas.addEventListener("mouseup", (e) => {
					if(startTouch && !this.physic.simulate){
						let x = Math.round(e.clientX / this.canvas.zoom - this.objects[0].posX);
						let y = Math.round(e.clientY / this.canvas.zoom - this.objects[0].posY);
						this.objects[this.objects.length - 1].color = "red";
						this.objects[this.objects.length - 1].first = false;
						this.objects[this.objects.length - 1].NewPos(x, -y, false, true);
						this.canvas.DrawAll(this.objects);
						startTouch = false;
					}
				});
				// Checking for moving mouse over the document
				this.canvas.canvas.addEventListener("mousemove", (e) => {
					if(startTouch && !this.physic.simulate){
						// Updating coordinates of shadow
						this.objects[this.objects.length - 1].posX = e.clientX / this.canvas.zoom;
						this.objects[this.objects.length - 1].posY = e.clientY / this.canvas.zoom;
						this.canvas.DrawAll(this.objects);
					}
				});
			} else {
			// For mobile

			/* IMPORTANT to do device check (mobile or desktop) */

			object.addEventListener("touchstart", function(){
				startTouch = true;
				console.log(startTouch);
			});
			document.addEventListener("touchend", function(){
				startTouch = false;
				console.log("mobile", startTouch);
			});
		}
	});
	}
	// Changing object settings
	ObjectSettings(){
		this.canvas.canvas.addEventListener("click", (e) => {
			let obj_clicked = undefined;
			this.objects.forEach((object) => {
				if(!this.physic.simulate){
					// Checking clicking on each object
					if(!object.first){
						const objX = object.posX + this.objects[0].posX;
						const objY = object.posY + this.objects[0].posY;
						const clickX = e.clientX / this.canvas.zoom;
						const clickY = e.clientY / this.canvas.zoom;
						if(clickX > objX && clickX < objX + object.sizeX && clickY > objY && clickY < objY + object.sizeY) obj_clicked = object;
					}
				}
			});
			if(obj_clicked){
				this.obj_clicked = obj_clicked;
				// Draw modal menu
				const modal = document.querySelector(".settings");

				// Setting true position of modal menu
				modal.style.left = e.clientX + this.canvas.zoom + "px";
				modal.style.top = e.clientY + this.canvas.zoom + "px";
				// Showing modal menu
				modal.style.display = "flex";
				setTimeout(() => {modal.style.opacity = "1";}, 50);
			} else {
				// Hide modal menu
				const modal = document.querySelector(".settings");

				modal.style.opacity = "0";
				setTimeout(() => {modal.style.display = "none"}, 300);
				// Delay is necessary to inject some time for some actions in end of correction like move sizing or color change
				setTimeout(() => {this.obj_clicked = undefined;}, 50);
			}
		});
	}
	ObjectMove(){
		const btn = document.querySelector(".move");
		const modal = document.querySelector(".settings");
		// Checking click on button "Переместить"
		btn.addEventListener("click", () => {
			let last_color;
			if(!this.move){
				this.move = true;
				// Close modal with settings
				modal.style.opacity = "0";
				setTimeout(() => {modal.style.display = "none"}, 300);
				// Change color of object
				last_color = this.obj_clicked.color;
				this.obj_clicked.color = "rgba(0, 0, 0, 0.3)";
				this.canvas.DrawAll(this.objects);
				this.canvas.canvas.addEventListener("mousemove", (e) => {
					if(this.move){
						if(this.obj_clicked.first){
							this.obj_clicked.posX = e.clientX / this.canvas.zoom;
							this.obj_clicked.posY = e.clientY / this.canvas.zoom;
							this.canvas.DrawAll(this.objects);
						} else {
							this.obj_clicked.posX = (e.clientX - this.objects[0].posX * this.canvas.zoom) / this.canvas.zoom;
							this.obj_clicked.posY = (e.clientY - this.objects[0].posY * this.canvas.zoom) / this.canvas.zoom;
							this.canvas.DrawAll(this.objects);
						}
					}
				});
			}
			this.canvas.canvas.addEventListener("click", (e) => {
				if(this.move){
					// Changing trigger
					this.move = false;
					// Correcting position
					this.obj_clicked.posX = Math.floor(this.obj_clicked.posX);
					this.obj_clicked.posY = Math.floor(this.obj_clicked.posY);
					// Correcting start position
					this.obj_clicked.StartPosX = this.obj_clicked.posX;
					this.obj_clicked.StartPosY = -this.obj_clicked.posY;
					// Installing start color
					this.obj_clicked.color = last_color;
					// Drawing all to see changes
					this.canvas.DrawAll(this.objects);
				}
			});
		});
	}

}