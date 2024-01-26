"use client"
import Post_TomTat from '../[threadId_summary]/post_TomTat'
import Summary from '../[threadId_summary]/summary'
import { useEffect,useState } from 'react';
import axios from "@/utils/axios"
   
const Home = ({ params }) => {
        const [items, setItems] = useState({});
        // const [replies, setReplies] = useState([]);
        
        useEffect(() => {

          axios.get(`/threads/${params.threadId_summary}/summary`)
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
                <Post_TomTat
                  linkImg={items.avatarUrl}
                  name={items.author}
                  created={items.createdTime}
                  title={items.title}
                  overView={items.summarizedContent}
                  comment={items.totalReplies }
                  view={items.views}
                  id={items.threadId}
                  
                />         
                )}
                {/* {Object.keys(items).length > 0 && (   */}
                <Summary threadId_summary = {params.threadId_summary}
                //  summarizedRepliesContent={items.summarizedRepliesContent}
                />
            {/* )} */}
            </div>
          </main>
        );
        };
  
  export default Home;