"use client"
import Post from "@/components/post";
import { useState } from "react";
import InfiniteScroll from 'react-infinite-scroll-component';

const Trending = () => {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const datas = [
    {
      id: 1,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 2,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 3,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 4,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 5,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 6,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 7,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
  ];
  const [items, setItems] = useState([...datas]);
  const fetchMoreData = () => {
    const newData = [
      {
        id: 8,
        linkImg: "/assets/images/avatarIcon.png",
        name: "thuyvan",
        created: "7/12/2023",
        title: "InfiniteScroll !",
        overView:
          "Cuộn trang vô hạn",
        comment: 50,
        view: 50,
        like: 50,
      },
      {
        id: 9,
        linkImg: "/assets/images/avatarIcon.png",
        name: "thuyvan",
        created: "7/12/2023",
        title: "InfiniteScroll !",
        overView:
          "Cuộn trang vô hạn",
        comment: 50,
        view: 50,
        like: 50,
      },
      {
        id: 10,
        linkImg: "/assets/images/avatarIcon.png",
        name: "thuyvan",
        created: "7/12/2023",
        title: "InfiniteScroll !",
        overView:
          "Cuộn trang vô hạn",
        comment: 50,
        view: 50,
        like: 50,
      },
      {
        id: 11,
        linkImg: "/assets/images/avatarIcon.png",
        name: "thuyvan",
        created: "7/12/2023",
        title: "InfiniteScroll !",
        overView:
          "Cuộn trang vô hạn",
        comment: 50,
        view: 50,
        like: 50,
      },
      {
        id: 12,
        linkImg: "/assets/images/avatarIcon.png",
        name: "thuyvan",
        created: "7/12/2023",
        title: "InfiniteScroll !",
        overView:
          "Cuộn trang vô hạn",
        comment: 50,
        view: 50,
        like: 50,
      },
    ]

    if (newData.length === 0) {
      setHasMore(false);
    } else {
      setItems([...items, ...newData]);
      setPage(page + 1);
    }
  };
  return (
    <div>
      <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
      endMessage={
        <p style={{ textAlign: 'center' }}>
          <b>Yay! You have seen it all</b>
        </p>
      }
      >
        {items.map((item) => (
          <Post
            key={item.id}
            linkImg={item.linkImg}
            name={item.name}
            created={item.created}
            title={item.title}
            overView={item.overView}
            comment={item.comment}
            view={item.view}
            like={item.like}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};
export default Trending;
