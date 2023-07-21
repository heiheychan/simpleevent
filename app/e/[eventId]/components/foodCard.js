"use client";

import { useEffect, useState } from "react";
import { BiCommentDetail } from "react-icons/bi";
import { CgSpinner } from "react-icons/cg";
import axios from "axios";

import CommitmentModal from "./commitmentModal";

export default function FoodCard({ name, id, maxguests, setMessages }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [calculatedWidth, setCalculatedWidth] = useState(48);
  const [commitments, setCommitments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchFoodCommitments = async () => {
    setLoading(true);
    const response = await axios.post("/api/food/getfoodcommitments", {
      foodId: id,
    });

    setCommitments(response.data.commitments);
    setLoading(false);
  };

  useEffect(() => {
    fetchFoodCommitments();
  }, []);

  useEffect(() => {
    const minWidth = 48;

    if (commitments.length === 0) {
      setCalculatedWidth(0);
    } else if (commitments.length === 1) {
      setCalculatedWidth(minWidth);
    } else {
      setCalculatedWidth(
        Math.ceil(((commitments.length - 1) / (maxguests - 1)) * 150 + minWidth)
      );
    }
  }, [commitments.length]);

  const modalOpenHandler = () => {
    setModalOpen(true);
  };

  const modalCloseHandler = () => {
    setModalOpen(false);
  };

  const commitmentSubmitHandler = async (content) => {
    const response = await axios.post("/api/commitment/createcommitment", {
      foodId: id,
      comment: content,
    });

    if (response.status === 200) {
      setModalOpen(false);
      fetchFoodCommitments();
      setMessages(["Thank you for making the party awesome!"]);
    }
  };

  const doubleClickEventHandler = (e) => {
    e.stopPropagation();
    if (e.detail === 2) {
      commitmentSubmitHandler("");
    }
  };

  return (
    <>
      {modalOpen && (
        <CommitmentModal
          onOpenHandler={modalOpenHandler}
          onCloseHandler={modalCloseHandler}
          name={name}
          onSubmitHandler={commitmentSubmitHandler}
          commitments={commitments}
        />
      )}
      {loading ? (
        <div className="mb-3 relative bg-white h-[48px] w-full rounded-full border border-gray-500 flex items-center pl-4">
          <CgSpinner className="animate-spin" size={30} />
        </div>
      ) : (
        <div
          className="mb-3 relative bg-white h-[48px] w-full rounded-full border border-gray-500"
          onClick={doubleClickEventHandler}
        >
          <div
            className={`h-[46px] bg-gradient-to-r from-green-300 to-orange-300 rounded-full`}
            style={{ width: calculatedWidth }}
          ></div>
          <div className="absolute left-4 top-0 h-12 flex items-center font-bold pb-1">
            <p>{name}</p>
            <div className="text-xs px-1 h-[18px] border border-gray-500 bg-white rounded-lg ml-1">{`${commitments.length}`}</div>
          </div>
          <div
            className="absolute right-[2px] top-[2px] h-[41px] w-10 flex items-center justify-center rounded-full border border-gray-500"
            onClick={modalOpenHandler}
          >
            <BiCommentDetail size={16} />
          </div>
        </div>
      )}
    </>
  );
}
