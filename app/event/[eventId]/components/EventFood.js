export default function EventFood() {
  return (
    <div className="relative rounded-full bg-gray-200 w-full h-10 mb-5">
      {/* Count bar */}
      <div className="absolute rounded-full bg-gradient-to-r from-[#D0FBC9] to-[#F0A7A7] w-36 h-10"></div>
      {/* Overlay text */}
      <div className="absolute h-10 w-full py-1 px-1">
        <div className="flex flex-row justify-between">
          <p className="ml-3 mt-1 font-bold">Snack</p>
          <div className="flex justify-center items-center border border-gray-700 rounded-full w-8 h-8">
            +
          </div>
        </div>
      </div>
      {/* People widget */}
      <div className="absolute -bottom-3 left-5">
        <div className="py-1 pl-2 pr-3 mr-2 rounded-full bg-gray-100 flex">
          <div className="rounded-full border border-gray-800 bg-gray-500 h-[15px] w-[15px] -mr-1"></div>
          <div className="rounded-full border border-gray-800 bg-gray-500 h-[15px] w-[15px] -mr-1"></div>
          <div className="rounded-full border border-gray-800 bg-gray-500 h-[15px] w-[15px] -mr-1"></div>
          <div className="rounded-full border border-gray-800 bg-gray-500 h-[15px] w-[15px] -mr-1"></div>
        </div>
      </div>
    </div>
  );
}
