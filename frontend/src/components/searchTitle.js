import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Icons } from "./icons";

const SearchTitile = () => {
  const searchParams = useSearchParams();
  const searchContent = searchParams.get("text");
  function SearchBarFallback() {
    return <></>;
  }
  return (
    <div className="container max-w-7xl h-full mx-auto flex items-center justify-between gap-2 py-2">
      <Suspense fallback={<SearchBarFallback />}>
        <h1 className="px-4 text-2xl font-semibold tracking-tight truncate w-[100]">
          Results for " {searchContent} "
        </h1>
      </Suspense>
      <Icons.filter className="absolute right-4 w-6 h-6"/>   
    </div>
  );
};

export default SearchTitile;
