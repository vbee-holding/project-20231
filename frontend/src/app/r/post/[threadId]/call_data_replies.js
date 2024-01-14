import React, { useEffect, useState } from "react";
import axios from "@/utils/axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from "@/components/loader";
import Replies from "./replies";

export default function CallReplies( params) {

  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    axios.get(`/threads/${params.threadId}/replies`)
      .then((res) => {
        setItems(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

const fetchMoreData = () => {
  axios
    .get(`/threads/${params.threadId}/replies`, {
      params: {
        page: index,
      },
    })
    .then((res) => {
        const newReplies = res.data.replies;

        if (newReplies.length > 0) {
          if (newReplies.length < 10) {
            newReplies.pop();
            setHasMore(false);
          }
        
          setItems((prevItems) =>
            Array.isArray(prevItems)
              ? [...prevItems, ...newReplies.slice(0, 10)] 
              : newReplies.slice(0, 10)
          );
        
          setIndex((prevIndex) => prevIndex + 1);
        } else {
          setHasMore(false);
        }
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
    });
};


  return (
    <div>
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={hasMore ? <Loader /> : null} 
      >
        {Array.isArray(items) && items.map((item,index) => (
          <Replies
            key={`replies_${item.id || index}`}
            linkImg={item.avatarUrl}
            name={item.author}
            created={item.createdTime}
            overView={item.content}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}
