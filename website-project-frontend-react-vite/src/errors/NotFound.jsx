import React from "react";
import { useNavigate } from "react-router-dom";
import Page from "../components/section/Page.jsx";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Page className={"w-full h-[100vh] flex  justify-center items-center"}>
      <div
        className={
          "w-[75%] gap-8 bg-custom-orange-200 flex flex-col items-center justify-center border-4 font-lato rounded-xl p-12 border-black"
        }
      >
        <div
          className={
            "w-full flex justify-center border-4 border-white rounded-xl animated-rainbow-gradient"
          }
        >
          <h1 className={"text-[159px] font-bold text-white mb-auto"}>Oops!</h1>
        </div>
        <p className={"uppercase font-bold text-4xl text-white"}>
          404 - page not found!
        </p>
        <p className={"w-[80%] text-2xl text-white font-bold"}>
          Nie możemy znaleźć strony, której szukasz.... Może została usunięta
          lub jej nazwa została zmieniona. A może nigdy nie istniała? :0
        </p>

        <button
          onClick={() => navigate("/")}
          className={
            "w-full h-[75px] border-4 border-white bg-custom-orange-200 text-white font font-bold text-4xl rounded-xl uppercase"
          }
        >
          Strona Główna
        </button>
      </div>
    </Page>
  );
};

export default NotFound;
