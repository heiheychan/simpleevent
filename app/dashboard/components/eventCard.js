import { MdOutlineLocationOn } from "react-icons/md";

import { dayList } from "@/lib/dayList";
import CopyButton from "@/app/components/CopyButton";

export default function EventCard({ id, datetime, name, location }) {
  const utc = new Date(datetime);
  const offset = utc.getTimezoneOffset();
  const local = new Date(utc.getTime() - offset * 60000);

  const day = dayList[local.getDay()];
  const month = local.getMonth();
  const date = local.getDate();
  let hour = local.getHours();
  const ampm = hour < 13 ? "AM" : "PM";
  hour = hour % 12;
  const min = local.getMinutes();

  return (
    <>
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
