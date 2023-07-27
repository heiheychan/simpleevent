import { MdOutlineDragIndicator, MdDeleteOutline } from "react-icons/md";

export default function OneFood({ food, innerRef, provided, setValue, removeValue, id  }) {
  return (
    <div
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      ref={innerRef}
      className="mb-2 px-2 relative bg-white h-10 w-full rounded-full border border-gray-500 flex items-center justify-between"
    >
      <div className="flex flex-row items-center">
        <MdOutlineDragIndicator size={20} />
        <input type="text" value={food} className="ml-2 border border-gray-100 px-1 rounded-lg" onChange={setValue} id={id} placeholder="Enter the food" />
      </div>
      <MdDeleteOutline size={20} onClick={() => removeValue(id)} className="cursor-pointer" />
    </div>
  );
}