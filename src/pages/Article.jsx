import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatedPage from "../animation/AnimatedPage";
import { useQuery } from "react-query";
import { fetchArticleData } from "../helpers/api-integration/ArticleDataHandling";
import Spinner from "../components/universal/Spinner";
import ArticleImageModal from "../components/modal/ArticleImageModal";
import { AnimatePresence } from "framer-motion";

const Article = () => {
  const { id } = useParams();
  const textAreaRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: articleData, isLoading: fetchingArticleData } = useQuery(
    ["articlePageData", id],
    () => fetchArticleData(id),
  );

  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [articleData?.content]);

  if (fetchingArticleData) {
    return <Spinner />;
  }

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };
  console.log(articleData);

  return (
    <AnimatedPage>
      <div className="w-full h-auto font-lato flex justify-center">
        <div className="w-[1250px] h-auto mt-8 bg-custom-gray-200 flex flex-col p-24 rounded-2xl border-4 border-black">
          <div className="ml-3 w-full h-auto flex flex-col gap-3 text-xl italic font-bold">
            <div className="flex gap-6">
              <p>{articleData.author}</p>
              <p>{articleData.creationDate}</p>
            </div>
            <h1 className="mb-6 font-bold italic text-black text-5xl">
              {articleData.title}
            </h1>
          </div>

          <textarea
            ref={textAreaRef}
            value={articleData.content}
            disabled
            className="w-full bg-white p-6 text-justify text-2xl overflow-hidden resize-none rounded-2xl border-4 border-custom-orange-200 "
          ></textarea>
          <div className={"w-full h-auto grid grid-cols-4"}>
            {articleData.images.map((image, index) => (
              <div
                key={index}
                onClick={() => {
                  selectImage(index);
                  setIsModalOpen(true);
                }}
                className="bg-custom-gray-200 size-[250px] border-4 border-black rounded-2xl mt-8"
              >
                <img
                  src={`data:image/png;base64,${image.imageData}`}
                  alt={articleData.title}
                  className="size-full inset-0 object-cover rounded-xl"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <ArticleImageModal
            setIsOpen={setIsModalOpen}
            selectedImageIndex={selectedImageIndex}
            images={articleData.images}
          />
        )}
      </AnimatePresence>
    </AnimatedPage>
  );
};

export default Article;
