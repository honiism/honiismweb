<template>
    <Landing v-if="isPortrait" :viewport="viewport" :device="device"/>
    <Footer v-if="isPortrait"/>
    <Warning v-else/>
</template>

<script setup>
    import { onMounted, ref } from "vue";

    import Landing from "../views/viewComps/Landing.vue";
    import Warning from "../components/LandscapeWarning.vue";
    import Footer from "../components/Footer.vue"

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    const isPortrait = ref(true);

    function addLandscapeWarning() {
        if (props.device.isLandscape) {
            isPortrait.value = false;
        }

        window.addEventListener("resize", () => {
            if (props.device.isLandscape) {
                isPortrait.value = false;
            } else if (props.device.isPortrait) {
                isPortrait.value = true;
            }
        });
    }

    onMounted(() => {
        if (props.device.isMobile) {
            addLandscapeWarning();
        }
    });
</script>