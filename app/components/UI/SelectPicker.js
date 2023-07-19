export default function SelectPicker({ label, options }) {
  return (
    <div className="w-full my-2">
      <p className="w-full font-bold">{label}</p>
      <select
        name="numGuest"
        className="w-full px-3 h-12 border border-gray-300 rounded-lg my-1 mb-1 outline-none"
      >
        {options.map((option) => {
          return(<option value={option.value}>{option.name}</option>)
        })}
      </select>
    </div>
  );
}
