import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-slate-700">
      <div className="max-w-4xl mx-auto p-4 flex justify-between items-center">
        <div>
          <Image
            src="/assets/images/VozIcon.png"
            alt="logo"
            width={80}
            height={80}
          />
        </div>

        <div className="flex justify-between items-center">
          <div className="mr-4">
            <button class="bg-red-500 hover:bg-red-700 active:bg-red-800 text-white font-bold py-2 px-4 rounded-full">
              Log in
            </button>
          </div>
          <div>
            <button
              id="mobile-open-button"
              className="text-3xl sm:hidden focus:outline-none"
            >
              &#9776;
            </button>
            <nav className="hidden sm:block space-x-8 text-xl" aria-label="main">
              <a href="" className="hover:opacity-80 text-white">
                Home
              </a>
              <a href="" className="hover:opacity-80 text-white">
                Trending
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};
export default Header;
