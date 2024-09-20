import React from "react";
import UserCard from "../components/card/UserCard.jsx";
import { useQuery } from "react-query";
import { fetchAllUsers } from "../helpers/api-integration/UserDataHandling.js";
import Spinner from "../components/universal/Spinner.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";

const Users = () => {
  const { data: allUsersData, isLoading: fetchingAllUsersData } = useQuery(
    ["allUsersData"],
    () => fetchAllUsers(),
  );

  if (fetchingAllUsersData) {
    return <Spinner />;
  }

  console.log(allUsersData);

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex flex-col items-center my-8">
        <div className="w-[1000px] min-h-[600px] h-auto flex flex-col gap-4 bg-custom-gray-100 rounded-2xl border-4 border-black p-8">
          <ul className="gap-4 flex flex-col">
            {allUsersData.map((userData, index) => (
              <UserCard key={index} userData={userData} />
            ))}
          </ul>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Users;
