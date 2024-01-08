"use client";
import MenuBar from "@/components/menuBar";
import Post from "@/components/post";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";

const Trending = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    axios
      .get("threads/hot-trend-threads")
      .then((response) => {
        setItems(response.data.topThreads);
      })
      .catch((error) => console.log(error));
  }, []);
  // Ham lay ra 20 chu cai dau tien
  const truncate = (str) => {
    const words = str.split(" ");
    if (words.length <= 20) {
      return str;
    } else {
      const truncatedWords = words.slice(0, 20);
      return `${truncatedWords.join(" ")}...`;
    }
  };
  return (
    <div>
      <MenuBar />
      {items.map((item, index) => (
        <Post
          key={index}
          linkImg={item.avatarUrl}
          name={item.author}
          created={item.createdTime}
          title={item.title}
          // overView={truncate(item.replys[0].content)}
          comment={item.totalReplies}
          view={item.views}
          // like={item.like}
        />
      ))}
    </div>
  );
};
export default Trending;
