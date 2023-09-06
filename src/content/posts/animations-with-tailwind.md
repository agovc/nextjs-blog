---
id: animations-with-tailwind
title: "Adding Spice to Your Web Design: Animations with Tailwind CSS"
isPublished: true
date: "2023-09-05"
---

Animations play a pivotal role in enhancing the web user experience, capable of profoundly influencing how a user perceives a website. When it comes to animating web elements, developers often turn to either JavaScript or CSS. In this blog, centered around the use of Tailwind CSS, we will explore the realm of CSS-based animations.

<HeartbeatExample text="❤️‍🔥" />

Before delving into the ***how*** of CSS animations, let's first consider the ***why***. Here are some compelling advantages of using CSS over JavaScript for animations:

- **Reduced JavaScript Overhead:** Utilizing CSS for styling and animations minimizes the volume of JavaScript executing within the user's browser.
- **Faster Loading Times:** CSS files are typically smaller than their JavaScript counterparts, resulting in faster page load times and an enhanced user experience.
- **Clear Separation of Concerns:** CSS fosters a clear distinction between styling and logic, promoting greater modularity for ease of maintenance, testing, and updates.
- **Enhanced Accessibility:** CSS can contribute to improved website accessibility by offering appropriate styling and structure for assistive technologies such as screen readers. Achieving accessibility with JavaScript-based animations often requires additional effort.

In this blog post, we'll explore how to harness the power of Tailwind CSS to create captivating animations that not only elevate the user experience but also adhere to best practices in web development. Currently, [Tailwind](https://tailwindcss.com/docs/animation) provides the following animation utilities: `animate-none`, `animate-spin`, `animate-ping`, `animate-pulse`, and `animate-bounce`. Adding these classes to an element is as straightforward as it gets.

# Crafting Custom Animations

Now, to create custom animations, you only need to follow a few simple steps. In this example, we'll create an animation for a fade-in effect. Custom animations can be defined in either `theme.animation` or `theme.extend.animation` within your `tailwind.config.js` file.

The first step is to define the **keyframes** for the animation. In this case, we want to transition the opacity from 0% to 100%, and we'll name our keyframes 'fade-in':

<CodeBlock code={`
    module.exports = {
        theme: {
            keyframes: {
                "fade-in": {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                }
            },
        },
    };
`} language="tsx" />

Next, we define the 'fade-in' `animation`, which will be applied to elements containing that class with the desired properties. In this case, we specify the animation name, duration, and easing function (similar to how it's done in CSS's [animation shorthand](https://developer.mozilla.org/en-US/docs/Web/CSS/animation) property).

<CodeBlock code={`
    module.exports = {
        theme: {
            keyframes: {
                "fade-in": {
                    from: { opacity: 0 },
                    to: { opacity: 1 }
                }
            },
            animation: {
                "fade-in": "fade-in 0.8s ease-out"
            },
        },
    };
`} language="tsx" />

Finally, simply apply the class to any element, tailwind adds the `animate` prefix for you:


<CodeBlock code={`
    <p className="animate-fade-in tracking-wide ..." >Unleash</p>
    <!-- ... -->
`} language="tsx" />

<FadeInExample />


Now, if you were curious about the magic behind the heartbeat animation:

<CodeBlock code={`
    module.exports = {
        theme: {
            keyframes: {
                'heartbeat': {
                    '0%': { transform: 'scale(1)' },
                    '10%': { transform: 'scale(1.02)' },
                    '20%': { transform: 'scale(1)' },
                    '30%': { transform: 'scale(1.05)' },
                    '40%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.09)' },
                    '100%': { transform: 'scale(1)' },
                    },
            },
            animation: {
                "heartbeat": "heartbeat 2s infinite"
            },
        },
    };
`} language="tsx" />


In a nutshell, animations are like the spice in your web design recipe, adding that extra flavor to the user experience. In this blog, we've explored how to jazz up your web pages using Tailwind CSS, your animation toolkit.

But remember, it's important to note that while CSS animations have their merits, some animations may require JavaScript or other technologies. By blending Tailwind CSS with strategic CSS animations, you can strike a balance between aesthetics and functionality, creating captivating web experiences.
