const power = document.getElementById("power");
const rods = document.getElementById("rods");

const temp = document.getElementById("temp");
const pressure = document.getElementById("pressure");
const output = document.getElementById("output");

power.addEventListener("input", updateReactor);
rods.addEventListener("input", updateReactor);

function updateReactor(){

let p = power.value;
let r = rods.value;

output.innerText = p;

temp.innerText = 300 + p*5 - r*2;

pressure.innerText = 80 + p*2;

}

document.getElementById("scram").onclick = function(){

power.value = 0;
rods.value = 100;

updateReactor();

alert("SCRAM ACTIVATED - REACTOR SHUTDOWN");

}

updateReactor();
