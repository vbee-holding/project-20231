import Post from "@/components/post";
import MenuBar from "@/components/menuBar";

const TrendingTopicDetail = () => {
  const datas = [
    {
      id: 1,
      linkImg: "T",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 2,
      linkImg: "T",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 3,
      linkImg: "T",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 4,
      linkImg: "T",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 5,
      linkImg: "T",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 6,
      linkImg: "T",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
    {
      id: 7,
      linkImg: "T",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 !",
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới",
      comment: 50,
      view: 50,
      like: 50,
    },
  ];
  return (
    <div>
      <MenuBar />
      <div className="my-3">
        <h1 className="pl-4 font-bold text-3xl ">Game</h1>
      </div>
      {datas.map((item, index) => (
        <Post
          key={index}
          linkImg={item.linkImg}
          name={item.name}
          created={item.created}
          title={item.title}
          overView={item.overView}
          comment={item.comment}
          view={item.view}
          like={item.like}
        />
      ))}
    </div>
  );
};
export default TrendingTopicDetail;
