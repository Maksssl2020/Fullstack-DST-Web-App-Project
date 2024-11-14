import React, { useContext, useState } from "react";
import UserIcon from "../../icons/UserIcon.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import EditIcon from "../../icons/EditIcon.jsx";
import DeleteIcon from "../../icons/DeleteIcon.jsx";
import AcceptIcon from "../../icons/AcceptIcon.jsx";
import { useForm } from "react-hook-form";
import Spinner from "../universal/Spinner.jsx";
import useUserDisplay from "../../hooks/queries/useUserDisplay.js";
import useUpdateForumPostCommentMutation from "../../hooks/mutations/useUpdateForumPostCommentMutation.js";
import useDeleteForumPostCommentMutation from "../../hooks/mutations/useDeleteForumPostCommentMutation.js";
import DefaultModal from "../modal/DefaultModal.jsx";
import { AnimatePresence } from "framer-motion";
import IconButton from "../button/IconButton.jsx";

const Comment = ({ commentData, postId, key }) => {
  const { username, role } = useContext(AuthContext);
  const { register, handleSubmit, getValues, formState } = useForm();
  const { id, content, authorId } = commentData;
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { userDisplay, fetchingUserDisplay } = useUserDisplay(authorId);
  const { updateForumPostComment, updatingForumPostComment } =
    useUpdateForumPostCommentMutation(postId, id, () => setIsEditing(false));
  const { deleteForumPostComment, deletingForumPostComment } =
    useDeleteForumPostCommentMutation(postId, id);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  if (
    updatingForumPostComment ||
    fetchingUserDisplay ||
    deletingForumPostComment
  ) {
    return <Spinner />;
  }

  console.log(userDisplay);
  console.log(commentData);

  return (
    <div
      key={key}
      className="w-full max-sm:p-2 sm:p-4 h-[150px] justify-between flex max-sm:flex-col items-center rounded-2xl bg-custom-gray-200"
    >
      <div className="max-sm:w-full sm:w-[100px] sm:h-[115px] gap-2 sm:border-2 flex sm:flex-col sm:justify-center items-center border-custom-blue-400 rounded-2xl">
        <p className="sm:size-12 rounded-full bg-white flex items-center justify-center">
          {userDisplay ? (
            <img
              className="rounded-full inset-0 object-cover max-sm:size-10 sm:size-full"
              src={`data:image/png;base64,${userDisplay?.avatar}`}
              alt={authorId}
            />
          ) : (
            <UserIcon size={"max-sm:size-10 sm:size-8"} />
          )}
        </p>
        <p className="font-bold text-sm">{userDisplay?.username}</p>
      </div>
      <div className={"flex max-sm:w-full sm:w-[65%]"}>
        <textarea
          defaultValue={content}
          readOnly={!isEditing}
          className={`max-sm:w-[95%] w-full focus:outline-none h-full mb-auto bg-transparent text-black resize-none sm:rounded-2xl max-sm:text-sm sm:text-lg placeholder:text-black ${isEditing && "bg-white p-2 focus:outline-custom-blue-500"}`}
          {...register("commentNewContent", {
            required: "Nie można ustawić pustej treści!",
          })}
        ></textarea>
        <div className="flex flex-col gap-2">
          {username === userDisplay?.username && (
            <IconButton onClick={handleEditClick} className="size-8">
              <EditIcon size={"size-6"} />
            </IconButton>
          )}
          {(username === userDisplay?.username || role === "ADMIN") && (
            <IconButton onClick={() => setOpenModal(true)} className="size-8">
              <DeleteIcon size={"size-6"} />
            </IconButton>
          )}
          {isEditing && (
            <IconButton
              onClick={handleSubmit((data) =>
                updateForumPostComment(data.commentNewContent),
              )}
              className="size-8"
            >
              <AcceptIcon size={"size-6"} />
            </IconButton>
          )}
        </div>
      </div>
      <AnimatePresence>
        {openModal && (
          <DefaultModal
            title={"Uwaga!"}
            subtitle={"Czy na pewno chcesz usunąć komentarz?"}
          >
            <button
              onClick={() => {
                deleteForumPostComment();
                setOpenModal(false);
              }}
              className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-2 border-black bg-custom-orange-200 py-1 rounded-full"
            >
              tak
            </button>
            <button
              onClick={() => setOpenModal(false)}
              className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-2 border-black bg-custom-orange-200 py-1 rounded-full"
            >
              nie
            </button>
          </DefaultModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Comment;
