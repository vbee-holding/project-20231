import Image from "next/image";
import { Icons } from "./icons";
import Link from "next/link";
import TimeAgo from "./timeago";

const Item = (props) => {
  return (
    <div
      className="flex items-center 
      bg-neutral-100
      mr-4 py-1 px-2 
      rounded-3xl cursor-pointer"
    >
      {props.src == "eye" ? <Icons.eye width={20} height={20} /> : null}
      {props.src == "comment" ? <Icons.comment width={20} height={20} /> : null}
      <p className=" ml-2 text-sm">{`${props.amout} ${props.text}`}</p>
    </div>
  );
};
const Post = (props) => {
  return (
    <Link href={`/r/post/${props.threadId}`}>
      <div className="max-w-2xl p-4 mx-auto hover:bg-neutral-50 active:bg-neutral-100 cursor-pointer">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {props.linkImg.startsWith("https://") ? (
              <Image
                className="cursor-pointer rounded-full"
                src={props.linkImg}
                alt="avatar"
                width={40}
                height={40}
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-700 flex justify-center items-center">
                <p className="font-bold text-lg text-white">{props.linkImg}</p>
              </div>
            )}
            <div className="flex flex-col ml-2">
              <p className="font-bold mx-2">{props.name}</p>
              <p className="mx-2">
                <TimeAgo created={props.created} />
              </p>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-semibold text-base md:text-lg my-2">
            {props.title}
          </h1>
          <div>
            <p className="inline text-sm">{props.overView}</p>
          </div>
        </div>
        <div className="flex mt-2">
          <Item src="comment" amout={props.comment} text="bình luận" />
          <Item src="eye" amout={props.view} text="lượt xem" />
        </div>
      </div>
      <hr className="max-w-2xl mx-auto border-0 border-b-sm border-solid border-b-gray-300" />
    </Link>
  );
};
export default Post;
