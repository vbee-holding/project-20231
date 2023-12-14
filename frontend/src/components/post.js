import {
  faCommentDots,
  faEllipsis,
  faEye,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Item = (props) => {
  return (
    <div
      className="flex items-center 
      bg-neutral-300 
      mr-4 py-1 px-2 
      rounded-3xl cursor-pointer 
    hover:bg-neutral-400"
    >
      <FontAwesomeIcon
        icon={props.icon}
        style={{
          color: "black",
          width: 30,
          height: 30,
          marginRight: 8,
          color: "#33363F",
        }}
      />
      {props.amout && <p>{props.amout}</p>}
      {props.text && <p>{props.text}</p>}
    </div>
  );
};
const Post = (props) => {
  return (
    <div className="max-w-2xl p-4 pb-0 mx-auto">
      <div className="bg-gray-400 h-1 mb-2"></div>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Image
            className="cursor-pointer"
            src={props.linkImg}
            alt="avatar"
            width={60}
            height={60}
          />
          <p className="font-bold mx-2 cursor-pointer hover:underline">
            {props.name}
          </p>
          <p>{props.created}</p>
        </div>
        <div className="flex items-center bg-white hover:bg-gray-400 p-2 
        rounded-full cursor-pointer">
          <FontAwesomeIcon
            icon={faEllipsis}
            style={{ width: 20 }}
          />
        </div>
      </div>
      <div>
        <h1 className="font-bold text-3xl my-2">{props.title}</h1>
        <div>
          <p className="inline">{props.overView}</p>
          <span className="inline font-bold cursor-pointer hover:underline">
            ... More
          </span>
        </div>
      </div>
      <div className="flex mt-2">
        <Item icon={faCommentDots} amout={props.comment} />
        <Item icon={faEye} amout={props.view} />
        <Item icon={faShare} text="Share" />
      </div>
    </div>
  );
};
export default Post;
