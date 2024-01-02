"use client";
import * as React from "react";
import { Icons } from "./icons";
import ButtonGroupMenu from "./buttonGroupMenu";
import { TextField } from "@mui/material";
import SearchBar from "./ui/searchBar";
import { useRouter } from "next/navigation";

const MenuBar = () => {
  const [search, setSearch] = React.useState({
    isSearching: false,
    searchContent: "",
  });

  const handleSearch = () => {
    setSearch({
      ...search,
      isSearching: !search.isSearching,
    });
  };

  const handleSearching = () => {
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
      {search.isSearching ? (
        <div className="grid grid-cols-11 items-center px-4">
          <button onClick={handleSearch}>
            <Icons.back className="mr-2 h-4 w-4" />
          </button>

          <div className="col-span-9">
            <SearchBar
              value={search.searchContent}
              className="w-full"
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
      ) : (
        <div className="grid grid-cols-11 items-center px-4">
          <ButtonGroupMenu />
          <div className="col-span-3">
            <TextField
              variant="standard"
              className="w-fit text-xs"
              onClick={handleSearch}
              placeholder={search.searchContent}
            />
          </div>
          <div className="flex justify-end items-center">
            <button onClick={handleSearch}>
              <Icons.search className="relative w-300 h-40 border-r-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBar;
