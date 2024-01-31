"use client";
import MenuBar from "@/components/menuBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "@/utils/axios";
import Loader from "@/components/loader";

const Item = (props) => {
  return (
    <div className="flex-column items-center pl-8 mb-7 mx-2 overflow-hidden float-left ">
      <Link href= {`/r/topic-detail/${props.topic}`}>
        <div>
          <div
            className="flex flex-col justify-center w-[145px] h-[90px] bg-zinc-300 rounded-[5px] border border-black color-inherit decoration-none outline-none;"
          >
            <h2 className="text-l text-gray-800 mt-1 font-bold cursor-pointer text-center color-inherit decoration-none outline-none">
              {props.topic}
            </h2>
            <h2 className="text-0.5 mb-0.5 text-gray-800 cursor-pointer text-center">
              {`${props.amount} bài viết`}
            </h2>
          </div>
        </div>
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
        setItems(response.data);
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
      {items.length === 0 && loadedAxios ? (
        <p className="text-center mt-5">Không có chủ đề nào</p>
      ) : (
        <div>
          {items.map((child, index) => (
            <Item
              key={index}
              topic={child.tag}
              amount={child.threadCount}
            />
          ))}
        </div>
      )}
      {items.length === 0 && !loadedAxios && <Loader />}
    </div>
  );
};
export default HotTrendTopics;
