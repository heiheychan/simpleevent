"use client";

import EventCard from "@/app/dashboard/components/eventCard";
import HomeForm from "@/app/components/HomeForm";
import { LiaCocktailSolid, LiaCookieBiteSolid } from "react-icons/lia";
import JoinEvent from "./components/joinEvent";
import FoodList from "./components/foodList";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import { deleteCookie } from "cookies-next";
import EventBlurWrapper from "@/app/components/EventBlurWrapper";

export default function EventDetail({ params }) {
  deleteCookie("return_path");
  const { status } = useSession();
  const [joined, setJoined] = useState(false);
  const [host, setHost] = useState(false);
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
    <EventBlurWrapper blurLevel="l">
      <div className="px-4 py-8 h-80 flex flex-col justify-between items-center drop-shadow-lg ">
        <h1 className="mb-2 text-2xl font-bold text-center">
          You&apos;re invited to <span className="underline">{event.name}</span>
        </h1>
        <p className="text-gray-700 mb-2 text-xs text-center">
          Let&apos;s see what other guests are bringing
        </p>
        <HomeForm />
        <div className="flex">
          <LiaCocktailSolid size={30} />
          <LiaCookieBiteSolid size={30} />
        </div>
      </div>
    </EventBlurWrapper>
  );

  return (
    <>
      {loading && (
        <div className="flex flex-col items-center pt-8">
          <div className="w-full min-h-[330px] sm:w-[400px] bg-white rounded-lg border border-gray-500 flex justify-center items-center">
            <CgSpinner className="animate-spin ml-2" size={30} />
          </div>
        </div>
      )}
      <div className="flex flex-col items-center pt-8">
        {!loading && (
          <div className="w-full sm:w-[400px] bg-white rounded-lg border border-gray-500">
            {status === "authenticated" ? eventDetails : homeForm}
          </div>
        )}
      </div>
    </>
  );
}
