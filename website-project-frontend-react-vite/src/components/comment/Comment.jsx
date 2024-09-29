import React, { useContext, useState } from "react";
import UserIcon from "../header/icons/UserIcon.jsx";
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

const Comment = ({ commentData, postId }) => {
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

  return (
    <div className="w-full p-4 h-[150px] justify-between flex items-center rounded-2xl bg-custom-gray-200">
      <div className="w-[100px] h-[115px] gap-2 border-2 flex flex-col justify-center items-center border-custom-blue-400 rounded-2xl">
        <p className="size-12 rounded-full bg-white flex items-center justify-center">
          {userDisplay ? (
            <img
              className="rounded-full inset-0 object-cover size-full"
              src={`data:image/png;base64,${userDisplay.avatar}`}
              alt={authorId}
            />
          ) : (
            <UserIcon size={"size-8"} />
          )}
        </p>
        <p className="font-bold text-sm">{userDisplay.username}</p>
      </div>
      <textarea
        defaultValue={content}
        readOnly={!isEditing}
        className={`w-[65%] focus:outline-none h-full mb-auto bg-transparent text-black resize-none rounded-2xl text-lg placeholder:text-black ${isEditing && "bg-white p-2 focus:outline-custom-blue-500"}`}
        {...register("commentNewContent", {
          required: "Nie można ustawić pustej treści!",
        })}
      ></textarea>
      <div className="flex flex-col gap-2">
        {username === userDisplay.username && (
          <button
            onClick={handleEditClick}
            className="size-8 rounded-full bg-white flex items-center justify-center"
          >
            <EditIcon size={"size-6"} />
          </button>
        )}
        {(username === userDisplay.username || role === "ADMIN") && (
          <button
            onClick={() => setOpenModal(true)}
            className="size-8 rounded-full bg-white flex items-center justify-center"
          >
            <DeleteIcon size={"size-6"} />
          </button>
        )}
        {isEditing && (
          <button
            onClick={handleSubmit((data) =>
              updateForumPostComment(data.commentNewContent),
            )}
            className="size-8 text-white rounded-full bg-custom-blue-500 flex items-center justify-center"
          >
            <AcceptIcon size={"size-6"} />
          </button>
        )}
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
