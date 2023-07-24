"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import EventFoodList from "./eventFoodList";
import FixedBanner from "@/app/components/UI/FixedBanner";
import EditFoodList from "./editFoodList";

export default function FoodList({ eventId, maxguests, host }) {
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const fetchFoods = async () => {
    setLoading(true);
    const response = await axios.post("/api/event/geteventfood", { eventId });
    const sortedList = response.data.foods.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );

    setFoodList(sortedList);
    setLoading(false);
  };

  useEffect(() => {
    setFoodList([])
    fetchFoods();
  }, [editMode]);

  const processFoodList = (fl) => {
    const newfl = fl.map((ele, index) => {
      return { ...ele, order: index };
    });

    return newfl;
  };

  const editFoodHandler = async () => {
    const processedFoodList = processFoodList(foodList);
    const response = await axios.post("/api/food/updatefood", {
      eventId,
      processedFoodList,
    });
    if (response.status === 200) {
      window.location.reload();
    }
  };

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
        <div className="flex flex-row justify-between mb-2 items-center">
          <p className="text-xs text-gray-500">
            {editMode ? "Editing food" : "What to bring (double click to add)"}
          </p>
          {host &&
            (editMode ? (
              <button
                className="bg-orange-500 rounded-lg text-white text-xs px-2 py-1"
                onClick={editFoodHandler}
              >
                Save changes
              </button>
            ) : (
              <button
                className="bg-orange-500 rounded-lg text-white text-xs px-2 py-1"
                onClick={() => setEditMode(true)}
              >
                Edit food
              </button>
            ))}
        </div>
        {loading && (
          <div className="w-full h-full flex justify-center items-center">
            <CgSpinner className="animate-spin" size={30} />
          </div>
        )}
        {!editMode && !loading && (
          <EventFoodList
            foodList={foodList}
            setMessages={setMessages}
            maxguests={maxguests}
            setFoodList={setFoodList}
          />
        )}
        {editMode && !loading && (
          <EditFoodList
            foodList={foodList}
            setMessages={setMessages}
            maxguests={maxguests}
            setFoodList={setFoodList}
          />
        )}
      </div>
    </>
  );
}
