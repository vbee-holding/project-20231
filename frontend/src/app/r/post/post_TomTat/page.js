
import Post_TomTat from '../post_TomTat/post_TomTat';
import Link from 'next/link'
import Summary from '../post_TomTat/summary'
export default function Home() {
  const datas = [
    {
      id: 1,
      linkImg: "/assets/images/avatarIcon.png",
      name: "thuyvan",
      created: "7/12/2023",
      title: "Report for F17 ! "
          
      ,
      overView:
        "Thread chỉ nhận report, nghiêm cấm mọi hành vi spam post, thảo luận/ tranh cãi/ chửi bới Học hỏi, mmds",
      view: 50,
      comments: 11,
    },
  ];

  const summary = [
    {
        content : "Viết về 1 thứ gì đó, ................ Đây là bản tóm tắt tất cả các comments"
    },
  ];
  return (
    <main>
      <div>
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

            />   
            {summary.map((key) => (   
                <Summary content={key.content}/>
            ))}
      
          </div>
        ))}      
      </div>
    </main>
  );
};
