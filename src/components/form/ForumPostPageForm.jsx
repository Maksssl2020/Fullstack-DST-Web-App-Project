import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import ForumPostItem from "./ForumPostItem";
import { TodayDate } from "../../helpers/Date";
import UserIcon from "../header/icons/UserIcon";
import axios from "../../helpers/AxiosConfig";
import ForumCreatedPostModal from "../modal/ForumCreatedPostModal";
import { useParams } from "react-router-dom";
import DefaultModal from "../modal/DefaultModal";

const ForumPostPageForm = () => {
  const { username, role } = useContext(AuthContext);
  const { id } = useParams();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [date, setDate] = React.useState(TodayDate());
  const [authorPosts, setAuthorPosts] = React.useState(0);
  const [optionIndex, setOptionIndex] = React.useState(0);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      axios.get(`/forum/posts/${id}`).then((response) => {
        setTitle(response.data.title);
        setContent(response.data.content);
        setDate(response.data.creationDate);
        response.data.postType === "ANONYMOUS"
          ? setOptionIndex(0)
          : setOptionIndex(1);
      });
    }
  }, [id]);

  useEffect(() => {
    axios.get(`/forum/posts/author/${username}`).then((response) => {
      setAuthorPosts(response.data);
    });
  }, [username]);

  const handleTextAreaChange = (event) => {
    setContent(event.target.value);
  };

  const handleOptionClick = (index) => {
    setOptionIndex(index);
  };

  const postType = optionIndex === 0 ? "ANONYMOUS" : "PUBLIC";

  const handleCreatePost = async (event) => {
    event.preventDefault();

    const forumPostData = {
      title: title,
      content: content,
      author: username,
      authorRole: role,
      creationDate: date,
      postType: postType,
    };

    try {
      if (isEditing) {
        await axios.put(`/forum/posts/edit-post/${id}`, forumPostData);
      } else {
        await axios.post("/forum/create-post", forumPostData);
      }

      setShowModal(true);
    } catch (error) {
      const thrownErrors = {};
      let errorData = "";

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
    }
  };

  return (
    <div className="w-[85%] justify-between h-[850px] p-8 flex rounded-2xl mt-16 bg-custom-blue-200">
      <div className="w-[60%] h-full rounded-2xl bg-white pt-4 flex items-center flex-col">
        <div className="w-[95%] h-[50px] flex justify-center items-center bg-custom-blue-400 rounded-full">
          <h2 className="font-bold text-white text-3xl">
            {isEditing ? "Edytuj swój wpis" : "Stwórz swój wpis"}
          </h2>
        </div>
        <div className=" w-[85%] h-[80%] gap-2 items-center flex flex-col mt-6 rounded-xl bg-white">
          <p className="text-lg mr-auto ml-4 font-bold">
            {isEditing ? "Edytuj tytuł:" : "Wpisz tytuł:"}
          </p>
          <input
            value={title}
            maxLength={55}
            className={`px-4 mb-4 text-xl focus:outline-custom-blue-400 bg-custom-gray-100 w-full rounded-xl h-[50px] ${errors.title && "border-2 border-red-500"}`}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors.title && <p className="text-red-500">{errors.title}</p>}
          <p className="text-lg mr-auto ml-4 font-bold">
            {isEditing ? "Edytuj treść:" : "Wpisz treść:"}
          </p>
          <textarea
            value={content}
            className={`w-full focus:outline-custom-blue-400 h-[325px] p-4 text-xl resize-none rounded-xl bg-custom-gray-100 ${errors.content && "border-2 border-red-500 "}`}
            maxLength={500}
            onChange={handleTextAreaChange}
          />
          {errors.content && <p className="text-red-500">{errors.content}</p>}
          <div className="w-full justify-center mt-auto flex">
            <div className="w-[85%] h-[50px] flex items-center justify-center bg-custom-blue-400 rounded-full">
              <p className="text-white text-lg">
                Liczba znaków: {content.length} / 500
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
            content={
              isEditing ? "Zmień wpis na anonimowy" : "Wyślij wpis anonimowo"
            }
            bgColor={"bg-white"}
            onClickAction={handleOptionClick}
            isChosen={optionIndex}
          />
          <ForumPostItem
            index={1}
            content={
              isEditing ? "Zmień wpis na publiczny" : "Wyślij wpis publicznie"
            }
            bgColor={"bg-custom-red-100"}
            onClickAction={handleOptionClick}
            isChosen={optionIndex}
          />
          <button
            onClick={handleCreatePost}
            className="w-full h-[75px] uppercase text-2xl bg-custom-blue-500 rounded-full uppercase text-white font-bold"
          >
            {isEditing ? "Zmień wpis" : "dodaj wpis"}
          </button>
        </div>
        <div className="w-[90%] h-[125px] relative items-center flex flex-col">
          <p className="w-[55%] text-2xl font-extrabold flex justify-center items-center pb-4 text-white h-[75px] translate-y-6 bg-custom-blue-200 rounded-t-2xl ml-auto">
            {date}
          </p>
          <div className="w-full bg-custom-blue-400 flex z-10 px-6 h-[55px] rounded-full">
            <p className="h-full items-center flex text-white text-xl font-bold">
              Liczba wpisów:
            </p>
            <p className="h-full w-[150px] flex justify-center items-center text-white font-bold text-4xl rounded-full ml-auto bg-custom-blue-500">
              {authorPosts}
            </p>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="self-center flex absolute items-center justify-center">
          <ForumCreatedPostModal />
          <DefaultModal
            modalTitle={
              isEditing
                ? "Wpis został zaktualizowany!"
                : "Nowy wpis został utworzony!"
            }
            modalSubtitle={"Przejdź na stronę główną forum, aby go zobaczyć."}
            firstButtonLink={"/forum"}
            fistButtonTitle={"Strona Główna Forum"}
            secondButtonLink={"/"}
            secondButtonTitle={"Strona główna"}
          />
        </div>
      )}
    </div>
  );
};

export default ForumPostPageForm;
