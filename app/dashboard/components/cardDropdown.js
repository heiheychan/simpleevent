"use client";

import { Fragment, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiDotsVertical } from "react-icons/hi";
import { useInView } from "react-intersection-observer";

import Link from "next/link";

export default function CardDropdown({ host, setClickDisable }) {
  const [ref, inView] = useInView({
    triggerOnce: false,
    rootMargin: "0px 0px",
  });

  useEffect(() => {
    if (Boolean(setClickDisable)) {
      if (inView) {
        setClickDisable(true);
      } else if (!inView) {
        setClickDisable(false);
      }
    }
  }, [inView]);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-white h-8 w-8 flex justify-center items-center rounded-full border border-gray-500">
          <HiDotsVertical />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-2 flex flex-col" ref={ref}>
            {host ? (
              <>
                <Menu.Item>
                  <Link
                    href="#"
                    className="px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Edit event
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link
                    href="#"
                    className="px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Delete event
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <>
                <Menu.Item>
                  <Link
                    href="#"
                    className="px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Leave event
                  </Link>
                </Menu.Item>
              </>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
