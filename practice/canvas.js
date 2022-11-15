//@ts-check
/** @type {HTMLCanvasElement} */ //@ts-ignore
let canvas = document.getElementById("canvas-1");
canvas.width = 100;
canvas.height = 100;

/** @type {CanvasRenderingContext2D} */ //@ts-ignore
let context = canvas.getContext("2d");



class ClickBox {
	constructor(x, y, size, colors) {
		this.x = x;
		this.y = y;
		this.size = size;

		this.isClicked = false;
		this.refreshRate = 500;
		this.lastRefresh = 0;
		this.colors = colors;
		this.color = "red";

		this.setColor();
	}

	setColor() {
  
 let x= column * size 
 let y= row * size 
 let box = new ClickBox()
 squares.push(box);
}

	update(timeElapsed) {
		this.lastRefresh += timeElapsed;

		if(this.lastRefresh < this.refreshRate) return;

    this.lastRefresh = 0;
    this.setColor();
		}
	}

	Draw() {
    //let square = new path2d();
    //square.rect(x,y,size,size);
    context.fillStyle = this.color;
    context.fillRect(this.y,this.x, this.size,this.size)
  }


let squares = [];
let gridSize = 4;
let size = canvas.width / gridSize;
let colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

// function drawSquare(x, y, color, size = 25) {
// //let square = new path2d();
//     //square.rect(x,y,size,size);
// 	context.fillStyle = color;
// 	context.fillRect(x, y, size, size);
// }

console.log(squares);

let currentTime = 0;

function drawLoop(timestamp) {
	let elapsedTime = timestamp - currentTime;
	currentTime = timestamp;

  squares.foreach((b) =>){
    b.update(elapsedTime);
    b.draw();
  });

  requestAnimationFrame(drawLoop);
}

requestAnimationFrame(drawLoop);
