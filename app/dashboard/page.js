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
      <div className="max-w-[390px] pt-8">
        <div className="flex flex-row items-center mb-2">
          <h1
            className={`mr-4 text-2xl font-light ${
              comingEvents ? "underline text-orange-500" : "text-gray-300"
            }`}
            onClick={() => {
              setComingEvents(true);
            }}
          >
            Upcoming events
          </h1>
          <h1
            className={`text-2xl font-light ${
              !comingEvents ? "underline text-orange-500" : "text-gray-300"
            }`}
            onClick={() => {
              setComingEvents(false);
            }}
          >
            past events
          </h1>
        </div>
        <div className="py-2 flex flex-col justify-center items-center">
          {loading && <CgSpinner className="animate-spin mt-6" size={30} />}
          {displayEvents.map((ele) => (
            <Link
              key={ele.event.id}
              href={`/e/${ele.event.id}`}
              className={`border border-gray-500 w-[390px] rounded-lg ${
                comingEvents ? "" : "pointer-events-none bg-gray-50"
              }`}
            >
              <EventCard
                key={ele.event.id}
                id={ele.event.id}
                name={ele.event.name}
                location={ele.event.location}
                datetime={ele.event.datetime}
                host={ele.host}
                joined={true}
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
