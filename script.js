const canvas=document.getElementById("sim");
const ctx=canvas.getContext("2d");

canvas.width=800;
canvas.height=400;

const power=document.getElementById("power");
const rods=document.getElementById("rods");

const temp=document.getElementById("temp");
const pressure=document.getElementById("pressure");
const output=document.getElementById("output");
const radiation=document.getElementById("radiation");

const warningBox=document.getElementById("warningBox");

const alarm=document.getElementById("alarmSound");
const reactorHum=document.getElementById("reactorHum");

let turbineAngle=0;
let flowOffset=0;

let steam=[];

for(let i=0;i<40;i++){
steam.push({
x:400+Math.random()*50,
y:300,
size:Math.random()*5+2,
speed:Math.random()*2+1
});
}

function updateReactor(){

let p=power.value;
  if(p < 10 && p > 0){

warningBox.innerText="⚠️ REACTOR POWER TOO LOW!";
warningBox.className="warning";
alarm.play();

}
let r=rods.value;

if(p>0){
reactorHum.play().catch(()=>{});
}else{
reactorHum.pause();
}

let t=300+p*5-r*2;
let pr=80+p*2;
let rad=Math.floor(5+p*0.8-r*0.5);

output.innerText=p;
temp.innerText=t;
pressure.innerText=pr;
radiation.innerText=rad;

alarm.pause();
alarm.currentTime=0;

if(pr>200){

warningBox.innerText="⚠️ PRESSURE TOO HIGH!";
warningBox.className="danger";
alarm.play();

}

else if(pr<50){

warningBox.innerText="⚠️ PRESSURE TOO LOW!";
warningBox.className="warning";
alarm.play();

}

else if(t>800){

warningBox.innerText="🔥 CORE OVERHEATING!";
warningBox.className="danger";
alarm.play();

}

else{

warningBox.innerText="⚛️ SYSTEM STATUS: STABLE";
warningBox.className="safe";

}

}

document.getElementById("scram").onclick=function(){

power.value=0;
rods.value=100;

updateReactor();

alert("SCRAM ACTIVATED - REACTOR SHUTDOWN");

}

power.addEventListener("input",updateReactor);
rods.addEventListener("input",updateReactor);

const menuBtn=document.getElementById("menuBtn");
const menuPanel=document.getElementById("menuPanel");

menuBtn.onclick=function(){
menuPanel.classList.toggle("open");
}

function drawSystem(){

ctx.clearRect(0,0,canvas.width,canvas.height);

ctx.fillStyle="orange";
ctx.fillRect(150,150,80,80);

ctx.strokeStyle="cyan";
ctx.lineWidth=6;

ctx.beginPath();
ctx.moveTo(230,190);
ctx.lineTo(500,190);
ctx.stroke();

for(let i=0;i<10;i++){

ctx.beginPath();
ctx.arc(230+i*30+flowOffset,190,5,0,Math.PI*2);
ctx.fillStyle="cyan";
ctx.fill();

}

ctx.save();

ctx.translate(550,190);
ctx.rotate(turbineAngle);

for(let i=0;i<4;i++){

ctx.rotate(Math.PI/2);
ctx.fillStyle="silver";
ctx.fillRect(0,0,60,10);

}

ctx.restore();

steam.forEach(p=>{

ctx.beginPath();
ctx.arc(p.x,p.y,p.size,0,Math.PI*2);
ctx.fillStyle="rgba(200,200,200,0.5)";
ctx.fill();

p.y-=p.speed;

if(p.y<150){
p.y=300;
}

});

flowOffset+=2;
if(flowOffset>30)flowOffset=0;

turbineAngle+=0.05;

requestAnimationFrame(drawSystem);

}

updateReactor();
drawSystem();
