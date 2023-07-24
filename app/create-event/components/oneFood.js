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

{/* <>
<div
        className="mb-2 relative bg-white h-10 w-full rounded-full border border-gray-500 flex items-center hover:cursor-pointer"
        onClick={!loading && doubleClickEventHandler}
      >
<div
  className={`h-[38px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}
  style={{ width: calculatedWidth }}
></div>
<div className="absolute left-4 top-0 h-[38px] flex items-center">
  <p>{name}</p>
  <div className="text-xs px-1 h-4 border border-gray-500 bg-white rounded-lg ml-1">{`${commitments.length}`}</div>
</div>
<div
  className="absolute right-[2px] top-[2px] h-[34px] w-[34px] flex items-center justify-center rounded-full border border-gray-500"
  onClick={modalOpenHandler}
>
  <BiCommentDetail size={16} />
</div>
</> */}