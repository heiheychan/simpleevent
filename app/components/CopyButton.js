"use client";

import { MdOutlineContentCopy, MdCheck } from "react-icons/md";
import { CopyToClipboard } from "react-copy-to-clipboard";

import FixedBanner from "@/app/components/UI/FixedBanner";
import { useState } from "react";

export default function CopyButton({ name, id }) {
  const [copied, setCopied] = useState([]);

  const copyClickHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setCopied(["Copied to your clipboard"]);
  };

  return (
    <>
      {copied.length > 0 && (
        <FixedBanner
          messages={copied}
          setMessages={setCopied}
          color="bg-green-500"
        />
      )}

      <CopyToClipboard
        text={`
          You are invited to ${name}!
          Join on Simple event: ${process.env.NEXT_PUBLIC_BASE_URL}/e/${id}
          `}
      >
        <button
          onClick={copyClickHandler}
          className={`bg-white h-8 w-8 flex justify-center items-center rounded-full border border-gray-500 ${
            copied.length > 0 && "bg-green-300"
          }`}
        >
          {copied.length > 0 ? (
            <MdCheck size={14} />
          ) : (
            <MdOutlineContentCopy size={14} />
          )}
        </button>
      </CopyToClipboard>
    </>
  );
}
