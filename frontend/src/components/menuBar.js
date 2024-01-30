"use client";

import { Icons } from "./icons";
import ButtonGroupMenu from "./buttonGroupMenu";
import MenuSearchBar from "./menuSearchBar";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const MenuBar = () => {
  const [search, setSearch] = useState(false);
  const queryClient = new QueryClient();
  const handleSearch = () => {
    setSearch(!search);
  };

  return (
    <div className="inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-10 mx-auto flex items-center justify-start pl-4">
        {search ? (
          <button onClick={handleSearch} className="px-2">
            <Icons.back className="mr-2 h-4 w-4" />
          </button>
        ) : (
          <ButtonGroupMenu />
        )}
        <QueryClientProvider client={queryClient}>
          {search ? <MenuSearchBar /> : null}
        </QueryClientProvider>

        <div className="w-min flex justify-end items-center z-0 pr-4">
          {search ? null : (
            <button onClick={handleSearch}>
              <Icons.search className="relative border-r-5 h-6 w-6" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
