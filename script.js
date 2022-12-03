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

let discrepancyFactor = 1
let svFailure = false
let sv = document.getElementById('solenoid_valve')
let votingFailure = false
let nerdCenter = document.getElementById('nerd-center')
let warningMessageFC10 = document.getElementById('nerd-warning-FC10')
let sensorLimitationFailure = false
let o2RunawayFailure = false
let diluentRunawayFailure = false
let co2AbsorbentFailure = false
let counterlungADVFailure = false
let adv = document.getElementById('adv_valve')
adv.textContent = '- ADV'
let refreshADV
let causticCocktail = false

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

  if (sensorLimitationFailure && sensor1.value > 1.1) {
    sensor1.value = 1.11
    sensor2.value = 1.15
  } else {
    sensor1.value = loopO2
    sensor2.value = loopO2 * 1.01
  }

  sensor3.value = loopO2 * 0.99 * discrepancyFactor

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

  function seto2scr () {
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
  ppO2 = fO2 * ATA

  if ( (loopO2 / ATA) > (ppO2 + 0.04) ) {
    loopO2 = loopO2 - 0.05
  } else {
    loopO2 = ppO2
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
  let ρO2 = 1.43 // rho
  let ρN2 = 1.25
  let ρHe = 0.18
  let maxDensity = 5.2

  if (ATA * ((fO2 * ρO2) + (fN2 * ρN2) + (fHe * ρHe)) > maxDensity) {
    document.getElementById('gas_density').classList.remove('is-hidden')
  } else {
    document.getElementById('gas_density').classList.add('is-hidden')
  }
}



/* -------- DEPTH CHANGES -------- */
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
  if ( svFailure ) {
    return
  } else {
    let setpoint = document.querySelector('#setpoint input:checked')
    
    if (sensor1.value < setpoint.value) {
      if ( !o2RunawayFailure ) {
        mavOxygen ()
      }

      sv.textContent = '- Solenoid Valve [ACTIVE]'
      sv.classList.add('active')
    } else {
      sv.textContent = '- Solenoid Valve'
      sv.classList.remove('active')
    }
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



/* ---------- FAILURE CARDS ---------- */

// FC1
function runFC1 () {
  if (discrepancyFactor == 1) {
    discrepancyFactor = .7
    document.getElementById('fc1icon').classList.remove('has-text-success')
    document.getElementById('fc1icon').classList.add('has-text-danger')
  } else {
    discrepancyFactor = 1
    document.getElementById('fc1icon').classList.remove('has-text-danger')
    document.getElementById('fc1icon').classList.add('has-text-success')
  }
}

// FC2
function runFC2 () {
  loopO2 = 1.44
}

// FC3
function runFC3 () {
  loopO2 = 1.91
}

// FC4
function runFC4 () {
  loopO2 = 0.31
}

// FC5
function runFC5 () {
  if (sensorLimitationFailure == false) {
    sensorLimitationFailure = true
    document.getElementById('fc5icon').classList.remove('has-text-success')
    document.getElementById('fc5icon').classList.add('has-text-danger')
  } else {
    sensorLimitationFailure = false
    document.getElementById('fc5icon').classList.remove('has-text-danger')
    document.getElementById('fc5icon').classList.add('has-text-success')
  }
}

// FC6
function runFC6 () {
  document.getElementById('nerd').classList.toggle('visible')
  document.getElementById('fc6icon').classList.toggle('has-text-danger')
  document.getElementById('fc6icon').classList.toggle('has-text-success')
}

// FC7
function runFC7 () {
  if (svFailure == false) {
    svFailure = true
    sv.textContent = '- Solenoid Valve [FAIL]'
    document.getElementById('fc7icon').classList.remove('has-text-success')
    document.getElementById('fc7icon').classList.add('has-text-danger')
  } else {
    svFailure = false
    sv.textContent = '- Solenoid Valve'
    document.getElementById('fc7icon').classList.remove('has-text-danger')
    document.getElementById('fc7icon').classList.add('has-text-success')
  }
}

// FC8
function runFC8 () {
  if (o2RunawayFailure) {
    o2RunawayFailure = false
    document.getElementById('oxygenFlush').removeAttribute('disabled')
    document.getElementById('mavOxygen').removeAttribute('disabled')
    document.getElementById('fc8icon').classList.toggle('has-text-danger')
    document.getElementById('fc8icon').classList.toggle('has-text-success')
  } else {
    o2RunawayFailure = true
    document.getElementById('oxygenFlush').setAttribute('disabled', '')
    document.getElementById('mavOxygen').setAttribute('disabled', '')
    document.getElementById('fc8icon').classList.toggle('has-text-danger')
    document.getElementById('fc8icon').classList.toggle('has-text-success')
  }
}

// FC9
function runFC9 () {
  if (o2RunawayFailure) {
    o2RunawayFailure = false
    document.getElementById('diluentFlush').removeAttribute('disabled')
    document.getElementById('mavDiluent').removeAttribute('disabled')
    document.getElementById('fc9icon').classList.toggle('has-text-danger')
    document.getElementById('fc9icon').classList.toggle('has-text-success')
  } else {
    o2RunawayFailure = true
    document.getElementById('diluentFlush').setAttribute('disabled', '')
    document.getElementById('mavDiluent').setAttribute('disabled', '')
    document.getElementById('fc9icon').classList.toggle('has-text-danger')
    document.getElementById('fc9icon').classList.toggle('has-text-success')
  }
}

// FC10
function runFC10 () {
  if (votingFailure == false) {
    votingFailure = true
    nerdCenter.classList.add('is-hidden')
    warningMessageFC10.classList.remove('is-hidden')
    document.getElementById('fc10icon').classList.remove('has-text-success')
    document.getElementById('fc10icon').classList.add('has-text-danger')
  } else {
    votingFailure = false
    nerdCenter.classList.remove('is-hidden')
    warningMessageFC10.classList.add('is-hidden')
    document.getElementById('fc10icon').classList.remove('has-text-danger')
    document.getElementById('fc10icon').classList.add('has-text-success')
  }
}

// FC11
function runFC11 () {
  if (co2AbsorbentFailure == false) {
    co2AbsorbentFailure = true
    document.getElementById('fc11icon').classList.remove('has-text-success')
    document.getElementById('fc11icon').classList.add('has-text-danger')
    document.getElementById('symptoms').classList.remove('is-hidden')
    document.getElementById('fc11symptoms').classList.remove('is-hidden')
  } else {
    co2AbsorbentFailure = false
    document.getElementById('fc11icon').classList.remove('has-text-danger')
    document.getElementById('fc11icon').classList.add('has-text-success')
    document.getElementById('symptoms').classList.add('is-hidden')
    document.getElementById('fc11symptoms').classList.add('is-hidden')
  }
}

// FC12
function runFC12 () {
  if (counterlungADVFailure == false) {
    counterlungADVFailure = true
    document.getElementById('fc12icon').classList.remove('has-text-success')
    document.getElementById('fc12icon').classList.add('has-text-danger')

    refreshADV = setInterval(mavDiluent, 1000)
    adv.textContent = '- ADV [ACTIVE]'
    adv.classList.add('active')
  } else {
    counterlungADVFailure = false
    document.getElementById('fc12icon').classList.remove('has-text-danger')
    document.getElementById('fc12icon').classList.add('has-text-success')
    
    clearInterval(refreshADV)
    adv.textContent = '- ADV'
    adv.classList.remove('active')
  }
}

// FC13
function runFC13 () {
  if (x == false) {
    x = true
    document.getElementById('fc13icon').classList.remove('has-text-success')
    document.getElementById('fc13icon').classList.add('has-text-danger')
  } else {
    counterlungADVFailure = false
    document.getElementById('fc13icon').classList.remove('has-text-danger')
    document.getElementById('fc13icon').classList.add('has-text-success')
  }
}

// FC14
function runFC14 () {
  if (causticCocktail == false) {
    causticCocktail = true
    document.getElementById('fc14icon').classList.remove('has-text-success')
    document.getElementById('fc14icon').classList.add('has-text-danger')
    document.getElementById('symptoms').classList.remove('is-hidden')
    document.getElementById('fc14symptoms').classList.remove('is-hidden')
    
  } else {
    causticCocktail = false
    document.getElementById('fc14icon').classList.remove('has-text-danger')
    document.getElementById('fc14icon').classList.add('has-text-success')
    document.getElementById('symptoms').classList.add('is-hidden')
    document.getElementById('fc14symptoms').classList.add('is-hidden')
  }
}
