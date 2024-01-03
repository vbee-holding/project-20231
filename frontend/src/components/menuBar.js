"use client";
import * as React from "react";
import { Icons } from "./icons";
import ButtonGroupMenu from "./buttonGroupMenu";
import SearchBar from "./ui/searchBar";

const MenuBar = () => {
  const [search, setSearch] = React.useState({
    isSearch: false,
    searchContent: "",
  });

  const handleSearch = () => {
    setSearch({
      ...search,
      isSearch: !search.isSearch,
    });
  };

  const handleSearching = () => {
    setSearch({
      ...search,
      isSearch: !search.isSearch,
    });
  };

  const handleInput = (e) => {
    setSearch({
      ...search,
      searchContent: e,
      isSearch: true,
    });
  };

  const handleCancel = () => {
    setSearch({
      ...search,
      searchContent: "",
    });
  };

  return (
    <div className="inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="grid grid-cols-11 items-center px-4 flex-none">
        {search.isSearch ? (
          <button onClick={handleSearch}>
            <Icons.back className="mr-2 h-4 w-4" />
          </button>
        ) : (
          <ButtonGroupMenu />
        )}

        <div className={search.isSearch ? "col-span-9" : "col-span-3"}>
          <SearchBar
            value={search.searchContent}
            className="w-full py-0"
            onChange={handleInput}
            onSearch={handleSearching}
            onCancelResearch={handleCancel}
          />
        </div>

        <div className="flex justify-end items-center">
          <button onClick={handleSearching}>
            <Icons.search className="relative w-300 h-40 border-r-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
