import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import ForumPostItem from "./ForumPostItem";
import { TodayDate } from "../../helpers/Date";
import UserIcon from "../header/icons/UserIcon";
import { useParams } from "react-router-dom";
import DefaultModal from "../modal/DefaultModal";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchPostData,
  handleAddForumPost,
  handleUpdateForumPost,
} from "../../helpers/api-integration/ForumPostsHandling";
import Spinner from "../universal/Spinner";
import { useForm } from "react-hook-form";
import {
  fetchUserAmountOfCreatedForumPosts,
  fetchUserAvatar,
} from "../../helpers/api-integration/UserDataHandling";
import ButtonWithLink from "../universal/ButtonWithLink";

const ForumPostPageForm = () => {
  const { id } = useParams();
  const { username, role } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues, formState, watch } = useForm();
  const { errors } = formState;
  const [optionIndex, setOptionIndex] = React.useState(0);
  const [isEditing, setIsEditing] = React.useState(id !== undefined);
  const [showModal, setShowModal] = useState(false);

  const { data: postToUpdateData, isLoading: fetchingPostData } = useQuery(
    ["postToUpdateData", id],
    () => fetchPostData(id),
    {
      enabled: isEditing === true,
    },
  );

  useEffect(() => {
    if (isEditing) {
      postToUpdateData.postType === "ANONYMOUS"
        ? setOptionIndex(0)
        : setOptionIndex(1);
    }
  }, [id]);

  const { data: userAvatar, isLoading: fetchingUserAvatar } = useQuery(
    ["forumPostForumUserAvatar", username],
    () => fetchUserAvatar(username),
  );

  const {
    data: userAmountOfCreatedPosts,
    isLoading: fetchingAmountOfCreatedUserPosts,
  } = useQuery(["amountOfCreatedUserPosts", username], () =>
    fetchUserAmountOfCreatedForumPosts(username),
  );

  const { mutate: addNewForumPost, isLoading: addingNewForumPost } =
    useMutation({
      mutationKey: ["forumPostsData"],
      mutationFn: () =>
        handleAddForumPost({
          title: getValues().postTitle,
          content: getValues().postContent,
          author: username,
          authorRole: role,
          creationDate: new Date(Date.now()).toISOString(),
          postType: postType,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["forumPostComments"] });
        setShowModal(true);
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
          author: username,
          authorRole: role,
          creationDate: postToUpdateData.creationDate,
          postType: postType,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["forumPostComments"] });
        setShowModal(true);
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
    fetchingUserAvatar ||
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
            defaultValue={isEditing ? postToUpdateData.title : ""}
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
            defaultValue={isEditing ? postToUpdateData.content : ""}
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
            {userAvatar ? (
              <p className="bg-white border-2 border-custom-blue-400 rounded-full flex justify-center items-center size-12">
                <img
                  className="rounded-full inset-0 object-cover size-full"
                  src={`data:image/png;base64,${userAvatar}`}
                  alt={username}
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
            {isEditing ? postToUpdateData.creationDate : TodayDate()}
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
      {showModal && (
        <div className="self-center flex absolute items-center justify-center">
          <DefaultModal
            title={
              isEditing
                ? "Wpis został zaktualizowany!"
                : "Nowy wpis został utworzony!"
            }
            subtitle={"Przejdź na stronę główną forum, aby go zobaczyć."}
            firstButtonLink={"/forum"}
            fistButtonTitle={"Strona Główna Forum"}
            secondButtonLink={"/"}
            secondButtonTitle={"Strona główna"}
          >
            <div className="flex gap-6">
              <ButtonWithLink
                title={"Forum"}
                link={"/forum"}
                className={
                  "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
                }
              />
              <ButtonWithLink
                title={"Strona główna"}
                link={"/"}
                className={
                  "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
                }
              />
            </div>
          </DefaultModal>
        </div>
      )}
    </div>
  );
};

export default ForumPostPageForm;
