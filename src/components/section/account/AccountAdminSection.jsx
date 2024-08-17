import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import { GetRole } from "../../../helpers/RolesTranslate";
import AccountBasicDataForm from "../../form/AccountBasicDataForm";
import { useNavigate } from "react-router-dom";
import AccountSectionUserPhoto from "./AccountSectionUserPhoto";
import AddingPhotoModal from "../../modal/AddingPhotoModal";

const AccountAdminSection = ({ userData, register, errors }) => {
  const { role, accountCreationDate } = useContext(AuthContext);
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [avatar, setAvatar] = React.useState(null);
  const [openModal, setOpenModal] = React.useState(false);
  const navigate = useNavigate();
  const manageShopData = [
    {
      title: "ubranie",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/clothes/add-clothing"),
    },
    {
      title: "długopis",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/pens/add-pen"),
    },
    {
      title: "kubek",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/mugs/add-mug"),
    },
    {
      title: "gadżet",
      onClickFunction: () =>
        navigate("/rainbow-shop/products/admin-options/gadgets/add-gadget"),
    },
  ];

  useEffect(() => {
    setUsername(userData.username);
    setEmail(userData.email);
    setPhoneNumber(userData.phoneNumber);
    setAvatar(userData.avatar);
  }, [userData]);

  const handleModalOpen = () => {
    setOpenModal(!openModal);
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setAvatar(file);
    }
  };

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
            updateErrors={null}
          />
          <AccountSectionUserPhoto
            imageTitle={"Zdjęcie profilowe:"}
            mainImageSrc={userData.avatar}
            bottomDataTitle={"Status konta:"}
            bottomData={GetRole(role)}
            openModal={handleModalOpen}
          />
        </div>
      </div>
      <div className="ml-auto w-[48%] bg-custom-pink-100 rounded-2xl h-full flex flex-col">
        <div className="w-full italic h-[15%] text-5xl text-white font-bold rounded-2xl bg-custom-orange-200 flex justify-center items-center">
          Zarządzanie Stroną
        </div>
        <div className="w-full h-[35%] px-4 py-8 gap-6 flex justify-center items-center">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => navigate("/article/add-article")}
              className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[85px] border-8 border-custom-pink-200 rounded-2xl"
            >
              Stwórz nowy &nbsp;<span className="font-bold">artykuł</span>
            </button>
            <button
              onClick={() => navigate("/events/add-event")}
              className="bg-white text-xl py-2 flex items-center justify-center w-[300px] h-[85px] border-8 border-custom-pink-200 rounded-2xl"
            >
              Stwórz nowe &nbsp;<span className="font-bold">wydarzenie</span>
            </button>
          </div>
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
              onClick={data.onClickFunction}
              key={index}
              className="w-[300px] h-[75px] flex justify-center items-center bg-white border-8 border-custom-pink-200 rounded-2xl"
            >
              Dodaj:
              <span className="ml-2 uppercase text-custom-pink-200">{`${data.title}`}</span>
            </button>
          ))}
        </div>
      </div>
      {openModal && (
        <AddingPhotoModal
          modalTitle={"zdjęcie profilowe"}
          onChangeAction={handleAvatarChange}
          closeModal={handleModalOpen}
        />
      )}
    </>
  );
};

export default AccountAdminSection;
