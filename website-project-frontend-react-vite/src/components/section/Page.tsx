import React from "react";
import AnimatedPage from "../../animation/AnimatedPage.jsx";

const Page = ({ className, children }) => {
  return (
    <AnimatedPage>
      <div className={`w-full h-full font-lato py-8 ${className}`}>
        {children}
      </div>
    </AnimatedPage>
  );
};

export default Page;
