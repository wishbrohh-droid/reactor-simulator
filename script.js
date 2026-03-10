const canvas = document.getElementById("sim");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 400;

let turbineAngle = 0;
let flowOffset = 0;

function drawSystem(){

ctx.clearRect(0,0,canvas.width,canvas.height);

//// Reactor core
ctx.fillStyle="orange";
ctx.fillRect(150,150,80,80);

//// coolant pipes
ctx.strokeStyle="cyan";
ctx.lineWidth=6;
ctx.beginPath();
ctx.moveTo(230,190);
ctx.lineTo(500,190);
ctx.stroke();

//// moving coolant
for(let i=0;i<10;i++){
ctx.beginPath();
ctx.arc(230 + i*30 + flowOffset,190,5,0,Math.PI*2);
ctx.fillStyle="cyan";
ctx.fill();
}

//// turbine
ctx.save();
ctx.translate(550,190);
ctx.rotate(turbineAngle);

for(let i=0;i<4;i++){
ctx.rotate(Math.PI/2);
ctx.fillStyle="silver";
ctx.fillRect(0,0,60,10);
}

ctx.restore();

flowOffset +=2;
if(flowOffset>30) flowOffset=0;

turbineAngle +=0.05;

requestAnimationFrame(drawSystem);
}

drawSystem();
