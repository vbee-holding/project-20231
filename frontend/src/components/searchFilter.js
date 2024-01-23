"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Icons } from "./icons";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SearchFilter = () => {
  const [filter,setFilter] = useState("Newer")

  return (
    <div className="bg-zinc-100 border-b border-zinc-300 py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 px-4">
        <hr class="static bg-gray-800 w-full h-0.5" />
        <Menu as="div" className="relative inline-block mr-2 ">
            <Menu.Button className="inline-flex justify-center shadow-sm">
              <div className="cursor-pointer">
                <button
                  className="bg-purple-600 hover:bg-purple-950 text-white font-bold py-1 px-2 rounded-full text-xs w-20"
                >
                  {filter}
                  <Icons.expandMore/>
                </button>
              </div>
            </Menu.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 pt-1 pb-4 text-xs font-bold"
                      )}
                    >
                      Sort by
                    </p>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 pt-1 pb-4 text-xs"
                      )}
                    >
                      Newer
                    </p>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <p
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 pt-1 pb-4 text-xs"
                      )}
                    >
                      Older
                    </p>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};
export default SearchFilter;
