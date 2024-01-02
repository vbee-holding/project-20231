"use client";
import ScrollToTop from "react-scroll-to-top";

const Main = ({ children }) => {
  return (
    <main className="pt-16">
      {children}
      <ScrollToTop smooth top="500" 
      color="#464EAF"
      viewBox="-50 0 256 256"
      />
    </main>
  );
};
export default Main;
