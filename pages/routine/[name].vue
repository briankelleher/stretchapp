<template>
    <v-container>
        <v-btn variant="outlined" class="mb-6" prepend-icon="mdi-arrow-left" to="/">Back</v-btn>
        <p class="text-uppercase font-weight-bold mb-6">Routine {{ $route.params.name }}</p>

        <v-row class="mb-6">
            <v-col><v-btn variant="outlined" @click="toggleStartState" block size="x-large">{{ buttonActionText }}</v-btn></v-col>
            <v-col><v-btn variant="outlined" @click="reset" color="error" block size="x-large">Reset</v-btn></v-col>
        </v-row>

        <div v-if="currentStretch" class="mb-6 text-center">
            <p>Stretch {{ currentStretchIndex + 1 }} / {{ stretches.length }}</p>
            <h1 class="mb-1"><span v-if="onBreak">Upcoming: </span>{{ currentStretch.name }}</h1>
            <p v-if="currentStretch.bodyPart">{{ currentStretch.bodyPart }}</p>
            <p class="text-h5">{{ currentStretch.description }}</p>
        </div>

        <v-row justify="center">
            <v-col cols="6" class="text-center">
                <div :class="squareClass">
                    <span class="square-text d-block text-h6 mb-3">{{ timerText }}</span>
                    <span class="square-number d-block text-h1">{{ timerValue }}</span>
                </div>
            </v-col>
        </v-row>

        <v-row justify="center" class="mt-5">
            <v-col cols="6" md="4">
                <v-btn @click="skipStretch" block color="warning" variant="outlined" size="large">Skip Stretch</v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useStretchesStore } from '~/stores/stretches'
import { useRoutine } from '~/composables/routine'

const store = useStretchesStore()
const route = useRoute()
const { restTimer } = storeToRefs(store)
const { 
    timerText,
    timerValue,
    stretches,
    reset,
    setStretches,
    currentStretch,
    buttonActionText,
    toggleStartState,
    onBreak,
    squareClass,
    skipStretch,
    currentStretchIndex
} = useRoutine(
    route.params.name,
    5,
    restTimer.value,
    store.stretchesForRoutine(route.params.name)
)

// In case that this is the initial page load and stretches haven't been globally fetched
store.$subscribe((mutation) => {
    if (mutation.events.type === 'add' && mutation.storeId === 'stretches') {
        setStretches( store.stretchesForRoutine(route.params.name) )
    }
})
</script>

<style>
.square {
    border: 3px solid grey;
    padding-top: 20px;
    padding-bottom: 20px;
    border-radius: 8px;
}

.square-warning {
    border-color: rgb(251 175 79);
}

.square-success {
    border-color: rgb(131 195 134);
}
</style>