"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import OneCommitment from "./oneCommitment";

export default function CommitmentModal({
  commitments,
  onCloseHandler,
  onSubmitHandler,
  name
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
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all w-full sm:my-8 sm:max-w-lg">
                <div className="p-6">
                  <h1 className="text-2xl font-light mb-8 h-[16px]">
                    Who is bringing{" "}
                    <span className="underline font-bold ">
                      {name}?
                    </span>
                  </h1>
                  <div className="pl-2 overflow-scroll max-h-[400px]">
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
                        className="flex justify-center items-center rounded-lg h-12 px-4 bg-white border border-gray-500 text-gray-500 hover:opacity-80"
                        onClick={onCloseHandler}
                      >
                        cancel
                      </button>
                      <button
                        className="flex justify-center items-center rounded-lg h-12 px-4 bg-orange-500 text-white mr-2 hover:opacity-80"
                        onClick={() => {
                          onSubmitHandler(content);
                          setContent("");
                        }}
                      >
                        I&apos;m bringing it
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
