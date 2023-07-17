
import {HiPlus} from "react-icons/hi"

export default function FoodCard({name, id}) {
  return (
    <div className="mb-4 relative bg-white h-13 w-full rounded-full border border-gray-500">
      <div className="h-12 w-[150px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full"></div>
      <div className="absolute left-4 top-0 h-12 flex items-center font-bold pb-1">
        {name}
      </div>
      <div className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center rounded-full border border-gray-500">
        <HiPlus />
      </div>
      {/* People */}
      <div className="absolute h-4 w-16 left-6 -bottom-2 bg-white rounded-lg border border-gray-500"></div>
    </div>
  );
}
