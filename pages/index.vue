<template>
    <v-container>
        <v-row>
            <v-col cols="12" md="3" class="d-flex align-center">
                <label>Set Rest Interval:</label>
            </v-col>
            <v-col cols="4" md="3">
                <v-text-field
                    v-model="restTimer"
                    type="number"
                    hide-details
                    variant="outlined"
                ></v-text-field>
            </v-col>
            <v-col cols="2" class="align-center d-flex">
                <p>Seconds</p>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <p>Select Stretching Routine:</p>
                <div class="routine-list">
                    <RoutineListItem :routine="r" v-for="(r, i) in routines" :key="`stretch-listing-${i}`" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { useStretchesStore } from '~/stores/stretches'
import { storeToRefs } from 'pinia'
const store = useStretchesStore()
const { restTimer, routines } = storeToRefs(store)
</script>