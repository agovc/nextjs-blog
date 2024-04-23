---
id: chatbot-ui
title: "Reality Check: Crafting a Chatbot UI with React and a Dash of Selling Sunset Glam (Part 2 of 2)"
description: "Join the virtual tea party and learn how to craft a stylish chatbot, where code meets conversation in a Selling Sunset-inspired coding adventure."
isPublished: true
date: "2023-12-16"
image: "/images/thumbnails/chat-ui.webp"
---

In our last blog, we dived into the world of chatbots with LangChain JS, but we were too busy weaving API magic and crafting message chains. Today, we're taking a detour—picture this as a **Selling Sunset**-themed episode—where the drama unfolds not in high-end real estate but within the pixels of our chatbot UI.

And guess what? The inspiration for this coding escapade came from some **juicy chats** with my friend Mary. We spilled the virtual tea on drama, showbiz, and everything in between. So, grab your coding shades because, inspired by the highs and lows of Selling Sunset, we're about to create a React masterpiece that's as captivating as the latest reality TV saga. Ready to turn your code into a star? Let's dive into the glitzy realm of frontend fun! 🌟💬

Below is the result of what we're going to build:

<Chat />

Before building the UI, let's define the structure of our messages:

<CodeBlock code={`
  const messages = [
    {
      sender: "Santi",
      content:
        "Hey there! Have you checked out the latest season of Selling Sunset? It's wild! 🌟",
    },
    {
      sender: "You",
      content:
        "Oh, totally! 😱 The drama in that show is on another level.
        Can you believe the twists this season?",
    },
    ...
  ];
`} language="tsx" />

Now, let's build our UI with [Tailwind](https://tailwindcss.com). I won't explain in detail everything I did with Tailwind; I'll save that for another post. For now, the focus is on React. At this point, our component is static and has no interaction:

<CodeBlock code={`
  export default function Chat() {
    const messages = [
        {
        sender: "Santi",
        content:
            "Hey there! Have you checked out the latest season of Selling Sunset? It's wild! 🌟",
        },
        {
        sender: "You",
        content:
            "Oh, totally! 😱 The drama in that show is on another level.
            Can you believe the twists this season?",
        },
        ...
    ];

    return (
        <article className="p-6 chat">
        <div className="border border-gray-300 rounded-xl p-4 max-w-screen-md">
            <ul className="overflow-auto flex flex-col h-[350px] m-0 p-0">
            {messages.map((message, index) => (
                <li
                key={index}
                className={"grid grid-cols-12 pt-6"}
                >
                <div className="col-span-1 flex justify-end">
                    {message.sender === "Santi" ? (
                    <Image
                        priority
                        src="/images/profile-pic.jpg"
                        className="rounded-full h-6 w-6 border-[1px] border-slate-400"
                        height={24}
                        width={24}
                        alt={message.sender}
                    />
                    ) : (
                    <UserIcon />
                    )}
                </div>
                <div className="col-span-11 flex flex-col pl-4">
                    <div className="font-semibold">{message.sender}</div>
                    <div className="font-light">{message.content}</div>
                </div>
                </li>
            ))}
            </ul>
            <form className="flex gap-4 items-center relative pt-4">
            <input
                required
                type="text"
                name="message"
                placeholder="Message Santi..."
                className="border border-gray-300 p-2 rounded-xl flex-1 font-light"
            />
            <button
                type="submit"
                className="bg-gray-600 text-white font-bold rounded-xl h-8 w-8 p-1 absolute right-1 flex items-center justify-center"
            >
                <div className="w-4 h-4">
                <SendIcon />
                </div>
            </button>
            </form>
        </div>
        </article>
    );
  }
`} language="tsx" />

This is how our component looks like this far:

<NoEffectsChat />

What we're interested in now is having our component render each time there's a new message. For that, let's create a state variable using the `useState` hook and create the handler to submit the form:

<CodeBlock code={`
  const [messages, setMessages] = useState([
    {
      sender: "Santi",
      content:
        "Hey there! Have you checked out the latest season of Selling Sunset? It's wild! 🌟",
    },
    {
      sender: "You",
      content:
        "Oh, totally! 😱 The drama in that show is on another level. Can you believe the twists this season?",
    },
    ...
  ]);

  ...

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const newMessage = formData.get("message") as string;
    if (newMessage) {
      setMessages([...messages, { sender: "You", content: newMessage }]);
      form.reset();
    }
  };
`} language="tsx" />

Now, we want every time a new message is submitted, the element scrolls into view. To achieve this, we'll use `element.scrollIntoView()` method. Let's start by adding a ref to the last element in our list of messages:

<CodeBlock code={`
  const lastMessageRef = useRef<HTMLLIElement>(null);

  ...

  <ul className="overflow-auto flex flex-col max-h-[350px] m-0 p-0">
          {messages.map((message, index) => (
            <li
              key={index}
              // We add the ref to the last item
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={"grid grid-cols-12 pt-6"}
            >
              ...
            </li>
          ))}
        </ul>
`} language="tsx" />

We know that `scrollIntoView()` has a side effect. As React won't update the ref of our last element until after updating the DOM, we won't use an event handler; we'll have to use the useEffect hook.

>**NOTE:** If you wonder why we're not putting the `useEffect` argument with the dependency array, it's for two reasons: our ref is not a dependency, and we want it to scroll every time there's a render.

<CodeBlock code={`
  useEffect(() => {
    if (lastMessageRef.current) {
        lastMessageRef.current.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest', 
            inline: 'start' 
        });
    }
  });
`} language="tsx" />

Ta-da! Our chatbot UI is ready for action! [This is how the complete code looks.](https://gist.github.com/agovc/ac8ac832e1f2a9aa28f867a086bdb5d4) 🚀 But hold the popcorn; we've got some blockbuster enhancements in mind:

1. **Word Unveiling Magic**: Add animations that simulate words being typed, turning each message into a virtual cliffhanger.
2. **Silence the Empty Chatter**: Disable the send button when the user forgets to spill the tea—no more accidental empty messages.
3. **Inclusive Glam**: Sprinkle ARIA attributes for an inclusive and seamless chatbot experience.

<div className="flex justify-center">
    <Image src="/images/christine.gif" alt="Alice falling down the rabbit hole" className="py-6 animate-fade-in" height={200} width={300} />
</div>

Our chatbot might be drama-ready, but we're turning it into a blockbuster. Think of it as a coding reality show—each enhancement reveals a new twist. Go on, code like it's a lifestyle, and let the chatbot saga continue! 💬✨



