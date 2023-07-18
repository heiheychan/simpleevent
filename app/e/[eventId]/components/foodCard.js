"use client";

import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import axios from "axios";

import CommitmentModal from "./commitmentModal";
import FixedBanner from "@/app/components/UI/FixedBanner";

export default function FoodCard({ name, id, maxguests, commitments }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState([]);

  const minWidth = 48;

  let calculateWidth = "";

  if (commitments.length === 0) {
    calculateWidth = 0;
  } else if (commitments.length === 1) {
    calculateWidth = minWidth;
  } else {
    calculateWidth = Math.ceil(
      ((commitments.length - 1) / (maxguests - 1)) * 150 + minWidth
    );
  }
  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const commitmentSubmitHandler = async (content) => {
    const response = await axios.post(
      "http://localhost:3000/api/commitment/createcommitment",
      {
        foodId: id,
        comment: content,
      }
    );

    if (response.status === 200) {
      setModalOpen(false);
      setMessages(["Thank you for making the party AWESOME!"]);
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
      {modalOpen && (
        <CommitmentModal
          onOpenHandler={modalOpenHandler}
          onCloseHandler={modalCloseHandler}
          name={name}
          onSubmitHandler={commitmentSubmitHandler}
          commitments={commitments}
        />
      )}
      <div
        className="mb-4 relative bg-white h-12 w-full rounded-full border border-gray-500"
        onClick={modalOpenHandler}
      >
        <div
          className={`h-[46px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}
          style={{ width: calculateWidth }}
        ></div>
        <div className="absolute left-4 top-0 h-12 flex items-center font-bold pb-1">
          <p>{name}</p>
          <div className="text-xs px-1 h-[18px] border border-gray-500 rounded-lg ml-1">{`${commitments.length}`}</div>
        </div>
        <div
          className="absolute right-[2px] top-[2px] h-[41px] w-10 flex items-center justify-center rounded-full border border-gray-500"
          onClick={modalOpenHandler}
        >
          <HiPlus />
        </div>
      </div>
    </>
  );
}
