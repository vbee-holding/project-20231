import {
  faComment,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Item = (props) => {
  return (
    <div
      className="flex items-center 
      bg-neutral-200
      mr-4 py-1 px-2 
      rounded-3xl cursor-pointer"
    >
      <FontAwesomeIcon
        icon={props.icon}
        style={{
          color: "black",
          width: 20,
          height: 20,
          marginRight: 4,
          color: "#33363F",
        }}
      />
      <p className="text-sm">{`${props.amout} ${props.text}`}</p>
      {/* {props.amout && <p className="inline">{props.amout}</p>}
      {props.text && <p className="inline">{`${props.text}`}</p>} */}
    </div>
  );
};
const Post = (props) => {
  return (
    <div>
      <div className="max-w-2xl p-4 mx-auto">
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
          <Item icon={faComment} amout={props.view} text="comments"/>
          <Item icon={faEye} amout={props.like} text="views" />
        </div>
      </div>
      <div className="bg-gray-400 h-0.5 max-w-2xl mx-auto"></div>
    </div>
  );
};
export default Post;
