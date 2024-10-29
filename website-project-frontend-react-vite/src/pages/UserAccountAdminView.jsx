import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/universal/Spinner.jsx";
import { getRole } from "../helpers/ApiDataTranslator.js";
import { DateParser } from "../helpers/Date.js";
import AccountImageCard from "../components/card/AccountImageCard.jsx";
import InformationContainer from "../components/universal/InformationContainer.jsx";
import DefaultModal from "../components/modal/DefaultModal.jsx";
import { AnimatePresence } from "framer-motion";
import useUser from "../hooks/queries/useUser.js";
import useUserDisplay from "../hooks/queries/useUserDisplay.js";
import OneOptionDropdown from "../components/dropdown/OneOptionDropdown.jsx";
import useUpdateUserInAccountPageMutation from "../hooks/mutations/useUpdateUserInAccountPageMutation.js";
import toast from "react-hot-toast";

const UserAccountAdminView = () => {
  const { userId } = useParams();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [chosenAction, setChosenAction] = useState("");
  const [chosenRole, setChosenRole] = React.useState("");
  const navigate = useNavigate();
  const { user, fetchingUser } = useUser(userId);
  const { userDisplay, fetchingUserDisplay } = useUserDisplay(userId);
  const { updateUser, updatingUser } = useUpdateUserInAccountPageMutation();

  if (fetchingUser || updatingUser || fetchingUserDisplay) {
    return <Spinner />;
  }

  const {
    username,
    role,
    firstName,
    lastName,
    email,
    accountCreationDate,
    dateOfBirth,
    accountLocked,
  } = user;

  const { avatar, identifyPhoto } = userDisplay;

  const buttonsData = [
    {
      name: accountLocked ? "Odbanuj" : "Zbanuj",
      onClick: () =>
        handleOpenModal(
          `${accountLocked ? "Odbanuj" : "Zbanuj"} użytkownika ${username}`,
          "BAN",
        ),
    },
    {
      name: "Zmień rolę",
      onClick: () =>
        handleOpenModal(`Zmień rolę użytkownika ${username}`, "ROLE"),
    },
    {
      name: "Usuń profilowe",
      onClick: () =>
        handleOpenModal(
          `Usuń zdjęcie profilowe użytkownika ${username}`,
          "AVATAR",
        ),
    },
    {
      name: "Usuń indentyfikacyjne",
      onClick: () =>
        handleOpenModal(
          `Usuń zdjęcie identyfikacyjne użytkownika ${username}`,
          "IDENTIFY",
        ),
    },
    {
      name: "Wyślij wiadomość",
      onClick: () =>
        handleOpenModal(
          `Wyślij wiadomość użytkownikowi ${username}`,
          "MESSAGE",
        ),
    },
  ];

  const availableRoles = [
    {
      value: "REGISTERED",
      display: "Zarejestrowany",
    },
    { value: "VOLUNTEER", display: "Wolontariusz" },
    { value: "MODERATOR", display: "Moderator" },
  ];

  const setFunctionDataDependsOnButtonAction = (action) => {
    switch (action) {
      case "BAN":
        return { accountLocked: !accountLocked };
      case "ROLE":
        return {
          role: chosenRole,
        };
      case "AVATAR":
        return { avatar: null };
      case "IDENTIFY":
        return { identifyPhoto: null };
      default:
        return {};
    }
  };

  const handleOpenModal = (modalContent, chosenAction) => {
    setModalContent(modalContent);
    setChosenAction(chosenAction);
    setIsModalOpen(true);
  };

  return (
    <div className="w-full h-auto flex flex-col items-center my-8">
      <div className="w-[1150px] h-auto bg-custom-gray-200 border-4 border-black rounded-2xl p-4 flex flex-col gap-4">
        <div className="flex gap-4 w-full justify-between">
          <InformationContainer label={"Nazwa użytkownika"} value={username} />
          <InformationContainer
            label={"Rola użytkownika"}
            value={getRole(role)}
          />
          <InformationContainer
            label={"Data założenia konta"}
            value={DateParser(accountCreationDate)}
          />
        </div>
        <div className="flex gap-4">
          <AccountImageCard
            username={username}
            image={avatar}
            title={"Profilowe"}
          />
          <AccountImageCard
            username={username}
            image={identifyPhoto}
            title={"Indentyfikacyjne"}
          />
          <div className="ml-auto flex flex-col h-[400px] justify-between">
            <InformationContainer label={"Imię"} value={firstName} />
            <InformationContainer label={"Nazwisko"} value={lastName} />
            <InformationContainer label={"E-mail"} value={email} />
            <InformationContainer
              label={"Data urodzenia"}
              value={DateParser(dateOfBirth)}
            />
          </div>
        </div>
        <div className="w-full flex gap-4 mt-12">
          {buttonsData.map((data, index) => (
            <button
              key={index}
              onClick={() => {
                data.onClick();
              }}
              className="h-[75px] px-10 border-4 border-black uppercase text-xl text-white font-bold rounded-2xl bg-custom-orange-200"
            >
              {data.name}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <DefaultModal subtitle={modalContent}>
            {chosenAction === "ROLE" && (
              <OneOptionDropdown
                containerClassName={"w-full h-auto px-4 gap-2 flex flex-col"}
                labelClassname={"text-2xl"}
                optionsName={"Rola"}
                options={availableRoles.filter(
                  (availableRole) => availableRole.value !== role,
                )}
                setOption={setChosenRole}
              />
            )}

            <div className="flex gap-6">
              <button
                className="uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
                onClick={() => setIsModalOpen(false)}
              >
                Anuluj
              </button>
              <button
                onClick={() => {
                  if (chosenAction === "MESSAGE") {
                    navigate(`/users/create-message/${userId}/${username}`);
                  } else if (
                    (chosenAction === "AVATAR" && avatar === null) ||
                    (chosenAction === "IDENTIFY" && identifyPhoto === null) ||
                    identifyPhoto === null
                  ) {
                    toast.error("Nie można usunąć zdjęcia, gdy go nie ma!");
                  } else {
                    const userUpdateData =
                      setFunctionDataDependsOnButtonAction(chosenAction);

                    updateUser({
                      userId: userId,
                      updatedData: userUpdateData,
                    });
                  }

                  setIsModalOpen(false);
                }}
                className="uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              >
                Potwierdź
              </button>
            </div>
          </DefaultModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserAccountAdminView;
