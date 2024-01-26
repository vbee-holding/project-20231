"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment, Suspense, useState } from "react";
import { Icons } from "./icons";
import { useRouter, useSearchParams } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Searchorder = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presentOrder = searchParams.get("order");
  const searchContent = searchParams.get("text");
  const [order, setOrder] = useState(presentOrder || "date");

  const handleClick = (e) => {
    setOrder(e.target.value);
    router.push(
      "/r/search/?text=" + searchParams.get("text") + "&order=" + e.target.value
    );
  };

  function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function SearchBarFallback() {
    return <></>;
  }

  return (
    <div className="py-2">
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 px-4">
        <Suspense fallback={<SearchBarFallback />}>
          <h1 className="text-2xl font-semibold tracking-tight truncate w-[100]">
            Results for " {searchContent} "
          </h1>
        </Suspense>
        <Menu as="div" className="relative inline-block mr-2 ">
          <Menu.Button className="bg-purple-600 hover:bg-purple-950 text-white font-bold py-1 px-2 rounded-full text-xs w-24">
            <Suspense fallback={<SearchBarFallback />}>
              <div className="cursor-pointer">
                {capitalize(order)}
                <Icons.expandMore className="h-4 w-4" />
              </div>
            </Suspense>
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
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block pt-1 pb-4 text-xs"
                      )}
                      onClick={handleClick}
                    >
                      <button
                        value="date"
                        className={order == "date" ? null : "px-4"}
                      >
                        {order == "date" ? (
                          <Icons.right className="h-4 w-4" />
                        ) : null}
                        Date
                      </button>
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block pt-1 pb-4 text-xs"
                      )}
                      onClick={handleClick}
                    >
                      <button
                        value="relevance"
                        className={order == "relevance" ? null : "px-4"}
                      >
                        {order == "relevance" ? (
                          <Icons.right className="h-4 w-4" />
                        ) : null}
                        Relevance
                      </button>
                    </div>
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
export default Searchorder;
