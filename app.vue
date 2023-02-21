<template>
  <div>
    <v-container>
      <v-row>
        <v-col cols="12">
          <h1 class="mb-3">Stretch App</h1>
        </v-col>
      </v-row>
    </v-container>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useStretches } from '~/compostables/useStretches'
const spreadsheet_id = '1fez5NfgrL1PlATUhgeVfhdmbtER0pF2mvqBDZlf1bU0'
const gapi_key = 'AIzaSyC6Xkn7d8zTQvV7veppThzIq4MgElWEHLA'
const { data } = await useFetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/A1:I1000?key=${gapi_key}`)

if ( data && data.value ) {
  let sheet_values = data.value.values
  sheet_values.shift()
  useStretches(sheet_values)
}
</script>
