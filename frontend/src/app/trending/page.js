import Post from "@/components/post";
import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Trending = () => {
  const datas = [
    {
      id: 1,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
    },
    {
      id: 2,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
    },
    {
      id: 3,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
    },
    {
      id: 4,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
    },
    {
      id: 5,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
    },
    {
      id: 6,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
    },
    {
      id: 7,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
    },
  ];
  return (
    <div>
      <div className="flex justify-center mt-2">
        <FontAwesomeIcon icon={faBoltLightning} style={{ width: 30, color: "#33363F" }} />
        <h1 className="font-bold text-3xl ">Trending</h1>
      </div>
      <div>
        {datas.map((item) => (
          <Post
            key={item.id}
            linkImg={item.linkImg}
            name={item.name}
            created={item.created}
            title={item.title}
            overView={item.overView}
            comment={item.comment}
            view={item.view}
          />
        ))}
      </div>
    </div>
  );
};
export default Trending;
