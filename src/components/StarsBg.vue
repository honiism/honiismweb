<template>
    <div id="stars_bg" class="stars_bg"></div>
</template>

<style lang="scss">
    .stars_bg {
        position: absolute;
        z-index: 2;
        width: 100vw;
        min-height: 100vh;
        overflow: hidden;
    }

    .star {
        background-image: url(../assets/images/stars_sprite.png);
        background-size: 100%;
        background-position: 0 0%;
        position: absolute;
        width: 32px;
        height: 32px;
    }
</style>

<script setup>
    import { onMounted } from "vue";
    import { random } from "../js/utils";
    import { gsap } from "../js/vendor";

    const props = defineProps({
        starsNum: Number
    });

    function addStarsAnim() {
        const stars = document.querySelectorAll(".star");

        stars.forEach((star) => {
            const starsTl = gsap.timeline({repeat: -1});

            const points = random(50, 200)|0;
            const duration = random(1, 3);
            const autoAlpha = random(0.7, 1);
            const scale = random(0.2, 1.5);
            const delay = random(0.3, 6);
            const appear = random(0.3, 0.8);

            starsTl
                .to(
                    star,
                    {
                        duration: duration,
                        autoAlpha: autoAlpha,
                        scale: scale,
                        ease: "rough({template: none, points: " + points + ", taper: both, randomize: true, clamp: true})"
                    },
                    delay
                )
                .to(
                    star,
                    {
                        duration: duration,
                        autoAlpha: 0,
                        scale: 0,
                        ease: "rough({template: none, points: " + points + ", taper: both, randomize: true, clamp: true})"
                    },
                    appear
                );
        });
    }

    function createStars(starsNum) {
        for (let i = 0; i < starsNum; i++) {
            const star = document.createElement("div");

            star.classList.add("star");
            document.querySelector("#stars_bg").appendChild(star);
        }

        document.querySelectorAll(".star").forEach((star) => {
            gsap.set(star,
                {
                    xPercent: -50,
                    yPercent: -50,
                    x: random(window.innerWidth),
                    y: random(window.innerHeight),
                    opacity: 0,
                }
            );
        });

        addStarsAnim();
    }

    onMounted(() => {
        createStars(props.starsNum);
    });
</script>