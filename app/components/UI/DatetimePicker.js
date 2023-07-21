"use client";

export default function DatetimePicker({ value, setValue}) {
  
  return (
    <div className="w-full my-2">
      <p className="w-full font-bold">Datetime</p>
      <input
        value={value}
        type="datetime-local"
        className="w-full px-3 h-12 border border-gray-500 rounded-lg my-1 mb-1 outline-none"
        onChange={setValue}
      />
    </div>
  );
}
