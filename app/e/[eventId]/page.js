"use client";

import EventCard from "@/app/dashboard/components/eventCard";
import HomeForm from "@/app/components/HomeForm";
import { LiaCocktailSolid, LiaCookieBiteSolid } from "react-icons/lia";
import JoinEvent from "./components/joinEvent";
import FoodList from "./components/foodList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function EventDetail({ params }) {
  const { status } = useSession();
  const [joined, setJoined] = useState(false);
  const [host, setHost] = useState(true);
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({});
  const { eventId } = params;

  const fetchData = async () => {
    const promise_one = axios.post("/api/event/getevent", { eventId });
    const promise_two = axios.post("/api/event/geteventdirect", { eventId });
    const response = await Promise.all([promise_one, promise_two]);
    const [eventou, event] = response;
    if (eventou.data.events.length > 0) {
      setJoined(true);
      setHost(eventou.data.events[0].host);
    }
    console.log(event.data.response)
    setEvent({ ...event.data.response });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const eventDetails = (
    <>
      <EventCard
        id={event.id}
        datetime={event.datetime}
        name={event.name}
        location={event.location}
        covercolor={event.covercolor}
        joined={joined}
        host={host}
      />
      <div className="w-full max-h-[500px] flex flex-col justify-center items-center p-4 pt-0">
        {joined && (
          <FoodList eventId={eventId} maxguests={event.maxguests} host={host} />
        )}
        {!joined && <JoinEvent eventId={eventId} />}
      </div>
    </>
  );

  const homeForm = (
    <div className="px-2 py-8 h-80 flex flex-col justify-between items-center">
      <h1 className="mb-4 text-2xl font-light ">
        You&apos;re invited to <span className="underline">{event.name}</span>
      </h1>
      <HomeForm />
      <div className="flex">
        <LiaCocktailSolid size={30} />
        <LiaCookieBiteSolid size={30} />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center pt-8">
      {!loading && (
        <div className="w-full sm:w-[400px] bg-white rounded-lg border border-gray-500">
          {status === "authenticated" ? eventDetails : homeForm}
        </div>
      )}
    </div>
  );
}
