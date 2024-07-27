import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../helpers/provider/AuthProvider";
import axios from "../helpers/AxiosConfig";
import { TodayDate } from "../helpers/Date";
import { useNavigate, useParams } from "react-router-dom";
import ModalWithClickFunction from "../components/modal/ModalWithClickFunction";
import AnimatedPage from "../animation/AnimatedPage";

const NewsPostForm = () => {
  const { username } = useContext(AuthContext);
  const { id } = useParams();
  const [content, setContent] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`/news/${id}`).then((response) => {
        setContent(response.data.content);
      });
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      author: username,
      content: content,
      creationDate: TodayDate(),
    };

    try {
      if (isEditing) {
        await axios.put(`/news/edit-post/${id}`, postData);
      } else {
        await axios.post("/news/add-new-post", postData);
      }

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
    <AnimatedPage>
      <div className="w-full font-lato h-auto flex justify-center">
        <div className="my-8 flex flex-col p-8 gap-6 w-[750px] h-[850px] border-4 border-black rounded-2xl">
          <div className="w-full flex text-2xl font-bold items-center justify-between">
            <p>Jesteś zalogowany jako:</p>
            <p>{username}</p>
          </div>
          <p className="text-2xl font-bold mt-6 ml-4">
            {isEditing ? "Edytuj treść posta" : "Wpisz treść posta:"}
          </p>
          <textarea
            value={content}
            maxLength={300}
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
              onClick={handleSubmit}
              className="w-full h-full relative bg-custom-orange-200 rounded-3xl uppercase"
            >
              {content.length < 5 && (
                <div className="w-full absolute inset-0 h-full bg-black opacity-20 rounded-3xl"></div>
              )}
              {isEditing ? "Zaktualizuj post" : "dodaj post"}
            </button>
          </div>
          {openModal && (
            <ModalWithClickFunction
              modalTitle={isEditing ? "Post zaktualizowany" : "Post dodany"}
              modalSubtitle={
                isEditing
                  ? "Post został pomyślnie zaktualizowany!"
                  : "Nowy post w aktualnościach został dodany! Dodaj kolejny lub przejdź na stronę aktualności."
              }
              fistButtonTitle={"Przejdź do aktualności"}
              firstButtonLink={"/news"}
              secondButtonTitle={"Pozostań na stronie"}
              secondButtonClickAction={() => setOpenModal(false)}
            />
          )}
        </div>
      </div>
    </AnimatedPage>
  );
};

export default NewsPostForm;
