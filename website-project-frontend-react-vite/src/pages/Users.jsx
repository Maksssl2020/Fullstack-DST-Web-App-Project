import React from "react";
import UserCard from "../components/card/UserCard.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import useUsers from "../hooks/queries/useUsers.js";
import { motion } from "framer-motion";
import AdminManagementSectionContainer from "../components/section/AdminManagementSectionContainer.jsx";
import Page from "../components/section/Page.jsx";
import SearchBar from "../components/universal/SearchBar.jsx";

const Users = () => {
  const [chosenFilter, setChosenFilter] = React.useState("All");
  const [searchBar, setSearchBar] = React.useState("");
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
    <Page className={"flex justify-center"}>
      <AdminManagementSectionContainer className={"border-2 border-black"}>
        <div className={"w-full h-[60px]"}>
          <SearchBar
            placeholder={"Wyszukaj użytkownika..."}
            setSearchBar={setSearchBar}
          />
        </div>
        <div
          className={
            "max-lg:h-auto lg:h-[50px] w-full flex max-lg:gap-2 max-lg:flex-wrap justify-between"
          }
        >
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
              className={
                "border-2 px-4 border-black rounded-xl uppercase h-[50px]"
              }
              key={index}
            >
              {data.display}
            </motion.button>
          ))}
        </div>
        <ul className="gap-4 flex flex-col">
          {users
            .filter((user) => {
              return (
                user.lastName.includes(searchBar) ||
                user.email.includes(searchBar)
              );
            })
            .map((userData, index) => (
              <UserCard key={index} userData={userData} />
            ))}
        </ul>
      </AdminManagementSectionContainer>
    </Page>
  );
};

export default Users;
