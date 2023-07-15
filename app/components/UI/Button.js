"use client";

export default function Button({ content, onClickHandler }) {
  return (
    <button onClick={onClickHandler} className="mt-3 bg-red-500 font-bold text-white h-12 rounded-lg">
      {content}
    </button>
  );
}
