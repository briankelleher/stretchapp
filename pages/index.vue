<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p>Select Stretching Routine:</p>
                <div class="routine-list">
                    <RoutineListItem :routine="s.routine" :body-parts="s.name" v-for="(s, i) in enabledStretches" :key="`stretch-listing-${i}`" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useEnabledStretches } from '~/compostables/useStretches'
const enabledStretches = useEnabledStretches()
</script>