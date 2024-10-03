import React from "react";
import UserCard from "../components/card/UserCard.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import useUsers from "../hooks/queries/useUsers.js";

const Users = () => {
  const { users, fetchingUsers } = useUsers();

  if (fetchingUsers) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex flex-col items-center my-8">
        <div className="w-[1000px] min-h-[600px] h-auto flex flex-col gap-4 bg-custom-gray-100 rounded-2xl border-4 border-black p-8">
          <ul className="gap-4 flex flex-col">
            {users.map((userData, index) => (
              <UserCard key={index} userData={userData} />
            ))}
          </ul>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Users;
