import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import DefaultModal from "../modal/DefaultModal";
import AccountAdminSection from "./AccountAdminSection";
import AccountUserSection from "./AccountUserSection";
import { jwtDecode } from "jwt-decode";
import axios from "../../helpers/AxiosConfig";

const AccountInformationSection = () => {
  const { getToken, role, username } = useContext(AuthContext);
  const [showModal, setShowModal] = React.useState(false);
  const [userData, setUserData] = React.useState([]);

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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (getToken()) {
      fetchUserData();
    }
  }, [getToken]);

  // const updateUser = async (id, updatedUserData) => {
  //   await axios.put("");
  // };

  return (
    <>
      {showModal && (
        <DefaultModal
          modalTitle={"Informacja"}
          modalSubtitle={"Musisz się zalogować, aby mieć dostęp do tej strony."}
          fistButtonTitle={"Zaloguj się"}
          firstButtonLink={"/sign-in"}
          secondButtonTitle={"Strona główna"}
          secondButtonLink={"/"}
          closeModal={setShowModal}
        />
      )}
      <div className="w-full flex bg-custom-gray-300 flex-col font-lato h-[850px]">
        <div className="ml-[15%] mt-8 w-[600px] text-white items-center flex text-2xl justify-center h-[75px] bg-custom-blue-300 rounded-full">
          {`Cześć, ${username} witamy Cię serdecznie <3`}
        </div>
        <div className="flex w-full justify-center">
          <div className="w-[85%] max-w-[1630px] flex mt-8 h-[650px] rounded-3xl bg-white">
            {role === "ADMIN" ? (
              <AccountAdminSection userData={userData} />
            ) : (
              <AccountUserSection userData={userData} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInformationSection;
