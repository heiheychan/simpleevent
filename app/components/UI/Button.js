"use client";

export default function Button({ bgcolor, content, onClickHandler }) {
  return (
    <button
      onClick={onClickHandler}
      className={`w-full max-w-[400px] mt-3 ${bgcolor} font-bold text-white h-12 rounded-lg`}
    >
      {content}
    </button>
  );
}
