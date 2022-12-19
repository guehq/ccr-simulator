/* ---------- GAS DYNAMICS ---------- */


// NARCOSIS
function checkNarcosis () {
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
  fO2 = document.getElementById('fO2').value / 100
  fHe = document.getElementById('fHe').value / 100
  fN2 = 1 - fO2 - fHe
  let ρO2 = 1.43 // rho
  let ρN2 = 1.25
  let ρHe = 0.18
  let maxDensity = 5.2 + 0.031 // 0.031 düzeltme değeri

  if ( ATA * ((fO2 * ρO2) + (fN2 * ρN2) + (fHe * ρHe)) > maxDensity ) {
    document.getElementById('gas_density').classList.remove('is-hidden')
  } else {
    document.getElementById('gas_density').classList.add('is-hidden')
  }
}