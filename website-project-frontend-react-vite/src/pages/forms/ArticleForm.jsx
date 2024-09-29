import React, { useContext, useEffect, useState } from "react";
import AnimatedPage from "../../animation/AnimatedPage.jsx";
import { AuthContext } from "../../context/AuthProvider.jsx";
import FormItem from "../../components/form/FormItem.jsx";
import AdminFormSection from "../../components/form/AdminFormSection.jsx";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import {
  fetchArticleData,
  handleAddNewArticle,
  handleUpdateArticle,
} from "../../helpers/api-integration/ArticleDataHandling.js";
import toast from "react-hot-toast";
import Spinner from "../../components/universal/Spinner.jsx";
import FacebookIcon from "../../icons/FacebookIcon.jsx";
import XIcon from "../../icons/XIcon.jsx";
import InstagramIcon from "../../icons/InstagramIcon.jsx";
import TikTokIcon from "../../icons/TikTokIcon.jsx";
import YouTubeIcon from "../../icons/YouTubeIcon.jsx";
import { useNavigate, useParams } from "react-router-dom";
import ItemCurrentImages from "../../components/list/ItemCurrentImages.jsx";
import { decodeImageFile } from "../../helpers/PostManager.js";

const socialMediaIcons = [
  {
    dataName: "facebookLink",
    icon: <FacebookIcon className={"size-12"} />,
  },
  {
    dataName: "xLink",
    icon: <XIcon className={"size-12"} />,
  },
  {
    dataName: "instagramLink",
    icon: <InstagramIcon className={"size-12"} />,
  },
  {
    dataName: "tikTokLink",
    icon: <TikTokIcon className={"size-12"} />,
  },
  {
    dataName: "youTubeLink",
    icon: <YouTubeIcon className={"size-12"} />,
  },
];

const ArticleForm = ({ isEditing = false }) => {
  const { id } = useParams();
  const { username } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [sendNotification, setSendNotification] = useState(false);
  const {
    register,
    watch,
    getValues,
    reset,
    formState,
    handleSubmit,
    setValue,
  } = useForm({
    defaultValues: {
      title: "",
      content: "",
      images: [],
    },
  });
  const [articleImages, setArticleImages] = React.useState([]);
  const { errors } = formState;
  const articleData = new FormData();
  const navigate = useNavigate();

  const {
    mutate: fetchArticleCurrentData,
    isLoading: fetchingArticleCurrentData,
  } = useMutation([`articleCurrentData${id}`, id], () => fetchArticleData(id), {
    onSuccess: (articleCurrentData) => {
      setCurrentArticleDataInInputs(articleCurrentData);
    },
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchArticleCurrentData();
    }
  }, [fetchArticleCurrentData, id, isEditing]);

  const setCurrentArticleDataInInputs = (articleCurrentData) => {
    console.log(articleCurrentData);

    const decodedImages = articleCurrentData?.images?.map((value) =>
      decodeImageFile(value.imageData),
    );
    setArticleImages(decodedImages);

    setValue("title", articleCurrentData.title);
    setValue("author", articleCurrentData.author);
    setValue("content", articleCurrentData.content);
    setValue("images", decodedImages);

    articleCurrentData?.socialMediaLinks.forEach((link) => {
      setValue(link.socialMediaName, link.url);
    });
    console.log(getValues());
  };

  const { mutate: addOrUpdateArticle, isLoading: addingOrUpdatingNewArticle } =
    useMutation({
      mutationKey: ["addOrUpdateNewArticle", articleData],
      mutationFn: () => {
        if (isEditing) {
          return handleUpdateArticle(id, articleData);
        } else {
          return handleAddNewArticle(articleData);
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries("newsSectionPostsData");
        queryClient.invalidateQueries("homeNewsPostsData");
        toast.success(
          isEditing ? "Zaktualizowano artykuł!" : "Dodano nowy artykuł!",
        );
        if (!isEditing) {
          setSendNotification(true);
        } else {
          navigate(-1);
          queryClient.invalidateQueries(`articlePageData${id}`);
          queryClient.invalidateQueries(`articleCurrentData${id}`);
        }
        reset();
      },
      onError: (error) => console.log(error),
    });

  const contentLength = watch("content", " ");

  if (addingOrUpdatingNewArticle || fetchingArticleCurrentData) {
    return <Spinner />;
  }

  const prepareDataToSend = () => {
    const values = getValues();
    articleData.append("title", values.title);
    articleData.append("content", values.content);

    articleData.append("author", username);

    Array.from(values.images).forEach((image) => {
      articleData.append("images", image);
    });

    const socialMediaLinks = {};
    Object.entries(values)
      .filter(([key]) => key.includes("Link"))
      .filter(([key, value]) => value !== "")
      .forEach(([key, value]) => {
        socialMediaLinks[key] = value;
      });

    console.log(socialMediaLinks);

    articleData.append(
      "socialMediaLinksJson",
      JSON.stringify(socialMediaLinks),
    );
  };

  const notificationData = {
    message: "Dodano nowy artykuł:",
    notificationContentTitle: getValues().title,
    link: "/news",
  };

  console.log(getValues());

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminFormSection
          disabledButton={errors.length > 0}
          handleSubmit={handleSubmit(() => {
            prepareDataToSend();
            addOrUpdateArticle();
          })}
          submitTitle={isEditing ? "Zaktualizuj artykuł" : "Dodaj artykuł"}
          notificationData={notificationData}
          onSuccess={sendNotification}
        >
          <FormItem
            labelData={"Wpisz tytuł:"}
            type={"text"}
            containerStyling={
              "w-full h-auto flex flex-col font-bold text-xl gap-2 items-center"
            }
            inputStyling={
              "border-4 border-black px-2 h-[50px] rounded-xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
            }
            errors={errors?.title?.message}
            register={{
              ...register("title", {
                required: "Tytuł nie może być pusty!",
              }),
            }}
          />
          {isEditing && <ItemCurrentImages images={articleImages} />}
          <div className={"text-lg font-bold w-full space-y-2"}>
            <label className={"ml-3 text-xl"}>Wybierz zdjęcia:</label>
            <input
              type={"file"}
              multiple
              className={
                "w-full px-0 file:w-[25%] rounded-xl file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-sm file:uppercase file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 "
              }
              {...register("images")}
            />
          </div>
          <div className={"w-full flex flex-col gap-4"}>
            <label className={"ml-3 font-bold text-xl"}>
              Wprowadź linki powiązane z artykułem ( opcjonalne ):
            </label>
            <ul
              className={
                "flex flex-col w-full h-auto gap-8 px-4 py-8 rounded-xl border-4 border-black"
              }
            >
              {socialMediaIcons.map((data, index) => (
                <li key={index} className={"w-full flex gap-4"}>
                  <p>{data.icon}</p>
                  <input
                    type={"text"}
                    className={
                      "border-2 focus:border-custom-orange-200 w-full focus:outline-none border-black px-2 h-[50px] rounded-xl text-lg flex text-black bg-custom-gray-200 "
                    }
                    {...register(data.dataName)}
                  />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-full h-auto">
            <p className="text-xl font-bold mb-2 mt-6 ml-4">Wpisz treść:</p>
            <textarea
              className={`bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[450px] w-full border-4 rounded-xl resize-none ${errors?.content?.message ? "border-red-500" : "border-black"}`}
              {...register("content", {
                required: "Treść nie może być pusta!",
              })}
            />
            {errors?.content?.message && (
              <p className="w-full text-center mt-2 text-lg text-red-500 font-bold">
                {errors?.content?.message}
              </p>
            )}
          </div>
          <div className="w-full h-[60px] flex justify-center items-center text-2xl border-4 border-black rounded-xl  bg-custom-orange-200 text-white font-bold">
            {`Liczba liter: ${contentLength.length}`}
          </div>
        </AdminFormSection>
      </div>
    </AnimatedPage>
  );
};

export default ArticleForm;
