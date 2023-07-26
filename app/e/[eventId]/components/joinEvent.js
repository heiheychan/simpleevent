"use client";

import EventBlurWrapper from "@/app/components/EventBlurWrapper";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function JoinEvent({ eventId }) {
  const router = useRouter();

  const joinHandler = async () => {
    const response = await axios.post("/api/user/joinevent", {
      eventId: eventId,
      host: false,
    });

    if (response.status === 200) {
      window.location.href = `/e/${eventId}?joined=true`;
    }
  };

  return (
    <EventBlurWrapper blurLevel="s">
      <button
        className="w-full max-w-[200px] bg-orange-500 text-white h-12 rounded-lg my-10"
        onClick={joinHandler}
      >
        Join event
      </button>
    </EventBlurWrapper>
  );
}
