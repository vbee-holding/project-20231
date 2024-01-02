"use client";
import * as React from "react";
import { Icons } from "./icons";
import SearchBar from "@mkyy/mui-search-bar";
import ButtonGroupMenu from "./buttonGroupMenu";
import { TextField } from "@mui/material";

const MenuBar = () => {
  const [search, setSearch] = React.useState({
    isSearching: false,
    searchContent: "Search",
  });

  const handleSearch = () => {
    setSearch({
      ...search,
      isSearching: !search.isSearching,
    });
  };

  const handleSearching = (e) => {
    console.log(e.target.value);
    setSearch({
      searchContent: e,
      isSearching: !search.isSearching,
    });
  };

  const handleInput = (e) => {
    console.log(e.target.value);
    setSearch({
      searchContent: e,
    });
  };

  return (
    <div className="inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      {search.isSearching ? (
        <div className="grid grid-cols-11 items-center px-4">
          <button onClick={handleSearch}>
            <Icons.back className="mr-2 h-4 w-4" />
          </button>

          <div className="col-span-9">
            <SearchBar
              className="w-full"
              onChange={() => handleInput}
            />
          </div>
          <div className="flex justify-end items-center">
            <button onClick={handleSearching}>
              <Icons.search className="relative w-300 h-40 border-r-5 bg-" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-11 items-center px-4">
          <ButtonGroupMenu />
          <div className="col-span-3">
            <TextField
              variant="standard"
              className="w-fit"
              onClick={handleSearch}
              placeholder={search.searchContent}
            />
          </div>
          <div className="flex justify-end items-center">
            <button onClick={handleSearch}>
              <Icons.search className="relative w-300 h-40 border-r-5 bg-" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
