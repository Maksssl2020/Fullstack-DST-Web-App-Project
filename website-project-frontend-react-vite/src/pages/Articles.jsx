import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import ArticleManageCard from "../components/card/ArticleManageCard.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import useManagementArticles from "../hooks/queries/useManagementArticles.js";

const Articles = () => {
  const { managementArticles, fetchingManagementArticles } =
    useManagementArticles();

  if (fetchingManagementArticles) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div
        className={
          "w-full min-h-[640px] h-auto flex flex-col items-center py-8 bg-custom-gray-400"
        }
      >
        <div
          className={
            "w-[1150px] h-auto bg-custom-gray-100 rounded-2xl flex flex-col p-4 gap-4"
          }
        >
          {managementArticles.map((data, index) => (
            <ArticleManageCard articleData={data} key={index} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Articles;
