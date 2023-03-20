<template>
    <v-container>
        <v-row>
            <v-col>
                <h1>Routine {{ $route.params.name }}</h1>
                <v-btn @click="toggleStartState">{{ buttonActionText }}</v-btn>
                <v-btn @click="reset">Reset</v-btn>
                <p>{{ timerText }}</p>
                <p v-if="currentStretch">Current Stretch: {{ currentStretch.name }}</p>
                <p v-if="currentStretch">{{ currentStretch.description }}</p>
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
const { timerText, start, reset, setStretches, currentStretch, buttonActionText, toggleStartState } = useRoutine(
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