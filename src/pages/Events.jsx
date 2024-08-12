import React from "react";
import EventCard from "../components/card/EventCard";
import VolunteerListCard from "../components/card/VolunteerListCard";
import AnimatedPage from "../animation/AnimatedPage";

const Events = () => {
  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato">
        <div className="w-[1550px] h-auto bg-custom-gray-400 mt-8 rounded-2xl flex justify-between">
          <div className="w-[60%] h-full space-y-6">
            <div className="w-full h-[100px] bg-custom-pink-100 rounded-2xl flex justify-center items-center">
              <h1 className="text-4xl text-white italic font-bold">
                Lista wydarzeń
              </h1>
            </div>
            <EventCard />
            <EventCard />
          </div>
          <div className="w-[35%] h-full bg-custom-pink-100 rounded-2xl">
            <div className="w-full h-[100px] bg-custom-pink-200 rounded-2xl flex justify-center items-center">
              <h1 className="text-4xl text-white italic font-bold">
                Wolontariusze:
              </h1>
            </div>
            <div className="w-full h-auto px-4 mt-4 flex flex-col gap-4">
              <VolunteerListCard />
              <VolunteerListCard />
              <VolunteerListCard />
              <VolunteerListCard />
              <VolunteerListCard />
              <VolunteerListCard />
              <VolunteerListCard />
              <VolunteerListCard />
              <VolunteerListCard />
              <VolunteerListCard />
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default Events;
