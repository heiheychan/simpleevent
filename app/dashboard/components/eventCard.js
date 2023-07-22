import { MdOutlineLocationOn } from "react-icons/md";
import { PiCrownSimpleBold } from "react-icons/pi";

import { dayList } from "@/lib/dayList";
import CopyButton from "@/app/components/CopyButton";

export default function EventCard({
  id,
  datetime,
  name,
  location,
  host,
  joined,
}) {
  const utc = new Date(datetime);

  const day = dayList[utc.getDay()];
  const month = utc.getMonth() + 1;
  const date = utc.getDate();
  let hour = utc.getHours();
  const ampm = hour < 13 ? "AM" : "PM";
  hour = hour % 12;
  let min = utc.getMinutes();
  if (min === 0) {
    min = min.toString() + "0";
  }

  return (
    <>
      {/* Top part */}
      <div className="relative h-12 bg-gray-100 rounded-tl-lg rounded-tr-lg flex items-center px-4">
        {host && (
          <div className="h-6 w-[150px] rounded-full bg-yellow-300 text-xs flex justify-center items-center font-bold">
            <PiCrownSimpleBold className="mr-1" />
            hosted by you
          </div>
        )}
        {joined && (
          <div className="absolute -bottom-4 right-4">
            <CopyButton id={id} name={name} />
          </div>
        )}
      </div>
      {/* Bottom part */}
      <div className="px-4 py-6 bg-white rounded-bl-lg rounded-br-lg">
        <div className="flex flex-row justify-between mb-1">
          {joined ? (
            <p className="text-sm flex flex-row items-center text-orange-500 font-bold">
              {`${day
                .substring(0, 3)
                .toUpperCase()} ${month}/${date}, ${hour}:${min} ${ampm}`}
            </p>
          ) : (
            <div className="h-5 bg-gray-300 rounded-lg w-20"></div>
          )}
        </div>
        <h1 className="text-4xl font-light mb-2">{name}</h1>
        <div className="text-sm flex flex-row items-center text-gray-500">
          <MdOutlineLocationOn size={16} />
          {joined ? (
            <p className="ml-1">{location}</p>
          ) : (
            <div className="ml-1 h-5 w-20 bg-gray-300 rounded-lg"></div>
          )}
        </div>
      </div>
    </>
  );
}
