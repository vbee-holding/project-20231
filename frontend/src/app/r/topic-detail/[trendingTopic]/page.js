"use client";
import Post from "@/components/post";
import MenuBar from "@/components/menuBar";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";
import axios from "@/utils/axios";

const TrendingTopicDetail = ({ params }) => {
  const [items, setItems] = useState([]);
  const [loadedAxios, SetLoaded] = useState(false);
  useEffect(() => {
    axios
      .get(`trending/topics/${params.trendingTopic}`)
      .then((response) => {
        setItems(response.data.topicThreads);
        SetLoaded(true);
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <MenuBar />
      {items.length > 0 && (
        <>
          <div className="my-3">
            <h1 className="max-w-2xl mx-auto pl-4 font-bold text-2xl md:text-3xl">
              {decodeURIComponent(params.trendingTopic)}
            </h1>
          </div>
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
        </>
      )}

      {items.length === 0 && loadedAxios && (
        <p className="text-center mt-5">Không có bài viết nào</p>
      )}
      {items.length === 0 && !loadedAxios && <Loader />}
    </div>
  );
};
export default TrendingTopicDetail;
