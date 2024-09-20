import React, { useContext, useState } from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate.jsx";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";
import { useNavigate } from "react-router-dom";
import DeleteWarningModal from "../modal/DeleteWarningModal.jsx";
import EditIcon from "../../icons/EditIcon.jsx";
import DeleteIcon from "../../icons/DeleteIcon.jsx";
import { useMutation, useQueryClient } from "react-query";
import { handleNewsPostDelete } from "../../helpers/api-integration/NewsPostsHandling.js";
import toast from "react-hot-toast";
import Spinner from "../universal/Spinner.jsx";
import DefaultModal from "../modal/DefaultModal.jsx";
import { AnimatePresence } from "framer-motion";

const NewsPostCard = ({ height, backgroundColor, cardData }) => {
  const { role } = useContext(AuthContext);
  const { id, content, author, creationDate, mainArticleId } = cardData;
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const { mutate: deleteNewsPost, isLoading: deletingNewsPost } = useMutation({
    mutationKey: ["deletingNewsPost", id],
    mutationFn: () => handleNewsPostDelete(id),
    onSuccess: () => {
      queryClient.invalidateQueries("newsSectionPostsData");
      toast.success("Usunięto post z tęczowych wiadomości!");
    },
    onError: (error) => console.log(error),
  });

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
            <div className="flex mt-4 gap-4 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/news/edit-post/${id}`);
                }}
                className="z-10 size-14 rounded-full text-black flex justify-center items-center bg-white  opacity-0 group-hover:opacity-100"
              >
                <EditIcon size={"size-12"} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenModal(true);
                }}
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
      <AnimatePresence>
        {openModal && (
          <DefaultModal
            title="UWAGA!"
            subtitle="Czy na pewno chcesz usunąć post?"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteNewsPost();
                setOpenModal(false);
              }}
              className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-4 border-black bg-custom-orange-200 py-1 rounded-full"
            >
              tak
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(false);
              }}
              className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-4 border-black bg-custom-orange-200 py-1 rounded-full"
            >
              nie
            </button>
          </DefaultModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NewsPostCard;
