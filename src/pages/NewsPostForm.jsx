import React, { useContext, useState } from "react";
import { AuthContext } from "../helpers/provider/AuthProvider";
import axios from "../helpers/AxiosConfig";
import { TodayDate } from "../helpers/Date";
import { useNavigate } from "react-router-dom";
import DefaultModal from "../components/modal/DefaultModal";
import ModalWithClickFunction from "../components/modal/ModalWithClickFunction";

const NewsPostForm = () => {
  const { username } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleAddNewPost = async (e) => {
    e.preventDefault();

    try {
      await axios.post("/news/add-new-post", {
        author: username,
        content: content,
        creationDate: TodayDate(),
      });

      setContent("");
      setOpenModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancelClick = () => {
    navigate("/news");
  };

  return (
    <div className="w-full font-lato h-auto flex justify-center">
      <div className="my-8 flex flex-col p-8 gap-6 w-[750px] h-[850px] border-4 border-black rounded-2xl">
        <div className="w-full flex text-2xl font-bold items-center justify-between">
          <p>Jesteś zalogowany jako:</p>
          <p>{username}</p>
        </div>
        <p className="text-2xl font-bold mt-6 ml-4">Wpisz treść posta:</p>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[65%] border-4 rounded-2xl border-black resize-none"
        ></textarea>
        <div className="flex w-full h-[70px] text-3xl font-bold text-white gap-4">
          <button
            onClick={handleCancelClick}
            className="w-full h-full bg-custom-orange-200 rounded-3xl uppercase"
          >
            Anuluj
          </button>
          <button
            disabled={content.length < 5}
            onClick={handleAddNewPost}
            className="w-full h-full relative bg-custom-orange-200 rounded-3xl uppercase"
          >
            {content.length < 5 && (
              <div className="w-full absolute inset-0 h-full bg-black opacity-20 rounded-3xl"></div>
            )}
            dodaj post
          </button>
        </div>
        {openModal && (
          <ModalWithClickFunction
            modalTitle={"Post dodany"}
            modalSubtitle={
              "Nowy post w aktualnościach został dodany! Dodaj kolejny lub przejdź na stronę aktualności."
            }
            fistButtonTitle={"Przejdź do aktualności"}
            firstButtonLink={"/news"}
            secondButtonTitle={"Pozostań na stronie"}
            secondButtonClickAction={() => setOpenModal(false)}
          />
        )}
      </div>
    </div>
  );
};

export default NewsPostForm;
