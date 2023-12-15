"use client";
import { faBars, faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";

const Header = () => {
  const [hiddenMenu, setHiddenMenu] = useState(true);
  const [icon, setIcon] = useState(faBars);
  const toggleMenu = () => {
    setIcon(icon == faBars ? faXmark : faBars);
    setHiddenMenu(!hiddenMenu);
  };
  useEffect(() => {
    const mobileMenu = document.getElementById("mobile-menu");
    mobileMenu.classList.toggle("hidden");
    mobileMenu.classList.toggle("flex");
  }, [hiddenMenu]);
  return (
    <header className="bg-custom fixed top-0 z-10 w-full h-16">
      <div className=" relative h-full max-w-4xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="grow">
          <Image
            src="/assets/images/VozIcon.png"
            alt="logo"
            width={80}
            height={80}
            style={{ width: "auto", height: "50px" }}
            priority={false}
          />
        </div>
        <div className="flex">
          <div className="grow">
            <div className="relative w-5/6 m-auto rounded-3xl">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 
              cursor-pointer">
                <FontAwesomeIcon
                  icon={faSearch}
                  style={{ fontSize: 25, color: "#333"}}
                />
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-300 border border-gray-300 text-gray-900 
                text-sm outline-none
                block w-full ps-10 p-2.5 
                  rounded-3xl"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="mr-1">
              <button className="bg-gray-950 hover:bg-gray-900 active:bg-gray-800 text-white font-bold py-2 px-4 rounded-full w-max">
                Log in
              </button>
            </div>
            <div>
              <div>
                <button
                  onClick={toggleMenu}
                  id="hamburger-button"
                  className="text-3xl md:hidden"
                >
                  {/* &#9776; */}
                  <FontAwesomeIcon
                    icon={icon}
                    width={30}
                    height={30}
                    style={{ fontSize: 30 }}
                  />
                </button>
                <nav
                  className="hidden md:block space-x-8 text-xl ml-8"
                  aria-label="main"
                >
                  <Link href="/" className="hover:opacity-80 text-white">
                    Home
                  </Link>
                  <Link
                    href="/trending"
                    className="hover:opacity-80 text-white"
                  >
                    Trending
                  </Link>
                  <Link
                    href="/trending-topics"
                    className="hover:opacity-80 text-white"
                  >
                    Trending topics
                  </Link>
                </nav>
              </div>
              <div
                id="mobile-menu"
                className="hidden bg-white text-neutral-800 right-0 
              top-16 absolute w-3/4 text-5xl flex-col justify-center"
              >
                <nav
                  className="flex flex-col items-center p-4 bg-gray-100 shadow-2xl"
                  aria-label="mobile"
                >
                  <Link
                    href="/"
                    className=" w-full text-start py-4 hover:opacity-80 text-xl font-bold"
                  >
                    Home
                  </Link>
                  <Link
                    href="/trending"
                    className="w-full text-start py-4 hover:opacity-80 text-xl font-bold"
                  >
                    Trending
                  </Link>
                  <Link
                    href="/trending-topics"
                    className="w-full text-start py-4 hover:opacity-80 text-xl font-bold"
                  >
                    Trending topics
                  </Link>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
