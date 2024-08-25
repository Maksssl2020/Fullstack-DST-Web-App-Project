import React from "react";
import { DateParser } from "../../helpers/Date";
import { useQuery } from "react-query";
import { fetchUserAvatar } from "../../helpers/api-integration/UserDataHandling";
import { getRole } from "../../helpers/ApiDataTranslator";
import Spinner from "../universal/Spinner";
import UserIcon from "../header/icons/UserIcon";
import { Link } from "react-router-dom";

const UserCard = ({ userData }) => {
  const { id, username, role, accountCreationDate, accountLocked } = userData;

  const { data: userAvatar, isLoading: fetchingUserAvatar } = useQuery(
    ["userAvatar", id],
    () => fetchUserAvatar(id),
  );

  if (fetchingUserAvatar) {
    return <Spinner />;
  }

  console.log(userData);

  return (
    <li className="w-full h-[75px] rounded-2xl p-2 border-4 border-black bg-white flex items-center justify-between gap-4">
      <div className="size-[55px] rounded-full flex items-center justify-center bg-white border-2 border-black">
        {userAvatar ? (
          <img
            className="size-full inset-0 object-cover rounded-full self-center"
            src={`data:image/png;base64,${userAvatar}`}
            alt={username}
          />
        ) : (
          <UserIcon size={"size-8"} />
        )}
      </div>
      <label className="flex flex-col items-center h-full w-[12%] justify-between">
        <p>Status konta:</p>
        <p className="font-bold">{!accountLocked ? "AKTYWNE" : "ZBANOWANE"}</p>
      </label>
      <label className="flex flex-col items-center h-full w-[18%] justify-between">
        <p>Nazwa:</p>
        <p className="font-bold">{username}</p>
      </label>
      <label className="flex flex-col items-center h-full w-[15%] justify-between">
        <p>Rola:</p>
        <p className="font-bold">{getRole(role)}</p>
      </label>
      <label className="flex flex-col items-center h-full w-[25%] justify-between">
        <p>Data założenia konta:</p>
        <p className="font-bold">{DateParser(accountCreationDate)}</p>
      </label>
      <Link
        to={`/users/check-user/${id}`}
        className="border-4 border-black bg-custom-orange-200 w-[12%] flex justify-center items-center rounded-2xl text-white uppercase font-bold h-[50px]"
      >
        Sprawdź
      </Link>
    </li>
  );
};

export default UserCard;
