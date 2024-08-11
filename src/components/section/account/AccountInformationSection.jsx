import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import DefaultModal from "../../modal/DefaultModal";
import AccountAdminSection from "./AccountAdminSection";
import AccountUserSection from "./AccountUserSection";
import { jwtDecode } from "jwt-decode";
import axios from "../../../helpers/AxiosConfig";
import ButtonWithLink from "../../universal/ButtonWithLink";

const AccountInformationSection = () => {
  const { getToken, role, username, logout } = useContext(AuthContext);
  const [showModal, setShowModal] = React.useState(false);
  const [userData, setUserData] = React.useState([]);
  const [changedData, setChangedData] = React.useState({
    username: null,
    email: null,
    phoneNumber: null,
    identifyImage: null,
    avatar: null,
  });
  const [isChange, setIsChange] = React.useState(false);
  const [updateErrors, setUpdateErrors] = useState([]);

  useEffect(() => {
    if (!getToken()) {
      setShowModal(true);
    }
  }, [getToken]);

  const fetchUserData = async () => {
    try {
      const decodedToken = jwtDecode(getToken());

      console.log(username);
      await axios.get(`/users/${decodedToken.username}`).then((response) => {
        setUserData(response.data);
      });
      setUpdateErrors([]);
      console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getToken()) {
      fetchUserData();
    }
  }, [getToken]);

  const updateUser = async (id, updatedUserData) => {
    try {
      await axios.put(`/users/${id}`, updatedUserData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (updatedUserData.username !== null) {
        logout();
      } else {
        setIsChange(false);
        setUpdateErrors([]);
        await fetchUserData();
      }
    } catch (error) {
      const handledErrors = {};
      const thrownErrorMessage = error.response.data.errorMessage;

      console.log(error);
      if (thrownErrorMessage.includes("Username cannot be")) {
        handledErrors.username = "Nieprawidłowa nazwa użytkownika!";
      }
      if (thrownErrorMessage.includes("(username)=")) {
        handledErrors.username = "Podana nazwa użytkownika jest niedostępna!";
      }
      if (
        thrownErrorMessage.includes("E-mail cannot be") ||
        thrownErrorMessage.includes("Invalid e-mail!")
      ) {
        handledErrors.email = "Nieprawidłowy e-mail!";
      }
      if (thrownErrorMessage.includes("(email)=")) {
        handledErrors.username = "Podany e-mail jest niedostępny!";
      }
      if (thrownErrorMessage.includes("Invalid phone number!")) {
        handledErrors.phoneNumber = "Nieprawidłowy numer telefonu!";
      }
      setUpdateErrors(handledErrors);
    }
  };

  const handleChange = (field, value) => {
    setChangedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    console.log(changedData);
  };

  useEffect(() => {
    setIsChange(
      changedData.username !== null ||
        changedData.email !== null ||
        changedData.phoneNumber !== null ||
        changedData.identifyImage !== null ||
        changedData.avatar !== null,
    );
  }, [changedData]);

  const handleSubmit = async () => {
    await updateUser(userData.id, changedData);
  };

  return (
    <>
      {showModal && (
        <DefaultModal
          title={"Informacja"}
          subtitle={"Musisz się zalogować, aby mieć dostęp do tej strony."}
        >
          <div className="flex gap-6">
            <ButtonWithLink
              title={"Zaloguj się"}
              link={"/sign-in"}
              className={
                "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              }
            />
            <ButtonWithLink
              title={"Strona główna"}
              link={"/"}
              className={
                "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              }
            />
          </div>
        </DefaultModal>
      )}
      <div className="w-full flex bg-custom-gray-300 flex-col font-lato h-[950px]">
        <div className="flex items-center mt-8">
          <h1 className="ml-[15%] w-[600px] text-white items-center flex text-2xl justify-center h-[75px] bg-custom-blue-300 rounded-full">{`Cześć, ${username} witamy Cię serdecznie <3`}</h1>
          {isChange && (
            <button
              onClick={handleSubmit}
              className="bg-custom-orange-200 rounded-2xl ml-auto mr-[15%] text-white h-[75px] font-bold border-4 border-black p-4 w-auto"
            >
              AKCEPTUJ ZMIANY
            </button>
          )}
        </div>
        <div className="flex w-full justify-center">
          <div className="w-[85%] max-w-[1630px] flex mt-8 h-[700px] rounded-3xl bg-white">
            {role === "ADMIN" ? (
              <AccountAdminSection
                userData={userData}
                onChange={handleChange}
                updateErrors={updateErrors}
              />
            ) : (
              <AccountUserSection
                userData={userData}
                onChange={handleChange}
                updateErrors={updateErrors}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInformationSection;
