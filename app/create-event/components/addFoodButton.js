import { MdAdd } from "react-icons/md";
import { PiBowlFoodDuotone, PiBeerBottleDuotone } from "react-icons/pi";

export default function AddFoodButton({ addFoodHandler }) {
  return (
    <button
      className="w-full max-w-[400px] rounded-full border border-gray-300 h-12 flex justify-center items-center font-bold text-gray-800"
      onClick={addFoodHandler}
    >
      Add food <MdAdd size={20} />
      <PiBowlFoodDuotone size={20} />
      <PiBeerBottleDuotone size={20} />
    </button>
  );
}
