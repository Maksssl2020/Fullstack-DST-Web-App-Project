import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { handleUpdateUserData } from "../helpers/api-integration/UserDataHandling.js";
import Spinner from "../components/universal/Spinner.jsx";
import { getRole } from "../helpers/ApiDataTranslator.js";
import { DateParser } from "../helpers/Date.js";
import AccountImageCard from "../components/card/AccountImageCard.jsx";
import InformationContainer from "../components/universal/InformationContainer.jsx";
import DefaultModal from "../components/modal/DefaultModal.jsx";
import { AnimatePresence } from "framer-motion";
import useUser from "../hooks/queries/useUser.js";
import useUserDisplay from "../hooks/queries/useUserDisplay.js";

const UserAccountAdminView = () => {
  const { userId } = useParams();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState(null);
  const [userUpdateData, setUserUpdateData] = React.useState({});
  const navigate = useNavigate();
  const { user, fetchingUser } = useUser(userId);
  const { userDisplay, fetchingUserDisplay } = useUserDisplay(userId);

  const { mutate: updateUser, isLoading: updatingUserData } = useMutation({
    mutationKey: ["updateUser", userId, userUpdateData],
    mutationFn: () => handleUpdateUserData(userId, userUpdateData),
    onSuccess: () => {
      queryClient.invalidateQueries("userAccountViewData");
      queryClient.invalidateQueries("allUsersData");
      setIsModalOpen(false);
    },
    onError: (error) => console.log(error),
  });

  if (fetchingUser || updatingUserData || fetchingUserDisplay) {
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
          setUserUpdateData,
        ),
      action: "BAN",
    },
    {
      name: "Zmień rolę",
      onClick: () =>
        handleOpenModal(
          `Zmień rolę użytkownika ${username} na ${role === "REGISTERED" ? "WOLONTARIUSZ" : "ZAREJESTROWANY"}`,
        ),
      action: "ROLE",
    },
    {
      name: "Usuń profilowe",
      onClick: () =>
        handleOpenModal(`Usuń zdjęcie profilowe użytkownika ${username}`),
      action: "AVATAR",
    },
    {
      name: "Usuń indentyfikacyjne",
      onClick: () =>
        handleOpenModal(`Usuń zdjęcie identyfikacyjne użytkownika ${username}`),
      action: "IDENTIFY",
    },
    {
      name: "Wyślij wiadomość",
      onClick: () =>
        handleOpenModal(`Wyślij wiadomość użytkownikowi ${username}`),
      action: "MESSAGE",
    },
  ];

  const setFunctionDataDependsOnButtonAction = (action) => {
    switch (action) {
      case "BAN":
        setUserUpdateData({ accountLocked: !accountLocked });
        break;
      case "ROLE":
        setUserUpdateData({
          role: role === "REGISTERED" ? "VOLUNTEER" : "REGISTERED",
        });
        break;
      case "AVATAR":
        setUserUpdateData({ avatar: null });
        break;
      case "IDENTIFY":
        setUserUpdateData({ identifyPhoto: null });
        break;
      default:
        setUserUpdateData({});
    }
  };

  const handleOpenModal = (modalContent) => {
    setModalContent(modalContent);
    setIsModalOpen(true);
  };

  console.log(userUpdateData);

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
                setFunctionDataDependsOnButtonAction(data.action);
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
            <div className="flex gap-6">
              <button
                className="uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
                onClick={() => setIsModalOpen(false)}
              >
                Anuluj
              </button>
              <button
                onClick={() => {
                  if (modalContent.includes("wiadomość")) {
                    navigate(`/users/create-message/${userId}/${username}`);
                  } else {
                    updateUser();
                  }
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
