"use client"

import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function CommitmentModal({ name, onCloseHandler, onSubmitHandler }) {
  const [content, setContent] = useState("");

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
                  <h1 className="text-2xl mb-4">
                    Thank you for bringing{" "}
                    <span className="underline font-bold">{name}!</span>
                  </h1>
                  <p className="text-gray-500 mb-2">
                    Leave some notes about the food you are going to bring:
                  </p>
                  <textarea
                    className="h-[100px] w-full border border-gray-500 rounded-lg p-2 mb-2"
                    placeholder="It could be about the quantity and the details about the food"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <button className="h-12 rounded-lg bg-red-500 font-bold text-white px-4" onClick={onCloseHandler}>cancel</button>
                    <button className="h-12 rounded-lg bg-green-500 font-bold text-white px-4" onClick={() => onSubmitHandler(content)}>I'm bringing it</button>
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
