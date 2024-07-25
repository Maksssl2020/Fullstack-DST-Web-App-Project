import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollToTop from "./ScrollToTop";
import { AuthContext } from "../helpers/provider/AuthProvider";
import ForumAttemptToCreatePostWhenNotLogged from "../components/modal/ForumAttemptToCreatePostWhenNotLogged";

const ApplicationLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = React.useState(false);

  const handleNavigation = () => {
    if (isAuthenticated) {
      navigate("/forum/create-post");
    } else {
      setOpenModal(true);
    }
  };

  const forumAddPostButton = (
    <button
      onClick={handleNavigation}
      className="p-2 bg-custom-blue-400 border-4 border-white ml-auto font-extrabold text-xl uppercase w-[250px] h-[50px] text-white rounded-full"
    >
      Stwórz wpis
    </button>
  );

  return (
    <div>
      <ScrollToTop />
      <Header forumAddPostButton={forumAddPostButton} />
      <Outlet />
      <Footer />
      {openModal && (
        <ForumAttemptToCreatePostWhenNotLogged close={setOpenModal} />
      )}
    </div>
  );
};

export default ApplicationLayout;
