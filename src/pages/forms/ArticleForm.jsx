import React, { useContext } from "react";
import AnimatedPage from "../../animation/AnimatedPage";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import FormItem from "../../components/form/FormItem";
import AdminForumSection from "../../components/form/AdminForumSection";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { handleAddNewArticle } from "../../helpers/api-integration/ArticleDataHandling";
import toast from "react-hot-toast";
import Spinner from "../../components/universal/Spinner";

const ArticleForm = () => {
  const { username } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, watch, getValues, reset, formState, handleSubmit } =
    useForm({
      defaultValues: {
        title: "",
        content: "",
        images: [],
      },
    });
  const { errors } = formState;

  const articleData = new FormData();
  articleData.append("title", getValues().title);
  articleData.append("content", getValues().content);
  articleData.append("author", username);
  articleData.append("creationDate", new Date().toISOString());

  Array.from(getValues().images).forEach((image) => {
    articleData.append("images", image);
  });

  const { mutate: addNewArticle, isLoading: addingNewArticle } = useMutation({
    mutationKey: ["addNewArticle", articleData],
    mutationFn: () => handleAddNewArticle(articleData),
    onSuccess: () => {
      queryClient.invalidateQueries("newsSectionPostsData");
      queryClient.invalidateQueries("homeNewsPostsData");
      toast.success("Dodano nowy artykuł!");
      reset();
    },
    onError: (error) => console.log(error),
  });

  const contentLength = watch("content", " ");

  if (addingNewArticle) {
    return <Spinner />;
  }

  const notificationData = {
    message: "Dodano nowy artykuł:",
    notificationContentTitle: getValues().title,
    link: "/news",
  };

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminForumSection
          disabledButton={errors.length > 0}
          handleSubmit={handleSubmit(addNewArticle)}
          submitTitle={"Dodaj artykuł"}
          notificationData={notificationData}
        >
          <FormItem
            labelData={"Wpisz tytuł:"}
            type={"text"}
            containerStyling={
              "w-full h-auto flex flex-col font-bold text-xl gap-2 items-center"
            }
            inputStyling={
              "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
            }
            errors={errors?.title?.message}
            register={{
              ...register("title", {
                required: "Tytuł nie może być pusty!",
              }),
            }}
          />
          <div className={"text-lg font-bold w-full space-y-2"}>
            <label className={"ml-3"}>Wybierz zdjęcia:</label>
            <input
              type={"file"}
              multiple
              className={
                "w-full px-0 file:w-[25%] rounded-2xl file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-sm file:uppercase file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 "
              }
              {...register("images")}
            />
          </div>
          <div className="w-full h-auto">
            <p className="text-2xl font-bold mb-2 mt-6 ml-4">Wpisz treść:</p>
            <textarea
              className={`bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[450px] w-full border-4 rounded-2xl resize-none ${errors?.content?.message ? "border-red-500" : "border-black"}`}
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
          <div className="w-full h-[60px] flex justify-center items-center text-2xl border-4 border-black rounded-2xl  bg-custom-orange-200 text-white font-bold">
            {`Liczba liter: ${contentLength.length}`}
          </div>
        </AdminForumSection>
      </div>
    </AnimatedPage>
  );
};

export default ArticleForm;
