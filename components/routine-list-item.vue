<template>
    <v-card class="routine-list-item mt-5 mb-5" variant="outlined" :to="link">
        <v-card-title>{{ name }}</v-card-title>
    </v-card>
</template>

<script setup>
const props = defineProps({
    routine: String,
    bodyParts: String
})

const name = computed(() => {
    let n = `${props.routine}`
    if ( props.bodyParts ) {
        n += ` (${props.bodyParts})`
    }
    return n
})

const link = computed(() => {
    if ( props.routine ) {
        return `/routine/${props.routine}`
    }
    return '#'
})
</script>
