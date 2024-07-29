import React, { useContext, useEffect } from "react";
import AccountBasicDataForm from "../form/AccountBasicDataForm";
import { GetRole } from "../../helpers/RolesTranslate";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import { useNavigate } from "react-router-dom";

const AccountUserSection = ({ userData }) => {
  const { getToken, role, accountCreationDate } = useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [dateOfBirth, setDateOfBirth] = React.useState(null);
  const [fullname, setFullname] = React.useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);
    setDateOfBirth([userData.dateOfBirth]);

    const fullName = `${userData.firstName} ${userData.lastName}`;
    setFullname(fullName);
  }, [userData]);

  return (
    <>
      <div className="w-[68%] rounded-2xl h-full flex flex-col">
        <div className="w-full h-[100px] rounded-2xl bg-custom-orange-100 flex justify-center items-center">
          <h2 className="w-[30%] font-bold text-white text-4xl h-full italic flex items-center justify-center">
            Informacje o koncie
          </h2>
          <div className="w-[60%] h-[85px] flex items-center p-2 bg-custom-gray-300 rounded-2xl">
            <p>Imię i nazwisko:</p>
            <p className="w-[80%] border-4 flex justify-center items-center text-2xl border-custom-gray-200 h-full bg-white rounded-2xl ml-auto">
              {fullname}
            </p>
          </div>
        </div>
        <div className="flex w-full">
          <AccountBasicDataForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            accountCreationDate={accountCreationDate}
          />
          <div className="w-[45%] ml-auto h-full flex flex-col p-4">
            <p className="ml-3 text-xl mb-2">Zdjęcie Identyfikujące:</p>
            <div className="w-full h-[70%] flex items-center justify-center border-4 border-custom-gray-300 rounded-3xl">
              <img
                className="size-[85%]  inset-0 object-cover rounded-3xl"
                src="/assets/images/website-logo.jpg"
                alt={""}
              />
            </div>
            <p className="ml-3 mt-auto text-xl mb-2">Data urodzenia:</p>
            <p className="w-full flex justify-center items-center text-2xl rounded-2xl h-[60px] border-4 border-custom-gray-300">
              {dateOfBirth}
            </p>
          </div>
          <div className="w-[45%] ml-auto h-full flex flex-col p-4">
            <p className="ml-3 text-xl mb-2">Zdjęcie profilowe:</p>
            <div className="w-full h-[70%] flex items-center justify-center border-4 border-custom-gray-300 rounded-3xl">
              <img
                className="size-[85%]  inset-0 object-cover rounded-3xl"
                src="/assets/images/website-logo.jpg"
                alt={""}
              />
            </div>
            <p className="ml-3 mt-auto text-xl mb-2">Status konta:</p>
            <p className="w-full flex justify-center items-center text-2xl rounded-2xl h-[60px] border-4 border-custom-gray-300">
              {GetRole(role)}
            </p>
          </div>
        </div>
      </div>
      <div className="ml-auto w-[30%] bg-custom-pink-100 rounded-2xl h-full">
        <div className="w-full h-[100px] bg-custom-orange-200 rounded-2xl flex justify-center items-center">
          <h2 className="text-white text-4xl font-bold italic">
            Uczestniczył w:
          </h2>
        </div>
      </div>
    </>
  );
};

export default AccountUserSection;
