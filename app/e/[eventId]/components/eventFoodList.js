"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { PiBowlFoodFill } from "react-icons/pi";
import { CgSpinner } from "react-icons/cg";
import FoodCard from "./foodCard";
import FixedBanner from "@/app/components/UI/FixedBanner";

export default function EventFoodList({ eventId, maxguests }) {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  async function fetchFoodList() {
    setLoading(true);
    const response = await axios.post("/api/event/geteventfood", {
      eventId,
    });
    setFoodList(response.data.foods);
    setLoading(false);
  }

  useEffect(() => {
    fetchFoodList();
  }, []);

  return (
    <>
      {messages.length > 0 && (
        <FixedBanner
          messages={messages}
          setMessages={setMessages}
          color="bg-green-500"
        />
      )}
      <div className="w-full h-[500px] bg-white border border-gray-500 rounded-lg flex flex-col p-4 overflow-scroll">
        <p className="text-xs text-gray-500 mb-2">What to bring {"(double click to add)"}:</p>
        {loading ? (
          <div className="w-full h-full flex justify-center items-center">
            <CgSpinner className="animate-spin" size={30} />
          </div>
        ) : (
          foodList.map((food) => {
            return (
              <FoodCard
                id={food.id}
                key={food.id}
                name={food.name}
                maxguests={maxguests}
                setMessages={setMessages}
              />
            );
          })
        )}
      </div>
    </>
  );
}
