import React from "react";
import VolunteerListCard from "../card/VolunteerDataCard.jsx";
import EventsListCard from "../card/EventListCard.jsx";
import useAuthentication from "../../hooks/others/useAuthentication.js";
import useUserEvents from "../../hooks/queries/useUserEvents.js";
import useVolunteers from "../../hooks/queries/useVolunteers.js";
import Spinner from "../universal/Spinner.jsx";

const EventsPageSidePanel = ({ isWithinModal = false, className }) => {
  const { role } = useAuthentication();
  const { userEvents, fetchingUserEvents } = useUserEvents();
  const { volunteers, fetchingVolunteers } = useVolunteers();

  if (fetchingUserEvents || fetchingVolunteers) {
    return <Spinner />;
  }

  return (
    <div className={`h-full bg-custom-pink-100 rounded-2xl ${className}`}>
      {!isWithinModal && (
        <div className="w-full h-[100px] bg-custom-pink-200 rounded-2xl flex justify-center items-center">
          <h1 className="text-4xl text-white italic font-bold">
            {role === "ADMIN" ? "Wolontariusze:" : "Uczestnictwo w:"}
          </h1>
        </div>
      )}
      <div className={"w-full h-auto px-4 flex flex-col gap-4 mt-4"}>
        {role === "ADMIN" ? (
          <ul className="px-4 mt-4 flex flex-col gap-4">
            {volunteers?.map((data, index) => (
              <VolunteerListCard
                key={index}
                username={data.username}
                accountCreationDate={data.accountCreationDate}
              />
            ))}
          </ul>
        ) : (
          <ul className="px-4 mt-4 flex flex-col gap-4">
            {userEvents?.map((data, index) => (
              <EventsListCard
                key={index}
                title={data.title}
                number={data.eventNumber}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EventsPageSidePanel;
