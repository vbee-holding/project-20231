import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Icons } from "./icons";
import SearchFilter from "./searchFilter";

const SearchTitile = () => {
  const searchParams = useSearchParams();
  const searchContent = searchParams.get("text");
  const [onFilter, setOnFilter] = useState(false);
  const handleFilter = () => {
    setOnFilter(!onFilter);
  };
  function SearchBarFallback() {
    return <></>;
  }
  return (
    <div>
      <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 py-2">
        <Suspense fallback={<SearchBarFallback />}>
          <h1 className="px-4 text-2xl font-semibold tracking-tight truncate w-[100]">
            Results for " {searchContent} "
          </h1>
        </Suspense>
        <button onClick={handleFilter} className="absolute right-4">
          <Icons.filter className="w-6 h-6" />
        </button>
      </div>
      {onFilter ? <SearchFilter /> : null}
    </div>
  );
};

export default SearchTitile;
