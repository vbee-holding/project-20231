"use client";
import * as React from "react";
import { Icons } from "./icons";
import ButtonGroupMenu from "./buttonGroupMenu";
import SearchBar from "./ui/searchBar";
import axios from "axios";

const MenuBar = () => {
  const [search, setSearch] = React.useState({
    isSearching: false,
    searchContent: "",
  });

  const [option, setOption] = React.useState({
    isSearching: false,
    searchContent: "",
  });

  const searching = () => {
    axios
    .get("/threads/search", {
      params: {
        Text: search.searchContent,
      },
    })
    .then((res) => {
    })
    .catch((err) => console.log(err));
  }


  const handleSearch = () => {
    setSearch({
      ...search,
      isSearching: !search.isSearching,
    });
  };

  const confirmSearch = () => {
    setSearch({
      ...search,
      isSearching: !search.isSearching,
    });
  };

  const handleInput = (e) => {
    setSearch({
      ...search,
      searchContent: e,
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
        {search.isSearching ? (
          <button onClick={handleSearch}>
            <Icons.back className="mr-2 h-4 w-4" />
          </button>
        ) : (
          <ButtonGroupMenu />
        )}

        <div
          className={
            search.isSearching
              ? "flex justify-end items-center col-span-9"
              : "flex justify-end items-center col-span-3"
          }
        >
          <SearchBar
            value={search.searchContent}
            className="w-full py-0 outline-none focus:border-none focus:outline-none"
            onChange={handleInput}
            onSearch={confirmSearch}
            onCancelResearch={handleCancel}
            onClick={handleSearch}
            disabled={!search.isSearching}
          />
        </div>

        <div className="flex justify-end items-center">
          <button onClick={search.isSearching ? confirmSearch : handleSearch}>
            <Icons.search className="relative border-r-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
