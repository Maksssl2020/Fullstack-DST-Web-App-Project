import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";
import ForumPostItem from "./ForumPostItem.jsx";
import { TodayDate } from "../../helpers/Date.js";
import UserIcon from "../header/icons/UserIcon.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchPostData,
  handleAddForumPost,
  handleUpdateForumPost,
} from "../../helpers/api-integration/ForumPostsHandling.js";
import Spinner from "../universal/Spinner.jsx";
import { useForm } from "react-hook-form";
import {
  fetchUserAmountOfCreatedForumPosts,
  fetchUserDisplayData,
} from "../../helpers/api-integration/UserDataHandling.js";
import toast from "react-hot-toast";

const ForumPostPageForm = ({ isEditing }) => {
  const { id } = useParams();
  const { userId, username } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, setValue, handleSubmit, getValues, formState, watch } =
    useForm();
  const { errors } = formState;
  const [optionIndex, setOptionIndex] = React.useState(0);
  const [postCreationDate, setPostCreationDate] = useState(null);
  const navigate = useNavigate();

  const { mutate: fetchPostDataToUpdate, isLoading: fetchingPostData } =
    useMutation(["postToUpdateData", id], () => fetchPostData(id), {
      onSuccess: (data) => {
        setPostDataToUpdate(data);
      },
    });

  useEffect(() => {
    if (isEditing) {
      fetchPostDataToUpdate();
    }
  }, [fetchPostDataToUpdate, id, isEditing]);

  const setPostDataToUpdate = (postDataToUpdate) => {
    postDataToUpdate?.postType === "ANONYMOUS"
      ? setOptionIndex(0)
      : setOptionIndex(1);

    setValue("postTitle", postDataToUpdate.title);
    setValue("postContent", postDataToUpdate.content);
    setPostCreationDate(postDataToUpdate.creationDate);
  };

  const { data: userDataToDisplay, isLoading: fetchingUserDataToDisplay } =
    useQuery(["forumPostForumUserAvatar", userId], () =>
      fetchUserDisplayData(userId),
    );

  const {
    data: userAmountOfCreatedPosts,
    isLoading: fetchingAmountOfCreatedUserPosts,
  } = useQuery(["amountOfCreatedUserPosts", userId], () =>
    fetchUserAmountOfCreatedForumPosts(userId),
  );

  const { mutate: addNewForumPost, isLoading: addingNewForumPost } =
    useMutation({
      mutationKey: ["forumPostsData"],
      mutationFn: () =>
        handleAddForumPost({
          title: getValues().postTitle,
          content: getValues().postContent,
          postType: postType,
          authorId: userId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(`forumPostComments${id}`);
        toast.success("Utworzono nowy post na forum!");
        navigate(-1);
      },
      onError: (error) => console.log(error),
    });

  const { mutate: updateForumPost, isLoading: updatingForumPost } = useMutation(
    {
      mutationKey: ["forumPostsData"],
      mutationFn: () =>
        handleUpdateForumPost(id, {
          title: getValues().postTitle,
          content: getValues().postContent,
          postType: postType,
          authorId: userId,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries(`forumPostComments${id}`);
        toast.success("Zaktualizowano post na forum!");
        navigate(-1);
      },
      onError: (error) => console.log(error),
    },
  );

  const handleOptionClick = (index) => {
    setOptionIndex(index);
  };

  const postType = optionIndex === 0 ? "ANONYMOUS" : "PUBLIC";
  const postContentLength = watch("postContent", "");

  if (
    addingNewForumPost ||
    updatingForumPost ||
    fetchingPostData ||
    fetchingUserDataToDisplay ||
    fetchingAmountOfCreatedUserPosts
  ) {
    return <Spinner />;
  }

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
            maxLength={55}
            className={`px-4 mb-4 text-xl focus:outline-custom-blue-400 bg-custom-gray-100 w-full rounded-xl h-[50px] ${errors.postTitle && "border-2 border-red-500"}`}
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
          <textarea
            className={`w-full focus:outline-custom-blue-400 h-[325px] p-4 text-xl resize-none rounded-xl bg-custom-gray-100 ${errors.postContent && "border-2 border-red-500 "}`}
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
            <div className="w-[85%] h-[50px] flex items-center justify-center bg-custom-blue-400 rounded-full">
              <p className="text-white text-lg">
                Liczba znaków: {postContentLength.length} / 500
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[35%] relative flex flex-col items-center justify-between py-4 h-full rounded-2xl bg-white">
        <div className="bg-custom-blue-400 px-12 w-[90%] flex items-center justify-center h-[50px] rounded-full">
          <div className="absolute w-[85px] flex items-center justify-center h-[85px] translate-y-4 bg-custom-gray-100 rounded-2xl left-0 translate-x-5">
            {userDataToDisplay ? (
              <p className="bg-white border-2 border-custom-blue-400 rounded-full flex justify-center items-center size-12">
                <img
                  className="rounded-full inset-0 object-cover size-full"
                  src={`data:image/png;base64,${userDataToDisplay.avatar}`}
                  alt={userDataToDisplay.username}
                />
              </p>
            ) : (
              <p className="bg-white border-2 border-custom-blue-400 rounded-full flex justify-center items-center size-12">
                <UserIcon size={"size-8"} />
              </p>
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
            onClick={
              isEditing
                ? handleSubmit(updateForumPost)
                : handleSubmit(addNewForumPost)
            }
            className="w-full h-[75px] uppercase text-2xl bg-custom-blue-500 rounded-full  text-white font-bold"
          >
            {isEditing ? "Zmień wpis" : "dodaj wpis"}
          </button>
        </div>
        <div className="w-[90%] h-[125px] relative items-center flex flex-col">
          <p className="w-[55%] text-2xl font-extrabold flex justify-center items-center pb-4 text-white h-[75px] translate-y-6 bg-custom-blue-200 rounded-t-2xl ml-auto">
            {TodayDate()}
          </p>
          <div className="w-full bg-custom-blue-400 flex z-10 px-6 h-[55px] rounded-full">
            <p className="h-full items-center flex text-white text-xl font-bold">
              Liczba wpisów:
            </p>
            <p className="h-full w-[150px] flex justify-center items-center text-white font-bold text-4xl rounded-full ml-auto bg-custom-blue-500">
              {userAmountOfCreatedPosts}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPostPageForm;
