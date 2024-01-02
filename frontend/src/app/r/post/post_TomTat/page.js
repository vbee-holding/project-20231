import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post_TomTat from '../post_TomTat/post_TomTat';
import Link from 'next/link'
import BackBar from "@/components/backBar";

export default function Home() {
  const datas = [
    {
      id: 1,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới Học hỏi, mmds",
      view: 50,
      like: 50,
    },

  ];

  const generateComments = () => {
    const comments = [];
    for (let i = 1; i <= 20; i++) {
      comments.push({ id: i, content: `Comment ${i}`, user: `User ${i}` });
    }
    return comments;
  };
  return (
    <main>
      <div>
      <BackBar/>
        {datas.map((item) => (
          <div key={item.id}>
            <Post_TomTat
              linkImg={item.linkImg}
              name={item.name}
              created={item.created}
              title={item.title}
              overView={item.overView}
              comments={item.comments}
              view={item.view}
              like={item.like}
            />
            <div className="bg-blue-500 text-white p-4 rounded-md mt-4 flex items-start mx-2">
                <FontAwesomeIcon icon={faBoltLightning} className="w-5 h-5 mr-2" />
                <span className="ml-2">Summary</span>
            </div>

      
          </div>
        ))}
      </div>
    </main>
  );
};
