import React from "react";
import useAuthentication from "../../hooks/others/useAuthentication.js";
import ButtonWithLink from "../universal/ButtonWithLink.jsx";
import { useForm } from "react-hook-form";
import useAddForumPostCommentMutation from "../../hooks/mutations/useAddForumPostCommentMutation.js";
import AddInCircleIcon from "../form/icons/AddInCircleIcon.jsx";
import UserIcon from "../../icons/UserIcon.jsx";
import { motion } from "framer-motion";
import Spinner from "../universal/Spinner.jsx";

const AddCommentField = ({ postId, className }) => {
  const { isAuthenticated, userId, role } = useAuthentication();
  const { register, handleSubmit, resetField, formState, getValues } =
    useForm();
  const { errors } = formState;
  const { addForumPostComment, addingForumPostComment } =
    useAddForumPostCommentMutation(postId, userId, () =>
      resetField("commentContent"),
    );

  if (addingForumPostComment) {
    return <Spinner />;
  }

  return (
    <div className={`relative ${className}`}>
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
              className="inset-0 max-sm:size-8 sm:size-10 md:size-12 rounded-full"
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
          className={`h-full focus:outline-none max-sm:text-lg sm:text-xl placeholder:text-black w-[75%] ml-auto bg-custom-gray-200 `}
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
            <AddInCircleIcon size={"max-sm:size-8 sm:size-10 md:size-12"} />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default AddCommentField;
