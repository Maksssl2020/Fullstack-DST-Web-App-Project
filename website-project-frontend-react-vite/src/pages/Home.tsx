import React, { useContext } from "react";
import HomeAboutUsSection from "../components/section/HomeAboutUsSection.jsx";
import HomeNewsSection from "../components/section/HomeNewsSection.jsx";
import HomeInstagramSection from "../components/section/HomeInstagramSection.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";
import UserMessageModal from "../components/modal/UserMessageModal.jsx";
import useUserMessages from "../hooks/queries/useUserMessages.js";

const Home = () => {
  const { userId } = useContext(AuthContext);
  const { userMessages, fetchingUserMessages } = useUserMessages();

  if (fetchingUserMessages) {
    return;
  }

  console.log(userMessages);

  return (
    <AnimatedPage>
      {userMessages?.length > 0 && (
        <UserMessageModal messageData={userMessages[0]} userId={userId} />
      )}
      <div className="w-full">
        <div className="mt-8 flex items-center max-xl:justify-center h-[200px] bg-custom-gray-200">
          <div className="font-lato bg-custom-blue-300 flex h-[100px] italic max-sm:w-[95%] w-2/5 items-center ml-[15%] justify-center rounded-full max-md:text-lg max-xl:w-[80%] max-xl:ml-0 max-2xl:text-2xl text-3xl font-medium text-white">
            {"Zespół Dwóch Stron Tęczy wita Cię serdecznie <3"}
          </div>
        </div>
        <div className="w-full flex justify-center h-auto">
          <HomeAboutUsSection />
        </div>
        <div className="mt-16">
          <HomeNewsSection />
        </div>
        <div className="mt-16">{<HomeInstagramSection />}</div>
      </div>
    </AnimatedPage>
  );
};

export default Home;
