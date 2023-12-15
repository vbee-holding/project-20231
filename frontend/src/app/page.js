import { faBoltLightning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Post from '@/components/post';

export default function Home() {
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
    <main>
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
            like={item.like}
          />
        ))}
      </div>
    </main>
  )
}
