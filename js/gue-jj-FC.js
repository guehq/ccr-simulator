function toggleSolutions () {
  showSolutions = !showSolutions
  document.getElementById('failuresSolutionButton').classList.toggle('has-text-success')
  document.getElementById('solutions').classList.toggle('is-hidden')
}

/* ---------- FAILURE CARDS for GUE-JJ CONFIGURATION ---------- */

// FC1
function runFC1 () {
  if ( !isFC1Active ) {
    isFC1Active = true
    discrepancyFactor = .7
    document.getElementById('sensor3').classList.add('has-text-warning')
    document.getElementById('fc1icon').classList.remove('has-text-success')
    document.getElementById('fc1icon').classList.add('has-text-danger')
    document.getElementById('solutionFC1').classList.remove('is-hidden')
  } else {
    isFC1Active = false
    discrepancyFactor = 1
    document.getElementById('sensor3').classList.remove('has-text-warning')
    document.getElementById('fc1icon').classList.remove('has-text-danger')
    document.getElementById('fc1icon').classList.add('has-text-success')
    document.getElementById('solutionFC1').classList.add('is-hidden')
  }
}

// FC2
function runFC2 () {
  if ( !isFC2Active ) {
    isFC2Active = true
    loopO2 = 1.44
    document.getElementById('fc2icon').classList.remove('has-text-success')
    document.getElementById('fc2icon').classList.add('has-text-danger')
    document.getElementById('solutionFC2').classList.remove('is-hidden')
  } else {
    isFC2Active = false
    document.getElementById('fc2icon').classList.remove('has-text-danger')
    document.getElementById('fc2icon').classList.add('has-text-success')
    document.getElementById('solutionFC2').classList.add('is-hidden')
  }
}

// FC3
function runFC3 () {
  if ( !isFC3Active ) {
    isFC3Active = true
    loopO2 = 1.91
    document.getElementById('fc3icon').classList.remove('has-text-success')
    document.getElementById('fc3icon').classList.add('has-text-danger')
    document.getElementById('solutionFC3').classList.remove('is-hidden')
  } else {
    isFC3Active = false
    document.getElementById('fc3icon').classList.remove('has-text-danger')
    document.getElementById('fc3icon').classList.add('has-text-success')
    document.getElementById('solutionFC3').classList.add('is-hidden')
  }
}

// FC4
function runFC4 () {
  if ( !isFC4Active ) {
    isFC4Active = true
    loopO2 = 0.31
    document.getElementById('fc4icon').classList.remove('has-text-success')
    document.getElementById('fc4icon').classList.add('has-text-danger')
    document.getElementById('solutionFC4').classList.remove('is-hidden')
  } else {
    isFC4Active = false
    document.getElementById('fc4icon').classList.remove('has-text-danger')
    document.getElementById('fc4icon').classList.add('has-text-success')
    document.getElementById('solutionFC4').classList.add('is-hidden')
  }
}

// FC5
function runFC5 () {
  if ( !isFC5Active ) {
    isFC5Active = true
    document.getElementById('fc5icon').classList.remove('has-text-success')
    document.getElementById('fc5icon').classList.add('has-text-danger')
  } else {
    isFC5Active = false
    document.getElementById('fc5icon').classList.remove('has-text-danger')
    document.getElementById('fc5icon').classList.add('has-text-success')
  }
}

// FC6
function runFC6 () {
  !isFC6Active
  document.getElementById('nerd').classList.toggle('visible')
  document.getElementById('fc6icon').classList.toggle('has-text-danger')
  document.getElementById('fc6icon').classList.toggle('has-text-success')
  document.getElementById('hideNerd').classList.toggle('is-hidden')
  document.getElementById('showNerd').classList.toggle('is-hidden')
  document.getElementById('hideNerd').disabled = true
  document.getElementById('showNerd').disabled = true
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
  if (o2RunawayFailure) {
    o2RunawayFailure = false
    document.getElementById('oxygenFlush').removeAttribute('disabled')
    document.getElementById('mavOxygen').removeAttribute('disabled')
    document.getElementById('fc13icon').classList.toggle('has-text-danger')
    document.getElementById('fc13icon').classList.toggle('has-text-success')
  } else {
    o2RunawayFailure = true
    document.getElementById('oxygenFlush').setAttribute('disabled', '')
    document.getElementById('mavOxygen').setAttribute('disabled', '')
    document.getElementById('fc13icon').classList.toggle('has-text-danger')
    document.getElementById('fc13icon').classList.toggle('has-text-success')
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

function randomFailure () {
  randomNo = Math.floor(Math.random() * 14) + 1;

  if ( randomNo == 1 ) { runFC1 () } 
  else if ( randomNo == 2 ) { runFC2 () }
  else if ( randomNo == 3 ) { runFC3 () }
  else if ( randomNo == 4 ) { runFC4 () }
  else if ( randomNo == 5 ) { runFC5 () }
  else if ( randomNo == 6 ) { runFC6 () }
  else if ( randomNo == 7 ) { runFC7 () }
  else if ( randomNo == 8 ) { runFC8 () }
  else if ( randomNo == 9 ) { runFC9 () }
  else if ( randomNo == 10 ) { runFC10 () }
  else if ( randomNo == 11 ) { runFC11 () }
  else if ( randomNo == 12 ) { runFC12 () }
  else if ( randomNo == 13 ) { runFC13 () }
  else if ( randomNo == 14 ) { runFC14 () }
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
}