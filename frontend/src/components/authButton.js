"use client";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import ModalNotify from "./modalNotify";
import { useRouter } from "next/navigation";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export function AvatarUser({ image, name, email, setUserSession }) {
  const [showSetting, setShowSetting] = useState(false);
  const router = useRouter()
  const handleClick = () => {
    localStorage.removeItem("userSession");
    router.refresh();
    setUserSession()
  };
  return (
    <div>
      <Menu as="div" className="relative inline-block mr-2">
        <div>
          <Menu.Button className="inline-flex justify-center shadow-sm">
            <div>
              <div className="cursor-pointer">
                <Image
                  className="rounded-full"
                  src={image}
                  alt="avatar"
                  width={45}
                  height={45}
                  priority={true}
                />
              </div>
            </div>
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
          <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <p
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-1 font-medium"
                    )}
                  >
                    {name}
                  </p>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <p
                    href="#"
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-[200px] truncate px-4 pt-1 pb-4 text-sm"
                    )}
                  >
                    {email}
                  </p>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={()=>{setShowSetting(true)}}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Cài đặt thông báo
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={handleClick}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block w-full px-4 py-2 text-left text-sm"
                    )}
                  >
                    Đăng xuất
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      {showSetting && <ModalNotify setShow={setShowSetting}/>}
    </div>
  );
}
