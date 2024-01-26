"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Post from "@/components/post";
import { Suspense, useEffect, useState } from "react";
import axios from "@/utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/loader";
import MenuBar from "@/components/menuBar";
import NotFound from "@/components/notFound";
import SearchFilter from "@/components/searchFilter";

const Search = ({ params }) => {
  const pathname = usePathname();
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  const [onQuery, setOnQuery] = useState(true);
  const searchParams = useSearchParams();
  const searchContent = searchParams.get("text");
  const searchOrder = searchParams.get("order");

  useEffect(() => {
    axios
      .get("/threads/search", {
        params: {
          text: searchContent,
          order: searchOrder,
        },
      })
      .then((res) => setItems(res.data.threads))
      .catch((err) => console.log(err))
      .finally(() => setOnQuery(false));
  }, [pathname, searchParams]);

  const fetchMoreData = () => {
    axios
      .get("threads/search", {
        params: {
          text: searchContent,
          order: searchOrder,
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

  function SearchBarFallback() {
    return <></>
  }

  return (
    <div>
      <MenuBar />
      {items.length > 0 ? (
        <div className="flex flex-col space-y-2 pt-2">
          <Suspense fallback={<SearchBarFallback />}>
            <h1 className="px-4 text-2xl font-semibold tracking-tight">
              Results for " {searchContent} "
            </h1>
          </Suspense>

          <SearchFilter />
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
              />
            ))}
          </InfiniteScroll>
        </div>
      ) : !onQuery ? (
        <NotFound />
      ) : (
        <Loader />
      )}
    </div>
  );
};
export default Search;
