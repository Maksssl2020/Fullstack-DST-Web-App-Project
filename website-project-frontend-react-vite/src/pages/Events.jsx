import React, { useContext } from "react";
import EventCard from "../components/card/EventCard.jsx";
import EventsListCard from "../components/card/EventListCard.jsx";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";
import DefaultModal from "../components/modal/DefaultModal.jsx";
import ButtonWithLink from "../components/universal/ButtonWithLink.jsx";
import VolunteerListCard from "../components/card/VolunteerDataCard.jsx";
import useEvents from "../hooks/queries/useEvents.js";
import useUserEvents from "../hooks/queries/useUserEvents.js";
import useVolunteers from "../hooks/queries/useVolunteers.js";

const Events = () => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const { events, fetchingEvents } = useEvents();
  const { userEvents, fetchingUserEvents } = useUserEvents();
  const { volunteers, fetchingVolunteers } = useVolunteers();

  if (fetchingEvents || fetchingUserEvents || fetchingVolunteers) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      {!isAuthenticated && (
        <DefaultModal
          title={"Informacja"}
          subtitle={"Musisz się zalogować, aby mieć dostęp do tej strony."}
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
              title={"Strona główna"}
              link={"/"}
              className={
                "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              }
            />
          </div>
        </DefaultModal>
      )}
      <div className="w-full h-auto flex justify-center font-lato">
        <div className="w-[1550px] h-auto bg-white mt-8 rounded-2xl flex justify-between">
          <div className="w-[60%] h-full space-y-6">
            <div className="w-full h-[100px] bg-custom-pink-100 rounded-2xl flex justify-center items-center">
              <h1 className="text-4xl text-white italic font-bold">
                Lista wydarzeń
              </h1>
            </div>
            {events.map((data, index) => (
              <EventCard
                eventData={data}
                number={data.eventNumber}
                key={index}
              />
            ))}
          </div>
          <div className="w-[35%] h-full bg-custom-pink-100 rounded-2xl">
            <div className="w-full h-[100px] bg-custom-pink-200 rounded-2xl flex justify-center items-center">
              <h1 className="text-4xl text-white italic font-bold">
                {role === "ADMIN" ? "Wolontariusze:" : "Uczestnictwo w:"}
              </h1>
            </div>
            <div className="w-full h-auto px-4 mt-4 flex flex-col gap-4">
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
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Events;
