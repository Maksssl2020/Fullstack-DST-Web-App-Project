import React, { useContext } from "react";
import LineWithCircleOnLeftSide from "../universal/LineWithCircleOnLeftSide";
import LineWithCircleOnRightSide from "../universal/LineWithCircleOnRightSide";
import { DateTimeParser } from "../../helpers/Date";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchAmountOfBasicUsersInEvent,
  fetchAmountOfVolunteersInEvent,
  fetchUserIsRegisteredInTheEvent,
  handleAddUserToTheEvent,
} from "../../helpers/api-integration/EventsHandling";
import Spinner from "../universal/Spinner";
import { AuthContext } from "../../helpers/provider/AuthProvider";

const EventCard = ({ eventData, number }) => {
  const queryClient = useQueryClient();
  const { role, userId } = useContext(AuthContext);
  const { id, title, description, eventDate, registrationEndDate, tasks } =
    eventData;

  console.log(userId);

  const {
    data: amountOfVolunteersInEvent,
    isLoading: fetchingAmountOfVolunteers,
  } = useQuery(["amountOfVolunteersInEvent", id], () =>
    fetchAmountOfVolunteersInEvent(id),
  );

  const {
    data: amountOfBasicUsersInEvent,
    isLoading: fetchingAmountOfBasicUsers,
  } = useQuery(["amountOfBasicUsersInEvent", id], () =>
    fetchAmountOfBasicUsersInEvent(id),
  );

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

  const { data: isUserRegisteredInEvent, isLoading: checkingUser } = useQuery(
    ["isUserRegisteredInEvent", id, userId],
    () => fetchUserIsRegisteredInTheEvent(id, userId),
  );

  console.log(eventData);
  console.log(amountOfVolunteersInEvent);
  console.log(amountOfBasicUsersInEvent);

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
    fetchingAmountOfBasicUsers ||
    addingUserToTheEvent ||
    checkingUser
  ) {
    return <Spinner />;
  }

  console.log(currentDate);
  console.log(eventDateObject);

  return (
    <div className="w-full h-[500px] bg-custom-pink-100 rounded-2xl">
      <div className="w-full h-[65px] relative bg-custom-pink-200 rounded-2xl flex items-center justify-center px-2 font-bold">
        <div className="absolute left-0 ml-1 h-[90%] w-[75px] bg-white rounded-3xl flex justify-center items-center">
          {`nr. ${number}`}
        </div>
        <div className="w-auto h-auto justify-center items-center flex gap-4">
          <LineWithCircleOnLeftSide
            lineColor={"bg-white"}
            circleStrokeColor={"bg-white"}
            circleFillColor={"bg-custom-pink-200"}
          />
          <h2 className="text-white italic text-2xl">{title}</h2>
          <LineWithCircleOnRightSide
            lineColor={"bg-white"}
            circleColor={"bg-white"}
          />
        </div>
      </div>
      <div className="w-full h-[435px] p-6 rounded-b-2xl flex justify-between">
        <div className="w-[45%] h-full bg-white rounded-2xl border-4 relative border-custom-gray-300 p-2 flex flex-col items-center justify-center">
          <h3 className="absolute top-0 mt-2 text-2xl">Opis wydarzenia:</h3>
          <textarea
            readOnly
            defaultValue={description}
            className="resize-none h-[75%] w-full text-center font-bold text-xl focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="w-[20%] h-full flex flex-col justify-between">
          <div className="w-full h-[65%] p-2 gap-4 bg-white rounded-2xl border-4 border-custom-gray-300 flex flex-col">
            <h3 className="text-xl self-center">Zadania:</h3>
            <ul className="w-full h-auto text-lg">
              {tasks.map((task, index) => (
                <li key={index}>{`-- ${task}`}</li>
              ))}
            </ul>
          </div>
          <div className="w-full h-[30%] p-2 flex flex-col justify-center items-center gap-4  bg-white rounded-2xl border-4 border-custom-gray-300">
            <h3 className="text-lg">Data wydarzenia:</h3>
            <p className="text-lg font-bold">{DateTimeParser(eventDate)}</p>
          </div>
        </div>
        <div className="w-[30%] h-full justify-between flex flex-col">
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
                {amountOfBasicUsersInEvent}
              </p>
            </div>
          </div>
          <div className="h-[50%] w-full flex flex-col justify-between">
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
              className={`h-[45%] p-2 w-full flex justify-center items-center rounded-2xl  border-4  ${isEventFinished ? "border-red-500 bg-red-100" : "border-green-500 bg-green-100"}`}
            >
              {role === "ADMIN" ? (
                <h3
                  className={`text-2xl uppercase italic font-bold ${isEventFinished ? "text-red-500" : "text-green-500"}`}
                >
                  {isEventFinished ? "Zakończone" : "W trakcie"}
                </h3>
              ) : (
                <h3
                  className={`text-2xl uppercase italic font-bold ${isEventFinished ? "text-red-500" : "text-green-500"}`}
                >
                  {isEventFinished
                    ? "Zakończone"
                    : isUserRegisteredInEvent
                      ? "Zgłoszony"
                      : "Zgłoś się"}
                </h3>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
