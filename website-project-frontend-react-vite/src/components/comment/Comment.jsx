import React, { useContext, useState } from "react";
import UserIcon from "../header/icons/UserIcon.jsx";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";
import EditIcon from "../../icons/EditIcon.jsx";
import DeleteIcon from "../../icons/DeleteIcon.jsx";
import AcceptIcon from "../../icons/AcceptIcon.jsx";
import DeleteWarningModal from "../modal/DeleteWarningModal.jsx";
import {
  handleCommentDelete,
  handleCommentUpdate,
} from "../../helpers/api-integration/ForumPostsHandling.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import Spinner from "../universal/Spinner.jsx";
import { fetchUserDisplayData } from "../../helpers/api-integration/UserDataHandling.js";

const Comment = ({ commentData, postId }) => {
  const { username, role } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, handleSubmit, getValues, formState } = useForm();
  const { id, content, authorId } = commentData;
  const [isEditing, setIsEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  console.log(authorId);
  console.log(commentData);

  const { data: userDisplayData, isLoading: fetchingUserDisplayData } =
    useQuery(["forumPostCommentsUserAvatar", authorId], () =>
      fetchUserDisplayData(authorId),
    );

  const { mutate: updateComment, isLoading: updatingComment } = useMutation({
    mutationFn: () =>
      handleCommentUpdate(postId, id, {
        authorId: authorId,
        content: getValues().commentNewContent,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(`forumPostComments${postId}`);
      setIsEditing(false);
    },
    onError: (error) => console.log(error),
  });

  const { mutate: deleteComment, isLoading: deletingComment } = useMutation({
    mutationFn: () => handleCommentDelete(postId, id),
    onSuccess: () => {
      queryClient.invalidateQueries(`forumPostComments${postId}`);
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

  if (updatingComment || fetchingUserDisplayData || deletingComment) {
    return <Spinner />;
  }

  return (
    <div className="w-full p-4 h-[150px] justify-between flex items-center rounded-2xl bg-custom-gray-200">
      <div className="w-[100px] h-[115px] gap-2 border-2 flex flex-col justify-center items-center border-custom-blue-400 rounded-2xl">
        <p className="size-12 rounded-full bg-white flex items-center justify-center">
          {userDisplayData ? (
            <img
              className="rounded-full inset-0 object-cover size-full"
              src={`data:image/png;base64,${userDisplayData.avatar}`}
              alt={authorId}
            />
          ) : (
            <UserIcon size={"size-8"} />
          )}
        </p>
        <p className="font-bold text-sm">{userDisplayData.username}</p>
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
        {username === userDisplayData.username && (
          <button
            onClick={handleEditClick}
            className="size-8 rounded-full bg-white flex items-center justify-center"
          >
            <EditIcon size={"size-6"} />
          </button>
        )}
        {(username === userDisplayData.username || role === "ADMIN") && (
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
