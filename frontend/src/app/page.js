"use client";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from "@/components/post";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";

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
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<p className="text-center">Loading</p>}
      >
        {items.map((item, index) => (
          <Post
            key={index}
            linkImg={item.avatar_url}
            name={item.author}
            created={item.createdAt}
            title={item.title}
            // overView={item.overView}
            comment={item.total_replies}
            view={item.views}
            // like={item.like}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
