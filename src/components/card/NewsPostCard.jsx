import React, { useContext, useState } from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import DeleteWarningModal from "../modal/DeleteWarningModal";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";

const NewsPostCard = ({ height, backgroundColor, cardData, handleDelete }) => {
  const { role } = useContext(AuthContext);
  const { id, content, author, creationDate } = cardData;
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    setOpenModal(true);
  };

  const handleCancelDeleteClick = () => {
    setOpenModal(false);
  };

  return (
    <div
      style={{ height: `${Number.parseFloat(height)}px` }}
      className="w-[400px] relative bg-white rounded-lg p-2 "
    >
      <div className={`size-full rounded-lg flex ${backgroundColor}`}>
        <div className="w-full h-[65%] flex justify-center absolute rounded-lg group inset-0">
          {role === "ADMIN" && (
            <div className="flex mt-4 gap-4 transition-opacity duration-300">
              <button
                onClick={() => navigate(`/news/edit-post/${id}`)}
                className="z-10 size-14 rounded-full text-black flex justify-center items-center bg-white  opacity-0 group-hover:opacity-100"
              >
                <EditIcon size={"size-12"} />
              </button>
              <button
                onClick={handleDeleteClick}
                className="z-10 size-14 text-black text-3xl bg-white flex justify-center items-center rounded-full opacity-0 group-hover:opacity-100"
              >
                <DeleteIcon size={"size-12"} />
              </button>
            </div>
          )}
        </div>
        <div className="w-full z-10 p-5 flex flex-col min-h-[275px] h-auto rounded-lg mt-auto bg-custom-gray-100">
          <PostBannerWithLogoAndDate authorName={author} date={creationDate} />
          <p className="text-justify mt-6">{content}</p>
        </div>
      </div>
      {openModal && (
        <DeleteWarningModal
          itemId={id}
          handleDeleteFunc={handleDelete}
          onClose={handleCancelDeleteClick}
        />
      )}
    </div>
  );
};

export default NewsPostCard;
