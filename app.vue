<template>
  <div>
    <v-app>
      <v-container>
        <h1>Stretch App</h1>
      </v-container>
      <NuxtPage />
    </v-app>
  </div>
</template>

<script setup>
import { useStretchesStore } from '~/stores/stretches'
import { storeToRefs } from 'pinia'

const spreadsheet_id = '1fez5NfgrL1PlATUhgeVfhdmbtER0pF2mvqBDZlf1bU0'
const gapi_key = 'AIzaSyC6Xkn7d8zTQvV7veppThzIq4MgElWEHLA'

const store = useStretchesStore()
onMounted(async () => {
    await store.fetchStretches(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheet_id}/values/A2:I1000?key=${gapi_key}`)
})
</script>
