import { faComment, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const Item = (props) => {
  return (
    <div
      className="flex items-center 
      bg-neutral-100
      mr-4 py-1 px-2 
      rounded-3xl cursor-pointer"
    >
      {/* <FontAwesomeIcon
        icon={props.icon}
        style={{
          color: "black",
          width: 20,
          height: 20,
          marginRight: 4,
          color: "#33363F",
        }}
      /> */}
      <Image src={props.src} alt="eye" width={20} height={20} />
      <p className=" ml-2 text-sm">{`${props.amout} ${props.text}`}</p>
      {/* {props.amout && <p className="inline">{props.amout}</p>}
      {props.text && <p className="inline">{`${props.text}`}</p>} */}
    </div>
  );
};
const Post = (props) => {
  function formatTimeDifference(isoTimeString) {
    const inputDate = new Date(isoTimeString);
    const currentDate = new Date();

    const timeDifferenceInMilliseconds = currentDate - inputDate;
    const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;

    if (timeDifferenceInSeconds < 3600) {
      // Nếu thời gian chênh lệch < 1 giờ, trả về số phút
      const minutes = Math.floor(timeDifferenceInSeconds / 60);
      return `${minutes} phút`;
    } else if (timeDifferenceInSeconds < 86400) {
      // Nếu thời gian chênh lệch < 1 ngày, trả về số giờ
      const hours = Math.floor(timeDifferenceInSeconds / 3600);
      return `${hours} giờ`;
    } else {
      // Nếu thời gian chênh lệch >= 1 ngày, trả về định dạng ngày/tháng/năm
      const options = { year: "numeric", month: "numeric", day: "numeric" };
      return inputDate.toLocaleDateString("vi-VN", options);
    }
  }
  return (
    <div>
      <div className="max-w-2xl p-4 mx-auto">
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

            <p className="font-bold mx-2 cursor-pointer hover:underline">
              {props.name}
            </p>
            <p className="text-sm">{formatTimeDifference(props.created)}</p>
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
          <Item
            // icon={faComment}
            src="/comment.svg"
            amout={props.comment}
            text="bình luận"
          />
          <Item
            // icon={faEye}
            src="/eye.svg"
            amout={props.view}
            text="lượt xem"
          />
        </div>
      </div>
      <hr className="max-w-2xl mx-auto border-0 border-b-sm border-solid border-b-gray-300" />
    </div>
  );
};
export default Post;
