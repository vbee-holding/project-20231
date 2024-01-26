"use client";
import * as React from "react";
import { Icons } from "./icons";
import ButtonGroupMenu from "./buttonGroupMenu";
import SearchBar from "./searchBar";
import axios from "@/utils/axios";
import { useRouter} from "next/navigation";
import { debounce } from "@mui/material";

const MenuBar = () => {
  const [search, setSearch] = React.useState(false);
  const [searchContent, setSearchContent] = React.useState("");
  const [options, setOptions] = React.useState([]);
  const router = useRouter();

  const handleSearch = () => {
    setSearch(!search);
  };

  const confirmSearch = async () => {
    if (searchContent) router.push("/r/search/?text=" + searchContent);
    setSearch(!search);
  };

  const handleInput = async (e) => {
    setSearchContent(e);
    axios
      .get("threads/search", {
        params: {
          text: e,
        },
      })
      .then((response) => setOptions(response.data.threads))
      .catch(() => setOptions([]));  
  };

  const handleCancel = () => {
    setSearchContent("");
    setOptions([]);
  };

  return (
    <div className="inset-x-0 h-fit bg-zinc-100 border-b border-zinc-300 z-[10] py-2">
      <div className="container max-w-7xl h-10 mx-auto flex items-center justify-between gap-2 px-4">
        {search ? (
          <button onClick={handleSearch}>
            <Icons.back className="mr-2 h-4 w-4" />
          </button>
        ) : (
          <ButtonGroupMenu />
        )}

        <div
          className={
            search ? "flex justify-center items-center w-full" : "hidden"
          }
        >
          <SearchBar
            value={searchContent}
            className="w-full py-0 outline-none focus:border-none focus:outline-none"
            onChange={handleInput}
            onClick={handleSearch}
            onSearch={confirmSearch}
            onCancelResearch={handleCancel}
            disabled={!search}
            options={options}
          />
        </div>

        <div className="w-min flex justify-end items-center z-0">
          <button onClick={search ? confirmSearch : handleSearch}>
            <Icons.search className="relative border-r-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuBar;
