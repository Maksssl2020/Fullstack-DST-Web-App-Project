import React, { useEffect, useState } from "react";
import ForumPostItem from "./ForumPostItem.jsx";
import { TodayDate } from "../../helpers/Date.js";
import UserIcon from "../../icons/UserIcon.jsx";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../universal/Spinner.jsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAddForumPostMutation from "../../hooks/mutations/useAddForumPostMutation.js";
import useUpdateForumPostMutation from "../../hooks/mutations/useUpdateForumPostMutation.js";
import useUserDisplay from "../../hooks/queries/useUserDisplay.js";
import useForumPostMutation from "../../hooks/mutations/useForumPostMutation.js";
import useUserAmountOfCreatedForumPosts from "../../hooks/queries/useUserAmountOfCreatedForumPosts.js";
import useAuthentication from "../../hooks/others/useAuthentication.js";
import { motion } from "framer-motion";

const ForumPostPageForm = ({ isEditing }) => {
  const { id } = useParams();
  const { userId, username } = useAuthentication();
  const { register, setValue, handleSubmit, formState, watch, reset } =
    useForm();
  const { errors } = formState;
  const [optionIndex, setOptionIndex] = React.useState(0);
  const [postCreationDate, setPostCreationDate] = useState(null);
  const navigate = useNavigate();
  const { userDisplay, fetchingUserDisplay } = useUserDisplay(userId);
  const {
    userAmountOfCreatedForumPosts,
    fetchingUserAmountOfCreatedForumPosts,
  } = useUserAmountOfCreatedForumPosts(userId);
  const { forumPostData, fetchForumPostData, fetchingForumPostData } =
    useForumPostMutation(id);
  const { addNewForumPost, addingNewForumPost } = useAddForumPostMutation(
    () => {
      toast.success("Utworzono nowy post na forum!");
      reset();
      navigate(-1);
    },
  );
  const { updateForumPost, updatingForumPost } = useUpdateForumPostMutation(
    id,
    () => {
      toast.success("Zaktualizowano post na forum!");
      reset();
      navigate(-1);
    },
  );

  useEffect(() => {
    if (isEditing) {
      fetchForumPostData();
    }
  }, [fetchForumPostData, id, isEditing]);

  useEffect(() => {
    if (isEditing && forumPostData) {
      setPostDataToUpdate(forumPostData);
    }
  }, [forumPostData, isEditing]);

  const setPostDataToUpdate = (forumPostData) => {
    if (isEditing) {
      forumPostData?.postType === "ANONYMOUS"
        ? setOptionIndex(0)
        : setOptionIndex(1);

      setValue("postTitle", forumPostData.title);
      setValue("postContent", forumPostData.content);
      setPostCreationDate(forumPostData.creationDate);
    }
  };

  const postType = optionIndex === 0 ? "ANONYMOUS" : "PUBLIC";
  const postContentLength = watch("postContent", "");

  const handleOptionClick = (index) => {
    setOptionIndex(index);
  };

  const handleSubmitClick = handleSubmit((data) => {
    const forumPostData = {
      title: data.postTitle,
      content: data.postContent,
      postType: postType,
      authorId: userId,
    };

    isEditing ? updateForumPost(forumPostData) : addNewForumPost(forumPostData);
  });

  if (
    addingNewForumPost ||
    updatingForumPost ||
    fetchingForumPostData ||
    fetchingUserDisplay ||
    fetchingUserAmountOfCreatedForumPosts
  ) {
    return <Spinner />;
  }

  return (
    <div className="w-[95%] justify-between max-xl:h-[1450px] xl:h-[850px] max-xl:p-4 xl:p-6 flex max-xl:flex-col max-xl:gap-4  rounded-2xl xl:mt-16 bg-custom-blue-200">
      <div className="max-xl:w-full xl:w-[60%] h-full rounded-2xl bg-white pt-4 flex items-center flex-col">
        <div className="w-[95%] h-[50px] flex justify-center items-center bg-custom-blue-400 rounded-full">
          <h2 className="font-bold text-white xs:text-xl sm:text-3xl">
            {isEditing ? "Edytuj swój wpis" : "Stwórz swój wpis"}
          </h2>
        </div>
        <div className="w-[85%] h-[80%] gap-2 items-center flex flex-col mt-6 rounded-xl bg-white">
          <p className="text-lg mr-auto ml-4 font-bold">
            {isEditing ? "Edytuj tytuł:" : "Wpisz tytuł:"}
          </p>
          <motion.input
            whileFocus={{ outlineColor: "#16C2E0" }}
            style={{ outlineColor: "#FFFFFF" }}
            maxLength={55}
            className={`px-4 mb-4 text-xl bg-custom-gray-100 w-full rounded-xl h-[50px] ${errors.postTitle && "border-2 border-red-500"}`}
            {...register("postTitle", {
              required: "Tytuł nie może być pusty!",
              minLength: {
                value: 5,
                message: "Tytuł powinien zawierać co najmniej 5 znaków!",
              },
            })}
          />
          {errors.postTitle && (
            <p className="text-red-500">{errors.postTitle.message}</p>
          )}
          <p className="text-lg mr-auto ml-4 font-bold">
            {isEditing ? "Edytuj treść:" : "Wpisz treść:"}
          </p>
          <motion.textarea
            whileFocus={{ outlineColor: "#16C2E0" }}
            style={{ outlineColor: "#FFFFFF" }}
            className={`w-full h-[325px] p-4 text-xl resize-none rounded-xl bg-custom-gray-100 ${errors.postContent && "border-2 border-red-500 "}`}
            maxLength={500}
            {...register("postContent", {
              required: "Treść nie może być pusta!",
              minLength: {
                value: 25,
                message: "Treść powinna zawierać przynajmniej 25 znaków!",
              },
            })}
          />
          {errors.postContent && (
            <p className="text-red-500">{errors.postContent.message}</p>
          )}
          <div className="w-full justify-center mt-auto flex">
            <div className="max-sm:w-full sm:w-[85%] h-[50px] flex items-center justify-center bg-custom-blue-400 rounded-full">
              <p className="text-white text-lg">
                Liczba znaków: {postContentLength.length} / 500
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:w-[35%] max-xl:w-full relative flex flex-col items-center justify-between py-4 h-full rounded-2xl bg-white">
        <div className="bg-custom-blue-400 px-12 w-[90%] flex items-center justify-center h-[50px] rounded-full">
          <div className="absolute w-[85px] flex items-center justify-center h-[85px] translate-y-4 bg-custom-gray-100 rounded-2xl left-0 max-sm:translate-x-3 sm:translate-x-5">
            {userDisplay ? (
              <p className="bg-white border-2 border-custom-blue-400 rounded-full flex justify-center items-center size-12">
                <img
                  className="rounded-full inset-0 object-cover size-full"
                  src={`data:image/png;base64,${userDisplay.avatar}`}
                  alt={userDisplay.username}
                />
              </p>
            ) : (
              <p className="bg-white border-2 border-custom-blue-400 rounded-full flex justify-center items-center size-12">
                <UserIcon size={"size-8"} />
              </p>
            )}
          </div>
          <h2 className="text-white font-bold ml-auto max-xs:text-sm xs:text-lg sm:text-xl">
            {username}
          </h2>
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
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleSubmitClick}
            className="w-full max-sm:h-[65px] sm:h-[75px] uppercase max-xs:text-sm xs:text-lg sm:text-2xl bg-custom-blue-500 rounded-full  text-white font-bold"
          >
            {isEditing ? "Zmień wpis" : "dodaj wpis"}
          </motion.button>
        </div>
        <div className="w-[90%] h-[125px] relative items-center flex flex-col">
          <p className="w-[55%] max-xs:text-lg xs:text-xl sm:text-2xl font-extrabold flex justify-center items-center pb-4 text-white h-[75px] translate-y-6 bg-custom-blue-200 rounded-t-2xl ml-auto">
            {TodayDate()}
          </p>
          <div className="w-full bg-custom-blue-400 flex z-10 max-sm:px-2 sm:px-6 h-[55px] rounded-full">
            <p className="h-full items-center flex text-white max-xs:text-sm xs:text-lg sm:text-xl font-bold">
              Liczba wpisów:
            </p>
            <p className="h-full w-[150px] flex justify-center items-center text-white font-bold max-xs:text-2xl xs:text-3xl sm:text-4xl rounded-full ml-auto bg-custom-blue-500">
              {userAmountOfCreatedForumPosts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPostPageForm;
