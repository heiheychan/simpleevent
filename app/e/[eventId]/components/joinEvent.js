"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export default function JoinEvent({ eventId }) {
  const router = useRouter();
  
  const joinHandler = async () => {
    const response = await axios.post(
      "/api/user/joinevent",
      {
        eventId: eventId,
        host: false,
      }
    );

    if (response.status === 200) {
      router.push(`/e/${eventId}`)
    }
  };

  return (
    <button
      className="w-full max-w-[200px] bg-white font-bold h-12 rounded-full border border-black mb-10"
      onClick={joinHandler}
    >
      Join event
    </button>
  );
}
