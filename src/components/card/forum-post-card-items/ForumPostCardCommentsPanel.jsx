import React, { useContext, useEffect } from "react";
import UserIcon from "../../header/icons/UserIcon";
import AddInCircleIcon from "../../form/icons/AddInCircleIcon";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import ButtonWithLink from "../../universal/ButtonWithLink";
import Comment from "../../comment/Comment";
import "./ForumPostCardCommentsPanel.css";
import axios from "../../../helpers/AxiosConfig";

const ForumPostCardCommentsPanel = ({ postId }) => {
  const { isAuthenticated, role, username } = useContext(AuthContext);
  const [comments, setComments] = React.useState([]);
  const [newCommentContent, setNewCommentContent] = React.useState("");
  const [errors, setErrors] = React.useState({});

  useEffect(() => {
    try {
      axios.get(`/comments/post/${postId}`).then((response) => {
        setComments(response.data);
        console.log(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`/comments/post/${postId}/add-comment`, {
        content: newCommentContent,
        author: username,
        authorRole: role,
      });

      setErrors({});
      setNewCommentContent("");
    } catch (error) {
      const validationErrors = error.response?.data?.validationErrors || {};
      setErrors({
        content: validationErrors.content
          ? "Nieprawidłowa treść komentarza!"
          : "",
      });
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentUpdate = async (id, commentNewData) => {
    try {
      await axios.put(
        `/comments/post/${postId}/edit-comment/${id}`,
        commentNewData,
      );
      const commentsCopy = [...comments];
      const commentIndex = commentsCopy.findIndex(
        (comment) => comment.id === id,
      );
      commentsCopy[commentIndex] = {
        content: commentNewData.content,
        author: commentNewData.author,
        authorRole: commentNewData.authorRole,
      };
      setComments(commentsCopy);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteComment = async (id, onClose) => {
    try {
      await axios.delete(`/comments/post/${postId}/delete-comment/${id}`);
      const commentsCopy = comments.filter((comment) => comment.id !== id);
      setComments(commentsCopy);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[45%] justify-between flex flex-col h-full p-4 rounded-2xl bg-custom-gray-100">
      <div className="w-full h-[50px] flex text-white font-bold items-center justify-center text-4xl rounded-full bg-custom-blue-400">
        Komentarze
      </div>
      <div className="h-[70%] space-y-4 px-2 w-full overflow-y-scroll">
        {comments.map((commentData) => (
          <Comment
            key={commentData.id}
            commentData={commentData}
            handleUpdate={handleCommentUpdate}
            handleDelete={handleDeleteComment}
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
          className={`flex h-full border-2 rounded-full w-full ${errors.content && "border-red-500"}`}
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
            value={newCommentContent}
            onChange={(event) => setNewCommentContent(event.target.value)}
            placeholder={
              errors.content
                ? errors.content
                : "Napisz komentarz . . . . . . . "
            }
            className={`h-full focus:outline-none text-xl placeholder:text-black w-[75%] ml-auto bg-custom-gray-200 `}
          />
          <div className="w-[15%] flex justify-center items-center h-full bg-custom-gray-200 rounded-r-full">
            <button onClick={handleAddComment}>
              <AddInCircleIcon size={"size-10"} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPostCardCommentsPanel;
