import React, { useContext, useState } from "react";
import DefaultModal from "../../components/modal/DefaultModal";
import AnimatedPage from "../../animation/AnimatedPage";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import FormItem from "../../components/form/FormItem";
import axios from "../../helpers/AxiosConfig";
import { TodayDate } from "../../helpers/Date";

const ArticleForm = () => {
  const { username } = useContext(AuthContext);
  const [openModal, setOpenModal] = React.useState(false);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const image = e.target.files[0];

    if (image) {
      setImage(image);
    }
  };

  const handleSubmit = async () => {
    try {
      await axios
        .post(
          "/articles/add-article",
          {
            title: title,
            content: content,
            author: username,
            creationDate: TodayDate(),
            image: image,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        )
        .then(() => {
          setOpenModal(true);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AnimatedPage>
      <div className="w-full font-lato h-auto flex justify-center">
        <div className="my-8 flex flex-col p-8 gap-6 w-[750px] h-[1150px] items-center border-4 border-black rounded-2xl">
          <div className="w-full flex text-2xl font-bold items-center justify-between">
            <p>Jesteś zalogowany jako:</p>
            <p>{username}</p>
          </div>
          <FormItem
            labelData={"Wpisz tytuł:"}
            type={"text"}
            containerStyling={"text-lg font-bold w-full"}
            inputStyling={
              "border-4 border-black h-[50px] focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
            }
            onChangeAction={(e) => setTitle(e.target.value)}
          />
          <FormItem
            labelData={"Wybierz zdjęcie ( opcjonalne ):"}
            type={"file"}
            containerStyling={"text-lg font-bold w-full"}
            inputStyling={
              "w-full px-0 file:w-[25%] file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-sm file:uppercase file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 "
            }
            onChangeAction={handleImageChange}
          />
          <div className="w-full h-[450px]">
            <p className="text-2xl font-bold mb-2 mt-6 ml-4">Wpisz treść:</p>
            <textarea
              value={content}
              className="bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-full w-full border-4 rounded-2xl border-black resize-none"
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full h-[60px] flex justify-center items-center text-2xl border-4 border-black rounded-2xl mt-16 bg-custom-orange-200 text-white font-bold">
            {`Liczba liter: ${content.length}`}
          </div>
          <div className="flex w-full h-[70px] mt-auto text-3xl font-bold text-white gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-full border-4 border-black h-full bg-custom-orange-200 rounded-3xl uppercase"
            >
              Anuluj
            </button>
            <button
              onClick={handleSubmit}
              disabled={content.length < 5}
              className="w-full h-full relative border-4 border-black bg-custom-orange-200 rounded-3xl uppercase"
            >
              dodaj post
              {content.length < 100 && (
                <div className="w-full absolute inset-0 h-full bg-black opacity-20 rounded-3xl"></div>
              )}
            </button>
          </div>
        </div>
        {openModal && (
          <DefaultModal
            modalTitle={"Post dodany"}
            modalSubtitle={"Post został pomyślnie zaktualizowany!"}
            fistButtonTitle={"Strona główna"}
            firstButtonLink={"/"}
            secondButtonTitle={"Pozostań na stronie"}
            secondButtonClickAction={() => setOpenModal(false)}
          />
        )}
      </div>
    </AnimatedPage>
  );
};

export default ArticleForm;
