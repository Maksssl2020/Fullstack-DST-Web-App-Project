import React, { useContext } from "react";
import UserIcon from "../../header/icons/UserIcon";
import AddInCircleIcon from "../../form/icons/AddInCircleIcon";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import ButtonWithLink from "../../universal/ButtonWithLink";
import Comment from "../../comment/Comment";
import "./ForumPostCardCommentsPanel.css";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchPostUsersComments,
  handleAddComment,
} from "../../../helpers/api-integration/ForumPostsHandling";
import Spinner from "../../universal/Spinner";
import { useForm } from "react-hook-form";

const ForumPostCardCommentsPanel = ({ postId }) => {
  const { isAuthenticated, role, username } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, handleSubmit, resetField, formState, getValues } =
    useForm();
  const { errors } = formState;

  const { data: postComments, isLoading: fetchingPostComments } = useQuery(
    ["forumPostComments", postId],
    () => fetchPostUsersComments(postId),
  );

  const { mutate: addComment, isLoading: addingNewComment } = useMutation({
    mutationFn: () =>
      handleAddComment(postId, {
        content: getValues().commentContent,
        author: username,
        authorRole: role,
        creationDate: new Date().toISOString(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forumPostComments"] });
      resetField("commentContent");
    },
    onError: (error) => console.log(error),
  });

  if (fetchingPostComments || addingNewComment) {
    return <Spinner />;
  }

  return (
    <div className="w-[45%] justify-between flex flex-col h-full p-4 rounded-2xl bg-custom-gray-100">
      <div className="w-full h-[50px] flex text-white font-bold items-center justify-center text-4xl rounded-full bg-custom-blue-400">
        Komentarze
      </div>
      <div className="h-[70%] space-y-4 px-2 w-full overflow-y-scroll">
        {postComments
          .sort((commentA, commentB) => commentA.id - commentB.id)
          .map((commentData) => (
            <Comment
              key={commentData.id}
              commentData={commentData}
              postId={postId}
            />
          ))}
      </div>
      <div className={`h-[65px] relative w-full`}>
        {!isAuthenticated && (
          <ButtonWithLink
            title={"Zaloguj się, żeby napisać komentarz"}
            link={"/sign-in"}
            styling={
              "absolute inset-0 z-10 w-full h-full items-center justify-center flex font-bold uppercase text-xl text-white bg-custom-orange-100 rounded-full"
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
            <button onClick={handleSubmit(addComment)}>
              <AddInCircleIcon size={"size-10"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPostCardCommentsPanel;
