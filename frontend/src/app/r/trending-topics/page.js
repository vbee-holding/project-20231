"use client";
import MenuBar from "@/components/menuBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";

const Item = (props) => {
  return (
    <div className="flex-column items-center pl-8 mb-7 mx-2 overflow-hidden float-left ">
      <Link href="./trending-topics-detail">
        <div>
          <div className="w-[143px] h-[87px] bg-zinc-300 rounded-[5px] border border-black color-inherit decoration-none outline-none;" />
          <h2 className="text-xl text-gray-800 mt-1 font-bold cursor-pointer text-center color-inherit decoration-none outline-none">
            {props.topic}
          </h2>
        </div>
        <h2 className="text-0.5 mb-0.5 text-gray-800 cursor-pointer text-center">
          {`${props.amount} bài viết`}
        </h2>
      </Link>
    </div>
  );
};

const HotTrendTopics = () => {
  const [items, setItems] = useState([]);
  const [loadedAxios, SetLoaded] = useState(false)
  useEffect(() => {
    axios
      .get("trending/topics")
      .then((response) => {
        setItems(response.data.trendingTopic);
        SetLoaded(true)
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <MenuBar />
      <div className="flex items-left max-w-md mx-auto">
        <h1 className="text-4xl text-gray-800 font-extrabold text-left m-7">
          Topics
        </h1>
        <div className="bg-gray-400 h-0.5 grow mt-12"></div>
      </div>
      <div>
        {items.map((child, index) => (
          <Item
            key={index}
            topic={child.tag}
            amount={child.threadCount}
          />
        ))}
      </div>
    </div>
  );
};
export default HotTrendTopics;
