"use client"
import axios from "axios";

import Button from "@/app/components/UI/Button";
import DatetimePicker from "@/app/components/UI/DatetimePicker";
import TextInput from "@/app/components/UI/TextInput";

export default function EditEvent({ params }) {
  const eventId = params.eventId;

  const fetchEvent = async () => {
    const response = await axios.post("/api/event/getevent",{eventId})
    console.log(response.data)
  }

  fetchEvent();

  return (
    <div className="flex flex-col justify-center items-center pt-6">
      <div className="min-w-[390px] border border-gray-500 px-6 py-8 rounded-lg bg-white">
        <h1 className="text-4xl font-light mb-2">Edit an event</h1>
        <TextInput type="text" label="Event name" />
        <DatetimePicker />
        <TextInput type="text" label="Location" />
        <TextInput type="text" label="Max number of guests" />
        <Button bgcolor="bg-orange-500" content="Edit event" />
      </div>
    </div>
  );
}

// type,
//   placeholder,
//   label,
//   value,
//   setValue,
//   subtext,
//   subtextcolor,
//   disable,
//   min,
//   max
