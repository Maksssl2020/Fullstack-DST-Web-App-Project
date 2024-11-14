import React, { useContext, useState } from "react";
import UserIcon from "../../../icons/UserIcon.jsx";
import EditIcon from "../../../icons/EditIcon.jsx";
import { AuthContext } from "../../../context/AuthProvider.jsx";
import DeleteIcon from "../../../icons/DeleteIcon.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../../universal/Spinner.jsx";
import { DateTimeParser } from "../../../helpers/Date.js";
import useUserDisplay from "../../../hooks/queries/useUserDisplay.js";
import useDeleteForumPostMutation from "../../../hooks/mutations/useDeleteForumPostMutation.js";
import DefaultModal from "../../modal/DefaultModal.jsx";
import { AnimatePresence } from "framer-motion";
import CommentIconFilled from "../../../icons/CommentIconFilled.jsx";
import CommentIconNonFilled from "../../../icons/CommentIconNonFilled.jsx";
import IconButton from "../../button/IconButton.jsx";

const ForumPostCardMainDataPanel = ({
  postData,
  isInModal,
  openModalFunction,
}) => {
  const { username, role } = useContext(AuthContext);
  const { id, title, content, creationDate, postType, authorId } = postData;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const { userDisplay, fetchingUserDisplay } = useUserDisplay(authorId);
  const { deleteForumPost, deletingForumPost } = useDeleteForumPostMutation(id);

  if (deletingForumPost || fetchingUserDisplay) {
    return <Spinner />;
  }

  return (
    <div className="justify-between h-full rounded-2xl flex flex-col items-center p-4 bg-custom-gray-100">
      {!isInModal && (
        <div className="w-full h-[50px] flex text-white font-bold items-center justify-center max-sm:text-xl sm:text-3xl md:text-4xl rounded-full bg-custom-blue-400">
          {title}
        </div>
      )}
      <textarea
        readOnly
        className="w-full resize-none focus:outline-none hover:cursor-auto max-md:p-2 md:p-4 max-sm:text-lg sm:text-xl h-[60%] bg-custom-gray-200 rounded-xl"
      >
        {content}
      </textarea>
      <div className="w-full relative flex flex-col h-[100px]">
        <p className="w-[55%] text-white flex justify-center absolute rounded-2xl right-0 h-[75px] max-sm:pt-1 max-sm:text-lg sm:pt-1 md:pb-4 sm:text-xl md:text-2xl font-bold bg-custom-blue-200">
          {DateTimeParser(creationDate)}
        </p>
        <div className="z-10 text-white max-sm:text-lg sm:text-2xl md:text-4xl font-bold mt-auto bg-custom-blue-400 flex px-2 items-center h-[65px] rounded-full">
          <p className="bg-white text-black mr-4 border-2 border-custom-blue-400 rounded-full flex justify-center items-center max-sm:size-10 sm:size-12 md:size-14">
            {userDisplay && postType !== "ANONYMOUS" ? (
              <img
                className="rounded-full inset-0 object-cover size-full"
                src={`data:image/png;base64,${userDisplay.avatar}`}
                alt={userDisplay.username}
              />
            ) : (
              <UserIcon size={"max-md:size-6 md:size-8"} />
            )}
          </p>
          {postType === "PUBLIC" ? userDisplay.username : "Anonimowy"}
          <div className="ml-auto flex items-center max-md:gap-1 md:gap-2">
            {username === userDisplay.username && (
              <IconButton
                onClick={() => navigate(`/forum/edit-post/${id}`)}
                className={"max-md:size-8 md:size-10"}
              >
                <EditIcon size={"max-md:size-6 md:size-8"} />
              </IconButton>
            )}
            {(username === userDisplay.username || role === "ADMIN") && (
              <IconButton
                onClick={() => setOpenModal(true)}
                className={"max-md:size-8 md:size-10"}
              >
                <DeleteIcon size={"max-md:size-6 md:size-8"} />
              </IconButton>
            )}
            <IconButton
              onClick={openModalFunction}
              className={"max-md:size-8 md:size-10"}
            >
              <CommentIconNonFilled className={"max-md:size-6 md:size-8"} />
            </IconButton>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {openModal && (
          <DefaultModal
            title={"Uwaga!"}
            subtitle={"Czy na pewno chcesz usunąć post?"}
          >
            <button
              onClick={() => {
                deleteForumPost(id);
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

export default ForumPostCardMainDataPanel;
