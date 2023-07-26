"use client"

import { BiCommentDetail } from "react-icons/bi";

export default function EventBlurWrapper({ children, blurLevel }) {
  let blurClass;
  
  switch (blurLevel) {
    case "s":
      blurClass = "blur-[2px]"
      break;
    case "m":
      blurClass = "blur-sm"
      break;
    case "l":
      blurClass = "blur-md"
      break;
  }

  return (
    <div className="relative w-full h-[500px] bg-white border border-gray-500 rounded-lg flex flex-col p-4 overflow-scroll">
      <div className={`absolute h-full w-[90%] ${blurClass}`}>
        <div className="mb-2 relative bg-white h-10 w-full rounded-full border border-gray-500 flex items-center hover:cursor-pointer">
          <div
            className={`h-[38px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}
            style={{ width: "100px" }}
          ></div>
          <div className="absolute left-4 top-0 h-[38px] flex items-center">
            <p>Snack</p>
            <div className="text-xs px-1 h-4 border border-gray-500 bg-white rounded-lg ml-1">
              3
            </div>
          </div>
          <div className="absolute right-[2px] top-[2px] h-[34px] w-[34px] flex items-center justify-center rounded-full border border-gray-500">
            <BiCommentDetail size={16} />
          </div>
        </div>
        <div className="mb-2 relative bg-white h-10 w-full rounded-full border border-gray-500 flex items-center hover:cursor-pointer">
          <div
            className={`h-[38px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}
            style={{ width: "180px" }}
          ></div>
          <div className="absolute left-4 top-0 h-[38px] flex items-center">
            <p>Wine</p>
            <div className="text-xs px-1 h-4 border border-gray-500 bg-white rounded-lg ml-1">
              6
            </div>
          </div>
          <div className="absolute right-[2px] top-[2px] h-[34px] w-[34px] flex items-center justify-center rounded-full border border-gray-500">
            <BiCommentDetail size={16} />
          </div>
        </div>
        <div className="mb-2 relative bg-white h-10 w-full rounded-full border border-gray-500 flex items-center hover:cursor-pointer">
          <div
            className={`h-[38px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}
            style={{ width: "160px" }}
          ></div>
          <div className="absolute left-4 top-0 h-[38px] flex items-center">
            <p>Beer</p>
            <div className="text-xs px-1 h-4 border border-gray-500 bg-white rounded-lg ml-1">
              5
            </div>
          </div>
          <div className="absolute right-[2px] top-[2px] h-[34px] w-[34px] flex items-center justify-center rounded-full border border-gray-500">
            <BiCommentDetail size={16} />
          </div>
        </div>
        <div className="mb-2 relative bg-white h-10 w-full rounded-full border border-gray-500 flex items-center hover:cursor-pointer">
          <div
            className={`h-[38px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}
            style={{ width: "200px" }}
          ></div>
          <div className="absolute left-4 top-0 h-[38px] flex items-center">
            <p>Games</p>
            <div className="text-xs px-1 h-4 border border-gray-500 bg-white rounded-lg ml-1">
              5
            </div>
          </div>
          <div className="absolute right-[2px] top-[2px] h-[34px] w-[34px] flex items-center justify-center rounded-full border border-gray-500">
            <BiCommentDetail size={16} />
          </div>
        </div>
        <div className="mb-2 relative bg-white h-10 w-full rounded-full border border-gray-500 flex items-center hover:cursor-pointer">
          <div
            className={`h-[38px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}
            style={{ width: "80px" }}
          ></div>
          <div className="absolute left-4 top-0 h-[38px] flex items-center">
            <p>Cheese</p>
            <div className="text-xs px-1 h-4 border border-gray-500 bg-white rounded-lg ml-1">
              5
            </div>
          </div>
          <div className="absolute right-[2px] top-[2px] h-[34px] w-[34px] flex items-center justify-center rounded-full border border-gray-500">
            <BiCommentDetail size={16} />
          </div>
        </div>
      </div>
      <div className="absolute w-full h-full flex justify-center items-center z-10">
        {children}
      </div>
    </div>
  )
}
