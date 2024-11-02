import React from "react";
import NewsPostSection from "../components/section/NewsPostSection.jsx";
import Page from "../components/section/Page.jsx";

const News = () => {
  return (
    <Page className={"flex flex-col items-center bg-custom-gray-400"}>
      <NewsPostSection />
    </Page>
  );
};

export default News;
