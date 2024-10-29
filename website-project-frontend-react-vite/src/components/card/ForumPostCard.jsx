import React from "react";
import ForumPostCardCommentsPanel from "./forum-post-card-items/ForumPostCardCommentsPanel.jsx";
import ForumPostCardMainDataPanel from "./forum-post-card-items/ForumPostCardMainDataPanel.jsx";
import ForumPostModal from "../modal/ForumPostModal.jsx";
import AnimatedCancelButton from "../button/AnimatedCancelButton.jsx";
import { AnimatePresence } from "framer-motion";
import useWindowWidth from "../../hooks/others/useWindowWidth.js";
import AddCommentField from "../comment/AddCommentField.jsx";

const ForumPostCard = ({ postData }) => {
  const width = useWindowWidth();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const isEqualOrGreaterThanScreenSizeXl = width >= 1280;

  return (
    <div className="w-[85%] p-4 max-xl:h-[650px] xl:h-[650px] items-center justify-center flex max-xl:flex-col gap-6 mt-8 bg-custom-blue-200 rounded-2xl">
      <div className={"max-xl:w-full max-xl:h-full xl:w-[55%]  xl:h-full"}>
        <ForumPostCardMainDataPanel
          postData={postData}
          openModalFunction={() => setIsModalOpen(true)}
        />
      </div>
      {isEqualOrGreaterThanScreenSizeXl && (
        <div className={"w-[45%] h-full max-xl:hidden"}>
          <ForumPostCardCommentsPanel postId={postData.id} />
        </div>
      )}

      <AnimatePresence>
        {isModalOpen && (
          <ForumPostModal
            className={
              "max-md:w-[95%] md:w-[650px] lg:w-[750px] h-[95vh] rounded-xl bg-custom-blue-200 p-4 flex flex-col gap-4"
            }
          >
            <div className="w-full min-h-[50px] relative flex text-white font-bold items-center justify-center max-sm:text-xl sm:text-3xl md:text-4xl rounded-full bg-custom-blue-400">
              <p>{postData.title}</p>
              <AnimatedCancelButton
                onClick={() => setIsModalOpen(false)}
                iconSize={"size-6"}
                className={
                  "size-8 absolute right-0 mr-4 text-black bg-white rounded-full flex justify-center items-center"
                }
              />
            </div>
            <div
              className={
                "w-full h-[90vh] overflow-y-auto flex flex-col gap-4 px-2"
              }
            >
              <div className={"w-full min-h-[650px]"}>
                <ForumPostCardMainDataPanel
                  postData={postData}
                  isInModal={true}
                />
              </div>
              <div className={"w-full h-auto"}>
                <ForumPostCardCommentsPanel
                  postId={postData.id}
                  isInModal={true}
                />
              </div>
            </div>
            <AddCommentField className={"min-h-[65px]"} postId={postData.id} />
          </ForumPostModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForumPostCard;
