"use client"
import Post_ChiTiet from './post_ChiTiet';
import axios from "@/utils/axios";
import { useEffect,useState } from 'react';
import CallReplies from './call_data_replies';

const Home = ({ params }) => {
  //Lấy dữ liệu bài viết
  const [items, setItems] = useState([]);
  // const [replies, setReplies] = useState([]);
  
  useEffect(() => {
    axios.get(`/threads/${params.threadId}`)
      .then((res) => {
        setItems(res.data)
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
    }, []);
  
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
              comment={items.totalReplies }
              view={items.views}
              id={items.threadId}
            />
            
            )}
            <CallReplies 
              threadId={params.threadId} 
              // totalReplies={items.totalReplies} 
            />
        </div>
      </main>
    );
  };
    
export default Home;