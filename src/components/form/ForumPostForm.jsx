import React, { useContext, useState } from "react";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import ForumPostItem from "./ForumPostItem";
import { TodayDate } from "../../helpers/Date";
import UserIcon from "../header/icons/UserIcon";
import axios from "../../helpers/AxiosConfig";
import ForumCreatedPostModal from "../modal/ForumCreatedPostModal";

const ForumPostForm = () => {
  const { username, role } = useContext(AuthContext);
  const [textInTextArea, setTextInTextArea] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [errors, setErrors] = useState({});
  const [optionIndex, setOptionIndex] = React.useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleTextAreaChange = (event) => {
    setTextInTextArea(event.target.value);
  };

  const handleOptionClick = (index) => {
    setOptionIndex(index);
  };

  const today = TodayDate();
  const postType = optionIndex === 0 ? "ANONYMOUS" : "PUBLIC";

  const handleCreatePost = async (event) => {
    event.preventDefault();

    try {
      await axios.post("/forum/create-post", {
        title: title,
        content: textInTextArea,
        author: username,
        authorRole: role,
        creationDate: today,
        postType: postType,
      });

      setShowModal(true);
    } catch (error) {
      const thrownErrors = {};
      let errorData;

      if (error.response.data.validationErrors) {
        errorData = error.response.data.validationErrors.toString();
      }

      if (errorData.includes("Content")) {
        thrownErrors.content = "Treść powinna zawierać 25 znaków minimum!";
      }
      if (errorData.includes("Title")) {
        thrownErrors.title = "Tytuł powinien zawierać 5 znaków minimum!";
      }

      setErrors(thrownErrors);

      console.log(error);
      console.log(thrownErrors);
      console.log(errors);
    }
  };

  return (
    <div className="w-[85%] justify-between h-[850px] p-8 flex rounded-2xl mt-16 bg-custom-blue-200">
      <div className="w-[60%] h-full rounded-2xl bg-white pt-4 flex items-center flex-col">
        <div className="w-[95%] h-[50px] flex justify-center items-center bg-custom-blue-400 rounded-full">
          <h2 className="font-bold text-white text-3xl">Stwórz swój wpis</h2>
        </div>
        <div className=" w-[85%] h-[80%] gap-2 items-center flex flex-col mt-6 rounded-xl bg-white">
          <p className="text-lg mr-auto ml-4 font-bold">Wpisz tytuł:</p>
          <input
            maxLength={55}
            className={`px-4 mb-4 text-xl focus:outline-custom-blue-400 bg-custom-gray-100 w-full rounded-xl h-[50px] ${errors.title && "border-2 border-red-500"}`}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
          <p className="text-lg mr-auto ml-4 font-bold">Wpisz treść:</p>
          <textarea
            className={`w-full focus:outline-custom-blue-400 h-[325px] p-4 text-xl resize-none rounded-xl bg-custom-gray-100 ${errors.content && "border-2 border-red-500 "}`}
            maxLength={500}
            onChange={handleTextAreaChange}
          />
          {errors.content && <p className="text-red-500">{errors.content}</p>}
          <div className="w-full justify-center mt-auto flex">
            <div className="w-[85%] h-[50px] flex items-center justify-center bg-custom-blue-400 rounded-full">
              <p className="text-white text-lg">
                Liczba znaków: {textInTextArea.length} / 500
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[35%] relative flex flex-col items-center justify-between py-4 h-full rounded-2xl bg-white">
        <div className="bg-custom-blue-400 px-12 w-[90%] flex items-center justify-center h-[50px] rounded-full">
          <div className="absolute w-[85px] flex items-center justify-center h-[85px] translate-y-4 bg-custom-gray-100 rounded-2xl left-0 translate-x-5">
            {role.toString() === "REGISTERED" ? (
              <p className="bg-white border-2 border-custom-blue-400 rounded-full flex justify-center items-center size-12">
                <UserIcon size={"size-8"} />
              </p>
            ) : (
              "MARK"
            )}
          </div>
          <h2 className="text-white font-bold ml-auto text-xl">{username}</h2>
        </div>
        <div className="w-[90%] gap-4 flex flex-col h-auto">
          <ForumPostItem
            index={0}
            content={"Wyślij wpis anonimowo"}
            bgColor={"bg-white"}
            onClickAction={handleOptionClick}
            isChosen={optionIndex}
          />
          <ForumPostItem
            index={1}
            content={"Wyślij wpis publicznie"}
            bgColor={"bg-custom-red-100"}
            onClickAction={handleOptionClick}
            isChosen={optionIndex}
          />
          <button
            onClick={handleCreatePost}
            className="w-full h-[75px] text-2xl bg-custom-blue-500 rounded-full uppercase text-white font-bold"
          >
            DODAJ WPIS
          </button>
        </div>
        <div className="w-[90%] h-[125px] relative items-center flex flex-col">
          <p className="w-[55%] text-2xl font-extrabold flex justify-center items-center pb-4 text-white h-[75px] translate-y-6 bg-custom-blue-200 rounded-t-2xl ml-auto">
            {today}
          </p>
          <div className="w-full bg-custom-blue-400 flex z-10 px-6 h-[55px] rounded-full">
            <p className="h-full items-center flex text-white text-xl font-bold">
              Liczba wpisów:
            </p>
            <p className="h-full w-[150px] flex justify-center items-center text-white font-bold text-4xl rounded-full ml-auto bg-custom-blue-500">
              10
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="self-center flex absolute items-center justify-center">
          <ForumCreatedPostModal />
        </div>
      )}
    </div>
  );
};

export default ForumPostForm;
