---
id: alice-in-wonderland
title: "Through the Looking Glass with ChatGPT: A Visual Experiment"
description: "Discover the magic of AI creativity in 'ChatGPT's Wonderland: Drawing with Words.' Explore the creative evolution of AI and the potential for richer visual content."
isPublished: true
date: "2023-11-07"
image: "/images/thumbnails/alice.webp"
---

Step through the looking glass because it's been a Wonderland of AI wonders this year!  OpenAI, one of the pioneers in AI, released two products/models that have transformed the world: DALL·E (for images), chatGPT (for text), and Whisper (for audio). And as we know, multi-models are on the horizon, allowing the combination of models to transition from text to images, images to text, and possibly images to audio, and so on. The rabbit hole is real!

<div className="flex justify-center">
    <Image src="/images/rabbit-hole.gif" alt="Alice falling down the rabbit hole" className="py-6 animate-fade-in" height={200} width={300} />
</div>

The possibilities are endless. However, for now, we are limited to one model at a time. This got me thinking, what would happen if I gave a prompt to chatGPT to "draw something"? Let's fall down this curious hole:

>**Prompt text:** "Create a character representation of Alice's face from Alice in Wonderland using text characters."

<CodeBlock code={`
  Creating a character representation of Alice\'s face from Alice in Wonderland
  using text characters:

    .-'-.
   /     \\
  | o   o |
  |   ∆   |
   \\  ⌣  /
    '---'
  
  Please note that this is a highly simplified and abstract representation,
  and you can adjust it as needed to match your preferences. Text-based art
  has its limitations in capturing the intricate details of a character like Alice.
`} language="text" />

Honestly, I wasn't too surprised by the result, as I expected something simple. However, I did imagine something a bit more characteristic of Alice. The result is quite generic. This led me to think that chatGPT also generates code, so I asked it to create SVGs of Alice, the White Rabbit, and the Hatter.

>**Prompt text:** "Create an SVG representation of \{character\} from Alice in Wonderland."

<div className="flex justify-center ">
<div className="md:flex md:justify-center md:content-between">
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" version="1.1">
  <path d="M100 100 L130 200 L70 200 Z" fill="blue" />
  <circle cx="100" cy="80" r="30" fill="lightpink" />
  <ellipse cx="100" cy="65" rx="35" ry="25" fill="blonde" />
  <circle cx="90" cy="75" r="5" fill="white" />
  <circle cx="110" cy="75" r="5" fill="white" />
  <circle cx="90" cy="75" r="2" fill="black" />
  <circle cx="100" cy="85" r="3" fill="peachpuff" />
  <path d="M100 90 Q95 100, 100 105 Q105 100, 100 90" stroke="black" fill="none" />
  <rect x="90" y="180" width="20" height="20" fill="white" />
  <line x1="90" y1="180" x2="110" y2="180" stroke="black" strokeWidth="1" />
  <line x1="90" y1="190" x2="110" y2="190" stroke="black" strokeWidth="1" />
  <rect x="85" y="220" width="10" height="10" fill="black" />
  <rect x="105" y="220" width="10" height="10" fill="black" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" version="1.1">
  <ellipse cx="100" cy="150" rx="30" ry="50" fill="white" stroke="black" strokeWidth="1" />
  <circle cx="100" cy="100" r="20" fill="white" stroke="black" strokeWidth="1" />
  <circle cx="90" cy="95" r="3" fill="black" />
  <circle cx="110" cy="95" r="3" fill="black" />
  <circle cx="100" cy="100" r="2" fill="pink" />
  <path d="M100 103 Q105 110, 100 115 Q95 110, 100 103" stroke="black" fill="none" />
  <ellipse cx="80" cy="90" rx="10" ry="15" fill="white" stroke="black" strokeWidth="1" />
  <ellipse cx="120" cy="90" rx="10" ry="15" fill="white" stroke="black" strokeWidth="1" />
  <rect x="85" y="135" width="30" height="20" fill="red" stroke="black" strokeWidth="1" />
  <polygon points="100,145 95,155 105,155" fill="blue" />
  <circle cx="92" cy="152" r="7" fill="gold" />
  <rect x="88" y="150" width="8" height="4" fill="gold" />
  <line x1="92" y1="152" x2="92" y2="158" stroke="black" strokeWidth="1" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="200" height="300" version="1.1">
  <ellipse cx="100" cy="170" rx="40" ry="70" fill="green" />
  <circle cx="100" cy="100" r="30" fill="pink" />
  <circle cx="90" cy="95" r="4" fill="white" />
  <circle cx="110" cy="95" r="4" fill="white" />
  <circle cx="90" cy="95" r="2" fill="black" />
  <circle cx="110" cy="95" r="2" fill="black" />
  <circle cx="100" cy="100" r="3" fill="pink" />
  <path d="M100 105 Q105 112, 100 118 Q95 112, 100 105" stroke="black" fill="none" />
  <ellipse cx="100" cy="70" rx="60" ry="20" fill="green" />
  <ellipse cx="100" cy="60" rx="55" ry="30" fill="brown" />
  <rect x="95" y="125" width="10" height="20" fill="red" />
  <rect x="95" y="145" width="10" height="5" fill="white" />
</svg>
</div>
</div>

After comparing the first result with the SVGs, I was genuinely impressed. Alice has a triangular body that resembles a dress, the rabbit has a pocket watch, and the Hatter has a hat.

Although the drawings are not immediately and obviously recognizable, meaning that Alice isn't instantly recognizable, I then asked:

>**Prompt text:** "Describe with text the SVG that you create of Alice from Alice in Wonderland and explain the shape and color choice for elements."

<CodeBlock code={`
  - Alice\'s Dress:
    Shape: A triangular blue dress that resembles a pinafore.
    Color Choice: The dress is filled with a vivid blue color, similar to Alice\'s iconic dress in the story.
  
  - Alice\'s Head:
    Shape: A circular head shape.
    Color Choice: The head is filled with a light pink color to represent Alice\'s fair complexion.
  
  - Alice\'s Hair:
    Shape: Oval shapes for the hair.
    Color Choice: The hair is filled with a blonde color, typical of Alice\'s blonde hair.
  
  - Alice\'s Eyes:
    Shape: Two white circles for the eyes, with smaller black circles for the pupils.
    Color Choice: The eyes are filled with white for the sclera and have black pupils.
  
  - Alice\'s Nose:
    Shape: A small circular shape representing the nose.
    Color Choice: The nose is filled with a light peachy color (peachpuff).
  
  - Alice\'s Mouth:
    Shape: A simple curved line for the mouth.
    Color Choice: The mouth is outlined with a black stroke but not filled, giving it 
    a neutral appearance.
  
  - Alice\'s Apron:
    Shape: A rectangular shape for the apron.
    Color Choice: The apron is filled with white, and there are black lines defining the edges.
   
  - Alice\'s Shoes:
    Shape: Rectangular shapes for the shoes.
    Color Choice: The shoes are filled with black, resembling the classic appearance of 
    Alice\'s shoes.

    I used a general and simplified representation that draws inspiration from various common 
    depictions of Alice in popular culture. The iconic elements I included, such as the blue dress, 
    blonde hair, black shoes, and other features, are often associated with Alice's appearance in 
    different adaptations, illustrations, and adaptations of "Alice in Wonderland."
`} language="text" />

After the explanation, I understood that chatGPT had an idea of how to represent an iconic Alice from Alice in Wonderland. However, it's clear that with limited context and the current capabilities, this is what can be achieved.

Right after, another idea came to me. Let's step away from alice and engage in some prompt engineering to enhance the result. The following prompt was: 

>**Prompt text:** "Create an SVG representation of a dog." 

Then, I asked it to add two long ears and a tail, and finally, I requested it to add legs.

<div className="flex justify-center ">
<div className="md:flex md:justify-center md:content-between">
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" version="1.1">
  <ellipse cx="100" cy="100" rx="60" ry="40" fill="brown" />
  <circle cx="100" cy="70" r="30" fill="brown" />
  <circle cx="90" cy="65" r="5" fill="white" />
  <circle cx="110" cy="65" r="5" fill="white" />
  <circle cx="90" cy="65" r="2" fill="black" />
  <circle cx="110" cy="65" r="2" fill="black" />
  <circle cx="100" cy="75" r="3" fill="black" />
  <path d="M100 80 Q95 85, 100 90 Q105 85, 100 80" stroke="black" fill="none" />
  <ellipse cx="75" cy="60" rx="10" ry="15" fill="brown" />
  <ellipse cx="125" cy="60" rx="10" ry="15" fill="brown" />
  <path d="M60 100 Q40 110, 60 120" stroke="brown" fill="none" />
  <rect x="80" y="110" width="10" height="20" fill="brown" />
  <rect x="110" y="110" width="10" height="20" fill="brown" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" version="1.1">
  <ellipse cx="100" cy="100" rx="60" ry="40" fill="brown" />
  <circle cx="100" cy="70" r="30" fill="brown" />
  <ellipse cx="70" cy="60" rx="20" ry="40" fill="brown" />
  <ellipse cx="130" cy="60" rx="20" ry="40" fill="brown" />
  <path d="M160 100 Q180 90, 160 80" stroke="brown" fill="none" />
  <circle cx="90" cy="65" r="5" fill="white" />
  <circle cx="110" cy="65" r="5" fill="white" />
  <circle cx="90" cy="65" r="2" fill="black" />
  <circle cx="110" cy="65" r="2" fill="black" />
  <circle cx="100" cy="75" r="3" fill="black" />
  <path d="M100 80 Q95 85, 100 90 Q105 85, 100 80" stroke="black" fill="none" />
  <rect x="80" y="110" width="10" height="20" fill="brown" />
  <rect x="110" y="110" width="10" height="20" fill="brown" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" version="1.1">
  <ellipse cx="100" cy="100" rx="60" ry="40" fill="brown" />
  <circle cx="100" cy="75" r="30" fill="brown" />
  <ellipse cx="70" cy="70" rx="20" ry="40" fill="brown" />
  <ellipse cx="130" cy="70" rx="20" ry="40" fill="brown" />
  <path d="M160 100 Q180 90, 160 80" stroke="brown" fill="none" />
  <circle cx="90" cy="70" r="5" fill="white" />
  <circle cx="110" cy="70" r="5" fill="white" />
  <circle cx="90" cy="70" r="2" fill="black" />
  <circle cx="110" cy="70" r="2" fill="black" />
  <circle cx="100" cy="80" r="3" fill="black" />
  <path d="M100 85 Q95 90, 100 95 Q105 90, 100 85" stroke="black" fill="none" />
  <circle cx="80" cy="120" r="10" fill="brown" />
  <circle cx="120" cy="120" r="10" fill="brown" />
  <circle cx="80" cy="140" r="10" fill="brown" />
  <circle cx="120" cy="140" r="10" fill="brown" />
</svg>
</div>
</div>

Here's a clear example of how, through prompt engineering, we can obtain better results from a model. The more precise you are in your prompts, the better the outcome.

Now, you might be wondering why I've been putting ChatGPT, a text-based model, to the test, asking it to whip up some visual magic. Well, think of it as a little digital experiment, like Alice's unexpected journey into Wonderland. We're pushing the boundaries of what a single model can do. I wonder if chatGPT will improve in drawing SVGs as its ability to produce code advances, or if it will improve with the integration of multi-models that can provide richer visual content.

<p className="text-center">🎩🌟🍄🐇</p>
