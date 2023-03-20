import { defineStore } from 'pinia'
import { Stretch } from '~/models/Stretch'
import type { GoogleSheetsApiResponse } from '~/types/GoogleSheetsAPIResponse'

export const useStretchesStore = defineStore('stretches', () => {
    const stretches = ref<Array<Stretch>>([])
    const restTimer = ref(12)

    const enabledStretches = computed(() => {
        return stretches.value.filter(x => x.enabled)
    })

    const routines = computed(() => {
        const routines : Array<string> = []
        stretches.value.forEach(stretch => {
            if ( !routines.includes(stretch.routine) ) {
                routines.push(stretch.routine)
            }
        })
        return routines
    })

    const bodyParts = computed(() => {
        const parts : Array<string> = []
        stretches.value.forEach(stretch => {
            if ( !parts.includes(stretch.bodyPart) ) [
                parts.push(stretch.bodyPart)
            ]
        })
        return parts
    })

    function setStretches(freshStretches : Array<Stretch>) {
        stretches.value.length = 0
        stretches.value.push(...freshStretches)
    }

    async function fetchStretches(url : string) {
        const { data, error } = await useFetch<GoogleSheetsApiResponse>(url)
        if ( error ) {
            console.log(error)
        }
        if ( data.value?.values ) {
            const new_streches = data.value.values.map(x => new Stretch(x))
            setStretches(new_streches)
        }
    }

    function stretchesForRoutine(routine : string) {
        return stretches.value.filter(x => {
            return x.routine === routine
        })
    }

    return {
        stretches,
        restTimer,
        enabledStretches,
        routines,
        bodyParts,
        setStretches,
        fetchStretches,
        stretchesForRoutine
    }
})