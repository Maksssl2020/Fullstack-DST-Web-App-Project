import React, { useContext, useState } from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import Spinner from "../universal/Spinner.jsx";
import useDeleteNewsPostMutation from "../../hooks/mutations/useDeleteNewsPostMutation.js";
import AdminOptionsButtons from "../button/AdminOptionsButtons.jsx";

const NewsPostCard = ({ height, backgroundColor, cardData }) => {
  const { role } = useContext(AuthContext);
  const { id, content, author, creationDate, mainArticleId } = cardData;
  const navigate = useNavigate();
  const { deleteNewsPost, deletingNewsPost } = useDeleteNewsPostMutation(id);

  if (deletingNewsPost) {
    return <Spinner />;
  }

  return (
    <div
      style={{ height: `${Number.parseFloat(height)}px` }}
      className="w-[400px] relative bg-white rounded-lg p-2 hover:cursor-pointer"
      onClick={() => navigate(`/article/${mainArticleId}`)}
    >
      <div className={`size-full rounded-lg flex ${backgroundColor}`}>
        <div className="w-full h-[65%] a z-10 flex justify-center absolute rounded-lg group inset-0">
          {role === "ADMIN" && (
            <AdminOptionsButtons
              deleteFunction={deleteNewsPost}
              editButtonLink={`/news/edit-post/${id}`}
              buttonSize={"size-12"}
              iconSize={"size-8"}
              modalSubtitle={"Czy na pewno chcesz usunąć post?"}
            />
          )}
        </div>
        <div className="w-full z-10 p-5 flex flex-col min-h-[275px] h-auto rounded-lg mt-auto bg-custom-gray-100">
          <PostBannerWithLogoAndDate authorName={author} date={creationDate} />
          <p className="text-justify mt-6">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default NewsPostCard;
