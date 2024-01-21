'use client'
import { useState,useEffect } from "react";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "@/utils/axios"
export default function Summary(props) {
  const [items, setItems] = useState({});
  // const [replies, setReplies] = useState([]);
  
  useEffect(() => {

    axios.get(`/threads/${props.threadId_summary}/replies/summary`)
      .then((res) => {
        setItems(res.data)
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
    return (
      <div>
        <div className="max-w-2xl p-1 mx-auto">
          <div className="bg-amber-200 text-white p-2 rounded-md mt-1 flex items-start mx-1">
            <FontAwesomeIcon icon={faBoltLightning} className="w-5 h-5 " />
            <span className="ml-1 text-xl">Tóm Tắt</span>
          </div>
            <div className= "p-2 rounded-md mt-1 flex items-start mx-1">
                  <h1 className="font-regular  ml-1">{items.summarizedRepliesContent}</h1>
            </div>
        </div>
      </div>
    );
  }
  