import React from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import RequestToAdminCard from "../components/card/RequestToAdminCard.jsx";
import useUsersRequests from "../hooks/queries/useUsersRequests.js";
import AdminManagementSectionContainer from "../components/section/AdminManagementSectionContainer.jsx";
import Page from "../components/section/Page.jsx";

const UsersRequests = () => {
  const { usersRequests, fetchingUsersRequests } = useUsersRequests();

  if (fetchingUsersRequests) {
    return <Spinner />;
  }

  console.log(usersRequests);
  return (
    <Page className={"flex justify-center bg-custom-gray-400"}>
      <AdminManagementSectionContainer className={"border-2 border-black"}>
        {usersRequests.map((data, index) => (
          <RequestToAdminCard key={index} data={data} />
        ))}
      </AdminManagementSectionContainer>
    </Page>
  );
};

export default UsersRequests;
