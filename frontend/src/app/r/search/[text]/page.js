"use client";
import Post from "@/components/post";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/loader";
import MenuBar from "@/components/menuBar";
import { usePathname } from "next/navigation";

const Search = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const pathname = usePathname();
  const searchContent = pathname.split("/")[3];

  useEffect(() => {
    console.log(searchContent);
    axios
      .get("threads/search", {
        params: {
          text: searchContent,
        },
      })
      .then((res) => setItems(res.data.threads))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get("threads", {
        params: {
          text: searchContent,
          page: index,
        },
      })
      .then((res) => {
        setItems((prevItems) => [...prevItems, ...res.data.threads]);

        res.data.threads.length > 0 ? setHasMore(true) : setHasMore(false);
      })
      .catch((err) => console.log(err));

    setIndex((prevIndex) => prevIndex + 1);
  };

  return (
    <div>
      <MenuBar />
      {items.length > 0 ? (
        <div className="flex flex-col space-y-2 pt-2">
          <h1 className="px-4 text-2xl font-semibold tracking-tight">
            Results for " {searchContent} "
          </h1>
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<Loader />}
          >
            {items.map((item, index) => (
              <Post
                key={index}
                linkImg={item.avatarUrl}
                name={item.author}
                created={item.createdTime}
                title={item.title}
                overView={item.content}
                comment={item.totalReplies}
                view={item.views}
                // like={item.like}
              />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <div className="absolute inset-0">
          <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                We couldn't find the result
              </h1>
              <p className="text-sm max-w-xs mx-auto">
                Please double check your keyword
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
