"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import Button from "@/app/components/UI/Button";
import DatetimePicker from "@/app/components/UI/DatetimePicker";
import TextInput from "@/app/components/UI/TextInput";

export default function EditEvent({ params }) {
  const [formInput, setFormInput] = useState({});

  const eventId = params.eventId;
  const router = useRouter();

  const fetchEvent = async () => {
    const response = await axios.post("/api/event/getevent", { eventId });

    if (response.data.events.length === 0 || !response.data.events[0].host) {
      router.push("/");
      return;
    }

    const d = new Date(response.data.events[0].event.datetime);

    setFormInput({
      name: response.data.events[0].event.name,
      covercolor: response.data.events[0].event.covercolor,
      datetime: `${d.getFullYear()}-${("0" + String(+d.getMonth() + 1)).slice(
        -2
      )}-${("0" + d.getDate()).slice(-2)}T${("0" + d.getHours()).slice(-2)}:${(
        "0" + d.getMinutes()
      ).slice(-2)}`,
      location: response.data.events[0].event.location,
      maxguests: response.data.events[0].event.maxguests,
    });
  };

  useEffect(() => {
    fetchEvent();
  }, []);

  const setValue = (e) => {
    switch (e.target.name) {
      case "name":
        setFormInput((old) => ({ ...old, name: e.target.value }));
        break;
      case "color":
        setFormInput((old) => ({ ...old, covercolor: e.target.value }));
        break;
      case "datetime":
        setFormInput((old) => ({ ...old, datetime: e.target.value }));
        break;
      case "location":
        setFormInput((old) => ({ ...old, location: e.target.value }));
        break;
      case "numguests":
        setFormInput((old) => ({ ...old, maxguests: e.target.value }));
        break;
    }
  };

  const onClickHandler = async () => {
    const response = await axios.post("/api/event/editevent", {
      eventId,
      name: formInput.name,
      datetime: formInput.datetime,
      location: formInput.location,
      covercolor: formInput.covercolor,
      maxguests: formInput.maxguests,
    });

    if (response.status === 200) {
      router.push(`/e/${eventId}?u=true`);
      return;
    }
  };

  return (
    <div className="flex flex-col justify-center items-center pt-6">
      <div className="min-w-[390px] border border-gray-500 px-6 py-8 rounded-lg bg-white">
        <h1 className="text-4xl font-light mb-2">Edit an event</h1>
        <div className="w-full flex flex-col max-w-[400px] mt-6">
          <div className="flex flex-row justify-between gap-1">
            <div className="w-3/4">
              <TextInput
                label="Event name"
                placeholder="Amazin summer grill"
                type="text"
                value={formInput.name}
                name="name"
                setValue={setValue}
              />
            </div>
            <div className="w-1/4">
              <TextInput
                label="Cover color"
                type="color"
                value={formInput.covercolor}
                name="color"
                setValue={setValue}
              />
            </div>
          </div>
          <DatetimePicker
            value={formInput.datetime}
            name="datetime"
            setValue={setValue}
          />
          <TextInput
            type="text"
            label="Location"
            value={formInput.location}
            name="location"
            setValue={setValue}
          />
          <TextInput
            type="text"
            label="Max number of guests"
            value={formInput.maxguests}
            name="numguests"
            setValue={setValue}
          />
          <Button
            bgcolor="bg-orange-500"
            content="Edit event"
            onClickHandler={onClickHandler}
          />
        </div>
      </div>
    </div>
  );
}
