"use client";

import axios from "axios";

import EventCard from "./components/eventCard";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [comingEvents, setComingEvents] = useState(true);
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const events = await axios.get(
        "http://localhost:3000/api/event/getevents"
      );
      setEvents(events.data.events);
    };
    fetchData();
  }, []);

  useEffect(() => {
    let result = [];
    if (comingEvents) {
      result = events.filter(
        (ele) => new Date(ele.event.datetime).getTime() >= new Date().getTime()
      );
    } else {
      result = events.filter((ele) => {
        return new Date(ele.event.datetime).getTime() < new Date().getTime();
      });
      result = result.reverse();
    }

    setDisplayEvents(result);
  }, [comingEvents, events]);

  return (
    <div className="w-full max-w-[400px] flex flex-col">
      <div className="flex flex-row items-center mb-2">
        <h1
          className={`mr-1 text-2xl font-bold ${comingEvents ? "underline" : "text-gray-300"}`}
          onClick={() => {
            setComingEvents(true);
          }}
        >
          Coming events
        </h1>
        /
        <h1
          className={`ml-1 text-2xl font-bold ${!comingEvents ? "underline" : "text-gray-300"}`}
          onClick={() => {
            setComingEvents(false);
          }}
        >
          Past events
        </h1>
      </div>
      <div className="py-2">
        {displayEvents.map((ele) => (
          <Link
            href={`/e/${ele.event.id}`}
            className="py-4 w-full rounded-lg mb-2 px-6 flex flex-col justify-center border border-gray-500 cursor-pointer"
          >
            <EventCard
              key={ele.event.id}
              id={ele.event.id}
              name={ele.event.name}
              location={ele.event.location}
              datetime={ele.event.datetime}
              host={ele.host}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
