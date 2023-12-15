import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Item=({title})=>{
    return(
        <div className="flex items-center pl-8 mb-12 max-w-md mx-auto">
            <div>
                <FontAwesomeIcon
                  icon={faCaretRight}
                  style={{
                    width: 30,
                    height: 30
                  }}
                />
            </div>
            <div>
                <h2 className="text-3xl text-gray-800 font-extrabold mx-4 
                cursor-pointer hover:underline">{title}</h2>
            </div>
            <div className="bg-gray-400 h-0.5 grow"></div>
        </div>
    )
}
const TrendingTopics = () => {
  const datas = [
    {
      id: 1,
      title: "Game",
    },
    {
      id: 2,
      title: "Sport",
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
  ];
  return (
    <div>
      <div>
        <h1 class="text-4xl text-gray-800 font-extrabold text-center my-5">
          Topics
        </h1>
      </div>
      <div>
        {datas.map(child => (
            <Item key={child.id} title={child.title}/>
        ))}
      </div>
    </div>
  );
};
export default TrendingTopics;
