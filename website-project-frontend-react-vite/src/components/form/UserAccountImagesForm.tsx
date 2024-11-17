import React, { useMemo, useReducer, useState } from "react";
import useUserDisplay from "../../hooks/queries/useUserDisplay";
import UserAccountImageCard from "../card/UserAccountImageCard";
import UploadImageButton from "../button/UploadImageButton";
import useAuthentication from "../../hooks/others/useAuthentication";
import Spinner from "../universal/Spinner";
import AccountUserImagesFormModal from "../modal/AccountUserImagesFormModal";

type State = { isModalOpen: boolean; photoType: "AVATAR" | "IDENTIFY" | null };
type Action =
  | { type: "open_modal"; photoType: "AVATAR" | "IDENTIFY" }
  | { type: "close_modal" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "open_modal":
      return { ...state, isModalOpen: true, photoType: action.photoType };
    case "close_modal":
      return { ...state, isModalOpen: false, photoType: null };
    default:
      return state;
  }
}

const UserAccountImagesForm = ({ className }) => {
  const { role } = useAuthentication();
  const [state, dispatch] = useReducer(reducer, {
    isModalOpen: false,
    photoType: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userDisplay, fetchingUserDisplay } = useUserDisplay();

  const imagesData = useMemo(() => {
    const images = [
      {
        photoName: "Zdjęcie profilowe",
        image: userDisplay?.avatar,
        photoType: "AVATAR",
      },
    ];

    if (role === "VOLUNTEER") {
      images.push({
        photoName: "Zdjęcie identyfikacyjne",
        image: userDisplay?.identifyPhoto,
        photoType: "IDENTIFY",
      });
    }

    return images;
  }, [userDisplay]);

  const handleUploadClick = (photoType: "AVATAR" | "IDENTIFY") => {
    dispatch({ type: "open_modal", photoType });
  };

  if (fetchingUserDisplay) {
    return <Spinner />;
  }

  return (
    <div className={`flex h-full flex-col p-4 max-md:w-full ${className}`}>
      {imagesData.map((data, index) => (
        <UserAccountImageCard
          key={`${userDisplay?.username}${index}`}
          className={""}
          label={data.photoName}
          image={data.image}
          alt={userDisplay?.username}
        >
          <UploadImageButton
            onClick={() => handleUploadClick(data.photoType)}
          />
        </UserAccountImageCard>
      ))}

      <AccountUserImagesFormModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(!isModalOpen)}
        photoType={""}
      />
    </div>
  );
};

export default UserAccountImagesForm;
