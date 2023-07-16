"use client"

export default function FixedBanner({ color, messages }) {

  return (
    <div className="fixed top-3 left-0 w-full flex flex-col justify-center items-center">
      {messages.map((message) => {
        return (
          <div
            className={`w-[300px] text-sm ${color}  h-8 flex justify-center items-center text-white rounded-lg font-bold mb-2`}
          >
            {message}
          </div>
        );
      })}
    </div>
  );
}
