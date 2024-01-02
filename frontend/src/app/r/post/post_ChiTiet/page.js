import Post_ChiTiet from "./post_ChiTiet";
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
      comments: [
        { id: 1, content: "Comment 1", user: "user1" },
        { id: 2, content: "Comment 2", user: "user2" },
        { id: 3, content: "Comment 3", user: "user3" },
        { id: 4, content: "Comment 4", user: "user4" },
        { id: 5, content: "Comment 5", user: "user5" },
        { id: 6, content: "Comment 6", user: "user6" },
        { id: 7, content: "Comment 7", user: "user7" },
        { id: 8, content: "Comment 8", user: "user8" },
        { id: 9, content: "Comment 9", user: "user9" },
        { id: 10, content: "Comment 10", user: "user10" },
        { id: 11, content: "Comment 11", user: "user11" },
      ],
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
        {datas.map((item) => (
          <div key={item.id}>
            <Post_ChiTiet
              linkImg={item.linkImg}
              name={item.name}
              created={item.created}
              title={item.title}
              overView={item.overView}
              comments={item.comments}
              view={item.view}
              like={item.like}
            />
            {/* Hiển thị danh sách comment */}
            <div className="comment-scroll mt-4 mx-4">
              {item.comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-gray-100 p-4 rounded-lg mb-2"
                >
                  <p className="text-gray-800 font-bold">{comment.user}</p>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
