"use client";

import { useState } from "react";
import { HiPlus } from "react-icons/hi";
import axios from "axios";


import CommitmentModal from "./commitmentModal";
import FixedBanner from "@/app/components/UI/FixedBanner";

export default function FoodCard({ name, id, maxguests, commitments }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [messages, setMessages] = useState([])

  const calculateWidth = () => {
    if (commitments.length === 0) {
      return "w-0"
    } else {
      console.log((commitments.length / maxguests) * 150)
      let width = `w-[${Math.ceil((commitments.length / maxguests) * 150).toString()}px]`
      console.log(width);
      return width
    }
  }

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  }

  const commitmentSubmitHandler = async (content) => {

    const response = await axios.post("http://localhost:3000/api/commitment/createcommitment",{
      foodId: id,
      comment: content
    })

    console.log(response)

    if (response.status === 200) {
      setModalOpen(false);
      setMessages(["Thank you for bring it!"]);
    }
  }

  return (
    <>
      {messages.length > 0 && <FixedBanner messages={messages} setMessages={setMessages} color="bg-green-500" />}
      {modalOpen && (
        <CommitmentModal
          onOpenHandler={modalOpenHandler}
          onCloseHandler={modalCloseHandler}
          name={name}
          onSubmitHandler={commitmentSubmitHandler}
        />
      )}
      <div
        className="mb-4 relative bg-white h-13 w-full rounded-full border border-gray-500"
        onClick={modalOpenHandler}
      >
        <div className={`h-12 ${calculateWidth()} bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}></div>
        <div className="absolute left-4 top-0 h-12 flex items-center font-bold pb-1">
          {name}
        </div>
        <div
          className="absolute right-1 top-1 h-10 w-10 flex items-center justify-center rounded-full border border-gray-500"
          onClick={modalOpenHandler}
        >
          <HiPlus />
        </div>
        {/* People */}
        <div className="absolute h-4 w-16 left-6 -bottom-2 bg-white rounded-lg border border-gray-500"></div>
      </div>
    </>
  );
}
