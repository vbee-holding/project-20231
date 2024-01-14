"use client";
import Post from "@/components/post";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/loader";
import MenuBar from "@/components/menuBar";

export default function Home() {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    axios
      .get("threads")
      .then((res) => setItems(res.data.threads))
      .catch((err) => console.log(err));
  }, []);

  const fetchMoreData = () => {
    axios
      .get("threads", {
        params: {
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
      <MenuBar/>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={fetchMoreData ? <Loader /> : null}
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
  );
}
