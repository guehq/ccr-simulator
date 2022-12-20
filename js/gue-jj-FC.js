function toggleSolutions () {
  showSolutions = !showSolutions
  document.getElementById('failuresSolutionButton').classList.toggle('has-text-success')
  document.getElementById('solutions').classList.toggle('is-hidden')
}

/* ---------- FAILURE CARDS for GUE-JJ CONFIGURATION ---------- */

// Run Oxygen Sensor Discrepancy Failure
function runO2SensorDiscrepancy () {
  // TODO: eger sensor 1 hatali ise solenoid değeri yakalayana kadar basmaya devam ediyor.
  r = Math.floor(Math.random() * 3) + 1
  
  if ( r == 1 ) {
    discrepancyFactor1 = .5
    document.getElementById('sensor1').classList.add('has-text-warning')
  } else if ( r == 2 ) {
    discrepancyFactor2 = 1.3
    document.getElementById('sensor2').classList.add('has-text-warning')
  } else {
    discrepancyFactor3 = .7
    document.getElementById('sensor3').classList.add('has-text-warning')
  }
}

// Stop Oxygen Sensor Discrepancy Failure
function stopO2SensorDiscrepancy () {
  discrepancyFactor1 = 1
  discrepancyFactor2 = 1
  discrepancyFactor3 = 1
  document.getElementById('sensor1').classList.remove('has-text-warning')
  document.getElementById('sensor2').classList.remove('has-text-warning')
  document.getElementById('sensor3').classList.remove('has-text-warning')
}

// Run FC1
function runFC1 () {
  if ( !isFC1Active ) {
    isFC1Active = true
    document.getElementById('fc1icon').classList.remove('has-text-success')
    document.getElementById('fc1icon').classList.add('has-text-danger')
    document.getElementById('FC1no').classList.add('has-text-danger')
    document.getElementById('solutionFC1').classList.remove('is-hidden')
    runO2SensorDiscrepancy ()
  } else {
    isFC1Active = false
    document.getElementById('fc1icon').classList.remove('has-text-danger')
    document.getElementById('fc1icon').classList.add('has-text-success')
    document.getElementById('FC1no').classList.remove('has-text-danger')
    document.getElementById('solutionFC1').classList.add('is-hidden')
    stopO2SensorDiscrepancy ()
  }
}

// Run Moderately High But Safe PO2 Failure
function runHighPO2Safe () {
  ifDepthLessThan15 ()
  loopO2 = 1.44
}

// FC2
function runFC2 () {
  if ( !isFC2Active ) {
    isFC2Active = true
    document.getElementById('fc2icon').classList.remove('has-text-success')
    document.getElementById('fc2icon').classList.add('has-text-danger')
    document.getElementById('FC2no').classList.add('has-text-danger')
    document.getElementById('solutionFC2').classList.remove('is-hidden')
    runHighPO2Safe ()
  } else {
    isFC2Active = false
    document.getElementById('fc2icon').classList.remove('has-text-danger')
    document.getElementById('fc2icon').classList.add('has-text-success')
    document.getElementById('FC2no').classList.remove('has-text-danger')
    document.getElementById('solutionFC2').classList.add('is-hidden')
  }
}

// Run High Unsafe PO2 - Hyperoxic Warning Failure
function runHighPO2Unsafe () {
  ifDepthLessThan15 ()
  loopO2 = 1.91
}

// FC3
function runFC3 () {
  if ( !isFC3Active ) {
    isFC3Active = true
    document.getElementById('fc3icon').classList.remove('has-text-success')
    document.getElementById('fc3icon').classList.add('has-text-danger')
    document.getElementById('FC3no').classList.add('has-text-danger')
    document.getElementById('solutionFC3').classList.remove('is-hidden')
    runHighPO2Unsafe ()
  } else {
    isFC3Active = false
    document.getElementById('fc3icon').classList.remove('has-text-danger')
    document.getElementById('fc3icon').classList.add('has-text-success')
    document.getElementById('FC3no').classList.remove('has-text-danger')
    document.getElementById('solutionFC3').classList.add('is-hidden')
  }
}

// Run Low Unsafe PO2 - Hypoxic Warning Failure
function runLowPO2Unsafe () {
  r = Math.floor(Math.random() * 3) + 1
  
  if ( r == 1 ) {
    hasSolenoidNotWorkingFailure = true
  } else if ( r == 2 ) {
    hasSolenoidNotWorkingFailure = true
    spgO2 = 0
  } else {
    hasSolenoidNotWorkingFailure = true
    o2valve = false
  }

  loopO2 = 0.31
}

// Stop Low Unsafe PO2 - Hypoxic Warning Failure
function stopLowPO2Unsafe () {
  hasSolenoidNotWorkingFailure = false
  spgO2 = 60
  o2valve = true
}

// FC4
function runFC4 () {
  if ( !isFC4Active ) {
    isFC4Active = true
    document.getElementById('fc4icon').classList.remove('has-text-success')
    document.getElementById('fc4icon').classList.add('has-text-danger')
    document.getElementById('FC4no').classList.add('has-text-danger')
    document.getElementById('solutionFC4').classList.remove('is-hidden')
    runLowPO2Unsafe ()
  } else {
    isFC4Active = false
    document.getElementById('fc4icon').classList.remove('has-text-danger')
    document.getElementById('fc4icon').classList.add('has-text-success')
    document.getElementById('FC4no').classList.remove('has-text-danger')
    document.getElementById('solutionFC4').classList.add('is-hidden')
    stopLowPO2Unsafe ()
  }
}

// Run Sensor Current Limitation and Voting Logic Failure
function runSensorLimitation () {
  hasSensorLimitationFailure = true
  ifDepthLessThan15 ()
  document.getElementById('sp_12').checked = true
}

function stopSensorLimitation () {
  hasSensorLimitationFailure = false
}

// FC5
function runFC5 () {
  if ( !isFC5Active ) {
    isFC5Active = true
    document.getElementById('fc5icon').classList.remove('has-text-success')
    document.getElementById('fc5icon').classList.add('has-text-danger')
    document.getElementById('FC5no').classList.add('has-text-danger')
    document.getElementById('solutionFC5').classList.remove('is-hidden')
    runSensorLimitation ()
  } else {
    isFC5Active = false
    document.getElementById('fc5icon').classList.remove('has-text-danger')
    document.getElementById('fc5icon').classList.add('has-text-success')
    document.getElementById('FC5no').classList.remove('has-text-danger')
    document.getElementById('solutionFC5').classList.add('is-hidden')
    stopSensorLimitation ()
  }
}

// Run Controller Failure 
function runControllerFailure () {
  document.getElementById('nerd_top_row').classList.add('is-hidden')
  document.getElementById('nerd_center_row').classList.add('is-hidden')
  document.getElementById('nerd_bottom_row').classList.add('is-hidden')
  document.getElementById('hideNerd').disabled = true
  document.getElementById('showNerd').disabled = true
  document.getElementById('sp_7').checked = true
  document.getElementById('sp_12').setAttribute('disabled', '')
}

// Stop Controller Failure 
function stopControllerFailure () {
  document.getElementById('nerd_top_row').classList.remove('is-hidden')
  document.getElementById('nerd_center_row').classList.remove('is-hidden')
  document.getElementById('nerd_bottom_row').classList.remove('is-hidden')
  document.getElementById('hideNerd').disabled = false
  document.getElementById('showNerd').disabled = false
  document.getElementById('sp_12').removeAttribute('disabled')
}

// FC6
function runFC6 () {
  if ( !isFC6Active ) {
    isFC6Active = true
    document.getElementById('fc6icon').classList.add('has-text-danger')
    document.getElementById('fc6icon').classList.remove('has-text-success')
    document.getElementById('FC6no').classList.add('has-text-danger')
    document.getElementById('solutionFC6').classList.remove('is-hidden')
    runControllerFailure ()
  } else {
    isFC6Active = false
    document.getElementById('fc6icon').classList.remove('has-text-danger')
    document.getElementById('fc6icon').classList.add('has-text-success')
    document.getElementById('FC6no').classList.remove('has-text-danger')
    document.getElementById('solutionFC6').classList.add('is-hidden')
    stopControllerFailure ()
  }
}

// Run Solenoid Alert, Interrupted O2 Supply
function runSolenoidAlert () {
  hasSolenoidNotWorkingFailure = true
  sv.textContent = '- Solenoid Valve [FAIL - Stop Working]'
  sv.classList.remove('active')
}

// Stop Solenoid Alert, Interrupted O2 Supply
function stopSolenoidAlert () {
  hasSolenoidNotWorkingFailure = false
  sv.textContent = '- Solenoid Valve'
}

// FC7
function runFC7 () {
  if ( !isFC7Active ) {
    isFC7Active = true
    document.getElementById('fc7icon').classList.remove('has-text-success')
    document.getElementById('fc7icon').classList.add('has-text-danger')
    document.getElementById('FC7no').classList.add('has-text-danger')
    document.getElementById('solutionFC7').classList.remove('is-hidden')
    runSolenoidAlert ()
  } else {
    isFC7Active = false
    document.getElementById('fc7icon').classList.remove('has-text-danger')
    document.getElementById('fc7icon').classList.add('has-text-success')
    document.getElementById('FC7no').classList.remove('has-text-danger')
    document.getElementById('solutionFC7').classList.add('is-hidden')
    stopSolenoidAlert ()
  }
}

// Run O2 Runaway – Malfunctioning Addition Failure
function runO2RunawayFailure () {
  r = Math.floor(Math.random() * 2) + 1
  
  if ( r == 1 ) {
    hasSolenoidLeakingFailure = true
  } else {
    hasO2MavFailure = true
  }
}

// Stop O2 Runaway – Malfunctioning Addition Failure
function stopO2RunawayFailure () {
  hasSolenoidLeakingFailure = false
  hasO2MavFailure = false
}

// FC8
function runFC8 () {
  if ( !isFC8Active ) {
    isFC8Active = true
    document.getElementById('fc8icon').classList.remove('has-text-success')
    document.getElementById('fc8icon').classList.add('has-text-danger')
    document.getElementById('FC8no').classList.add('has-text-danger')
    document.getElementById('solutionFC8').classList.remove('is-hidden')
    runO2RunawayFailure ()
  } else {
    isFC8Active = false
    document.getElementById('fc8icon').classList.remove('has-text-danger')
    document.getElementById('fc8icon').classList.add('has-text-success')
    document.getElementById('FC8no').classList.remove('has-text-danger')
    document.getElementById('solutionFC8').classList.add('is-hidden')
    stopO2RunawayFailure ()
  }
}

// Run Diluent Runaway - Mulfunctioning ADV Failure
function runDilRunawayFailure () {
  hasDilMavFailure = true
  refreshADV = setInterval(mavDiluent, 1000)
}

// Stop Diluent Runaway - Mulfunctioning ADV Failure
function stopDilRunawayFailure () {
  hasDilMavFailure = false
  clearInterval(refreshADV)
}

// FC9
function runFC9 () {
  if ( !isFC9Active ) {
    isFC9Active = true
    document.getElementById('fc9icon').classList.remove('has-text-success')
    document.getElementById('fc9icon').classList.add('has-text-danger')
    document.getElementById('FC9no').classList.add('has-text-danger')
    document.getElementById('solutionFC9').classList.remove('is-hidden')
    runDilRunawayFailure ()
  } else {
    isFC9Active = false
    document.getElementById('fc9icon').classList.remove('has-text-danger')
    document.getElementById('fc9icon').classList.add('has-text-success')
    document.getElementById('FC9no').classList.remove('has-text-danger')
    document.getElementById('solutionFC9').classList.add('is-hidden')
    stopDilRunawayFailure ()
  }
}

// Run Voting Failure
function runVotingFailedFailure () {
  // TODO:
  // 1 - her sensor icin ayri bir katsayı ver
  // 2 - sensorler birbirinden uzaksa bu uyarıyı göster
  // 3 - hud ne olacak?
  nerdCenter.classList.add('is-hidden')
  warningMessageFC10.classList.remove('is-hidden')
}

// Stop Voting Failure
function stopVotingFailedFailure () {
  nerdCenter.classList.remove('is-hidden')
  warningMessageFC10.classList.add('is-hidden')
}

// FC10
function runFC10 () {
  if ( !isFC10Active ) {
    isFC10Active = true
    document.getElementById('fc10icon').classList.remove('has-text-success')
    document.getElementById('fc10icon').classList.add('has-text-danger')
    document.getElementById('FC10no').classList.add('has-text-danger')
    document.getElementById('solutionFC10').classList.remove('is-hidden')
    runVotingFailedFailure ()
  } else {
    isFC10Active = false
    document.getElementById('fc10icon').classList.remove('has-text-danger')
    document.getElementById('fc10icon').classList.add('has-text-success')
    document.getElementById('FC10no').classList.remove('has-text-danger')
    document.getElementById('solutionFC10').classList.add('is-hidden')
    stopVotingFailedFailure ()
  }
}

// Run Hypercapnia - CO2 Absorbent Failure
// FC11
function runFC11 () {
  if ( !isFC11Active ) {
    isFC11Active = true
    document.getElementById('fc11icon').classList.remove('has-text-success')
    document.getElementById('fc11icon').classList.add('has-text-danger')
    document.getElementById('FC11no').classList.add('has-text-danger')
    document.getElementById('solutionFC11').classList.remove('is-hidden')
    document.getElementById('symptoms').classList.remove('is-hidden')
    document.getElementById('fc11symptoms').classList.remove('is-hidden')
  } else {
    isFC11Active = false
    document.getElementById('fc11icon').classList.remove('has-text-danger')
    document.getElementById('fc11icon').classList.add('has-text-success')
    document.getElementById('FC11no').classList.remove('has-text-danger')
    document.getElementById('solutionFC11').classList.add('is-hidden')
    document.getElementById('symptoms').classList.add('is-hidden')
    document.getElementById('fc11symptoms').classList.add('is-hidden')
  }
}

// Run Released Counterlung OPV Failure
// FC12
function runFC12 () {
  if ( !isFC12Active ) {
    isFC12Active = true
    document.getElementById('fc12icon').classList.remove('has-text-success')
    document.getElementById('fc12icon').classList.add('has-text-danger')
    document.getElementById('FC12no').classList.add('has-text-danger')
    document.getElementById('solutionFC12').classList.remove('is-hidden')
    runDilRunawayFailure ()
  } else {
    isFC12Active = false
    document.getElementById('fc12icon').classList.remove('has-text-danger')
    document.getElementById('fc12icon').classList.add('has-text-success')
    document.getElementById('FC12no').classList.remove('has-text-danger')
    document.getElementById('solutionFC12').classList.add('is-hidden')
    stopDilRunawayFailure ()
  }
}

// Run Semi-closed Operation
// FC13
function runFC13 () {
  if ( !isFC13Active ) {
    isFC13Active = true
    document.getElementById('fc13icon').classList.remove('has-text-success')
    document.getElementById('fc13icon').classList.add('has-text-danger')
    document.getElementById('FC13no').classList.add('has-text-danger')
    document.getElementById('solutionFC13').classList.remove('is-hidden')
    spgO2 = 0
  } else {
    isFC13Active = false
    document.getElementById('fc13icon').classList.remove('has-text-danger')
    document.getElementById('fc13icon').classList.add('has-text-success')
    document.getElementById('FC13no').classList.remove('has-text-danger')
    document.getElementById('solutionFC13').classList.add('is-hidden')
    spgO2 = 60
  }
}

// Run Caustic Cocktail
// FC14
function runFC14 () {
  if ( !isFC14Active ) {
    isFC14Active = true
    document.getElementById('fc14icon').classList.remove('has-text-success')
    document.getElementById('fc14icon').classList.add('has-text-danger')
    document.getElementById('FC14no').classList.add('has-text-danger')
    document.getElementById('solutionFC14').classList.remove('is-hidden')
    document.getElementById('symptoms').classList.remove('is-hidden')
    document.getElementById('fc14symptoms').classList.remove('is-hidden')
  } else {
    isFC14Active = false
    document.getElementById('fc14icon').classList.remove('has-text-danger')
    document.getElementById('fc14icon').classList.add('has-text-success')
    document.getElementById('FC14no').classList.remove('has-text-danger')
    document.getElementById('solutionFC14').classList.add('is-hidden')
    document.getElementById('symptoms').classList.add('is-hidden')
    document.getElementById('fc14symptoms').classList.add('is-hidden')
  }
}

// Run Hyperoxia (experience dive)
function runHyperoxia () {
  ifDepthLessThan15 ()
  loopO2 = 2.4
}

// FC+1
function runFCp1 () {
  if ( !isFCp1Active ) {
    isFCp1Active = true
    document.getElementById('fc+1icon').classList.remove('has-text-success')
    document.getElementById('fc+1icon').classList.add('has-text-danger')
    document.getElementById('FC+1no').classList.add('has-text-danger')
    document.getElementById('solutionFC+1').classList.remove('is-hidden')
    runHyperoxia ()
  } else {
    isFCp1Active = false
    document.getElementById('fc+1icon').classList.remove('has-text-danger')
    document.getElementById('fc+1icon').classList.add('has-text-success')
    document.getElementById('FC+1no').classList.remove('has-text-danger')
    document.getElementById('solutionFC+1').classList.add('is-hidden')
  }
}

// Run DCI (experience dive)
// FC+2
function runFCp2 () {
  if ( !isFCp2Active ) {
    // TODO: yükselmeyi durdurup geri derin kisima giderek deco tamamlanabilir
    isFCp2Active = true
    document.getElementById('fc+2icon').classList.remove('has-text-success')
    document.getElementById('fc+2icon').classList.add('has-text-danger')
    document.getElementById('FC+2no').classList.add('has-text-danger')
    document.getElementById('solutionFC+2').classList.remove('is-hidden')
    document.getElementById('symptoms').classList.remove('is-hidden')
    document.getElementById('fc+2symptoms').classList.remove('is-hidden')
  } else {
    isFCp2Active = false
    document.getElementById('fc+2icon').classList.remove('has-text-danger')
    document.getElementById('fc+2icon').classList.add('has-text-success')
    document.getElementById('FC+2no').classList.remove('has-text-danger')
    document.getElementById('solutionFC+2').classList.add('is-hidden')
    document.getElementById('symptoms').classList.add('is-hidden')
    document.getElementById('fc+2symptoms').classList.add('is-hidden')
  }
}

// Run BOOM! Failure
function runBoomFailure () {
  r = Math.floor(Math.random() * 3) + 1;

  if ( r == 1 ) {
    alert ('O2 tank Valve Failure')
  } else if ( r == 2 ) {
    alert ('Diluent Right Post Valve Failure')
  } else if ( r == 3 ) {
    alert ('Diluent Manifold Failure')
  } else if ( r == 4 ) {
    alert ('Diluent Left Post Valve Failure')
  }
}

// FC+3
function runFCp3 () {
  if ( !isFCp3Active ) {
    isFCp3Active = true
    document.getElementById('fc+3icon').classList.remove('has-text-success')
    document.getElementById('fc+3icon').classList.add('has-text-danger')
    document.getElementById('FC+3no').classList.add('has-text-danger')
    runBoomFailure ()
  } else {
    isFCp3Active = false
    document.getElementById('fc+3icon').classList.remove('has-text-danger')
    document.getElementById('fc+3icon').classList.add('has-text-success')
    document.getElementById('FC+3no').classList.remove('has-text-danger')
  }
}

function randomFailure () {
  r = Math.floor(Math.random() * 17) + 1;

  if ( r == 1 ) { runFC1 () } 
  else if ( r == 2 ) { runFC2 () }
  else if ( r == 3 ) { runFC3 () }
  else if ( r == 4 ) { runFC4 () }
  else if ( r == 5 ) { runFC5 () }
  else if ( r == 6 ) { runFC6 () }
  else if ( r == 7 ) { runFC7 () }
  else if ( r == 8 ) { runFC8 () }
  else if ( r == 9 ) { runFC9 () }
  else if ( r == 10 ) { runFC10 () }
  else if ( r == 11 ) { runFC11 () }
  else if ( r == 12 ) { runFC12 () }
  else if ( r == 13 ) { runFC13 () }
  else if ( r == 14 ) { runFC14 () }
  else if ( r == 15 ) { runFCp1 () }
  else if ( r == 16 ) { runFCp2 () }
  else if ( r == 17 ) { runFCp3 () }
}

function toggleHint () {
  document.getElementById('failuresHintButton').classList.toggle('has-text-success')
  document.getElementById('FC1hint').classList.toggle('is-hidden')
  document.getElementById('FC2hint').classList.toggle('is-hidden')
  document.getElementById('FC3hint').classList.toggle('is-hidden')
  document.getElementById('FC4hint').classList.toggle('is-hidden')
  document.getElementById('FC5hint').classList.toggle('is-hidden')
  document.getElementById('FC6hint').classList.toggle('is-hidden')
  document.getElementById('FC7hint').classList.toggle('is-hidden')
  document.getElementById('FC8hint').classList.toggle('is-hidden')
  document.getElementById('FC9hint').classList.toggle('is-hidden')
  document.getElementById('FC10hint').classList.toggle('is-hidden')
  document.getElementById('FC11hint').classList.toggle('is-hidden')
  document.getElementById('FC12hint').classList.toggle('is-hidden')
  document.getElementById('FC13hint').classList.toggle('is-hidden')
  document.getElementById('FC14hint').classList.toggle('is-hidden')
  document.getElementById('FC+1hint').classList.toggle('is-hidden')
  document.getElementById('FC+2hint').classList.toggle('is-hidden')
  document.getElementById('FC+3hint').classList.toggle('is-hidden')
}
