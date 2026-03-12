    if (reactorNoise) {
      reactorNoise.stop();
      reactorNoise = null;
    }
  }

  playAlarm(warnLevel === 'danger');
}

// ==================== CONTROL HANDLERS ====================

function updateControls() {
  initAudio();

  state.power = Number(document.getElementById('powerSlider').value);
  state.rods = Number(document.getElementById('rodsSlider').value);
  state.coolantFlow = Number(document.getElementById('coolantSlider').value);

  document.getElementById('powerVal').textContent = state.power + '%';
  document.getElementById('rodsVal').textContent =
    state.rods + '% INSERTED';
  document.getElementById('coolantVal').textContent =
    state.coolantFlow + '%';
}

function toggleCoolant() {
  state.coolantOn = !state.coolantOn;

  document.getElementById('coolantBtn').classList.toggle('active', state.coolantOn);

  const led = document.getElementById('pumpLed');
  const txt = document.getElementById('pumpStatus');

  if (state.coolantOn) {
    led.classList.remove('off');
    txt.textContent = 'COOLANT PUMP ACTIVE';
  } else {
    led.classList.add('off');
    txt.textContent = 'PUMP OFFLINE';
  }
}

function toggleTurbine() {
  state.turbineBypass = !state.turbineBypass;
  document.getElementById('turbineBtn').classList.toggle('active', !state.turbineBypass);
}

function toggleVent() {
  state.ventOpen = !state.ventOpen;
  document.getElementById('ventBtn').classList.toggle('active', state.ventOpen);
}

function doScram() {
  state.scramActive = true;
  state.rods = 100;

  document.getElementById('rodsSlider').value = 100;

  setTimeout(() => {
    state.scramActive = false;
  }, 6000);
}

// ==================== INFO PANEL ====================

function toggleInfoPanel() {
  document.getElementById('infoPanel').classList.toggle('open');
}

// ==================== CLOCK ====================

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2,'0');
  const m = String(now.getMinutes()).padStart(2,'0');
  const s = String(now.getSeconds()).padStart(2,'0');

  document.getElementById('clock').textContent = `${h}:${m}:${s}`;
}

setInterval(updateClock,1000);

// ==================== MAIN LOOP ====================

function loop() {
  state.time += 1;

  updatePhysics();
  draw();
  updateUI();

  requestAnimationFrame(loop);
}

loop();
