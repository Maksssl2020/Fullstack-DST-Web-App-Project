import React from "react";
import LineWithCircleOnLeftSide from "../universal/LineWithCircleOnLeftSide";
import LineWithCircleOnRightSide from "../universal/LineWithCircleOnRightSide";

const EventCard = () => {
  return (
    <div className="w-full h-[500px] bg-custom-pink-100 rounded-2xl">
      <div className="w-full h-[65px] relative bg-custom-pink-200 rounded-2xl flex items-center justify-center px-2 font-bold">
        <div className="absolute left-0 ml-1 h-[90%] w-[75px] bg-white rounded-3xl flex justify-center items-center">
          nr.10
        </div>
        <div className="w-auto h-auto justify-center items-center flex gap-4">
          <LineWithCircleOnLeftSide
            lineColor={"bg-white"}
            circleStrokeColor={"bg-white"}
            circleFillColor={"bg-custom-pink-200"}
          />
          <h2 className="text-white italic text-2xl">Żywa Biblioteka</h2>
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
            defaultValue={"xxx"}
            className="resize-none w-full text-center font-bold text-xl"
          ></textarea>
        </div>
        <div className="w-[20%] h-full flex flex-col justify-between">
          <div className="w-full h-[65%] p-2 gap-4 bg-white rounded-2xl border-4 border-custom-gray-300 flex flex-col">
            <h3 className="text-xl self-center">Zadania:</h3>
            <ul className="w-full h-auto text-lg">
              <li>-- xx</li>
              <li>-- xx</li>
              <li>-- xx</li>
              <li>-- xx</li>
              <li>-- xx</li>
            </ul>
          </div>
          <div className="w-full h-[30%] p-2 flex flex-col justify-center items-center gap-4  bg-white rounded-2xl border-4 border-custom-gray-300">
            <h3 className="text-lg">Data wydarzenia:</h3>
            <p className="text-lg">XXX</p>
          </div>
        </div>
        <div className="w-[30%] h-full justify-between flex flex-col">
          <div className="w-full h-[45%] flex justify-between">
            <div className="w-[45%] h-full p-2 rounded-2xl bg-white border-4 flex flex-col gap-4 justify-center items-center border-custom-gray-300">
              <h3 className="text-center text-sm mb-auto">
                Liczba wolontariuszy:
              </h3>
              <p className="font-bold text-xl mb-auto">X</p>
            </div>
            <div className="w-[45%] h-full p-2 rounded-2xl bg-white border-4 flex flex-col gap-4 justify-center items-center border-custom-gray-300">
              <h3 className="text-center text-sm mb-auto">Liczba obecnych:</h3>
              <p className="font-bold text-xl mb-auto">X</p>
            </div>
          </div>
          <div className="h-[50%] w-full flex flex-col justify-between">
            <div className="h-[45%] p-2 w-full rounded-2xl flex flex-col justify-center items-center bg-white border-4 border-custom-gray-300">
              <h3 className="text-lg">Data wydarzenia:</h3>
              <p className="text-lg font-bold">XXX</p>
            </div>
            <div className="h-[45%] p-2 w-full flex justify-center items-center rounded-2xl bg-green-100 border-4 border-green-500">
              <h3 className="text-2xl uppercase italic font-bold text-green-500">
                W trakcie
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
