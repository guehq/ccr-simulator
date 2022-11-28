let depth = document.getElementById('depth')
let tts = document.getElementById('tts')
let sensor1 = document.getElementById('sensor1')
let sensor2 = document.getElementById('sensor2')
let sensor3 = document.getElementById('sensor3')
let fo2 = 0.21
let ambiantPressure = depth.value / 10 + 1
let ascentRate = 10

depth.value = 5
depth.innerHTML = depth.value

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
  ambiantPressure = depth.value / 10 + 1

  sensor1.value = fo2 * ambiantPressure
  sensor2.value = fo2 * ambiantPressure
  sensor3.value = fo2 * ambiantPressure

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
    document.body.style.backgroundColor = "steelblue"
  } else {
    document.body.style.backgroundColor = "red"
  }
}
checkSensors ();

// O2 USAGE
function o2consumption () {
  o2scr = 0.001
  setInterval(seto2scr, 1000);

  function seto2scr() {
    fo2 = fo2 - o2scr
    checkSensors ()
  }
}
o2consumption ()

// DEPTH CHANGES
function sink() {
  if(depth.value < 30) {
    depth.value = depth.value + 5;
    depth.innerHTML = depth.value;
    tts.value = Math.ceil(depth.value / ascentRate);
    tts.innerHTML = tts.value;
    checkSensors ()
  } else {
    return;
  }
}

function surface() {
  if(depth.value > 5) {
    depth.value = depth.value - 5;
    depth.innerHTML = depth.value;
    tts.value = Math.ceil(depth.value / ascentRate);
    tts.innerHTML = tts.value;
    checkSensors ()
  } else {
    return;
  }
}

function diluentFlash () {
  fo2 = 0.21
  checkSensors ()
}

function oxygenFlash () {
  fo2 = 1
  checkSensors ()
}

function mavDiluent () {
  if (fo2 > 0.25) {
    fo2 = fo2 - 0.05
  } else {
    fo2 = 0.21
  }
  checkSensors ()
}

function mavOxygen () {
  if (fo2 < 0.94) {
    fo2 = fo2 + 0.05
  } else {
    fo2 = 1
  }
  checkSensors ()
}

// SETPOINT
function checkSetpoint () {
  let setpoint = document.querySelector('#setpoint input:checked')
  if (sensor1.value < setpoint.value) {
    mavOxygen ()
  }
}

setInterval(checkSetpoint, 1500);

console.log(setpoint)