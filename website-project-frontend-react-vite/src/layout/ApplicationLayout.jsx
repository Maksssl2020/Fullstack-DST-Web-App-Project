import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/header/Header.jsx";
import Footer from "../components/footer/Footer.jsx";
import ScrollToTop from "./ScrollToTop.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";
import DefaultModal from "../components/modal/DefaultModal.jsx";
import ButtonWithLink from "../components/universal/ButtonWithLink.jsx";

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
        <DefaultModal
          title={"Informacja"}
          subtitle={"Aby utworzyć post na forum, musisz się zalogować!"}
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
              title={"Pozostań na forum"}
              className={
                "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              }
              link={"/forum"}
              onClick={() => setOpenModal(false)}
            />
          </div>
        </DefaultModal>
      )}
    </div>
  );
};

export default ApplicationLayout;
