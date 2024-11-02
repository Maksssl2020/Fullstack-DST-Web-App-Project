import React, { useState } from "react";
import EventCard from "../components/card/EventCard.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import useEvents from "../hooks/queries/useEvents.js";
import Page from "../components/section/Page.jsx";
import IconButton from "../components/button/IconButton.jsx";
import EyeIcon from "../icons/EyeIcon.jsx";
import DefaultContentModal from "../components/modal/DefaultContentModal.jsx";
import EventsPageSidePanel from "../components/panel/EventsPageSidePanel.jsx";
import { AnimatePresence } from "framer-motion";
import useAuthentication from "../hooks/others/useAuthentication.js";
import CloseEyeIcon from "../icons/CloseEyeIcon.jsx";

const Events = () => {
  const { role } = useAuthentication();
  const { events, fetchingEvents } = useEvents();

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (fetchingEvents) {
    return <Spinner />;
  }

  return (
    <Page className={"flex justify-center"}>
      <div className="max-lg:w-[95%] lg:w-[950px] xl:w-[1250px] 2xl:w-[1550px] h-auto bg-white mt-8 rounded-2xl flex justify-center gap-4">
        <div className="max-2xl:w-full 2xl:w-[60%] h-full space-y-6">
          <div className="w-full h-[100px] relative bg-custom-pink-100 rounded-2xl flex justify-center items-center">
            <h1 className="text-4xl text-white italic font-bold">
              Lista wydarzeń
            </h1>
            <IconButton
              onClick={() => setIsModalOpen(true)}
              className={"2xl:hidden size-10 absolute right-0 mr-2 bg-white"}
            >
              <EyeIcon className={"size-8"} />
            </IconButton>
          </div>
          {events.map((data, index) => (
            <EventCard eventData={data} number={data.eventNumber} key={index} />
          ))}
        </div>
        <EventsPageSidePanel className={"2xl:w-[30%] max-2xl:hidden"} />
        <AnimatePresence>
          {isModalOpen && (
            <DefaultContentModal
              className={
                "max-sm:w-[95%] sm:w-[500px] h-auto rounded-2xl bg-custom-pink-100"
              }
            >
              <div className="w-full h-[100px] relative bg-custom-pink-200 rounded-2xl flex justify-center items-center">
                <h1 className="text-4xl text-white italic font-bold">
                  {role === "ADMIN" ? "Wolontariusze:" : "Uczestnictwo w:"}
                </h1>
                <IconButton
                  onClick={() => setIsModalOpen(false)}
                  className={"size-10 bg-white absolute right-0 mr-2"}
                >
                  <CloseEyeIcon className={"size-8"} />
                </IconButton>
              </div>
              <EventsPageSidePanel
                isWithinModal={true}
                className={"w-full min-h-[600px] h-auto"}
              />
            </DefaultContentModal>
          )}
        </AnimatePresence>
      </div>
    </Page>
  );
};

export default Events;
