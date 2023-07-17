import { MdOutlineLocationOn } from "react-icons/md";
import { PiCrownSimpleBold } from "react-icons/pi";

import { dayList } from "@/lib/dayList";
import CopyButton from "@/app/components/CopyButton";

export default function EventCard({ id, datetime, name, location, host }) {
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
      {host && (
        <div className="h-[18px] rounded-full bg-yellow-300 text-xs flex justify-center items-center w-32 ">
          <PiCrownSimpleBold className="mr-1" />you're the host
        </div>
      )}
      <div className="flex flex-row justify-between">
        <p className="text-sm flex flex-row items-center text-orange-500 font-bold">
          <span className="ml-1">{`${day
            .substring(0, 3)
            .toUpperCase()} ${month}/${date}, ${hour}:${min} ${ampm}`}</span>
        </p>
        <CopyButton id={id} name={name} />
      </div>
      <h1 className="text-2xl font-bold mb-2">{name}</h1>
      <p className="text-sm mb-2 flex flex-row items-center text-gray-500 font-bold">
        <MdOutlineLocationOn size={16} />
        <span className="ml-1">{location}</span>
      </p>
    </>
  );
}
