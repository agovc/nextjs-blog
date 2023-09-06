import { useState, useEffect } from "react";

export function HeartbeatExample({ text }: { text: string }) {
  return (
    <p
      className="text-center text-[7em] animate-heartbeat"
      style={{ margin: "0" }}
    >
      {text}
    </p>
  );
}

export function FadeInExample() {
  const [animate, setAnimate] = useState(false);
  const [animationTrigger, setAnimationTrigger] = useState(0);

  const handleClick = () => {
    setAnimationTrigger(animationTrigger + 1);
  };

  useEffect(() => {
    setAnimate(false);
    setTimeout(() => {
      setAnimate(true);
    }, 50);
  }, [animationTrigger]);

  return (
    <div className="flex flex-col items-center font-mona-sans bg-gray-100 rounded-2xl p-8 border border-slate-200">
      <div className="flex text-center space-x-3 font-black">
        <p
          className={`opacity-0 ${
            animate ? "animate-fade-in" : ""
          } tracking-wide text-xl md:text-2xl lg:text-5xl text-cyan-400 `}
          style={{
            animationDelay: "0.3s",
            animationFillMode: "forwards",
            fontStretch: "extra-condensed",
          }}
        >
          Unleash
        </p>
        <p
          className={`opacity-0 ${
            animate ? "animate-fade-in" : ""
          } text-2xl lg:text-6xl md:text-3xl text-cyan-600`}
          style={{
            animationDelay: "0.9s",
            animationFillMode: "forwards",
            fontStretch: "extra-expanded",
          }}
        >
          the power
        </p>
        <p
          className={`opacity-0 ${
            animate ? "animate-fade-in" : ""
          } tracking-wide text-xl md:text-2xl lg:text-5xl text-cyan-800`}
          style={{
            animationDelay: "1.5s",
            animationFillMode: "forwards",
            fontStretch: "extra-condensed",
          }}
        >
          within
        </p>
      </div>
      <button
        className="bg-blue-400/90 hover:bg-blue-400 text-white font-medium shadow-sm hover:shadow-sm px-3 py-1 rounded-lg transition-all hover:translate-y-0.5"
        onClick={handleClick}
      >
        Animate
      </button>
    </div>
  );
}
