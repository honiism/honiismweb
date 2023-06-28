<template>
    <main>
        <img class="parallax parallax--bg" src="../../assets/images/landing_bg.png" data-speedx="0.3" data-speedy="0.2">
        <img class="parallax parallax--squiggle_b noZ" src="../../assets/images/squiggles_b.svg" data-speedx="0" data-speedy="0.02">
        <img class="parallax parallax--squiggle_t noZ" src="../../assets/images/squiggles_t.svg" data-speedx="0" data-speedy="0.02">
        <img class="parallax parallax--sparkles_1" src="../../assets/images/star_sparkles.svg" data-speedx="0.27" data-speedy="0.15">
        <img class="parallax parallax--sparkles_2" src="../../assets/images/star_sparkles.svg" data-speedx="0.195" data-speedy="0.1">
        <img class="parallax parallax--ring_planet" src="../../assets/images/ring_planet.svg" data-speedx="0.25" data-speedy="0.095">
        <img class="parallax parallax--title" src="../../assets/images/landing_title.svg" data-speedx="0.125" data-speedy="0.09">
        <img class="parallax parallax--stars_3" src="../../assets/images/3_stars.svg" data-speedx="0.1" data-speedy="0.085">
        <img class="parallax parallax--stars_2" src="../../assets/images/2_stars.svg" data-speedx="0.16" data-speedy="0.08">
        <img class="parallax parallax--blue_planet" src="../../assets/images/blue_planet.svg" data-speedx="0.1" data-speedy="0.075">
        <img class="parallax parallax--purple_planet" src="../../assets/images/purple_planet.svg" data-speedx="0.07" data-speedy="0.07">
    </main>
</template>

<style scoped lang="scss">
    @import "../../styles/landing.scss";
</style>

<script setup>
    import { onMounted } from 'vue';
    import { gsap } from '../../js/vendor';

    const props = defineProps({
        viewport: Object
    });

    let parallaxEl;

    let xVal = 0;
    let yVal = 0;
    let rotateDeg = 0;

    function transformParallax(cursorPosX) {
        parallaxEl.forEach((el) => {
            /**
             * Things like rotation, z should have it's own speeds (max rotatation = 0.1, rotation speed of bg = 0).
             * But, because we're going from mobile to desktop, it's hard to see the effect of each speed.
             * Make sure to add these speeds as you approach larger devices.
             * Also make sure to multiply the values to rotateDeg and zVal (correspondingly).
             */

            let speedX = el.dataset.speedx;
            let speedY = el.dataset.speedy;
            let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;

            let zVal;

            // can be replaced with speedz = 0 when we add the data-speedz attribute.
            if (el.classList.contains("noZ")) {
                zVal = 0;
            } else {
                zVal = (cursorPosX - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.2;
            }

            el.style.transform = `translateX(calc(-50% + ${-xVal * speedX}px))`
                    + `rotateY(${rotateDeg}deg)`
                    + `translateY(calc(-50% + ${yVal * speedY}px))`
                    + `perspective(2300px) translateZ(${zVal}px)`;
        });
    }

    onMounted(() => {
        parallaxEl = document.querySelectorAll(".parallax");
        
        transformParallax(0);

        window.addEventListener("mousemove", (e) => {
            xVal = e.clientX - window.innerWidth / 2;
            yVal = e.clientY - window.innerHeight / 2;
            rotateDeg = (xVal / (window.innerWidth / 2)) * 10;

            transformParallax(e.clientX);
        });
    });
</script>