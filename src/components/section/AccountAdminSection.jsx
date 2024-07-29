import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import axios from "../../helpers/AxiosConfig";
import { jwtDecode } from "jwt-decode";
import { GetRole } from "../../helpers/RolesTranslate";
import AccountBasicDataForm from "../form/AccountBasicDataForm";
import { useNavigate } from "react-router-dom";

const AccountAdminSection = ({ userData }) => {
  const { getToken, role, accountCreationDate } = useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const navigate = useNavigate();
  const manageShopData = ["ubranie", "długopis", "kubek", "gadżet"];

  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);
  }, [userData]);

  return (
    <>
      <div className="w-[48%] rounded-2xl h-full flex flex-col">
        <div className="w-full italic h-[100px] text-5xl text-white font-bold rounded-2xl bg-custom-orange-100 flex justify-center items-center">
          Informacje o koncie
        </div>
        <div className="flex">
          <AccountBasicDataForm
            username={username}
            setUsername={setUsername}
            email={email}
            setEmail={setEmail}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            accountCreationDate={accountCreationDate}
          />
          <div className="w-[40%] ml-auto h-full flex flex-col p-4">
            <p className="ml-3 text-xl mb-2">Zdjęcie profilowe:</p>
            <div className="w-full h-[60%] flex items-center justify-center border-4 border-custom-gray-300 rounded-3xl">
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
      <div className="ml-auto w-[48%] bg-custom-pink-100 rounded-2xl h-full flex flex-col">
        <div className="w-full italic h-[15%] text-5xl text-white font-bold rounded-2xl bg-custom-orange-200 flex justify-center items-center">
          Zarządzanie Stroną
        </div>
        <div className="w-full h-[35%] px-4 py-8 gap-6 flex justify-center items-center">
          <button
            onClick={() => navigate("/article/add-article")}
            className="bg-white gap-4 py-2 flex flex-col items-center w-[300px] h-[150px] border-8 border-custom-pink-200 rounded-2xl"
          >
            <p className="text-2xl font-bold">Artykuł</p>
            <p className="text-xl">Stwórz nowy artykuł</p>
          </button>
          <button className="bg-white gap-4 p-2 flex flex-col items-center w-[300px] h-[150px] border-8 border-custom-pink-200 rounded-2xl">
            <p className="text-2xl font-bold">Dane o kwartałach</p>
            <p className="text-xl text-center">
              Zmień dane dotyczące kwartałów i środków.
            </p>
          </button>
        </div>
        <div className="w-full italic h-[15%] text-5xl text-white font-bold rounded-2xl bg-custom-orange-200 flex justify-center items-center">
          Zarządzanie Sklepem
        </div>
        <div className="w-full h-[35%] text-xl justify-items-center  grid grid-rows-2 grid-cols-2 px-20 py-8 gap-6">
          {manageShopData.map((data, index) => (
            <button
              key={index}
              className="w-[300px] h-[75px] flex justify-center items-center bg-white border-8 border-custom-pink-200 rounded-2xl"
            >
              Dodaj:
              <span className="ml-2 uppercase text-custom-pink-200">{`${data}`}</span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default AccountAdminSection;
