import React, { useContext, useState } from "react";
import PostBannerWithLogoAndDate from "../universal/PostBannerWithLogoAndDate";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import EditIcon from "../../icons/EditIcon";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "../../icons/DeleteIcon";
import { useMutation, useQueryClient } from "react-query";
import { handleHomeNewsPostDelete } from "../../helpers/api-integration/NewsPostsHandling";
import toast from "react-hot-toast";
import Spinner from "../universal/Spinner";
import { AnimatePresence } from "framer-motion";
import DefaultModal from "../modal/DefaultModal";

const HomeNewsCard = ({ cardData }) => {
  const { role } = useContext(AuthContext);
  const { id, content, author, creationDate, image } = cardData;
  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
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
                onClick={() => setOpenModal(true)}
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
            date={creationDate}
          />
          <p className="mt-4 max-xl:text-xs max-2xl:text-sm text-justify">
            {content}
          </p>
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
                deleteHomePost();
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

export default HomeNewsCard;
