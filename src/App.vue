<template>
    <router-view :viewport="viewport" :device="device"/>
</template>

<script setup>
    import './styles/app.scss'; // global styles
    import { onMounted, ref } from 'vue';

    const viewport = ref({
        w: window.innerWidth,
        h: window.innerHeight,
        isMin480: window.innerWidth >= 480,
        isMin580: window.innerWidth >= 580,
        isMin768: window.innerWidth >= 768,  // tablet+
        isMin850: window.innerWidth >= 850,
        isMin1000: window.innerWidth >= 1000,
        isMin1150: window.innerWidth >= 1150,
        isMax480: window.innerWidth <= 480,
        isMax580: window.innerWidth <= 580,
        isMax768: window.innerWidth <= 768,  // tablet+
        isMax850: window.innerWidth <= 850,
        isMax1000: window.innerWidth <= 1000,
        isMax1150: window.innerWidth <= 1150
    });

    const device = ref({
        isMobile: window.matchMedia("(pointer: coarse)").matches,
        isPC: window.matchMedia("(pointer: fine)").matches,
        isLandscape: window.matchMedia("(orientation: landscape)").matches,
        isPortrait: window.matchMedia("(orientation: portrait)").matches
    });

    function updateViewport() {
        viewport.value = {
            w: window.innerWidth,
            h: window.innerHeight,
            isMin480: window.innerWidth >= 480,
            isMin580: window.innerWidth >= 580,
            isMin768: window.innerWidth >= 768,  // tablet+
            isMin850: window.innerWidth >= 850,
            isMin1000: window.innerWidth >= 1000,
            isMin1150: window.innerWidth >= 1150,
            isMax480: window.innerWidth <= 480,
            isMax580: window.innerWidth <= 580,
            isMax768: window.innerWidth <= 768,  // tablet+
            isMax850: window.innerWidth <= 850,
            isMax1000: window.innerWidth <= 1000,
            isMax1150: window.innerWidth <= 1150
        };

        device.value = {
            isMobile: window.matchMedia("(pointer: coarse)").matches,
            isPC: window.matchMedia("(pointer: fine)").matches,
            isLandscape: window.matchMedia("(orientation: landscape)").matches,
            isPortrait: window.matchMedia("(orientation: portrait)").matches
        }
    }

    onMounted(() => {
        window.addEventListener('resize', updateViewport);
    });
</script>