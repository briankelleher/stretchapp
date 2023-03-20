<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p>Select Stretching Routine:</p>
                <div class="routine-list">
                    <RoutineListItem :routine="r" v-for="(r, i) in routines" :key="`stretch-listing-${i}`" />
                </div>

                <v-row justify="center" class="mt-4">
                    <v-col cols="12" md="6">
                        <v-text-field
                            v-model="restTimer"
                            type="number"
                            style="width: 100px"
                            density="compact"
                            hide-details
                            label="Rest Interval Seconds"
                            variant="outlined"
                        ></v-text-field>
                    </v-col>
                </v-row>

                
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