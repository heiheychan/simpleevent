import { MdAdd } from "react-icons/md";
import { PiBowlFoodDuotone, PiBeerBottleDuotone } from "react-icons/pi";

export default function AddFoodButton({ addFoodHandler }) {
  return (
    <button
      className="w-full rounded-full border border-gray-500 h-12 flex justify-center items-center mb-2"
      onClick={addFoodHandler}
    >
      Add food <MdAdd size={20} />
      <PiBowlFoodDuotone size={20} />
      <PiBeerBottleDuotone size={20} />
    </button>
  );
}
