"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SearchBar from "./searchBar";
import debounce from "lodash.debounce";
import axios from "@/utils/axios";
import { Icons } from "./icons";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";

const MenuSearchBar = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchContent, setSearchContent] = useState("");
  const router = useRouter();

  useEffect(() => {
    setSearchContent("");
  }, [pathname, searchParams]);

  const request = debounce(async () => {
    refetch();
  },250);

  const debounceRequest = useCallback(() => {
    request();
  }, []);

  const { data: queryResults, refetch } = useQuery({
    queryFn: async () => {
      if (!searchContent) return [];
      const data = await axios.get("threads/search", {
        params: {
          text: searchContent,
        },
      });
      return data.data.threads;
    },
    queryKey: ["search-query"],
    enabled: false,
  });

  const confirmSearch = async () => {
    if (searchContent) router.push("/r/search/?text=" + searchContent);
    router.refresh;
  };

  const handleCancel = () => {
    setSearchContent("");
  };

  return (
    <div className="container w-full flex items-center justify-center">
      <SearchBar
        value={searchContent}
        className="w-full py-0 outline-none focus:border-none focus:outline-none rounded-full"
        onChange={(e) => {
          setSearchContent(e);
          debounceRequest();
        }}
        onSearch={confirmSearch}
        onCancelResearch={handleCancel}
        options={queryResults}
      />
      <div className="w-min flex justify-end items-center z-0">
        <button onClick={confirmSearch}>
          <Icons.search className="relative border-r-5 h-6 w-6" />
        </button>
      </div>
    </div>
  );
};

export default MenuSearchBar;
