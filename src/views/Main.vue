<template>
    <Landing v-if="isPortrait" :viewport="viewport"/>
    <Footer v-if="isPortrait"/>
    <Warning v-else/>
</template>

<script setup>
    import { ref } from "vue";

    import Landing from "../views/viewComps/Landing.vue";
    import Warning from "../components/LandscapeWarning.vue";
    import Footer from "../components/Footer.vue"

    const props = defineProps({
        viewport: Object
    });

    const isPortrait = ref(true);

    window.addEventListener("resize", () => {
        const orientation = window.innerWidth > window.innerHeight ? "Landscape" : "Portrait";

        if (orientation == "Landscape") {
            isPortrait.value = false
        } else if (orientation == "Portrait") {
            isPortrait.value = true;
        }
    });
</script>