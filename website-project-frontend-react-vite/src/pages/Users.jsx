import React from "react";
import UserCard from "../components/card/UserCard.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import useUsers from "../hooks/queries/useUsers.js";
import { motion } from "framer-motion";

const Users = () => {
  const [chosenFilter, setChosenFilter] = React.useState("All");
  const { users, fetchingUsers } = useUsers({ chosenFilter });

  if (fetchingUsers) {
    return <Spinner />;
  }

  const filterButtonsData = [
    {
      display: "Wszyscy",
      value: "All",
    },
    {
      display: "Aktywni",
      value: "Active",
    },
    {
      display: "Zbanowani",
      value: "Banned",
    },
    {
      display: "Zarejestrowani",
      value: "Registered",
    },
    {
      display: "Wolontariusze",
      value: "Volunteer",
    },

    {
      display: "Moderatorzy",
      value: "Moderator",
    },
  ];

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex flex-col items-center my-8">
        <div className="w-[1000px] min-h-[600px] h-auto flex flex-col gap-4 bg-custom-gray-100 rounded-2xl border-4 border-black p-8">
          <div className={"h-[50px] w-full flex justify-between"}>
            {filterButtonsData.map((data, index) => (
              <motion.button
                initial={{
                  background: "#FFFFFF",
                  color: "#000000",
                }}
                animate={
                  data.value === chosenFilter
                    ? {
                        background: "#FF5A5A",
                        color: "#FFFFFF",
                      }
                    : {
                        background: "#FFFFFF",
                        color: "#000000",
                      }
                }
                exit={{
                  background: "#FFFFFF",
                  color: "#000000",
                }}
                onClick={() => setChosenFilter(data.value)}
                className={"border-2 px-4 border-black rounded-xl uppercase "}
                key={index}
              >
                {data.display}
              </motion.button>
            ))}
          </div>
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
