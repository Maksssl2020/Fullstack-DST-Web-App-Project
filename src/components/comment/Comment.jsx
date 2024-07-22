import React, { useContext, useState } from "react";
import UserIcon from "../header/icons/UserIcon";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import AcceptIcon from "../../icons/AcceptIcon";
import DeleteWarningModal from "../modal/DeleteWarningModal";

const Comment = ({ commentData, handleUpdate, handleDelete }) => {
  const { username, role } = useContext(AuthContext);
  const { id, content, author, authorRole, creationDate } = commentData;
  const [isEditing, setIsEditing] = useState(false);
  const [updateContent, setUpdateContent] = useState(content);
  const [openModal, setOpenModal] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const commentNewData = {
    author: author,
    authorRole: authorRole,
    content: updateContent,
    creationDate: creationDate,
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="w-full p-4 h-[150px] justify-between flex items-center rounded-2xl bg-custom-gray-200">
      <div className="w-[100px] h-[115px] gap-2 border-2 flex flex-col justify-center items-center border-custom-blue-400 rounded-2xl">
        <p className="size-10 rounded-full bg-white flex items-center justify-center">
          <UserIcon size={"size-8"} />
        </p>
        <p className="font-bold text-sm">{author}</p>
      </div>
      <textarea
        value={updateContent}
        onChange={(e) => setUpdateContent(e.target.value)}
        readOnly={!isEditing}
        className={`w-[65%] focus:outline-none h-full mb-auto bg-transparent text-black resize-none rounded-2xl text-lg placeholder:text-black ${isEditing && "bg-white p-2 focus:outline-custom-blue-500"}`}
      >
        {/*{content}*/}
      </textarea>
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
            onClick={() => {
              handleUpdate(id, commentNewData);
              setIsEditing(false);
            }}
            className="size-8 text-white rounded-full bg-custom-blue-500 flex items-center justify-center"
          >
            <AcceptIcon size={"size-6"} />
          </button>
        )}
      </div>
      {openModal && (
        <DeleteWarningModal
          itemId={id}
          handleDeleteFunc={handleDelete}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Comment;
