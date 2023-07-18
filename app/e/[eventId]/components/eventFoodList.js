"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { PiBowlFoodFill } from "react-icons/pi";
import FoodCard from "./foodCard";

export default function EventFoodList({ eventId, maxguests }) {
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await axios.post(
        "http://localhost:3000/api/event/geteventfood",
        {
          eventId,
        }
      );
      setFoodList(response.data.foods);
    }
    
    fetchData();
  }, []);


  return (
    <>
      <div className="w-full h-[500px] bg-white border border-gray-500 rounded-lg flex flex-col p-4 overflow-scroll">
        <p className="text-gray-500 text-sm mb-2 flex flex-row items-center">
          <PiBowlFoodFill size={12} className="mr-1" />
          Food list
        </p>
        {foodList.map((food) => {
          return (
            <FoodCard
              id={food.id}
              key={food.id}
              name={food.name}
              maxguests={maxguests}
              commitments={food.commitments}
            />
          );
        })}
      </div>
    </>
  );
}
