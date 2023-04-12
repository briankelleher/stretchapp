import { Stretch } from '~/models/Stretch'

export function useRoutine(name: string, timer_start = 5, timer_break = 10, provided_stretches : Array<Stretch>) {
    const routine = ref(name)
    const started = ref(false)
    const paused = ref(false)
    const onStretch = ref(false)
    const onBreak = ref(false)
    const startTimer = ref(timer_start)
    const breakTimer = ref(timer_break)
    const stretchTimer = ref(30)
    const startTimerId = ref(0)
    const breakTimerId = ref(0)
    const stretchTimerId = ref(0)
    const stretches = ref<Array<Stretch>>(prepareStretches(provided_stretches))
    const currentStretchIndex = ref(0)

    function shuffleArray(array : Array<any>) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1))
            var temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
        return array
    }

    function prepareStretches(routines : Array<Stretch>) {
        let rs = shuffleArray(routines)
        let ss : Array<Stretch> = []
        let body_parts : Array<string> = []
        for (let index = 0; index < rs.length; index++) {
            const element = rs[index]
            if ( !body_parts.includes(element.bodyPart) ) {
                ss.push(element)
                body_parts.push(element.bodyPart)
            }
        }
        return ss
    }

    function setStretches(routines : Array<Stretch>) {
        const ss = prepareStretches(routines)
        stretches.value = ss
    }

    const timerText = computed(() => {
        if ( onBreak.value ) {
            return `Rest Remaining`
        } else if ( onStretch.value ) {
            return `Stretch! Time Remaining`
        }
        return `Starting In`
    })

    const currentStretch = computed(() => {
        if ( stretches.value[currentStretchIndex.value] ) {
            return stretches.value[currentStretchIndex.value]
        }
        return null
    })

    const buttonActionText = computed(() => {
        if ( paused.value ) {
            return `Resume`
        } else {
            if ( !started.value ) {
                return `Start`
            }
            return `Pause`
        }
    })

    const timerValue = computed(() => {
        if ( onBreak.value ) {
            return breakTimer.value
        } else if ( onStretch.value ) {
            return stretchTimer.value
        }
        return startTimer.value
    })

    const squareClass = computed(() => {
        let cl = `square`
        if ( onBreak.value ) {
            cl += ` square-warning`
        } else if ( onStretch.value ) {
            cl += ` square-success`
        }
        return cl
    })

    function clearTimers() {
        clearTimeout(startTimerId.value)
        startTimerId.value = 0
        clearTimeout(breakTimerId.value)
        breakTimerId.value = 0
        clearTimeout(stretchTimerId.value)
        stretchTimerId.value = 0
    }

    function reset() {
        paused.value = false
        started.value = false
        onBreak.value = false
        onStretch.value = false
        startTimer.value = timer_start
        breakTimer.value = timer_break
        stretchTimer.value = 30
        currentStretchIndex.value = 0
        clearTimers()
    }

    function start() {
        started.value = true
        clearTimers()
        let start_date = new Date()
        startTimerId.value = setInterval(function() {
            if ( startTimer.value > 0 ) {
                let now = new Date()
                let diff = now.getTime() - start_date.getTime()
                if ( diff > 1000 ) {
                    startTimer.value--
                    start_date = now
                }
            } else {
                clearInterval(startTimerId.value)
                setTimeout(runStretch, 1000)
            }
        }, 100)
    }

    function runStretch(wasPaused = false) {
        clearTimers()
        if ( stretches.value[currentStretchIndex.value] ) {
            const s = stretches.value[currentStretchIndex.value]
            if ( !wasPaused ) {
                stretchTimer.value = s.timer
            }
            let start_date = new Date()
            onStretch.value = true
            stretchTimerId.value = setInterval(function() {
                if ( stretchTimer.value > 0 ) {
                    let now = new Date()
                    let diff = now.getTime() - start_date.getTime()
                    if ( diff > 1000 ) {
                        stretchTimer.value--
                        start_date = now
                    }
                } else {
                    clearInterval(stretchTimerId.value)
                    setTimeout(function() {
                        currentStretchIndex.value++
                        runBreak()
                    }, 1000)
                }
            }, 100)
        } else {
            endStretching()
        }
    }

    function skipStretch() {
        clearTimers()
        currentStretchIndex.value++
        started.value = true
        paused.value = false
        runBreak()
    }

    function runBreak() {
        onStretch.value = false
        onBreak.value = true
        clearTimers()
        let start_date = new Date()
        breakTimerId.value = setInterval(function() {
            if ( breakTimer.value > 0 ) {
                let now = new Date()
                let diff = now.getTime() - start_date.getTime()
                if ( diff > 1000 ) {
                    breakTimer.value--
                    start_date = now
                }
            } else {
                clearInterval(breakTimerId.value)
                setTimeout(function() {
                    onBreak.value = false
                    breakTimer.value = timer_break
                    runStretch()
                }, 1000)
            }
        }, 100)
    }

    function endStretching() {
        reset()
        navigateTo('/')
    }

    function toggleStartState() {
        if ( !started.value ) {
            start()
            paused.value = false
        } else {
            // Pause logic
            if ( !paused.value ) {
                paused.value = true
                if ( onBreak.value ) {
                    clearInterval(breakTimerId.value)
                } else if ( onStretch.value ) {
                    clearInterval(stretchTimerId.value)
                } else {
                    clearInterval(startTimerId.value)
                }
            } else {
                // Unpause logic
                paused.value = false
                if ( onBreak.value ) {
                    runBreak()
                } else if ( onStretch.value ) {
                    runStretch(true)
                } else {
                    start()
                }
            }
        }
    }

    return {
        routine,
        timerText,
        timerValue,
        currentStretch,
        buttonActionText,
        setStretches,
        start,
        reset,
        toggleStartState,
        onBreak,
        squareClass,
        skipStretch,
        currentStretchIndex,
        stretches
    }
}