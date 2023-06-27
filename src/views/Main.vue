<template>
    <Landing :viewport="viewport"/>
</template>

<style scoped lang="scss">
    // Styling
</style>

<script setup>
    import Landing from '../views/viewComps/Landing.vue'

    const props = defineProps({
        viewport: Object
    })
</script>