"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import OneCommitment from "./oneCommitment";

export default function CommitmentModal({
  name,
  onCloseHandler,
  onSubmitHandler,
  commitments,
}) {
  const [content, setContent] = useState("");
  const commitmentEndRef = useRef();

  const scrollToBottom = (delay) => {
    setTimeout(() => {
      commitmentEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, delay);
  };

  useEffect(() => {
    scrollToBottom(500);
  }, []);

  return (
    <Transition.Root as={Fragment} show={true}>
      <Dialog as="div" className="relative z-10" onClose={onCloseHandler}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="p-6">
                  <h1 className="text-2xl mb-8 h-[16px]">
                    Who is bringing{" "}
                    <span className="underline font-extralight font-serif italic">
                      {name}?
                    </span>
                  </h1>
                  <div className="pl-2 overflow-scroll max-h-[450px]">
                    {commitments.map((commitment) => (
                      <OneCommitment
                        name={commitment.user.name}
                        comment={commitment.comment}
                        commitDate={commitment.created_at}
                        key={commitment.id}
                      />
                    ))}
                    <div ref={commitmentEndRef}></div>
                  </div>
                  <div className="h-1/5">
                    <textarea
                      className="h-[100px] w-full border border-gray-500 rounded-lg p-4 my-2"
                      placeholder="Additional information about the food you're bringing (the quantity and details)"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between items-center">
                      <button
                        className="h-12 rounded-full border border-gray-300 bg-gray-500 text-white font-bold px-4"
                        onClick={onCloseHandler}
                      >
                        cancel
                      </button>
                      <button
                        className="h-12 rounded-full border border-gray-500 font-bold px-4"
                        onClick={() => {
                          onSubmitHandler(content);
                          scrollToBottom(1000);
                          setContent("");
                        }}
                      >
                        I'm bringing it
                      </button>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
