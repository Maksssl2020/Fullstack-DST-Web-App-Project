import React, { useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import AccountModal from "../modal/AccountModal";
import { AuthContext } from "../../helpers/provider/AuthProvider";

const AccountInformationSection = () => {
  const { isAuthenticated, getToken } = useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [showModal, setShowModal] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const decodedToken = jwtDecode(getToken());
      setUsername(decodedToken.username);
    } else {
      setShowModal(true);
    }
  }, []);

  return (
    <>
      {showModal && <AccountModal />}
      <div className="w-full flex bg-custom-gray-300 flex-col font-lato h-[850px]">
        <div className="ml-[15%] mt-8 w-[600px] text-white items-center flex text-2xl justify-center h-[75px] bg-custom-blue-300 rounded-full">
          {`Cześć, ${username} witamy Cię serdecznie <3`}
        </div>
        <div className="flex w-full justify-center">
          <div className="w-[75%] mt-8 h-[650px] rounded-3xl bg-white"></div>
        </div>
      </div>
    </>
  );
};

export default AccountInformationSection;
