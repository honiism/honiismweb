<template>
    <Landing :viewport="viewport"/>
    <Footer />
</template>

<script setup>
    import { gsap } from '../js/vendor'

    import Landing from '../views/viewComps/Landing.vue'
    import Footer from '../components/Footer.vue'

    const props = defineProps({
        viewport: Object
    })
</script>