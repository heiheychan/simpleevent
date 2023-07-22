"use client";

export default function TextInput({
  type,
  placeholder,
  label,
  value,
  setValue,
  subtext,
  subtextcolor,
  disable,
  min,
  max
}) {

  const subtextClass = `text-xs ${subtextcolor} w-full`;
  return (
    <div className="w-full mb-2">
      <p className="w-full mb-2">{label}</p>
      <input
        type={type}
        className="w-full px-2 h-12 border border-gray-500 rounded-lg mb-2 focus:outline-none focus:border-gray-500 disabled:bg-gray-300 placeholder-gray-300"
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        disabled={disable ? "disabled" : ""}
        min={min}
        max={max}
      ></input>
      {subtext && <p className={`${subtextClass} mb-2`}>{subtext}</p>}
    </div>
  );
}
