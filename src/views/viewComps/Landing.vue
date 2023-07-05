<template>
    <main>
        <img class="parallax parallax--bg" src="../../assets/images/landing_bg.png" data-speedx="0.3" data-speedy="0.3">
        <img class="parallax parallax--squiggle_1b noZ" src="../../assets/images/squiggles_1b.svg" data-speedx="0" data-speedy="0.1">
        <img class="parallax parallax--squiggle_2b noZ" src="../../assets/images/squiggles_2b.svg" data-speedx="0" data-speedy="0.095">
        <img class="parallax parallax--squiggle_3b noZ" src="../../assets/images/squiggles_3b.svg" data-speedx="0" data-speedy="0.09">
        <img class="parallax parallax--squiggle_1t noZ" src="../../assets/images/squiggles_1t.svg" data-speedx="0" data-speedy="0.1">
        <img class="parallax parallax--squiggle_2t noZ" src="../../assets/images/squiggles_2t.svg" data-speedx="0" data-speedy="0.095">
        <img class="parallax parallax--squiggle_3t noZ" src="../../assets/images/squiggles_3t.svg" data-speedx="0" data-speedy="0.09">
        <img class="parallax parallax--sparkles_1" src="../../assets/images/star_sparkles.svg" data-speedx="0.27" data-speedy="0.095">
        <img class="parallax parallax--sparkles_2" src="../../assets/images/star_sparkles.svg" data-speedx="0.25" data-speedy="0.09">
        <img class="parallax parallax--ring_planet" src="../../assets/images/ring_planet.svg" data-speedx="0.15" data-speedy="0.085">
        <img class="parallax parallax--title" src="../../assets/images/landing_title.svg" data-speedx="0.12" data-speedy="0.08">
        <img class="parallax parallax--stars_3" src="../../assets/images/3_stars.svg" data-speedx="0.1" data-speedy="0.075">
        <img class="parallax parallax--stars_2" src="../../assets/images/2_stars.svg" data-speedx="0.16" data-speedy="0.07">
        <img class="parallax parallax--blue_planet" src="../../assets/images/blue_planet.svg" data-speedx="0.1" data-speedy="0.065">
        <img class="parallax parallax--purple_planet" src="../../assets/images/purple_planet.svg" data-speedx="0.08" data-speedy="0.065">
    </main>
</template>

<style scoped lang="scss">
    @import "../../styles/landing.scss";
</style>

<script setup>
    import { onMounted } from 'vue';
    import { gsap } from '../../js/vendor';

    const props = defineProps({
        viewport: Object,
        device: Object
    });

    let parallaxEl;

    const mouse = {x: 0, y: 0, z: 0};
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
            let elementLeft = parseFloat(getComputedStyle(el).left);

            let isInLeft = elementLeft < window.innerWidth / 2 ? 1 : -1;

            // can be replaced with speedz = 0 when we add the data-speedz attribute.
            if (el.classList.contains("noZ")) {
                mouse.z = 0;
            } else {
                mouse.z = (cursorPosX - elementLeft) * isInLeft * 0.2;
            }

            gsap.set(el, {
                xPercent: "-50",
                yPercent: "-50",
                x: -mouse.x * speedX,
                y: mouse.y * speedY,
                z: mouse.z,
                rotationY: rotateDeg,
                transition: "0.45s cubic-bezier(0.2, 0.49, 0.32, 0.99)" // find another easing
            });
        });
    }

    function addAnimations() {
        gsap.to(
            ".parallax--ring_planet",
            {
                rotation: "-360",
                repeat: -1,
                ease: "none",
            }
        ).timeScale(0.01);

        gsap.to(
            ".parallax--purple_planet",
            {
                rotation: "360",
                repeat: -1,
                ease: "none"
            }
        ).timeScale(0.02);

        gsap.to(
            ".parallax--blue_planet",
            {
                rotation: "360",
                repeat: -1,
                ease: "none"
            }
        ).timeScale(0.025);
    }

    onMounted(() => {
        parallaxEl = document.querySelectorAll(".parallax");
        
        gsap.set("main", {
            perspective: "2300px"
        });

        transformParallax(0);
        addAnimations();

        if (window.matchMedia("(pointer: coarse)").matches) {
            window.addEventListener("touchmove", (e) => {
                mouse.x = e.clientX - window.innerWidth / 2;
                mouse.y = e.clientY - window.innerHeight / 2;
                rotateDeg = (mouse.x / (window.innerWidth / 2)) * 20;

                transformParallax(e.clientX);
            });
        }

        window.addEventListener("mousemove", (e) => {
            mouse.x = e.clientX - window.innerWidth / 2;
            mouse.y = e.clientY - window.innerHeight / 2;
            rotateDeg = (mouse.x / (window.innerWidth / 2)) * 10;

            transformParallax(e.clientX);
        });
    });
</script>