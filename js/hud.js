const S1L1 = document.getElementById('hud_sensor1_led1')
const S1L2 = document.getElementById('hud_sensor1_led2')
const S1L3 = document.getElementById('hud_sensor1_led3')
const S1L4 = document.getElementById('hud_sensor1_led4')
const S2L1 = document.getElementById('hud_sensor2_led1')
const S2L2 = document.getElementById('hud_sensor2_led2')
const S2L3 = document.getElementById('hud_sensor2_led3')
const S2L4 = document.getElementById('hud_sensor2_led4')
const S3L1 = document.getElementById('hud_sensor3_led1')
const S3L2 = document.getElementById('hud_sensor3_led2')
const S3L3 = document.getElementById('hud_sensor3_led3')
const S3L4 = document.getElementById('hud_sensor3_led4')
let maxT
let hudTimer
let reading

// HUD Functions
function hudClearS1Leds () {
  S1L1.classList.remove('is-blinking', 'has-background-danger')
  S1L2.classList.remove('is-blinking', 'has-background-success')
  S1L3.classList.remove('is-blinking', 'has-background-warning')
  S1L4.classList.remove('is-blinking', 'has-background-danger')
}

function hudClearS2Leds () {
  S2L1.classList.remove('is-blinking', 'has-background-danger')
  S2L2.classList.remove('is-blinking', 'has-background-success')
  S2L3.classList.remove('is-blinking', 'has-background-warning')
  S2L4.classList.remove('is-blinking', 'has-background-danger')
}

function hudClearS3Leds () {
  S3L1.classList.remove('is-blinking', 'has-background-danger')
  S3L2.classList.remove('is-blinking', 'has-background-success')
  S3L3.classList.remove('is-blinking', 'has-background-warning')
  S3L4.classList.remove('is-blinking', 'has-background-danger')
}

function hudClearLeds () {
  hudClearS1Leds ()
  hudClearS2Leds ()
  hudClearS3Leds ()
  document.getElementById('hud_play_icon').classList.remove('has-text-success')
  document.getElementById('hud_start_icon').classList.remove('has-text-success')
  document.getElementById('hud_battery_icon').classList.remove('has-text-success')
  document.getElementById('hud_sensor_icon').classList.remove('has-text-success')
  document.getElementById('hud_communication_icon').classList.remove('has-text-success')
}

function hudStartAnimation () {
  function hudLed2 () {
    hudClearLeds ()
    S2L1.classList.add('is-blinking', 'has-background-danger')
  }

  function hudLed3 () {
    hudClearLeds ()
    S3L1.classList.add('is-blinking', 'has-background-danger')
  }

  function hudLed4 () {
    hudClearLeds ()
    S1L2.classList.add('is-blinking', 'has-background-success')
  }

  function hudLed5 () {
    hudClearLeds ()
    S2L2.classList.add('is-blinking', 'has-background-success')
  }

  function hudLed6 () {
    hudClearLeds ()
    S3L2.classList.add('is-blinking', 'has-background-success')
  }

  function hudLed7 () {
    hudClearLeds ()
    S1L3.classList.add('is-blinking', 'has-background-warning')
  }

  function hudLed8 () {
    hudClearLeds ()
    S2L3.classList.add('is-blinking', 'has-background-warning')
  }

  function hudLed9 () {
    hudClearLeds ()
    S3L3.classList.add('is-blinking', 'has-background-warning')
  }

  function hudLed10 () {
    hudClearLeds ()
    S1L4.classList.add('is-blinking', 'has-background-danger')
  }

  function hudLed11 () {
    hudClearLeds ()
    S2L4.classList.add('is-blinking', 'has-background-danger')
  }

  function hudLed12 () {
    hudClearLeds ()
    S3L4.classList.add('is-blinking', 'has-background-danger')
  }

  function hudLedT () {
    hudClearLeds ()
    S1L4.classList.add('has-background-danger')
    S2L1.classList.add('has-background-danger')
    S2L2.classList.add('has-background-success')
    S2L3.classList.add('has-background-warning')
    S2L4.classList.add('has-background-danger')
    S3L4.classList.add('has-background-danger')
  }
  
  hudClearLeds ()
  S1L1.classList.add('is-blinking', 'has-background-danger')
  setTimeout ( hudLed2, 500 )
  setTimeout ( hudLed3, 1000 )
  setTimeout ( hudLed4, 1500 )
  setTimeout ( hudLed5, 2000 )
  setTimeout ( hudLed6, 2500 )
  setTimeout ( hudLed7, 3000 )
  setTimeout ( hudLed8, 3500 )
  setTimeout ( hudLed9, 4000 )
  setTimeout ( hudLed10, 4500 )
  setTimeout ( hudLed11, 5000 )
  setTimeout ( hudLed12, 5500 )
  setTimeout ( hudLedT, 6000 )
}

function hudCurrentPO2 () {
  hudClearLeds ()
  document.getElementById('hud_play_icon').classList.add('has-text-success')

  function checkS1 () {
    let s1val = sensor1.value.toFixed(2)
    let x = 10 - Math.round(s1val * 10)
    let time = x * 750

    if ( s1val < .95 ) {
      if ( s1val <= 0.45 ) {
        S1L4.classList.add('is-blinking')
        setTimeout ( hudClearS1Leds, time )
      } else {
        S1L3.classList.add('is-blinking')
        setTimeout ( hudClearS1Leds, time )
      }
    } else if ( s1val < 1.05 ) {
      S1L2.classList.add('is-blinking')
      S1L3.classList.add('is-blinking')
      setTimeout ( hudClearS1Leds, 750 )
    } else {
      x = x * (-1)
      time = x * 750

      if ( s1val <= 1.55 ) {
        S1L2.classList.add('is-blinking')
        setTimeout ( hudClearS1Leds, time )
      } else {
        S1L1.classList.add('is-blinking')
        setTimeout ( hudClearS1Leds, time )
      }
    }
  }

  function checkS2 () {
    let s2val = sensor2.value.toFixed(2)
    let x = 10 - Math.round(s2val * 10)
    let time = x * 750

    if ( s2val < .95 ) {
      if ( s2val <= 0.45 ) {
        S2L4.classList.add('is-blinking')
        setTimeout ( hudClearS2Leds, time )
      } else {
        S2L3.classList.add('is-blinking')
        setTimeout ( hudClearS2Leds, time )
      }
    } else if ( s2val < 1.05 ) {
      S2L2.classList.add('is-blinking')
      S2L3.classList.add('is-blinking')
      setTimeout ( hudClearS2Leds, 750 )
    } else {
      x = x * (-1)
      time = x * 750

      if ( s2val <= 1.55 ) {
        S2L2.classList.add('is-blinking')
        setTimeout ( hudClearS2Leds, time )
      } else {
        S2L1.classList.add('is-blinking')
        setTimeout ( hudClearS2Leds, time )
      }
    }
  }

  function checkS3 () {
    let s3val = sensor3.value.toFixed(2)
    let x = 10 - Math.round(s3val * 10)
    let time = x * 750

    if ( s3val < .95 ) {
      if ( s3val <= 0.45 ) {
        S3L4.classList.add('is-blinking')
        setTimeout ( hudClearS3Leds, time )
      } else {
        S3L3.classList.add('is-blinking')
        setTimeout ( hudClearS3Leds, time )
      }
    } else if ( s3val < 1.05 ) {
      S3L2.classList.add('is-blinking')
      S3L3.classList.add('is-blinking')
      setTimeout ( hudClearS3Leds, 750 )
    } else {
      x = x * (-1)
      time = x * 750

      if ( s3val <= 1.55 ) {
        S3L2.classList.add('is-blinking')
        setTimeout ( hudClearS3Leds, time )
      } else {
        S3L1.classList.add('is-blinking')
        setTimeout ( hudClearS3Leds, time )
      }
    }
  }

  checkS1 ()
  checkS2 ()
  checkS3 ()
}

function hudStart () {
  clearInterval(reading)
  hudClearLeds ()
  document.getElementById('hud_start_icon').classList.add('has-text-success')
  hudStartAnimation ()
}

function setHudTimer () {
  let s1val = sensor1.value.toFixed(2)
  let s2val = sensor2.value.toFixed(2)
  let s3val = sensor3.value.toFixed(2)

  let t1 = Math.abs( 10 - Math.round(s1val * 10) )
  let t2 = Math.abs( 10 - Math.round(s2val * 10) )
  let t3 = Math.abs( 10 - Math.round(s3val * 10) )
  
  // TODO: ARRAYli birşeyler yap
  if ( t1 > t2 ) { maxT = t1 } else { maxT = t2 }
  if ( t3 > maxT ) { maxT = t3 }
  hudTimer = 750 * maxT + 3000
  hudTimer = 10000
}

function hudRealtime () {
  setHudTimer ()
  hudStartAnimation ()
  reading = setInterval(hudCurrentPO2, hudTimer)
}

function hudBatteryLow () {
  clearInterval(reading)
  hudClearLeds ()
  document.getElementById('hud_battery_icon').classList.add('has-text-success')
  S1L3.classList.add('has-background-warning')
  S2L3.classList.add('has-background-warning')
  S3L3.classList.add('has-background-warning')
}

function hudSensorFailed () {
  clearInterval(reading)
  hudClearLeds ()
  document.getElementById('hud_sensor_icon').classList.add('has-text-success')
  S1L2.classList.add('is-blinking')
  S1L3.classList.add('is-blinking')
  S2L3.classList.add('is-blinking')
  S2L2.classList.add('is-blinking')
  S3L4.classList.add('has-background-danger')
  S3L1.classList.add('has-background-danger')
}

function hudNoCommunications () {
  clearInterval(reading)
  hudClearLeds ()
  document.getElementById('hud_communication_icon').classList.add('has-text-success')
  S1L1.classList.add('is-blinking')
  S1L4.classList.add('is-blinking')
  S3L1.classList.add('is-blinking')
  S3L4.classList.add('is-blinking')
}

hudRealtime ()
