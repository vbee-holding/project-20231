import { usePathname, useRouter } from "next/navigation";

const ButtonGroupMenu = () => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="space-x-1">
      <button
        className={
          pathname === "/"
            ? "bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
            : "bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
        }
        onClick={() => router.push("/")}
      >
        Trang chủ
      </button>

      <button
        className={
          pathname === "/r/trending"
            ? "bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
            : "bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
        }
        onClick={() => router.push("/r/trending")}
      >
        Xu hướng
      </button>

      <button
        className={
          pathname === "/r/trending-topics"
            ? "bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
            : "bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
        }
        onClick={() => router.push("/r/trending-topics")}
      >
        Chủ đề hot
      </button>
    </div>
  );
};
export default ButtonGroupMenu;
