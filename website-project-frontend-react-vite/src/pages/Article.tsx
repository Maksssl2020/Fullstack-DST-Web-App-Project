import React, { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
    <Page className={"flex justify-center"}>
      <div className="lg:p-18 relative mt-8 flex h-auto flex-col rounded-2xl border-4 border-black bg-custom-gray-200 max-xl:w-[900px] max-lg:w-[90%] max-md:w-[95%] max-sm:p-4 sm:p-8 md:p-12 xl:w-[1250px] xl:p-24">
        {role === "ADMIN" && (
          <div className={"mb-12"}>
            <AdminOptionsButtons
              editButtonLink={`/article/edit-article/${id}`}
              modalSubtitle={"Czy na pewno chcesz usunąć artykuł?"}
              deleteFunction={deleteArticle}
            />
          </div>
        )}
        <div className="flex h-auto w-full flex-col gap-12 text-xl font-bold italic">
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
          <h1 className="mb-6 font-bold italic text-black max-xl:text-3xl max-lg:text-2xl max-md:text-xl xl:text-4xl">
            {article.title}
          </h1>
        </div>

        <textarea
          ref={textAreaRef}
          value={article.content}
          disabled
          className={
            "w-full cursor-text resize-none overflow-hidden rounded-2xl leading-relaxed max-xl:text-xl max-lg:text-lg max-md:text-sm xl:text-2xl"
          }
        ></textarea>
        <div className={"mt-16 grid h-auto w-full grid-cols-4"}>
          {article.images.map((image, index) => (
            <div
              key={index}
              onClick={() => {
                selectImage(index);
                setIsModalOpen(true);
              }}
              className="mt-8 rounded-2xl border-black bg-custom-gray-200 max-lg:border-2 max-sm:size-[85px] max-xs:size-[60px] sm:size-[115px] md:size-[135px] lg:size-[185px] lg:border-4 xl:size-[250px]"
            >
              <img
                src={`data:image/png;base64,${image.imageData}`}
                alt={article.title}
                className="inset-0 size-full rounded-xl object-cover hover:cursor-pointer"
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
