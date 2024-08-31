import React from "react";
import AnimatedPage from "../animation/AnimatedPage";
import { useQuery } from "react-query";
import { fetchAllUsersRequests } from "../helpers/api-integration/RequestsToAdminHandling";
import Spinner from "../components/universal/Spinner";
import RequestToAdminCard from "../components/card/RequestToAdminCard";

const UsersRequests = () => {
  const { data: usersRequests, isLoading: fetchingUsersRequests } = useQuery(
    ["usersRequestsData"],
    () => fetchAllUsersRequests(),
  );

  if (fetchingUsersRequests) {
    return <Spinner />;
  }

  console.log(usersRequests);
  return (
    <AnimatedPage>
      <div className="w-full min-h-[550px] h-auto flex flex-col items-center py-8 bg-custom-gray-400">
        <div
          className={
            "w-[950px] min-h-[450px] h-auto rounded-2xl p-4 border-4 border-black bg-custom-gray-100 flex flex-col gap-4"
          }
        >
          {usersRequests.map((data, index) => (
            <RequestToAdminCard key={index} data={data} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default UsersRequests;
