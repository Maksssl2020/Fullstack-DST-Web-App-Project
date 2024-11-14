import React, { useContext, useState } from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { handleHomeNewsPostDelete } from "../../helpers/api-integration/NewsPostsHandling.js";
import toast from "react-hot-toast";
import Spinner from "../universal/Spinner.jsx";
import AdminOptionsButtons from "../button/AdminOptionsButtons.jsx";

const HomeNewsCard = ({ cardData }) => {
  const { role } = useContext(AuthContext);
  const { id, content, author, creationDate, image, mainArticleId } = cardData;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteHomePost, isLoading: deletingHomePost } = useMutation({
    mutationKey: ["deleteHomePost", id],
    mutationFn: () => handleHomeNewsPostDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries("homeNewsPostsData");
      toast.success("Usunięto post tęczowych wiadomości na stronie głównej!");
    },
    onError: (error) => console.log(error),
  });

  if (deletingHomePost) {
    return <Spinner />;
  }
  return (
    <div className="max-xl:h-[575px] max-xl:w-[325px] max-2xl:h-[650px] max-2xl:w-[375px] 2xl:h-[750px] 2xl:w-[450px] rounded-lg bg-white p-4">
      <div className="h-full w-full rounded-lg bg-custom-gray-100">
        <div
          onClick={() => navigate(`/article/${mainArticleId}`)}
          className="relative hover:cursor-pointer z-20 h-[55%] w-full rounded-lg border-4 border-black bg-custom-gray-100"
        >
          <img
            className="inset-0 z-20 h-full w-full rounded-sm object-cover"
            src={`data:image/png;base64,${image}`}
            alt={author}
          />
          {role === "ADMIN" && (
            <AdminOptionsButtons
              modalSubtitle={"Czy na pewno chesz usunąć post?"}
              deleteFunction={deleteHomePost}
              editButtonLink={`/home-news/edit-post/${id}`}
            />
          )}
        </div>
        <div className="z-10 h-[40%] w-full -translate-y-7 rounded-b-lg bg-custom-gray-100 max-xl:p-4 xl:px-8 xl:py-6">
          <PostBannerWithLogoAndDate
            authorName={"Dwie Strony Tęczy"}
            date={creationDate}
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
