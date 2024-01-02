"use client"

import { useRouter } from "next/navigation";
import { Icons } from "./icons";

const BackBar = () => {
  const router = useRouter();
  return (
    <div className="h-full mx-auto flex flex-col items-start justify-center gap-20">
      <button onClick={() => router.back()}>
        <Icons.back className="mr-2 h-4 w-4"/>
        Back
      </button>
    </div>
  );
};

export default BackBar;
