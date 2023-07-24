"use client";

import FoodCard from "./foodCard";

export default function EventFoodList({ maxguests, foodList, setMessages }) {

  return foodList.map((food) => {
    return (
      <FoodCard
        id={food.id}
        key={food.id}
        name={food.name}
        maxguests={maxguests}
        setMessages={setMessages}
      />
    );
  });
}
