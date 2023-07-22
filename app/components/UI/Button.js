"use client";

export default function Button({ bgcolor, content, onClickHandler }) {
  return (
    <button
      onClick={onClickHandler}
      className={`w-full mb-2 ${bgcolor} font-bold text-white h-12 rounded-lg hover:opacity-80`}
    >
      {content}
    </button>
  );
}
