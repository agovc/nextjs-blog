import { useState, useRef, useEffect } from "react";
import Image from "next/image";

const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m22 2-7 20-4-9-9-4Z" />
    <path d="M22 2 11 13" />
  </svg>
);

const UserIcon = () => (
  <svg
    className="rounded-full h-6 w-6 border-[1px] border-slate-400"
    width="24"
    height="24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="0" cy="0" r="40" fill="#5BBF83" />
  </svg>
);

export function NoEffectsChat() {
  const messages = [
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
    {
      sender: "Santi",
      content:
        "Right?! The real estate deals are insane, but I can't get enough of the office dynamics. Who's your favorite agent? 😎",
    },
    {
      sender: "You",
      content:
        "Definitely Christine. She brings the drama and fashion game every time. 💃 But Amanza is a close second – such a powerhouse!",
    },
    {
      sender: "Santi",
      content:
        "Agreed! Christine's outfits are like a fashion show, and Amanza's work ethic is impressive. What do you think of the new listings they're showcasing? 🏡",
    },
    {
      sender: "You",
      content:
        "The houses are incredible! 🏰 I wouldn't mind living in one of those mansions. Did you see that $40 million one with the insane pool?",
    },
    {
      sender: "Santi",
      content:
        "Yeah, that pool was like a private water park! 😅 If only we could afford houses like that, right? Dream big, Santi!",
    },
    {
      sender: "You",
      content:
        "Maybe one day we'll be sipping champagne in our own Hollywood Hills mansion. 🥂 Can't wait for the next episode!",
    },
    {
      sender: "Santi",
      content: "Absolutely! See you at the virtual watch party next week?",
    },
  ];

  return (
    <article className="chat">
      <div className="border border-gray-300 rounded-xl p-4 max-w-screen-md">
        <ul className="overflow-auto flex flex-col h-[350px] m-0 p-0">
          {messages.map((message, index) => (
            <li key={index} className={"grid grid-cols-12 pt-6"}>
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
            disabled
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

export default function Chat() {
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
    {
      sender: "Santi",
      content:
        "Right?! The real estate deals are insane, but I can't get enough of the office dynamics. Who's your favorite agent? 😎",
    },
    {
      sender: "You",
      content:
        "Definitely Christine. She brings the drama and fashion game every time. 💃 But Amanza is a close second – such a powerhouse!",
    },
    {
      sender: "Santi",
      content:
        "Agreed! Christine's outfits are like a fashion show, and Amanza's work ethic is impressive. What do you think of the new listings they're showcasing? 🏡",
    },
    {
      sender: "You",
      content:
        "The houses are incredible! 🏰 I wouldn't mind living in one of those mansions. Did you see that $40 million one with the insane pool?",
    },
    {
      sender: "Santi",
      content:
        "Yeah, that pool was like a private water park! 😅 If only we could afford houses like that, right? Dream big, Santi!",
    },
    {
      sender: "You",
      content:
        "Maybe one day we'll be sipping champagne in our own Hollywood Hills mansion. 🥂 Can't wait for the next episode!",
    },
    {
      sender: "Santi",
      content: "Absolutely! See you at the virtual watch party next week?",
    },
  ]);

  const lastMessageRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start",
      });
    }
  });

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

  return (
    <article className="chat">
      <div className="border border-gray-300 rounded-xl p-4 max-w-screen-md">
        <ul className="overflow-auto flex flex-col max-h-[350px] m-0 p-0">
          {messages.map((message, index) => (
            <li
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
              className={"grid grid-cols-12 pt-6"}
            >
              <div className="col-span-1 flex justify-end">
                {message.sender === "Santi" ? (
                  <Image
                    priority
                    src="/images/profile-pic.jpg"
                    className="rounded-full h-6 w-6 object-cover border-[1px] border-slate-400"
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
        <form
          onSubmit={handleSubmit}
          className="flex gap-4 items-center relative pt-4"
        >
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
