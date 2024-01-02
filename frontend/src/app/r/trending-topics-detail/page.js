import Post from "@/components/post";

const TrendingTopicDetail = (props) => {
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
          like: 50,
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
          like: 50,
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
          like: 50,
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
          like: 50,
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
          like: 50,
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
          like: 50,
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
          like: 50,
        },
      ];
      return (
        <div>
          <div className="flex items-center mt-4">
            <h1 className="pl-4 font-bold text-4xl">#Game</h1>
            <div className="bg-gray-600 h-0.5 grow ml-2"></div>
          </div>
          {datas.map((item,index) => (
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
}
export default TrendingTopicDetail