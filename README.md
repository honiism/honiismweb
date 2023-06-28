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

### 1. xVal and yVal
`xVal` is the distance of the mouse from the center of the screen in the x axis.  
`yVal` is the distance from the center of the screen in the y axis.

These variables will be changed each time a mouse event is fired so make sure you put the starting value as 0 for the initial positioning before any mouse events are fired.

```js
let xVal = 0;
let yVal = 0;
...

function transformParallax(cursorPos) {
    ...
}

onMounted(() => {
    // Initial positioning with xVal and yVal = (0,0) and e.clientX = 0.
    // Happens on load.
    transformParallax(0);

    // Change the value of xVal and yVal and re-transform the elements each time a mouse event is fired.
    window.addEventListener("mousemove", (e) => {
        xVal = e.clientX - window.innerWidth / 2;
        yVal = e.clientY - window.innerHeight / 2;

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
- We need to translate the x axis of an element by adding the distance of our mouse (x) to -50% and also multiplying it by the speed so it doesn't move too fast.
- We'll also add rotation by a certain degrees.
- Then we'll also do the same thing with translateY, adding the distance of our mouse (y) and multiply it by the speedY.
- Then we put the layers 23000px away from us using the perspective. 
- `isInLeft` is a variable to check if half of the screen is smaller than the left attribute.
If it is then this means that the element is located in the left side of the screen.
True = 1, false = -1.
- `zVal` is the distance between the mouse and the center of the element.
Negative value = mouse is on the left of the element, positive value = mouse is on the right side of the element.
This will make it so that if you move the mouse to the right, the element grows,
but decreases if you move the mouse to the left.
    - Logically the right side of the screen should decrease and the left should grow.
That means we have to reverse the value zVal for elements in the right.
To do this, we just have to multiply the zVal by isInLeft.
The zVal will be multiplied by 1 if the element is on the right side and 1 if it's on the left.
    - Then we'll multiply the `zVal` by `isInLeft` and `speedZ` and use that value to translate the z axis.

```js
function transformParallax(cursorPosX) {
    parallaxEl.forEach((el) => {
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
```

### 4. Important!
Based on the code below, you can see that the code is only run when our components are added in the DOM. So, if we want to get `parallaxEl` (parallax elements), we can't define the variable in `<script setup>` directly. We need to do that when our components are already added in the DOM. This prevents `parallaxEl` from being an empty list.

```js
let parallaxEl;
    
let xVal = 0;
let yVal = 0;

...

function transformParallax(cursorPos) {
    ...
}

onMounted(() => {
    parallaxEl = document.querySelectorAll(".parallax");
        
    transformParallax(0); // initial position on load

    window.addEventListener("mousemove", (e) => {
        xVal = e.clientX - window.innerWidth / 2;
        yVal = e.clientY - window.innerHeight / 2;
        rotateDeg = (xVal / (window.innerWidth / 2)) * 10;

        transformParallax(e.clientX);
    });
});
```