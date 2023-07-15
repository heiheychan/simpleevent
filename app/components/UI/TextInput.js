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
}) {
  return (
    <div className="w-full my-2">
      <p className="w-full font-bold">{label}</p>
      <input
        type={type}
        className="w-full px-3 h-12 border border-gray-300 rounded-lg my-1 mb-1 focus:outline-none focus:border-gray-500 disabled:bg-gray-300 placeholder-gray-300"
        placeholder={placeholder}
        value={value}
        onChange={setValue}
        disabled={disable ? "disabled" : ""}
      ></input>
      <p className={`text-xs ${subtextcolor} w-full`}>{subtext}</p>
    </div>
  );
}
