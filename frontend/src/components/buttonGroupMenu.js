const ButtonGroupMenu = () => {
  return (
    <div className="col-span-7">
      <a href="/" className="py-2 px-0.5">
        <button className="bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs">
          Home
        </button>
      </a>
      <a href="/r/trending" className="py-2 px-0.5">
        <button className="bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs">
          Trending
        </button>
      </a>
      <a href="/r/trending-topics" className="py-2 px-0.5">
        <button className="bg-purple-600 hover:bg-purple-950 text-white font-bold py-2 px-2 rounded-full text-xs">
          Trending topics
        </button>
      </a>
    </div>
  );
};
export default ButtonGroupMenu;
