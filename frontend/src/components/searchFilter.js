"use client";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, Suspense, useState } from "react";
import { Icons } from "./icons";
import { useRouter, useSearchParams } from "next/navigation";

const SearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const presentOlder = reversedParsedDate(searchParams.get("older"));
  const presentNewer = reversedParsedDate(searchParams.get("newer"));
  const presentOrder = searchParams.get("order");
  const searchContent = searchParams.get("text");
  const [order, setOrder] = useState(presentOrder || "date");
  const [older, setOlder] = useState(presentOlder);
  const [newer, setNewer] = useState(presentNewer);

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  function SearchBarFallback() {
    return <></>;
  }

  const handleClick = (e) => {
    setOrder(e.target.value);
    router.push(
      "/r/search/?text=" +
        searchContent +
        "&newer=" +
        parsedDate(newer) +
        "&older=" +
        parsedDate(older) +
        "&order=" +
        e.target.value
    );
  };

  function parsedDate(date) {
    const result = "";
    const day = date.get("date");
    const month = date.get("month") + 1;
    const year = date.get("year");
    return result + year + "-" + month + "-" + day;
  }

  function reversedParsedDate(date) {
    if (date == null) return null;
    const dateArr = date.split("-");
    const day = dateArr[2];
    const month = dateArr[1] - 1;
    const year = dateArr[0];
    return dayjs(new Date(year, month, day));
  }

  return (
    <div className="container max-w-7xl h-full mx-auto flex items-center justify-start gap-2.5 px-4 py-2">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Suspense fallback={<SearchBarFallback />}>
          <MobileDatePicker
            label="Newer"
            className="h-min w-28 outline-none border-none bg-white rounded-full"
            value={newer}
            onChange={(newValue) => setNewer(newValue)}
          />
        </Suspense>
        <Suspense fallback={<SearchBarFallback />}>
          <MobileDatePicker
            label="Older"
            className="h-min w-28 outline-none border-none bg-white rounded-full"
            value={older}
            onChange={(newValue) => setOlder(newValue)}
          />
        </Suspense>
      </LocalizationProvider>
      {/* <button onClick={newer ? console.log(newer.get("date")) : null}>
        test
      </button> */}
      <Menu as="div" className="relative inline-block mr-2 pl-8">
        <Menu.Button className="bg-purple-600 hover:bg-purple-950 text-white font-bold py-1 px-2 rounded-full text-xs w-24">
          <Suspense fallback={<SearchBarFallback />}>
            <div className="cursor-pointer">
              {order == "date" ? "Ngày" : "Liên quan"}
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
                    Xếp theo
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
                      Ngày
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
                      Liên quan
                    </button>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};
export default SearchFilter;
