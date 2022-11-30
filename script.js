const ascentRate = 9
let depth = document.getElementById('depth')
depth.value = 0
depth.innerHTML = depth.value
let ATA = depth.value / 10 + 1

let sensor1 = document.getElementById('sensor1')
let sensor2 = document.getElementById('sensor2')
let sensor3 = document.getElementById('sensor3')

let fO2 = document.getElementById('fO2').value / 100
let fHe = document.getElementById('fHe').value / 100
let fN2 = 1 - fO2 - fHe
let ppO2 = fO2 * ATA
let ppHe = fHe * ATA
let loopO2 = ppO2

let tts = document.getElementById('tts')
tts.value = Math.ceil(depth.value / ascentRate)
tts.innerHTML = tts.value

// TIMER
let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;
setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// SENSORS
function checkSensors () {
  ATA = depth.value / 10 + 1
  fO2 = document.getElementById('fO2').value / 100
  fHe = document.getElementById('fHe').value / 100
  fN2 = 1 - fO2 - fHe

  sensor1.value = loopO2
  sensor2.value = loopO2 * 1.01
  sensor3.value = loopO2 * 0.99

  sensor1.innerHTML = sensor1.value.toFixed(2)
  sensor2.innerHTML = sensor2.value.toFixed(2)
  sensor3.innerHTML = sensor3.value.toFixed(2)

  function sensorAlert (x) {
    if ( x.value < 0.4 || x.value > 1.6) {
      x.classList.add('danger')
    } else {
      x.classList.remove('danger')
    }
  }

  sensorAlert (sensor1)
  sensorAlert (sensor2)
  sensorAlert (sensor3)

  if ( sensor1.value >= 0.16 && sensor1.value <= 2 ) {
    document.getElementById('app').classList.add('has-background-info')
    document.getElementById('app').classList.remove('has-background-danger')
    document.getElementById('messages').classList.add('passive')
    document.getElementById('reason').textContent = ""
  } else if (sensor1.value < 0.16) {
    document.getElementById('app').classList.add('has-background-danger')
    document.getElementById('app').classList.remove('has-background-info')
    document.getElementById('messages').classList.remove('passive')
    document.getElementById('reason').textContent = "Hypoxia"
  } else if (sensor1.value > 2) {
    document.getElementById('app').classList.add('has-background-danger')
    document.getElementById('app').classList.remove('has-background-info')
    document.getElementById('messages').classList.remove('passive')
    document.getElementById('reason').textContent = "Hyperoxia"
  }
}

checkSensors ();

// O2 USAGE
function o2consumption () {
  o2scr = 0.001
  setInterval(seto2scr, 1000)

  function seto2scr() {
    loopO2 = loopO2 - o2scr
    checkSensors ()
    checkNarcosis ()
    checkDensity ()
  }
}

o2consumption ()

// MANUEL ADDITIONAL VALVES
function mavDiluent () {
  ATA = depth.value / 10 + 1

  if (loopO2 / ATA > 0.25) {
    loopO2 = loopO2 - 0.05
  } else {
    loopO2 = 0.21 * ATA
  }

  checkSensors ()
}

function mavOxygen () {
  ATA = depth.value / 10 + 1

  if (loopO2 / ATA < 0.94) {
    loopO2 = loopO2 + 0.05
  } else {
    loopO2 = 1 * ATA
  }

  checkSensors ()
}

// NARCOSIS
function checkNarcosis () {
  ATA = depth.value / 10 + 1
  fO2 = document.getElementById('fO2').value / 100
  fHe = document.getElementById('fHe').value / 100
  fN2 = 1 - fO2 - fHe
  let narcoticGas = 1 - fHe

  if (ATA * narcoticGas > 4) {
    document.getElementById('gas_narcosis').classList.remove('is-hidden')
  } else {
    document.getElementById('gas_narcosis').classList.add('is-hidden')
  }
}

// GAS DENSITY
function checkDensity () {
  ATA = depth.value / 10 + 1
  fO2 = document.getElementById('fO2').value / 100
  fHe = document.getElementById('fHe').value / 100
  fN2 = 1 - fO2 - fHe
  let ρO2 = 1.43
  let ρN2 = 1.25
  let ρHe = 0.18
  let maxDensity = 5.2

  if (ATA * ((fO2 * ρO2) + (fN2 * ρN2) + (fHe * ρHe)) > maxDensity) {
    document.getElementById('gas_density').classList.remove('is-hidden')
  } else {
    document.getElementById('gas_density').classList.add('is-hidden')
  }
}

// DEPTH CHANGES
function descend () {
  if(depth.value < 60) {
    depth.value = depth.value + 5;
    depth.innerHTML = depth.value;
    tts.value = Math.ceil(depth.value / ascentRate);
    tts.innerHTML = tts.value;
    ATA = depth.value / 10 + 1
    loopO2 = loopO2 / (ATA - .5) * ATA
    checkSensors ()
  } else {
    return;
  }
}

function ascend () {
  if(depth.value > 0) {
    depth.value = depth.value - 5;
    depth.innerHTML = depth.value;
    tts.value = Math.ceil(depth.value / ascentRate);
    tts.innerHTML = tts.value;
    ATA = depth.value / 10 + 1
    loopO2 = loopO2 / (ATA + .5) * ATA
    checkSensors ()
  } else {
    return;
  }
}

function autoAscend () {
  document.getElementById('descend').disabled = true
  document.getElementById('ascend').disabled = true
  document.getElementById('auto_ascend').disabled = true

  setTimeout( function () {
    depth.value = depth.value - 1;
    depth.innerHTML = depth.value;
    tts.value = Math.ceil(depth.value / ascentRate);
    tts.innerHTML = tts.value;
    ATA = depth.value / 10 + 1
    loopO2 = loopO2 / (ATA + .1) * ATA
    checkSensors ()

    if (0 < depth.value) {
      autoAscend ();
    } else {
      document.getElementById('descend').disabled = false
      document.getElementById('ascend').disabled = false
      document.getElementById('auto_ascend').disabled = false
    }
  }, 1000)
}

// FLUSHES
function diluentFlush () {
  ATA = depth.value / 10 + 1
  loopO2 = fO2 * ATA

  checkSensors ()
}

function oxygenFlush () {
  ATA = depth.value / 10 + 1
  loopO2 = 1 * ATA

  checkSensors ()
}

// SETPOINT
function checkSetpoint () {
  let setpoint = document.querySelector('#setpoint input:checked')
  let sv = document.getElementById('solenoid_valve')

  if (sensor1.value < setpoint.value) {
    mavOxygen ()
    sv.textContent = '- Solenoid Valve [ACTIVE]'
    sv.classList.add('active')
  } else {
    sv.textContent = '- Solenoid Valve'
    sv.classList.remove('active')
  }
}

setInterval(checkSetpoint, 1500);

// NERD
function showNerd () {
  document.getElementById('nerd').classList.add('visible')
  document.getElementById('showNerd').classList.add('is-hidden')
  document.getElementById('hideNerd').classList.remove('is-hidden')
}

function hideNerd () {
  document.getElementById('nerd').classList.remove('visible')
  document.getElementById('hideNerd').classList.add('is-hidden')
  document.getElementById('showNerd').classList.remove('is-hidden')
}

// RESET DATA
function resetData () {
  depth.value = 0
  depth.innerHTML = depth.value

  diluentFlush ()
}
