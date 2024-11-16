import React from "react";
import HomeAboutUsSection from "../components/section/HomeAboutUsSection.jsx";
import HomeNewsSection from "../components/section/HomeNewsSection.jsx";
import HomeInstagramSection from "../components/section/HomeInstagramSection.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import UserMessageModal from "../components/modal/UserMessageModal.jsx";
import useUserMessages from "../hooks/queries/useUserMessages.js";

const Home = () => {
  const { userMessages, fetchingUserMessages } = useUserMessages();

  if (fetchingUserMessages) {
    return;
  }

  console.log(userMessages);

  return (
    <AnimatedPage>
      {userMessages?.length > 0 && (
        <UserMessageModal messageData={userMessages[0]} />
      )}
      <div className="w-full">
        <div className="mt-8 flex h-[200px] items-center bg-custom-gray-200 max-xl:justify-center">
          <div className="ml-[15%] flex h-[100px] w-2/5 items-center justify-center rounded-full bg-custom-blue-300 font-lato text-3xl font-medium italic text-white max-2xl:text-2xl max-xl:ml-0 max-xl:w-[80%] max-md:text-lg max-sm:w-[95%]">
            {"Zespół Dwóch Stron Tęczy wita Cię serdecznie <3"}
          </div>
        </div>
        <div className="flex h-auto w-full justify-center">
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
