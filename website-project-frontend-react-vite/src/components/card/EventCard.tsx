import React, { useContext } from "react";
import LineWithCircleOnLeftSide from "../universal/LineWithCircleOnLeftSide.jsx";
import LineWithCircleOnRightSide from "../universal/LineWithCircleOnRightSide.jsx";
import { DateTimeParser } from "../../helpers/Date.js";
import { useMutation, useQueryClient } from "react-query";
import { handleAddUserToTheEvent } from "../../helpers/api-integration/EventsHandling.js";
import Spinner from "../universal/Spinner.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import useAmountOfVolunteersInEvent from "../../hooks/queries/useAmountOfVolunteersInEvent.js";
import useAmountOfRegisteredUsersInEvent from "../../hooks/queries/useAmountOfRegisteredUsersInEvent.js";
import useIsUserRegisteredInTheEvent from "../../hooks/queries/useIsUserRegisteredInTheEvent.js";

const EventCard = ({ eventData, number }) => {
  const queryClient = useQueryClient();
  const { role, userId } = useContext(AuthContext);
  const { id, title, description, eventDate, registrationEndDate, tasks } =
    eventData;

  const { amountOfVolunteersInEvent, fetchingAmountOfVolunteers } =
    useAmountOfVolunteersInEvent(id);
  const {
    amountOfRegisteredUsersInEvent,
    fetchingAmountOfRegisteredUsersInEvent,
  } = useAmountOfRegisteredUsersInEvent(id);
  const { isUserRegisteredInEvent, checkingUser } =
    useIsUserRegisteredInTheEvent(id);

  const { mutate: addUserToTheEvent, isLoading: addingUserToTheEvent } =
    useMutation({
      mutationKey: ["addUserToTheEvent", id, userId],
      mutationFn: () => handleAddUserToTheEvent(id, userId),
      onSuccess: () => {
        queryClient.invalidateQueries("amountOfBasicUsersInEvent");
        queryClient.invalidateQueries("amountOfVolunteersInEvent");
        queryClient.invalidateQueries("isUserRegisteredInEvent");
        queryClient.invalidateQueries("userEventsData");
      },
      onError: (error) => console.log(error),
    });

  console.log(eventData);
  console.log(amountOfVolunteersInEvent);
  console.log(amountOfRegisteredUsersInEvent);

  const currentDate = new Date();
  const eventDateObject = new Date(
    eventDate[0],
    eventDate[1] - 1,
    eventDate[2],
    eventDate[3],
    eventDate[4],
  );
  const isEventFinished = eventDateObject < currentDate;

  if (
    fetchingAmountOfVolunteers ||
    fetchingAmountOfRegisteredUsersInEvent ||
    addingUserToTheEvent ||
    checkingUser
  ) {
    return <Spinner />;
  }

  console.log(currentDate);
  console.log(eventDateObject);

  const renderButtonLabel = () => {
    if (isEventFinished) {
      return "Zakończone";
    }

    return role === "ADMIN"
      ? "W trakcie"
      : isUserRegisteredInEvent
        ? "Zgłoszony"
        : "Zgłoś się";
  };

  return (
    <div className="w-full max-md:h-auto md:h-[500px] bg-custom-pink-100 rounded-2xl">
      <div className="w-full h-[65px] relative bg-custom-pink-200 rounded-2xl flex items-center justify-center px-2 font-bold">
        <div className="absolute left-0 ml-1 h-[90%] w-[75px] bg-white rounded-3xl flex justify-center items-center">
          {`nr. ${number}`}
        </div>
        <div className="w-auto h-auto justify-center items-center flex gap-4">
          <LineWithCircleOnLeftSide
            lineColor={"bg-white"}
            circleStrokeColor={"bg-white"}
            circleFillColor={"bg-custom-pink-200"}
            className={"max-sm:hidden"}
          />
          <h2 className="text-white italic text-2xl max-sm:ml-12">{title}</h2>
          <LineWithCircleOnRightSide
            lineColor={"bg-white"}
            circleColor={"bg-white"}
            className={"max-sm:hidden"}
          />
        </div>
      </div>
      <div className="w-full max-md:h-auto md:h-[435px] max-md:p-2 md:p-6 rounded-b-2xl flex max-md:gap-6 max-md:flex-col md:justify-between">
        <div
          className={
            "max-md:w-full md:w-[65%] flex max-sm:gap-4 max-sm:flex-col justify-between"
          }
        >
          <div className="max-sm:w-full max-sm:min-h-[300px] sm:w-[45%] md:w-[60%] md:h-full bg-white rounded-2xl border-4 relative border-custom-gray-300 p-2 flex flex-col items-center justify-center">
            <h3 className="absolute top-0 md:mt-2 text-2xl ">
              Opis wydarzenia:
            </h3>
            <textarea
              readOnly
              value={description}
              className="resize-none max-sm:h-[200px] sm:h-[75%] max-md:mt-6 w-full text-center font-bold text-xl focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="max-sm:w-full sm:w-[45%] md:w-[35%] h-full flex flex-col max-md:gap-6 md:justify-between">
            <div className="w-full md:h-[65%] p-2 gap-4 bg-white rounded-2xl border-4 border-custom-gray-300 flex flex-col">
              <h3 className="text-xl self-center">Zadania:</h3>
              <ul className="w-full h-auto text-lg">
                {tasks.map((task, index) => (
                  <li key={index}>{`-- ${task}`}</li>
                ))}
              </ul>
            </div>
            <div className="w-full h-[30%] p-2 flex flex-col justify-center items-center gap-4  bg-white rounded-2xl border-4 border-custom-gray-300">
              <h3 className="max-sm:text-lg md:text-sm lg:text-lg">
                Data wydarzenia:
              </h3>
              <p className="max-sm:text-lg md:text-sm lg:text-lg font-bold">
                {DateTimeParser(eventDate)}
              </p>
            </div>
          </div>
        </div>
        <div className="max-md:w-full md:w-[30%] h-full justify-between flex flex-col max-md:gap-6">
          <div className="w-full h-[45%] flex justify-between">
            <div className="w-[45%] h-full p-2 rounded-2xl bg-white border-4 flex flex-col gap-4 justify-center items-center border-custom-gray-300">
              <h3 className="text-center text-sm mb-auto">
                Liczba wolontariuszy:
              </h3>
              <p className="font-bold text-xl mb-auto">
                {amountOfVolunteersInEvent}
              </p>
            </div>
            <div className="w-[45%] h-full p-2 rounded-2xl bg-white border-4 flex flex-col gap-4 justify-center items-center border-custom-gray-300">
              <h3 className="text-center text-sm mb-auto">
                {isEventFinished ? "Liczba obecnych:" : "Liczba chętnych:"}
              </h3>
              <p className="font-bold text-xl mb-auto">
                {amountOfRegisteredUsersInEvent}
              </p>
            </div>
          </div>
          <div className="h-[50%] w-full flex flex-col max-md:gap-6 justify-between">
            <div className="h-[45%] p-2 w-full rounded-2xl flex flex-col justify-center items-center bg-white border-4 border-custom-gray-300">
              <h3 className="text-lg">Zgłoś się do:</h3>
              <p className="text-lg font-bold">
                {DateTimeParser(registrationEndDate)}
              </p>
            </div>
            <button
              disabled={
                role === "ADMIN" || isEventFinished || isUserRegisteredInEvent
              }
              onClick={addUserToTheEvent}
              className={`h-[45%] p-2 w-full flex justify-center items-center rounded-2xl  border-4  ${isEventFinished ? "border-red-500 bg-red-100 text-red-500" : "border-green-500 bg-green-100 text-green-500"}`}
            >
              <h3 className="text-2xl uppercase italic font-bold">
                {renderButtonLabel()}
              </h3>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
