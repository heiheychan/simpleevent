import { MdOutlineDragIndicator, MdDeleteOutline } from "react-icons/md";

export default function OneFood({ food, innerRef, provided, setValue, removeValue, id  }) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
      className="w-full flex flex-row justify-between items-center border border-gray-500 h-12 rounded-full px-3 mb-2"
    >
      <div className="flex flex-row items-center">
        <MdOutlineDragIndicator size={20} />
        <input type="text" value={food} className="ml-2 border border-gray-300 px-1 rounded-lg" onChange={setValue} id={id} placeholder="Enter the food" />
      </div>
      <MdDeleteOutline size={20} onClick={() => removeValue(id)} className="cursor-pointer" />
    </div>
  );
}
