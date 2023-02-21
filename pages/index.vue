<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <p>Select Stretching Routine:</p>
                <div class="routine-list">
                    <RoutineListItem :routine="`1`" :body-parts="`Calf, Hamstring`" />
                </div>
            </v-col>
        </v-row>
    </v-container>
</template>