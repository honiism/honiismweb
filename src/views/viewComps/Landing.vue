<template>
    <main>
        <img class="parallax parallax--bg" src="../../assets/images/landing_bg.png" alt="">
        <img class="parallax parallax--squiggle_b" src="../../assets/images/squiggles_b.svg" alt="">
        <img class="parallax parallax--squiggle_t" src="../../assets/images/squiggles_t.svg" alt="">
        <img class="parallax parallax--sparkles_1" src="../../assets/images/star_sparkles.svg" alt="">
        <img class="parallax parallax--sparkles_2" src="../../assets/images/star_sparkles.svg" alt="">
        <img class="parallax parallax--blue_planet" src="../../assets/images/blue_planet.svg" alt="">
        <img class="parallax parallax--purple_planet" src="../../assets/images/purple_planet.svg" alt="">
        <img class="parallax parallax--title" src="../../assets/images/landing_title.svg" alt="">
        <img class="parallax parallax--stars_3" src="../../assets/images/3_stars.svg" alt="">
        <img class="parallax parallax--stars_2" src="../../assets/images/2_stars.svg" alt="">
        <img class="parallax parallax--ring_planet" src="../../assets/images/ring_planet.svg" alt="">
    </main>
</template>

<style scoped lang="scss">
    @import "../../styles/landing.scss";
</style>

<script setup>
    import { onMounted } from 'vue'
    import { gsap } from '../../js/vendor'

    import Footer from '../../components/Footer.vue'

    const props = defineProps({
        viewport: Object
    })

    function parallelAnim() {
        // add check for non hover devices to return
        
        const parallelEl = document.querySelectorAll(".parallax")

        let xVal = 0
        let yVal = 0

        window.addEventListener("mousemove", (e) => {
            xVal = e.clientX
            yVal = e.clientY
        })
    }

    onMounted(() => {
        parallelAnim()
    })
</script>