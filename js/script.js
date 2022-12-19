const ascentRate = 9

// Controller Data - Depth
let depth = document.getElementById('depth')
depth.value = 0
depth.innerHTML = depth.value
let ATA = depth.value / 10 + 1

// Controller Data - Timer
let minutesLabel = document.getElementById('minutes')
let secondsLabel = document.getElementById('seconds')
let totalSeconds = 0
setInterval(setTime, 1000)

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60)
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60))
}

function pad(val) {
  var valString = val + '';
  if (valString.length < 2) {
    return '0' + valString
  } else {
    return valString
  }
}

// Controller Data - Sensors
let sensor1 = document.getElementById('sensor1')
let sensor2 = document.getElementById('sensor2')
let sensor3 = document.getElementById('sensor3')
let hasSensorLimitationFailure = false

// Controller Data - TTS
let tts = document.getElementById('tts')
tts.value = Math.ceil(depth.value / ascentRate)
tts.innerHTML = tts.value

// Gas Data
let fO2 = document.getElementById('fO2').value / 100
let fHe = document.getElementById('fHe').value / 100
let fN2 = 1 - fO2 - fHe
let ppO2 = fO2 * ATA
let ppHe = fHe * ATA
let loopO2 = ppO2
let spgO2 = 60
let spgDil = 100

// Sensor Failures
let discrepancyFactor1 = 1
let discrepancyFactor2 = 1
let discrepancyFactor3 = 1
let votingFailure = false
let nerdCenter = document.getElementById('nerd_center_row')
let warningMessageFC10 = document.getElementById('nerd-warning-FC10')

// O2 Failures
let sv = document.getElementById('solenoid_valve')
let hasSolenoidNotWorkingFailure = false
let hasSolenoidLeakingFailure = false
let hasO2MavFailure = false
let isO2MavConnected = true
let isO2TankValveOpen = true

// Dil Failures
let diluentRunawayFailure = false
let counterlungADVFailure = false
let adv = document.getElementById('adv_valve')
adv.textContent = '- ADV'
let refreshADV

// Symptomic Failures
let co2AbsorbentFailure = false
let causticCocktail = false

let showSolutions = false
let isFC1Active = false
let isFC2Active = false
let isFC3Active = false
let isFC4Active = false
let isFC5Active = false
let isFC6Active = false
let isFC7Active = false
let isFC8Active = false
let isFC9Active = false
let isFC10Active = false
let isFC11Active = false
let isFC12Active = false
let isFC13Active = false
let isFC14Active = false
let isFCp1Active = false
let isFCp2Active = false
let isFCp3Active = false

let randomNo
let isTimeSpeedx1 = true
let isTimeSpeedx2 = false

// SENSOR ACTIVITIES
function checkSensors () {
  ATA = depth.value / 10 + 1
  fO2 = document.getElementById('fO2').value / 100
  fHe = document.getElementById('fHe').value / 100
  fN2 = 1 - fO2 - fHe

  if ( hasSensorLimitationFailure && sensor1.value > 1.1 ) {
    sensor1.value = 1.11
    sensor2.value = 1.15
    sensor3.value = loopO2 * 0.99
  } else {
    sensor1.value = loopO2
    sensor2.value = loopO2 * 1.01
    sensor3.value = loopO2 * 0.99
  }
  
  sensor1.value = sensor1.value * discrepancyFactor1
  sensor2.value = sensor2.value * discrepancyFactor2
  sensor3.value = sensor3.value * discrepancyFactor3

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
    document.getElementById('reason').textContent = ''
    document.getElementById('symptoms_live').classList.add('is-hidden')
    document.getElementById('hypoxia_symptoms').classList.add('is-hidden')
    document.getElementById('hyperoxia_symptoms').classList.add('is-hidden')
  } else if (sensor1.value < 0.16) {
    document.getElementById('app').classList.add('has-background-danger')
    document.getElementById('app').classList.remove('has-background-info')
    document.getElementById('messages').classList.remove('passive')
    document.getElementById('reason').textContent = 'Hypoxia'
    document.getElementById('symptoms_live').classList.remove('is-hidden')
    document.getElementById('hypoxia_symptoms').classList.remove('is-hidden')
  } else if (sensor1.value > 2) {
    document.getElementById('app').classList.add('has-background-danger')
    document.getElementById('app').classList.remove('has-background-info')
    document.getElementById('messages').classList.remove('passive')
    document.getElementById('reason').textContent = 'Hyperoxia'
    document.getElementById('symptoms_live').classList.remove('is-hidden')
    document.getElementById('hyperoxia_symptoms').classList.remove('is-hidden')
  } 
  
  if (loopO2 <= 0.01 ) {
    loopO2 = 0.01
  }

  // Check Gas Mix 
  fO2 = document.getElementById('fO2').value / 100
  fHe = document.getElementById('fHe').value / 100

  if ( (fO2 + fHe) > 1 ) {
    document.getElementById('fHe').classList.add('has-text-warning')
  } else {
    document.getElementById('fHe').classList.remove('has-text-warning')
  }
}

checkSensors ();

// O2 USAGE
function o2consumption () {
  o2scr = 0.003
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

  if ( loopO2 > (ppO2 + 0.04) ) {
    loopO2 = loopO2 - 0.05
  } else {
    loopO2 = ppO2
  }

  checkSensors ()
}

function o2addition () {
  ATA = depth.value / 10 + 1

  if ( loopO2 / ATA < 0.94 ) {
    loopO2 = loopO2 + 0.05
  } else {
    loopO2 = 1 * ATA
  }

  checkSensors ()
}

function mavO2Addition () {
  if ( isO2TankValveOpen && spgO2 > 0 && isO2MavConnected ) {
    o2addition ()
  }
}

function solenoidO2Addition () {
  if ( isO2TankValveOpen && spgO2 > 0 && !hasSolenoidNotWorkingFailure ) {
    o2addition ()
  }
}

function toggleO2MavConnection () {
  isO2MavConnected = !isO2MavConnected
  document.getElementById('o2MavConnection').classList.toggle('has-text-success')
  document.getElementById('o2MavConnection').classList.toggle('has-text-danger')
  document.getElementById('o2MavDisconnect').classList.toggle('is-hidden')
  document.getElementById('o2MavConnect').classList.toggle('is-hidden')
}



/* -------- DEPTH CHANGES -------- */
function descend () {
  if ( depth.value == 0 ) {
    document.getElementById('sp_19').disabled = true
    document.getElementById('sp_7').checked = true
  }
  
  if ( depth.value < 60 ) {
    depth.value = depth.value + 3;
    depth.innerHTML = depth.value;
    tts.value = Math.ceil(depth.value / ascentRate);
    tts.innerHTML = tts.value;
    ATA = depth.value / 10 + 1
    loopO2 = loopO2 / (ATA - .3) * ATA
    checkSensors ()
  }
}

function ascend () {
  if ( depth.value < 4 + 3 ) {
    document.getElementById('sp_7').checked = true
  }

  if(depth.value > 0) {
    depth.value = depth.value - 3;
    depth.innerHTML = depth.value;
    tts.value = Math.ceil(depth.value / ascentRate);
    tts.innerHTML = tts.value;
    ATA = depth.value / 10 + 1
    loopO2 = loopO2 / (ATA + .3) * ATA
    checkSensors ()
  }

  if ( depth.value == 0 ) {
    document.getElementById('sp_19').disabled = false
  }
}

function autoAscend () {
  if ( depth.value > 0 ) {
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

      if ( depth.value == 4 ) {
        document.getElementById('sp_7').checked = true
      }
      
      if ( depth.value > 0 ) {
        autoAscend ();
      } else {
        document.getElementById('descend').disabled = false
        document.getElementById('ascend').disabled = false
        document.getElementById('auto_ascend').disabled = false
        document.getElementById('sp_19').disabled = false
      }
    }, 1000)
  }
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
  if ( !hasSolenoidNotWorkingFailure ) {
    sp = document.querySelector('#setpoint input:checked')
    
    if ( hasSolenoidLeakingFailure ) {
      solenoidO2Addition ()
      sv.textContent = '- Solenoid Valve [FAIL - Leaking]'
      sv.classList.add('active')
    } else if ( hasO2MavFailure ) {
      mavO2Addition ()
    } else if ( sensor1.value < sp.value ) {
      solenoidO2Addition ()
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
  document.getElementById('nerd-section').classList.remove('is-invisible')
  document.getElementById('showNerd').classList.add('is-hidden')
  document.getElementById('hideNerd').classList.remove('is-hidden')
}

function hideNerd () {
  document.getElementById('nerd-section').classList.add('is-invisible')
  document.getElementById('hideNerd').classList.add('is-hidden')
  document.getElementById('showNerd').classList.remove('is-hidden')
}

// HUD
function showHud () {
  document.getElementById('hud-section').classList.remove('is-invisible')
  document.getElementById('showHud').classList.add('is-hidden')
  document.getElementById('hideHud').classList.remove('is-hidden')
}

function hideHud () {
  document.getElementById('hud-section').classList.add('is-invisible')
  document.getElementById('hideHud').classList.add('is-hidden')
  document.getElementById('showHud').classList.remove('is-hidden')
}

// RESET DATA
function resetData () {
  depth.value = 0
  depth.innerHTML = depth.value
  document.getElementById('sp_19').checked = true

  diluentFlush ()
}

// TIME SPEED
function timeSpeedx1 () {
  isTimeSpeedx1 = true
  isTimeSpeedx2 = false
  document.getElementById('timeSpeedx1').classList.add('has-text-success')
  document.getElementById('timeSpeedx2').classList.remove('has-text-success')
}

function timeSpeedx2 () {
  isTimeSpeedx1 = false
  isTimeSpeedx2 = true
  document.getElementById('timeSpeedx1').classList.remove('has-text-success')
  document.getElementById('timeSpeedx2').classList.add('has-text-success')
}

// ADVANCED USAGE

function runAdvancedUser () {
  document.getElementById('adv_nav_row1').classList.toggle('is-hidden')
  document.getElementById('adv_nav_row2').classList.toggle('is-hidden')
  document.getElementById('advancedUsage').classList.toggle('has-text-success')
  document.getElementById('nerd-section').classList.toggle('mt-calc-nav-1')
  document.getElementById('nerd-section').classList.toggle('mt-calc-nav-3')
  document.querySelector('html').classList.toggle('double-nav')
}

runAdvancedUser ()

function o2ValveToggle () {
  isO2TankValveOpen = !isO2TankValveOpen
  document.getElementById('o2tankValve').classList.toggle('has-text-success')
  document.getElementById('o2tankValve').classList.toggle('has-text-danger')
}

function rightValveToggle () {
  document.getElementById('rightValve').classList.toggle('has-text-success')
  document.getElementById('rightValve').classList.toggle('has-text-danger')
}

function rightIsoValveToggle () {
  document.getElementById('rightIsoValve').classList.toggle('has-text-success')
  document.getElementById('rightIsoValve').classList.toggle('has-text-danger')
}

function leftIsoValveToggle () {
  document.getElementById('leftIsoValve').classList.toggle('has-text-success')
  document.getElementById('leftIsoValve').classList.toggle('has-text-danger')
}

function leftValveToggle () {
  document.getElementById('leftValve').classList.toggle('has-text-success')
  document.getElementById('leftValve').classList.toggle('has-text-danger')
}

function toggleFCs () {
  document.getElementById('failures').classList.toggle('is-hidden')
  document.getElementById('toggleFCs').classList.toggle('has-text-success')
}

// MODAL
function toggleDefaultPresets () {
  document.getElementById('defaultPresets').classList.toggle('is-active')
}

function ifDepthLessThan15 () {
  if ( depth.value < 15 ) { 
    r = Math.floor(Math.random() * 15) + 1
    depth.value = 15 + r
    depth.innerHTML = 15 + r
  }
}
