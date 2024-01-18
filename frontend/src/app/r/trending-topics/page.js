import MenuBar from "@/components/menuBar";
import Link from "next/link";

const Item = ({ title }) => {
  return (
    <div className="flex-column items-center pl-8 mb-1 mx-2 overflow-hidden float-left ">
      <Link href="./trending-topics-detail">
        <div>
          <div className="w-[143px] h-[87px] bg-zinc-300 rounded-[5px] border border-black color-inherit decoration-none outline-none;" />
          <h2 className="text-xl text-gray-800 mt-1 font-bold cursor-pointer text-center color-inherit decoration-none outline-none">
            {title}
          </h2>
        </div>
        <h2 className="text-0.5 mb-0.5 text-gray-800 cursor-pointer text-center">
          10 bài viết{" "}
        </h2>
      </Link>
    </div>
  );
};

const TrendingTopics = () => {
  const datas = [
    {
      id: 1,
      title: "Game",
    },
    {
      id: 2,
      title: "Space",
    },
    {
      id: 3,
      title: "Art",
    },
    {
      id: 4,
      title: "Weather",
    },
    {
      id: 5,
      title: "Black Friday",
    },
    {
      id: 6,
      title: "Sport",
    },
  ];
  return (
    <div>
      <MenuBar />
      <div className="flex items-left max-w-md mx-auto">
        <h1 className="text-4xl text-gray-800 font-extrabold text-left m-7">
          Topics
        </h1>
        <div className="bg-gray-400 h-0.5 grow mt-12"></div>
      </div>
      <div>
        {datas.map((child) => (
          <Item key={child.id} title={child.title} />
        ))}
      </div>
    </div>
  );
};
export default TrendingTopics;
