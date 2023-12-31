"use client";

import axios from "axios";

import EventCard from "./components/eventCard";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import Footer from "../components/Footer";

export default function Dashboard() {
  const [comingEvents, setComingEvents] = useState(true);
  const [events, setEvents] = useState([]);
  const [displayEvents, setDisplayEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [clickDisable, setClickDisable] = useState(false)

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      const events = await axios.get("/api/event/getevents");
      setEvents(events.data.events);
      setLoading(false);
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
    <div className="flex flex-col items-center">
      <div className="max-w-[390px] pt-8 flex flex-col">
        <div className="flex flex-row items-center mb-2 justify-center sm:justify-start">
          <h1
            className={`mr-4 text-2xl font-light ${
              comingEvents ? "underline text-orange-500" : "text-gray-400"
            }`}
            onClick={() => {
              setComingEvents(true);
            }}
          >
            Upcoming events
          </h1>
          <h1
            className={`text-2xl font-light ${
              !comingEvents ? "underline text-orange-500" : "text-gray-400"
            }`}
            onClick={() => {
              setComingEvents(false);
            }}
          >
            past events
          </h1>
        </div>
        <div className="py-2 flex flex-col min-h-[600px] w-[390px] sm:max-w-full pb-32 items-center">
          {loading && <CgSpinner className="animate-spin my-6" size={30} />}
          {displayEvents.map((ele) => (
            <Link
              key={ele.event.id}
              href={clickDisable ? "" : `/e/${ele.event.id}`}
              className={`mb-2 w-[390px] sm:max-w-full border border-gray-500 rounded-lg ${
                comingEvents ? "" : " grayscale pointer-events-none bg-gray-50"
              } ${clickDisable && "cursor-default"}`}
            >
              <EventCard
                key={ele.event.id}
                id={ele.event.id}
                name={ele.event.name}
                location={ele.event.location}
                datetime={ele.event.datetime}
                host={ele.host}
                covercolor={ele.event.covercolor}
                joined={true}
                setClickDisable={setClickDisable}
              />
            </Link>
          ))}
        </div>
        <div className="flex justify-center">
          <Footer />
        </div>
      </div>
    </div>
  );
}
