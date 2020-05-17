const timer = document.querySelector(".display-2")
const startButton = document.querySelector(".btn-outline-primary")
const resetButton = document.querySelector(".btn-outline-secondary")
let timerStarted = undefined
let intervalID = undefined
let minutes = 25
let seconds = 0
let isPaused = false
let isBreak = false

function padToTwo(number) {
    if (number<=9 && number>-1) { number = "0"+number }
    return number;
}

function countdownTimer(min, sec) {
    isPaused = false
    timerStarted = true
    startButton.innerHTML = "Pause"
        intervalID = setInterval(() => {
        if (sec == 00 && min == 00) {
            if (isBreak) {
                isBreak = false
                document.querySelector('.modal-body').innerHTML = "Break's up let's get back to 25 minutes of focused work."
                $('#staticBackdrop').modal('show')
                clearInterval(intervalID)
                timerStarted = undefined
            } else {
                isBreak = true
                document.querySelector('.modal-body').innerHTML = "It's time to put down the tools and take a 5 minute break."
                $('#staticBackdrop').modal('show')
                clearInterval(intervalID)
                timerStarted = undefined
            }
        } else if (sec == -1) {
            min--
            sec = 59
        }
        if (min >= 0) {
            timer.textContent = `${padToTwo(min)}:${padToTwo(sec)}`
            sec--
        }  
        seconds = sec
        minutes = min
    },1000) 
}

function pauseCountdownTimer() {
    clearInterval(intervalID)
    isPaused = true
    startButton.innerHTML = "Start"
    console.log(minutes)
    console.log(seconds)
}

startButton.addEventListener('click', () => {
    if (!isPaused && !timerStarted) {
        countdownTimer(25, 0) 
    } else if (!isPaused && timerStarted) {
        pauseCountdownTimer()
    } else {
        console.log('unpause')
        countdownTimer(minutes, seconds)
    }
})

resetButton.addEventListener('click', () => {
    clearInterval(intervalID)
    startButton.innerHTML = "Start"
    timerStarted = undefined
    minutes = 25
    seconds = 0
    isPaused = false
    isBreak = false
    timer.textContent = `${padToTwo(minutes)}:${padToTwo(seconds)}`
})

$('#staticBackdrop').on('hide.bs.modal', () => {
    if (isBreak) {
        countdownTimer(5, 0)
    } else {
        countdownTimer(25, 0)
    }

})
