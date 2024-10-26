import React, { useContext } from "react";
import UserIcon from "../../header/icons/UserIcon.jsx";
import AddInCircleIcon from "../../form/icons/AddInCircleIcon.jsx";
import { AuthContext } from "../../../context/AuthProvider.jsx";
import ButtonWithLink from "../../universal/ButtonWithLink.jsx";
import Comment from "../../comment/Comment.jsx";
import "./ForumPostCardCommentsPanel.css";
import Spinner from "../../universal/Spinner.jsx";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import useForumPostComments from "../../../hooks/queries/useForumPostComments.js";
import useAddForumPostCommentMutation from "../../../hooks/mutations/useAddForumPostCommentMutation.js";

const ForumPostCardCommentsPanel = ({ postId }) => {
  const { isAuthenticated, role, userId } = useContext(AuthContext);
  const { register, handleSubmit, resetField, formState, getValues } =
    useForm();
  const { errors } = formState;
  const { forumPostComments, fetchingForumPostComments } =
    useForumPostComments(postId);
  const { addForumPostComment, addingForumPostComment } =
    useAddForumPostCommentMutation(postId, userId, () =>
      resetField("commentContent"),
    );

  if (fetchingForumPostComments || addingForumPostComment) {
    return <Spinner />;
  }

  console.log(forumPostComments);

  return (
    <div className="w-[45%] justify-between flex flex-col h-full p-4 rounded-2xl bg-custom-gray-100">
      <div className="w-full h-[50px] flex text-white font-bold items-center justify-center text-4xl rounded-full bg-custom-blue-400">
        Komentarze
      </div>
      <div className="h-[70%] space-y-4 px-2 w-full overflow-y-scroll">
        {forumPostComments?.map((commentData) => (
          <Comment key={postId} commentData={commentData} postId={postId} />
        ))}
      </div>
      <div className={`h-[65px] relative w-full`}>
        {!isAuthenticated && (
          <ButtonWithLink
            title={"Zaloguj się, żeby napisać komentarz"}
            link={"/sign-in"}
            className={
              "absolute inset-0 z-10 w-full h-full items-center justify-center flex font-bold uppercase text-xl text-white bg-custom-orange-200 rounded-full border-4 border-black"
            }
          />
        )}
        <div
          className={`flex h-full border-2 rounded-full w-full ${errors.commentContent && "border-red-500"}`}
        >
          <div className="w-[15%] h-full flex items-center justify-center bg-custom-gray-200 rounded-l-full">
            {role === "ADMIN" ? (
              <img
                className="inset-0 size-12 rounded-full"
                src="/assets/images/website-logo.jpg"
                alt="ADMIN_LOGO"
              />
            ) : (
              <div className="bg-white rounded-full size-12 flex justify-center items-center">
                <UserIcon size="size-8" />
              </div>
            )}
          </div>
          <input
            placeholder={
              errors.commentContent
                ? errors.commentContent.message
                : "Napisz komentarz . . . . . . . "
            }
            className={`h-full focus:outline-none text-xl placeholder:text-black w-[75%] ml-auto bg-custom-gray-200 `}
            {...register("commentContent", {
              required: "Nie można dodać pustego komentarza!",
            })}
          />
          <div className="w-[15%] flex justify-center items-center h-full bg-custom-gray-200 rounded-r-full">
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={handleSubmit((data) =>
                addForumPostComment(data.commentContent),
              )}
            >
              <AddInCircleIcon size={"size-10"} />
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPostCardCommentsPanel;
