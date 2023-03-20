import { Stretch } from '~/models/Stretch'

export function useRoutine(name: string, timer_start = 5, timer_break = 5, provided_stretches : Array<Stretch>) {
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
    const stretches = ref<Array<Stretch>>(provided_stretches)
    const currentStretchIndex = ref(0)

    function setStretches(routines : Array<Stretch>) {
        stretches.value = routines
    }

    const timerText = computed(() => {
        if ( onBreak.value ) {
            return `Rest Remaining: ${breakTimer.value}`
        } else if ( onStretch.value ) {
            return `Stretch! Time Remaining: ${stretchTimer.value}`
        }
        return `Starting In: ${startTimer.value}`
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

    function reset() {
        started.value = false
        onBreak.value = false
        onStretch.value = false
        startTimer.value = timer_start
        breakTimer.value = timer_break
        stretchTimer.value = 30
        currentStretchIndex.value = 0

        clearTimeout(startTimerId.value)
        startTimerId.value = 0

        clearTimeout(breakTimerId.value)
        breakTimerId.value = 0

        clearTimeout(stretchTimerId.value)
        stretchTimerId.value = 0
    }

    function start() {
        started.value = true
        startTimerId.value = setInterval(function() {
            if ( startTimer.value > 0 ) {
                startTimer.value--
            } else {
                clearInterval(startTimerId.value)
                runStretch()
            }
        }, 1000)
    }

    function runStretch(wasPaused = false) {
        if ( stretches.value[currentStretchIndex.value] ) {
            const s = stretches.value[currentStretchIndex.value]
            if ( !wasPaused ) {
                stretchTimer.value = s.timer
            }
            onStretch.value = true
            stretchTimerId.value = setInterval(function() {
                console.log('Stretching timer interval')
                if ( stretchTimer.value > 0 ) {
                    stretchTimer.value--
                } else {
                    clearInterval(stretchTimerId.value)
                    currentStretchIndex.value++
                    runBreak()
                }
            }, 1000)
        } else {
            endStretching()
        }
    }

    function runBreak() {
        onStretch.value = false
        onBreak.value = true
        breakTimerId.value = setInterval(function() {
            console.log('Break Time Interval')
            if ( breakTimer.value > 0 ) {
                breakTimer.value--
            } else {
                clearInterval(breakTimerId.value)
                onBreak.value = false
                breakTimer.value = timer_break
                runStretch()
            }
        }, 1000)
    }

    function endStretching() {
        reset()
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
        currentStretch,
        buttonActionText,
        setStretches,
        start,
        reset,
        toggleStartState
    }
}