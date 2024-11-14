import React from "react";
import UserCard from "../components/card/UserCard.jsx";
import Spinner from "../components/universal/Spinner.jsx";
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
        <div className={"h-[60px] w-full"}>
          <SearchBar
            placeholder={"Wyszukaj użytkownika..."}
            setSearchBar={setSearchBar}
          />
        </div>
        <div
          className={
            "flex w-full justify-between max-lg:h-auto max-lg:flex-wrap max-lg:gap-2 lg:h-[50px]"
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
                "h-[50px] rounded-xl border-2 border-black px-4 uppercase"
              }
              key={index}
            >
              {data.display}
            </motion.button>
          ))}
        </div>
        <ul className="flex flex-col gap-4">
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
