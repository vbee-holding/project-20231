

import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post_ChiTiet from '../post_ChiTiet/post_ChiTiet';
import Link from 'next/link'
import { comment } from "postcss";
import Replies from "../post_ChiTiet/replies"


export default function Home() {
  const datas = [
    {
      id: 1,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới Học hỏi, mmds",
      view: 50,
      comments : 11,
    },

  ];
  const replies= [
    {
        id: 1, content: "This is a comment", user: "admin" ,
    },
    {
      id: 11, content: "Comment 1", user: "user1" ,
    },
    {
      id: 2, content: "Comment 2", user: "user2" ,
    },
    {
        id: 3, content: "Comment 3", user: "user3" ,
    },
    {
      id: 4, content: "Comment 4", user: "user4" ,
    },
    {
      id: 5, content: "Comment 5", user: "user5" ,
    },
    {
      id: 6, content: "Comment 6", user: "user6" ,
    },
    {
      id: 7, content: "Comment 7", user: "user7" ,
    },
    {
      id: 8, content: "Comment 8", user: "user8" ,
    },
    {
      id: 9, content: "Comment 9", user: "user9" ,
    },
    {
      id: 10, content: "Comment 10", user: "user10" ,
    },


      ];


  return (
    <main>
      <div>
        {datas.map((item) => (
          <div key={item.id}>
            <Post_ChiTiet
              linkImg={item.linkImg}
              name={item.name}
              created={item.created}
              title={item.title}
              overView={item.overView}
              comments={item.comments}
              view={item.view}
            />
          </div>
        ))}
        
        {replies.map((key) => (
          <div key={key.id}>
            <Replies
              user={key.user}
              content={key.content}
            />
          </div>
        ))}
      </div>

    </main>
  );
};
