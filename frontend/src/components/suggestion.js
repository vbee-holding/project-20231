import Image from "next/image";

const Suggestion = (props) => {
  return (
    <div className="grid grid-cols-8 items-center px-4 flex-none space-x-4 border-b border-black">
      {props.linkImg.startsWith("https://") ? (
        <Image
          className="cursor-pointer rounded-full"
          src={props.linkImg}
          alt="avatar"
          width={48}
          height={48}
        />
      ) : (
        <div className="w-9 h-9 rounded-full bg-blue-700 flex justify-center items-center">
          <p className="font-bold text-lg text-white">{props.linkImg}</p>
        </div>
      )}
      <div className=" col-span-7">
        {props.name && <p className="font-medium">{props.name}</p>}
        {props.title && (
          <p className="truncate text-sm text-muted-foreground">
            {props.title}
          </p>
        )}
      </div>
    </div>
  );
};
export default Suggestion;
