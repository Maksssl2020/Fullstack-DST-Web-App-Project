import React, { useContext } from "react";
import ForumBanner from "../components/banner/ForumBanner";
import ForumPostCard from "../components/card/ForumPostCard";
import { Navigate, useNavigate, useNavigation } from "react-router-dom";
import { AuthContext } from "../helpers/provider/AuthProvider";
import ForumAttemptToCreatePostWhenNotLogged from "../components/modal/ForumAttemptToCreatePostWhenNotLogged";

const Forum = () => {
  const { token } = useContext(AuthContext);
  const [openModal, setOpenModal] = React.useState(false);
  const navigation = useNavigate();

  const handleNavigation = () => {
    if (token) {
      navigation("/forum-create-post");
    } else {
      setOpenModal(true);
    }
  };

  return (
    <div className="w-full h-auto font-lato flex my-8 flex-col items-center">
      <div className="bg-custom-blue-100 w-[1450px] py-16 flex flex-col items-center h-auto rounded-2xl">
        <ForumBanner />
        <button onClick={handleNavigation}>
          <p className="w-[225px] mt-6 h-[75px] bg-custom-blue-500 text-white flex items-center justify-center rounded-2xl text-2xl">
            DODAJ WPIS
          </p>
        </button>
        <ForumPostCard />
      </div>
      {openModal && (
        <ForumAttemptToCreatePostWhenNotLogged close={setOpenModal} />
      )}
    </div>
  );
};

export default Forum;
