import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import { useQuery } from "react-query";
import { fetchArticleData } from "../helpers/api-integration/ArticleDataHandling.js";
import Spinner from "../components/universal/Spinner.jsx";
import ArticleImageModal from "../components/modal/ArticleImageModal.jsx";
import { AnimatePresence } from "framer-motion";
import FacebookIcon from "../icons/FacebookIcon.jsx";
import InstagramIcon from "../icons/InstagramIcon.jsx";
import XIcon from "../icons/XIcon.jsx";
import YouTubeIcon from "../icons/YouTubeIcon.jsx";
import TikTokIcon from "../icons/TikTokIcon.jsx";
import { AuthContext } from "../helpers/provider/AuthProvider.jsx";
import EditIcon from "../icons/EditIcon.jsx";
import DeleteIcon from "../icons/DeleteIcon.jsx";

const socialMediaIcons = [
  {
    iconName: "facebook",
    icon: <FacebookIcon />,
  },
  {
    iconName: "x",
    icon: <XIcon />,
  },
  {
    iconName: "instagram",
    icon: <InstagramIcon />,
  },
  {
    iconName: "tiktok",
    icon: <TikTokIcon />,
  },
  {
    iconName: "youTube",
    icon: <YouTubeIcon />,
  },
];

const Article = () => {
  const { id } = useParams();
  const { role } = useContext(AuthContext);
  const textAreaRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const navigate = useNavigate();

  const { data: articleData, isLoading: fetchingArticleData } = useQuery(
    [`articlePageData${id}`, id],
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
        <div className="w-[1250px] h-auto mt-8 relative bg-custom-gray-200 flex flex-col p-24 rounded-2xl border-4 border-black">
          {role === "ADMIN" && (
            <div className={"w-auto absolute top-4 right-4 gap-2 flex"}>
              <button
                onClick={() => navigate(`/article/edit-article/${id}`)}
                className={
                  "rounded-full size-12 bg-white flex justify-center items-center border-2 border-black"
                }
              >
                <EditIcon size={"size-8"} />
              </button>
              <button
                className={
                  "rounded-full size-12 bg-white flex justify-center items-center border-2 border-black"
                }
              >
                <DeleteIcon size={"size-8"} />
              </button>
            </div>
          )}
          <div className="w-full h-auto flex flex-col gap-12 text-xl italic font-bold">
            <div className="flex gap-6">
              <p>{articleData.author}</p>
              <p>|</p>
              <p>{articleData.creationDate}</p>
              {articleData?.socialMediaLinks && (
                <div className={"ml-auto flex gap-4"}>
                  {articleData.socialMediaLinks.map((linkData, index) => {
                    const matchingIcon = socialMediaIcons.find((icon) =>
                      linkData.socialMediaName.includes(icon.iconName),
                    );

                    return (
                      <a
                        key={index}
                        href={linkData.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"size-10"}
                      >
                        {matchingIcon ? matchingIcon.icon : null}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>
            <h1 className="mb-6 font-bold italic text-black text-5xl">
              {articleData.title}
            </h1>
          </div>

          <textarea
            ref={textAreaRef}
            value={articleData.content}
            disabled
            className={
              "w-full text-2xl leading-relaxed cursor-text overflow-hidden resize-none rounded-2xl "
            }
          ></textarea>
          <div className={"w-full h-auto grid grid-cols-4 mt-16"}>
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
