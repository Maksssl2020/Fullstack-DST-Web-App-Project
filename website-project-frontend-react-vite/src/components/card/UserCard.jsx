import React from "react";
import { DateParser } from "../../helpers/Date.js";
import { getRole } from "../../helpers/ApiDataTranslator.js";
import Spinner from "../universal/Spinner.jsx";
import UserIcon from "../../icons/UserIcon.jsx";
import { Link } from "react-router-dom";
import useUserDisplay from "../../hooks/queries/useUserDisplay.js";
import AdminManagementSectionColumn from "../table/AdminManagementSectionColumn.jsx";

const UserCard = ({ userData }) => {
  const { id, username, role, accountCreationDate, accountLocked } = userData;
  const { userDisplay, fetchingUserDisplay } = useUserDisplay(id);

  if (fetchingUserDisplay) {
    return <Spinner />;
  }

  console.log(userData);

  return (
    <li className="w-full flex max-sm:flex-col max-sm:gap-8 max-lg:h-auto lg:h-[75px] rounded-2xl p-2 border-2 border-black bg-white justify-between items-center">
      <div className="size-[55px]  col-span-1 rounded-full flex items-center justify-center bg-white border-2 border-black">
        {userDisplay.avatar ? (
          <img
            className="size-full inset-0 object-cover rounded-full self-center"
            src={`data:image/png;base64,${userDisplay.avatar}`}
            alt={username}
          />
        ) : (
          <UserIcon size={"size-8"} />
        )}
      </div>
      <div
        className={
          "max-sm:border-t-2 border-black max-sm:w-full max-sm:pt-4 sm:w-[65%] lg:w-[80%] grid max-sm:gap-10 max-sm:grid-cols-1 sm:gap-6 sm:grid-cols-2 lg:gap-0 lg:grid-cols-4"
        }
      >
        <AdminManagementSectionColumn
          name={"Status konta:"}
          value={!accountLocked ? "AKTYWNE" : "ZBANOWANE"}
        />
        <AdminManagementSectionColumn name={"Nazwa:"} value={username} />
        <AdminManagementSectionColumn name={"Rola:"} value={getRole(role)} />
        <AdminManagementSectionColumn
          name={"Data założenia konta:"}
          value={DateParser(accountCreationDate)}
        />
      </div>
      <Link
        to={`/users/check-user/${id}`}
        className="border-2 max-sm:w-full sm:w-[110px] border-black bg-custom-orange-200 flex justify-center items-center rounded-2xl text-white uppercase font-bold h-[50px]"
      >
        Sprawdź
      </Link>
    </li>
  );
};

export default UserCard;
