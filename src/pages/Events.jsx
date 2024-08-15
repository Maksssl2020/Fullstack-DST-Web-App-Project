import React, { useContext } from "react";
import EventCard from "../components/card/EventCard";
import EventsListCard from "../components/card/VolunteerListCard";
import AnimatedPage from "../animation/AnimatedPage";
import { useQuery } from "react-query";
import {
  fetchAllUserEvents,
  fetchEventsData,
} from "../helpers/api-integration/EventsHandling";
import Spinner from "../components/universal/Spinner";
import { AuthContext } from "../helpers/provider/AuthProvider";
import DefaultModal from "../components/modal/DefaultModal";
import ButtonWithLink from "../components/universal/ButtonWithLink";

const Events = () => {
  const { isAuthenticated, role, userId } = useContext(AuthContext);

  const { data: eventsData, isLoading: fetchingEventsData } = useQuery(
    ["eventsData"],
    () => fetchEventsData(),
  );

  const { data: userEventsData, isLoading: fetchingUserEventsData } = useQuery(
    ["userEventsData", userId],
    () => fetchAllUserEvents(userId),
  );

  if (fetchingEventsData || fetchingUserEventsData) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato">
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
        <div className="w-[1550px] h-auto bg-custom-gray-400 mt-8 rounded-2xl flex justify-between">
          <div className="w-[60%] h-full space-y-6">
            <div className="w-full h-[100px] bg-custom-pink-100 rounded-2xl flex justify-center items-center">
              <h1 className="text-4xl text-white italic font-bold">
                Lista wydarzeń
              </h1>
            </div>
            {eventsData.map((data, index) => (
              <EventCard
                eventData={data}
                number={eventsData.length - (index + 1)}
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
                <div>
                  <EventsListCard />
                  <EventsListCard />
                  <EventsListCard />
                  <EventsListCard />
                  <EventsListCard />
                  <EventsListCard />
                  <EventsListCard />
                  <EventsListCard />
                  <EventsListCard />
                  <EventsListCard />
                </div>
              ) : (
                <ul className="px-4 mt-4 flex flex-col gap-4">
                  {userEventsData.map((data, index) => (
                    <EventsListCard
                      key={index}
                      title={data.title}
                      number={index}
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
