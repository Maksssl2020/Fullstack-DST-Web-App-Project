import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import ArticleImageModal from "../components/modal/ArticleImageModal.jsx";
import { AnimatePresence } from "framer-motion";
import FacebookIcon from "../icons/FacebookIcon.jsx";
import InstagramIcon from "../icons/InstagramIcon.jsx";
import XIcon from "../icons/XIcon.jsx";
import YouTubeIcon from "../icons/YouTubeIcon.jsx";
import TikTokIcon from "../icons/TikTokIcon.jsx";
import { AuthContext } from "../context/AuthProvider.jsx";
import AdminOptionsButtons from "../components/button/AdminOptionsButtons.jsx";
import toast from "react-hot-toast";
import useArticle from "../hooks/queries/useArticle.js";
import useDeleteArticleMutation from "../hooks/mutations/useDeleteArticleMutation.js";
import Page from "../components/section/Page.jsx";

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
  const { article, fetchingArticle } = useArticle(id);
  const { deleteArticle, deletingArticle } = useDeleteArticleMutation(
    id,
    () => {
      toast.success("Usunięto artykuł!");
      navigate(-1);
    },
  );

  useEffect(() => {
    const adjustTextAreaHeight = () => {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = "auto";
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    };

    adjustTextAreaHeight();
    window.addEventListener("resize", adjustTextAreaHeight);

    return () => {
      window.removeEventListener("resize", adjustTextAreaHeight);
    };
  }, [article?.content]);

  if (fetchingArticle) {
    return <Spinner />;
  }

  const selectImage = (index) => {
    setSelectedImageIndex(index);
  };
  console.log(article);

  if (fetchingArticle || deletingArticle) {
    return <Spinner />;
  }

  return (
    <Page className={"justify-center flex"}>
      <div className="max-md:w-[95%] max-lg:w-[90%] max-xl:w-[900px] xl:w-[1250px] h-auto mt-8 relative bg-custom-gray-200 flex flex-col max-sm:p-4 sm:p-8 md:p-12 lg:p-18 xl:p-24 rounded-2xl border-4 border-black">
        {role === "ADMIN" && (
          <div className={"mb-12"}>
            <AdminOptionsButtons
              editButtonLink={`/article/edit-article/${id}`}
              modalSubtitle={"Czy na pewno chcesz usunąć artykuł?"}
              deleteFunction={deleteArticle}
            />
          </div>
        )}
        <div className="w-full h-auto flex flex-col gap-12 text-xl italic font-bold">
          <div className="flex gap-6">
            <p>{article.author}</p>
            <p>|</p>
            <p>{article.creationDate}</p>
            {article?.socialMediaLinks && (
              <div className={"ml-auto flex gap-4"}>
                {article.socialMediaLinks.map((linkData, index) => {
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
          <h1 className="mb-6 font-bold italic text-black max-md:text-xl max-lg:text-2xl max-xl:text-3xl xl:text-4xl">
            {article.title}
          </h1>
        </div>

        <textarea
          ref={textAreaRef}
          value={article.content}
          disabled
          className={
            "w-full max-md:text-sm max-lg:text-lg max-xl:text-xl xl:text-2xl leading-relaxed cursor-text overflow-hidden resize-none rounded-2xl"
          }
        ></textarea>
        <div className={"w-full h-auto grid grid-cols-4 mt-16"}>
          {article.images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                selectImage(index);
                setIsModalOpen(true);
              }}
              className="bg-custom-gray-200 max-xs:size-[60px] max-sm:size-[85px] sm:size-[115px] md:size-[135px] lg:size-[185px] xl:size-[250px] max-lg:border-2 lg:border-4 border-black rounded-2xl mt-8"
            >
              <img
                src={`data:image/png;base64,${image.imageData}`}
                alt={article.title}
                className="size-full inset-0 object-cover rounded-xl hover:cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <ArticleImageModal
            setIsOpen={setIsModalOpen}
            selectedImageIndex={selectedImageIndex}
            images={article.images}
          />
        )}
      </AnimatePresence>
    </Page>
  );
};

export default Article;
