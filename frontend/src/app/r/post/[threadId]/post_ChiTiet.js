'use client'
import Image from "next/image";
import ToggleButton from "./togglebutton";
import { useRouter } from "next/navigation"; // Import the useRouter hook
import TimeAgo from "@/components/timeago";
import { Icons } from "@/components/icons";
import { Element, animateScroll } from 'react-scroll';
import { useState,useEffect } from "react";
const Post_ChiTiet = (props) => {
  const router = useRouter(); 
  const handleBack = () => {
    router.back(); 
  };

  //Thêm "https://voz.vn" vào đường dẫn hình ảnh
  const addVozProxy = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    // Lấy img từ html
    const imgElements = doc.querySelectorAll('img');

    // Duyệt và thêm "https://voz.vn" 
    imgElements.forEach((imgElement) => {
      const currentSrc = imgElement.getAttribute('src');
      if (currentSrc && currentSrc.includes('/proxy.php?')) {
        const newSrc = `https://voz.vn${currentSrc}`;
        imgElement.setAttribute('src', newSrc);
      }
    });

    const updatedHtmlString = new XMLSerializer().serializeToString(doc);
    return updatedHtmlString;
  };

  const updatedHtml = addVozProxy(props.overView);

  return (
    <div>
      <div className="max-w-2xl p-3 mx-auto">
        <button
              className="flex items-center  text-black px-3 my-1 mx-1 rounded-full focus:outline-none hover:bg-stone-100 transition"
              onClick={handleBack}
            >
              <Icons.back className="mr-2 h-4 w-4"/>
              <div>

              </div>
              <span className="text-lg">Quay lại</span>
          </button>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
            {props.linkImg.startsWith("https://") ? (
              <Image
                className="cursor-pointer rounded-full"
                src={props.linkImg}
                alt="avatar"
                width={48}
                height={48}
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-700 flex justify-center items-center">
                <p className="font-bold text-lg text-white">{props.linkImg}</p>
              </div>
            )}
              <div className="flex flex-col ml-2">
                <p className="font-bold cursor-pointer hover:underline">
                  {props.name}
                </p>
                <p>
                  <TimeAgo created={props.created} />
                </p>
              </div>
            </div>
            <div className="flex flex-col ">
              <p className="mb-2">Đọc Nhanh</p>
              <ToggleButton threadId={props.id} />
            </div>
          </div>
        <div>
          <h1 className="font-bold text-3xl my-2">{props.title}</h1>
        </div>
        <div>
        <h1 className="font-normal text-sm my-2" dangerouslySetInnerHTML={{ __html: updatedHtml }} />
        </div>
        <div className="flex mt-2">
          <div className="flex items-center  bg-neutral-200 mr-4 py-1 px-2 rounded-3xl cursor-pointer">
            <Icons.comment className="mr-1"/>
            <p className="text-sm">{`${props.comment} Bình luận`}</p>
          </div>
          <div className="flex items-center  bg-neutral-200 mr-4 py-1 px-2 rounded-3xl cursor-pointer">
            <Icons.eye className="mr-1"/>
            <p className="text-sm">{`${props.view} Lượt xem`} </p>
          </div>
        </div>

      </div>
      <div className="bg-gray-400 h-0.5 max-w-xl mx-auto"></div>

  </div>

  );
};

export default Post_ChiTiet;
