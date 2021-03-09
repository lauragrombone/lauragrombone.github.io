var stage, paintings=[], paintingsOrigin=0, fixtures=[], fixtureQueue=[];
var rightPressed=false, leftPressed=false, spacePressed=false, alt=false;
const SPEED=15, SPACING=0.0833;
var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
var maxOffset;

window.onload = function() {
	console.log("Loaded");
	stage = document.getElementById("stage");
	//console.log(actors);

	document.addEventListener("keydown", keyDownHandler, false);
	document.addEventListener("keyup", keyUpHandler, false);

	setInterval(update, 16);
	paintingsOrigin = Math.round((0.25 + SPACING * 1.5) * vw);
	populate();
	populateFixtures();
	document.addEventListener("resize", function() {
		location.reload();
	});
}

function resize() {
	vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
}

function populate() {
	for(let i = 1; i <= 11; i++) {
		var img = document.createElement("img");
		img.src = "paintings/" + i + ".png";
		img.classList.add("painting");
		img.style.visibility = "visible";
		stage.appendChild(img);
		paintings.push(img)
	}
	maxOffset = Math.round((paintings.length * (0.25 + SPACING)) * vw); // in terms of pixels
	updatePaintings();
}

function populateFixtures() {
	for (let i = 0; i < 3; i++) {
		var img = document.createElement("img");
		img.src = "fixtures/" + (1 + (i % 2)) + ".png"
		img.classList.add("fixture");
		img.style.visibility = "visible";
		img.style.left = Math.round(vw * 0.1) + i * Math.round(vw * 0.66) + "px";
		stage.appendChild(img);
		fixtures.push(img);
	}
}



function update() {
	//console.log("Updating");
	updateDuck();
	alternate();
}

function updatePaintings() {
	let paintingSpeed = 0;
	if (rightPressed == true) paintingSpeed -= SPEED;
	if (leftPressed == true) paintingSpeed += SPEED;

	if (paintingsOrigin + paintingSpeed < 0) {
		paintingsOrigin = paintingsOrigin + paintingSpeed + maxOffset;
	} else if (paintingsOrigin + paintingSpeed > maxOffset) {
		paintingsOrigin = (paintingsOrigin + paintingSpeed) % maxOffset;
	} else {
		paintingsOrigin += paintingSpeed;
	}

	for (let i = 0; i < paintings.length; i++) {
		paintings[i].style.left = (((paintingsOrigin + Math.round((0.25 + SPACING) * i * vw)) % maxOffset) - Math.round((0.25 + SPACING) * 3) * vw) + "px";
	}
}

function updateDuck() {
	let duckSpeed = 0;
	if (rightPressed == true) duckSpeed += SPEED;
	if (leftPressed == true) duckSpeed -= SPEED;

	// Render
	let duck = document.getElementById("duck");
	var duckPosition = parseInt(window.getComputedStyle(duck, null).getPropertyValue("left").split("px"), 10);

	if (((duckPosition + duckSpeed + Math.round(vw * 0.2)) > Math.round(vw * 0.7)) || (duckPosition + duckSpeed < Math.round(vw * 0.3))) {
		// NO DUCK MOVE
		updateFixtures();
		updatePaintings();
	} else {
		duck.style.left = (duckPosition + duckSpeed) + "px";
	}
	if (duckSpeed < 0) {duck.style.transform = "scaleX(-1)"}
	else if (duckSpeed > 0) {duck.style.transform = "scaleX(1)"}


	//console.log(duck.style.left);
}

function updateFixtures() {
	let fixtureSpeed = 0;
	if (rightPressed == true) fixtureSpeed -= SPEED;
	if (leftPressed == true) fixtureSpeed += SPEED;

	for (let i = 0; i < fixtures.length; i++) {
		let fixturePosition = parseInt(window.getComputedStyle(fixtures[i], null).getPropertyValue("left").split("px"), 10);
		if (fixturePosition + fixtureSpeed < Math.round(vw * (-.5))) {
			fixturePosition = (fixturePosition + fixtureSpeed) + Math.round(vw * 2);
		} else if (fixturePosition + fixtureSpeed > Math.round(vw * (1.5))) {
			fixturePosition = (fixturePosition + fixtureSpeed) - Math.round(vw * 2);
		}
		fixtures[i].style.left = fixturePosition + fixtureSpeed + "px";
	}


}

function alternate() {
	if (spacePressed == true && alt == false) {
		for (var i = 0; i < paintings.length; i++) {
			paintings[i].src = "paintings/" + (i + 1) + "-alt.png"	
		}	
		alt = true;
	} else if (spacePressed == false && alt == true) {
		for (var i = 0; i < paintings.length; i++) {
			paintings[i].src = "paintings/" + (i + 1) + ".png"	
		}
		alt = false;
	}
}

// Control Handlers

function keyDownHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = true;
	}
	if (e.keyCode == 37) {
		leftPressed = true;
	}
	if (e.keyCode == 32) {
		spacePressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	}
	if (e.keyCode == 37) {
		leftPressed = false;
	}
	if (e.keyCode == 32) {
		spacePressed = false;
	}
}

