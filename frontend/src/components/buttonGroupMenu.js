import { useRouter } from "next/navigation";

const ButtonGroupMenu = () => {
  const router = useRouter();

  return (
    <div className="col-span-7 space-x-1">
      <button
        className={
          window.location.pathname === "/"
            ? "bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
            : "bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
        }
        onClick={() => router.push("/")}
      >
        Home
      </button>

      <button
        className={
          window.location.pathname === "/r/trending"
            ? "bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
            : "bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
        }
        onClick={() => router.push("/r/trending")}
      >
        Trending
      </button>

      <button
        className={
          window.location.pathname === "/r/trending-topics"
            ? "bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
            : "bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs"
        }
        onClick={() => router.push("/r/trending-topics")}
      >
        Trending topics
      </button>
    </div>
  );
};
export default ButtonGroupMenu;
