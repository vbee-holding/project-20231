"use client"
import Post_ChiTiet from './post_ChiTiet';
import Replies from "./replies"
import Loader from "@/components/loader";
import axios from "@/utils/axios";
import { useEffect,useState } from 'react';
import { useRouter } from 'next/navigation';
import InfiniteScroll from "react-infinite-scroll-component";
    
const Home = ({ params }) => {
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
          const [items, setItems] = useState([]);
          // const [replies, setReplies] = useState([]);
          
          useEffect(() => {
            console.log(params.threadId)
            axios.get(`/threads/${params.threadId}`)
              .then((res) => {
                console.log('Response data:', res.data);
                setItems(res.data)
              })
              .catch((error) => {
                console.error('Error fetching data:', error);
              });
          }, [params.threadId]);
          
          return (
            <main>
              <div>
                {Object.keys(items).length > 0 && (
                  <Post_ChiTiet
                    linkImg={items.avatarUrl}
                    name={items.author}
                    created={items.createdTime}
                    title={items.title}
                    overView={items.replys.length > 0 ? items.replys[0].content : ""}
                    comment={items.totalReplies}
                    view={items.views}
                    id={items.threadId}
                  />
                  
                  )}
                  {replies.map((reply) => (
                    <div key={reply.id}>
                      <Replies user={reply.user} content={reply.content} />
                    </div>
                ))}
              </div>
            </main>
          );
          };
    
    export default Home;