import React from "react";
import AnimatedPage from "../../animation/AnimatedPage.jsx";

type PageProps = {
  className?: string;
  children?: React.ReactNode;
};

const Page = ({ className, children }: PageProps) => {
  return (
    <AnimatedPage>
      <div className={`h-full w-full py-8 font-lato ${className}`}>
        {children}
      </div>
    </AnimatedPage>
  );
};

export default Page;
