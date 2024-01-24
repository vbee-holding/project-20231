"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Post from "@/components/post";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/loader";
import MenuBar from "@/components/menuBar";
import NotFound from "@/components/notFound";

const Search = ({ params }) => {
  const pathname = usePathname();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const searchParams = useSearchParams();
  const searchContent = searchParams.get("text");

  useEffect(() => {
    axios
      .get("/threads/search", {
        params: {
          text: searchContent,
        },
      })
      .then((res) => setItems(res.data.threads))
      .catch((err) => console.log(err));
  }, [pathname, searchParams]);

  const fetchMoreData = () => {
    axios
      .get("threads/search", {
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
                threadId={item.threadId}
                // like={item.like}
              />
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <NotFound />
      )}
    </div>
  );
};
export default Search;
