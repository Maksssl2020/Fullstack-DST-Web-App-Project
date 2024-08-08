import React, { useContext, useState } from "react";
import UserIcon from "../header/icons/UserIcon";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import AcceptIcon from "../../icons/AcceptIcon";
import DeleteWarningModal from "../modal/DeleteWarningModal";
import {
  handleCommentDelete,
  handleCommentUpdate,
} from "../../helpers/api-integration/ForumPostsHandling";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import Spinner from "../universal/Spinner";
import { fetchUserAvatar } from "../../helpers/api-integration/UserDataHandling";

const Comment = ({ commentData, postId }) => {
  const { username, role } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues } = useForm();
  const { id, content, author, authorRole, creationDate } = commentData;
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data: userAvatar, isLoading: fetchingUserAvatar } = useQuery(
    ["forumPostCommentsUserAvatar", author],
    () => fetchUserAvatar(author),
  );

  const { mutate: updateComment, isLoading: updatingComment } = useMutation({
    mutationFn: () =>
      handleCommentUpdate(postId, id, {
        author: author,
        authorRole: authorRole,
        content: getValues().commentNewContent,
        creationDate: creationDate,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forumPostComments"] });
      setIsEditing(false);
    },
    onError: (error) => console.log(error),
  });

  const { mutate: deleteComment, isLoading: deletingComment } = useMutation({
    mutationFn: () => handleCommentDelete(postId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forumPostComments"] });
    },
    onError: (error) => console.log(error),
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  if (updatingComment || fetchingUserAvatar || deletingComment) {
    return <Spinner />;
  }

  return (
    <div className="w-full p-4 h-[150px] justify-between flex items-center rounded-2xl bg-custom-gray-200">
      <div className="w-[100px] h-[115px] gap-2 border-2 flex flex-col justify-center items-center border-custom-blue-400 rounded-2xl">
        <p className="size-12 rounded-full bg-white flex items-center justify-center">
          {userAvatar ? (
            <img
              className="rounded-full inset-0 object-cover size-full"
              src={`data:image/png;base64,${userAvatar}`}
              alt={author}
            />
          ) : (
            <UserIcon size={"size-8"} />
          )}
        </p>
        <p className="font-bold text-sm">{author}</p>
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
        {username === author && (
          <button
            onClick={handleEditClick}
            className="size-8 rounded-full bg-white flex items-center justify-center"
          >
            <EditIcon size={"size-6"} />
          </button>
        )}
        {(username === author || role === "ADMIN") && (
          <button
            onClick={handleOpenModal}
            className="size-8 rounded-full bg-white flex items-center justify-center"
          >
            <DeleteIcon size={"size-6"} />
          </button>
        )}
        {isEditing && (
          <button
            onClick={handleSubmit(updateComment)}
            className="size-8 text-white rounded-full bg-custom-blue-500 flex items-center justify-center"
          >
            <AcceptIcon size={"size-6"} />
          </button>
        )}
      </div>
      {openModal && (
        <DeleteWarningModal
          itemId={postId}
          secondItemId={id}
          handleDeleteFunc={deleteComment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Comment;
