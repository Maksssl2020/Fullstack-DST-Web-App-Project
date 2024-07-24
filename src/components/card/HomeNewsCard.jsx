import React, { useContext, useState } from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import EditIcon from "../../icons/EditIcon";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../icons/DeleteIcon";

const HomeNewsCard = ({ cardData, handleDelete, handleModalOpen }) => {
  const { role } = useContext(AuthContext);
  const { id, content, author, creationDate, image } = cardData;
  const navigate = useNavigate();

  return (
    <div className="max-xl:h-[575px] max-xl:w-[325px] max-2xl:h-[650px] max-2xl:w-[375px] 2xl:h-[750px] 2xl:w-[450px] rounded-lg bg-white p-4">
      <div className="h-full w-full rounded-lg bg-custom-gray-100">
        <div className="relative z-20 h-[55%] w-full rounded-lg border-4 border-black bg-custom-gray-100">
          <img
            className="inset-0 z-20 h-full w-full rounded-lg object-cover"
            src={`data:image/png;base64,${image}`}
            alt={author}
          />
          {role === "ADMIN" && (
            <div className="absolute inset-0 mx-2 my-2 flex gap-2">
              <button
                onClick={() => navigate(`/home-news/edit-post/${id}`)}
                className="max-xl:border-2 xl:border-4 border-black max-xl:size-12 xl:size-16 bg-white rounded-full flex items-center justify-center"
              >
                <EditIcon size={"max-xl:size-8 xl:size-12"} />
              </button>
              <button
                onClick={() => {
                  handleModalOpen();
                  handleDelete(id);
                }}
                className="max-xl:border-2 xl:border-4 border-black max-xl:size-12 xl:size-16 bg-white rounded-full flex items-center justify-center"
              >
                <DeleteIcon size={"max-xl:size-8 xl:size-12"} />
              </button>
            </div>
          )}
        </div>
        <div className="z-10 h-[40%] w-full -translate-y-7 rounded-b-lg bg-custom-gray-100 max-xl:p-4 xl:px-8 xl:py-6">
          <PostBannerWithLogoAndDate
            authorName={"Dwie Strony Tęczy"}
            date={"09.02.2024"}
          />
          <p className="mt-4 max-xl:text-xs max-2xl:text-sm text-justify">
            {content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeNewsCard;
