"use client";

import { useEffect } from "react";

export default function FixedBanner({ color, messages, setMessages }) {
  useEffect(() => {
    if (messages.length === 0) {
      return;
    }

    const timeoutObject = setTimeout(() => {
      setMessages([]);
    }, 2000);

    return () => {
      clearTimeout(timeoutObject);
    };
  });

  return (
    <div className="fixed top-3 left-0 w-full flex flex-col justify-center items-center z-20">
      {messages.map((message, index) => {
        return (
          <div
            key={index}
            className={`px-6 text-sm ${color}  h-8 flex justify-center items-center text-white rounded-lg font-bold mb-2`}
          >
            {message}
          </div>
        );
      })}
    </div>
  );
}
