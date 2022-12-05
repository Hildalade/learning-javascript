//@ts-check
/** @type {HTMLCanvasElement} */ //@ts-ignore
let canvas = document.getElementById("canvas-1");
canvas.width = 700;
canvas.height = 700;

/** @type {CanvasRenderingContext2D} */ //@ts-ignore
let context = canvas.getContext("2d");

class ClickBox {
	constructor(x, y, size, colors) {
		this.x = x;
		this.y = y ;
		this.size = size;

		this.isClicked = false;
		this.refreshRate = 5000;
		this.lastRefresh = 0;
		this.colors = colors;
		this.color = "yellow";

		this.setColor();
	}

	setColor() {
		let colorIndex = Math.floor(Math.random() * this.colors.length);
		this.color = this.colors[colorIndex];
	}

	amIClicked(x, y) {
		if (x < this.x) return false; // clicked to my left
		if (x > this.x + this.size) return false; // clicked to my right
		if (y < this.y) return false; // clicked above me
		if (y > this.y + this.size) return false; // clicked below me
		return true;
	}

	update(timeElapsed) {
		if (this.isClicked) return;

		this.lastRefresh += timeElapsed;

		if (this.lastRefresh < this.refreshRate) return;

		this.lastRefresh = 0;
		this.setColor();
	}

	draw() {
    
    // let square = new Path2D();
		// square.rect(x, y, size, size);

    context.beginPath();
	context.arc(this.x + this.size / 2, this.y + this.size / 2, this.size / 2, 0, Math.PI*2)
		context.fillStyle = this.color;
		context.fill();
    if(this.isClicked){
	  context.clearRect(this.x, this.y, this.size, this.size);
	  context.rect (this.x, this.y, this.size, this.size);
	    context.fillStyle = this.color;
		context.fill();
    }
    context.closePath();
    // context.fillRect(this.x, this.y, this.size, this.size);
	}
}

let squares = [];
let gridSize = 4;
let size = canvas.width / gridSize;
let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

let winningcolor ="";

for (let row = 0; row < gridSize; row++) {
	for (let col = 0; col < gridSize; col++) {
		let x = col * size;
		let y = row * size;
		let box = new ClickBox(x, y, size, colors);
		squares.push(box);
	}
}

canvas.addEventListener("click", (e) => {
	console.log(e.offsetX, e.offsetY);

	squares.forEach((b) => {
		if (b.amIClicked(e.offsetX, e.offsetY)) {
			b.isClicked = true;
      if(winningcolor == ""){
        winningcolor = b.color;
      } 
		}
	});
});

let currentTime = 0;
let score = 0;

function drawLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;

	squares.forEach((b) => {
		b.update(elapsedTime);
		b.draw();
	});
  
  let isGameOver = squares.filter((b) => b.isClicked == false).length == 0;
  console.log(isGameOver);
  if (isGameOver){
    score = squares.filter((b) => b.color == winningcolor).length;
  }
  else{
    requestAnimationFrame(drawLoop);
  }
}

requestAnimationFrame(drawLoop);