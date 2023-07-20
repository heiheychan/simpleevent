"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { PiBowlFoodFill } from "react-icons/pi";
import { CgSpinner } from "react-icons/cg";
import FoodCard from "./foodCard";

export default function EventFoodList({ eventId, maxguests }) {
  const [foodList, setFoodList] = useState([]);
  const [loading, setLoading] = useState(false);

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
      <div className="w-full h-[500px] bg-white border border-gray-500 rounded-lg flex flex-col p-4 overflow-scroll">
        <p className="text-gray-500 text-sm mb-2 flex flex-row items-center">
          <PiBowlFoodFill size={12} className="mr-1" />
          Food list
        </p>
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
                commitments={food.commitments}
                fetchFoodList={fetchFoodList}
              />
            );
          })
        )}
      </div>
    </>
  );
}
