# Honiism. 🌸
Welcome to the source code of my portfolio! Please feel free to fork out this project or experiment with my assets, but please read the licensing in this project first.

🌼 Tools I used to create my assets:
- Ibispaint X
- Canva
- Figma

🌷 Libraries used in this project:
- Vue 3
- GSAP 3
- AOS
- Vite

## A. Parallax Effect Explanation
*Note to self & for future references.*

To get a parallax effect, you need to create a function that will transform your parallax classes.
This method will have these things:

### 1. Mouse Positions
`x` is the distance of the mouse from the center of the screen in the x axis.  
`y` is the distance from the center of the screen in the y axis.  
`z` is the distance between the mouse and the center of the element.
Negative value = mouse is on the left of the element, positive value = mouse is on the right side of the element.
This will make it so that if you move the mouse to the right, the element grows,
but decreases if you move the mouse to the left.

These variables will be changed each time a mouse event is fired so make sure you put the starting value as 0 for the initial positioning before any mouse events are fired.

```js
const mouse = {x: 0, y: 0, z: 0};

...

function transformParallax(cursorPos) {
    ...
}

onMounted(() => {
    // Initial positioning with clientX as 0.
    // Happens on load.
    gsap.set("main", {
        perspective: "2300px"
    });

    transformParallax(0);

    // Change the value of mouse positions and re-transform the elements each time a mouse event is fired.
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
```

### 2. Speeds
To make the parallax effect smoother, we can use different speeds for each element.
This speed will make our movement slower and not as fast as the mouse movement.
You'll need to create a custom speed attributes in your html classes.
Some of the speeds you need are:
- `speedX`
- `speedY`
- `speedZ`
- `rotationSpeed`

```html
<img class="parallax parallax--ring_planet" src="../../assets/images/ring_planet.svg" data-speedx="0.25" data-speedy="0.095">
```
```js
parallaxEl.forEach((el) => {
    let speedX = el.dataset.speedx;
    let speedY = el.dataset.speedy;
});
```

### 3. Transformation
- We need to translate the x axis of an element by adding the distance of our mouse in the x axis (`mouse.x`) to -50% and also multiplying it by the speed so it doesn't move too fast.
    - Note: `mouse.x` is negative so it has opposite effects.
- We'll also add rotation y by a certain degrees.
- Then we need to add the distance of our mouse in the y axis (`mouse.y`) to -50% and multiply it by the speedY.
- Then we put the layers 23000px away from us using the perspective. 
- `isInLeft` is a variable to check if half of the screen is smaller than the left attribute.
If it is then this means that the element is located in the left side of the screen.
True = 1, false = -1.
- `mouse.z` is the distance between the mouse and the center of the element.
Negative value = mouse is on the left of the element, positive value = mouse is on the right side of the element.
This will make it so that if you move the mouse to the right, the element grows,
but decreases if you move the mouse to the left.
    - Logically for the elements on the right side of the screen,
        moving the mouse to the right side should decrease and the left should grow.
        That means we have to reverse the value `mouse.z` for elements in the right.
        To do this, we just have to multiply the `mouse.z` by `isInLeft`.
        The `mouse.z` will be multiplied by 1 if the element is on the right side and 1 if it's on the left.
    - Then we'll multiply the `mouse.z` by `speedZ` and use that value to translate the z axis.

```js
function transformParallax(cursorPosX) {
    parallaxEl.forEach((el) => {
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

        /**
         * I'm using GSAP because I'm also adding animations to some of the parallax elements.
         * If I manually translate the elements using JS and CSS, it'll fight with my other GSAP animations.
         * The code below is basically the same as following:
         * 
         * el.style.transform = `translateX(calc(-50% + ${-mouse.x * speedX}px))`
                + `translateY(calc(-50% + ${mouse.y * speedY}px))`
                + `translateZ(${mouse.z}px)`
                + `rotateY(${rotateDeg}deg)`
                + `perspective(2300px)`;

            perspective(2300px) is applied directly to the main element on load.
         */

        gsap.to(el, {
            xPercent: "-50",
            yPercent: "-50",
            x: -mouse.x * speedX,
            y: mouse.y * speedY,
            z: mouse.z,
            rotationY: rotateDeg,
            transition: "0.45s cubic-bezier(0.2, 0.49, 0.32, 0.99)"
        });
    });
}
```

### 4. Important!
Based on the code below, you can see that the code is only run when our components are added in the DOM (`onmounted`). So, if we want to get `parallaxEl` (parallax elements), we can't define the variable in `<script setup>` directly. We need to do that when our components are already added in the DOM. This prevents `parallaxEl` from being an empty list.

```js
const mouse = {x: 0, y: 0, z: 0};

let rotateDeg = 0;
let parallaxEl;

...

function transformParallax(cursorPos) {
    ...
}

onMounted(() => {
    parallaxEl = document.querySelectorAll(".parallax");
        
    ...
});
```