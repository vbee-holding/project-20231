"use client";
import MenuBar from "@/components/menuBar";
import Post from "@/components/post";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Loader from "@/components/loader";

const Trending = () => {
  const [items, setItems] = useState([]);
  const [loadedAxios, SetLoaded] = useState(false)
  useEffect(() => {
    axios
      .get("trending/threads")
      .then((response) => {
        setItems(response.data.hotThreads);
        SetLoaded(true)
      })
      .catch((error) => console.log(error));
  }, []);
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
        overView={item.content}
        comment={item.totalReplies}
        view={item.views}
        threadId={item.threadId}
        />
      ))}
      {items.length === 0 && loadedAxios
      && <p className="text-center mt-5">Không có bài viết nào</p>
      }
      {items.length === 0 && !loadedAxios
      && <Loader />
      }
    </div>
  );
};
export default Trending;
