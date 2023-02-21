<template>
    <div class="routine-list-item">
        <p>{{ name }}</p>
    </div>
</template>

<script setup>
const props = defineProps({
    routine: String,
    bodyParts: String
})

const name = computed(() => {
    let n = `Routine ${props.routine}`
    if ( props.bodyParts ) {
        n += ` (${props.bodyParts})`
    }
    return n
})
</script>
