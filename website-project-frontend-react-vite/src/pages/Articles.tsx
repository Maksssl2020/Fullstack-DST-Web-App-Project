import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import ArticleManageCard from "../components/card/ArticleManageCard.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import useManagementArticles from "../hooks/queries/useManagementArticles.js";
import AdminManagementSectionContainer from "../components/section/AdminManagementSectionContainer.jsx";
import Page from "../components/section/Page.jsx";

const Articles = () => {
  const { managementArticles, fetchingManagementArticles } =
    useManagementArticles();

  if (fetchingManagementArticles) {
    return <Spinner />;
  }

  return (
    <Page className={"flex justify-center bg-custom-gray-400"}>
      <AdminManagementSectionContainer>
        {managementArticles.map((data, index) => (
          <ArticleManageCard articleData={data} key={index} />
        ))}
      </AdminManagementSectionContainer>
    </Page>
  );
};

export default Articles;
