import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { decodeImageFile } from "../../helpers/PostManager.js";
import AnimatedPage from "../../animation/AnimatedPage.jsx";
import AdminFormSection from "../../components/form/AdminFormSection.jsx";
import { useMutation } from "react-query";
import {
  fetchHomeNewsPostData,
  handleHomeNewsPostUpdate,
} from "../../helpers/api-integration/NewsPostsHandling.js";
import Spinner from "../../components/universal/Spinner.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

const HomeNewsPostForm = ({ isEditing }) => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();
  const navigate = useNavigate();

  const {
    mutate: fetchCurrentHomeNewsPostData,
    isLoading: fetchingCurrentHomeNewsPostData,
  } = useMutation(
    [`currentHomeNewsPostData${id}`, id, isEditing],
    () => fetchHomeNewsPostData(id),
    {
      onSuccess: (currentHomeNewsPostData) => {
        setCurrentHomeNewsPostData(currentHomeNewsPostData);
      },
    },
  );

  const setCurrentHomeNewsPostData = (currentHomeNewsPostData) => {
    setValue("content", currentHomeNewsPostData.content);
    setValue("image", decodeImageFile(currentHomeNewsPostData.image));
    setCurrentImage(getValues().image);
  };

  useEffect(() => {
    if (isEditing && id) {
      fetchCurrentHomeNewsPostData();
    }
  }, [fetchCurrentHomeNewsPostData, id, isEditing]);

  const { mutate: updateHomeNewsPost, isLoading: updatingHomeNewsPost } =
    useMutation(
      ["updateHomeNewsPost", id],
      () =>
        handleHomeNewsPostUpdate(id, {
          content: getValues().content,
          image: getValues().image,
        }),
      {
        onSuccess: () => {
          toast.success("Zaktualizowano post!");
          navigate(-1);
        },
      },
    );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrentImage(file);
  };

  if (fetchingCurrentHomeNewsPostData || updatingHomeNewsPost) {
    return <Spinner />;
  }

  console.log(errors);
  console.log(getValues());
  console.log(currentImage);

  return (
    <AnimatedPage>
      <div className="w-full font-lato h-auto flex justify-center">
        <AdminFormSection
          cancelLink={-1}
          sendNotification={false}
          submitTitle={"Zaktualizuj Post"}
          handleSubmit={handleSubmit(updateHomeNewsPost)}
        >
          <div className={"w-full flex flex-col gap-3"}>
            <label className="text-xl font-bold mt-6 ml-3">
              {isEditing ? "Zmień zdjęcie:" : "Wybierz zdjęcie:"}
            </label>
            <input
              type="file"
              accept="image/*"
              maxLength={1}
              className="w-full file:w-[25%] file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-lg file:uppercase file:rounded-l-lg file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 rounded-xl"
              onChange={handleFileChange}
              {...register("image", {
                validate: {
                  requiredFile: () => {
                    if (!currentImage) {
                      return "Zdjęcie postu jest wymagane!";
                    }

                    return true;
                  },
                },
              })}
            />
            {errors?.image && (
              <p className="w-full text-center mt-2 text-lg text-red-500 font-bold">
                {errors?.image?.message}
              </p>
            )}
          </div>
          <div className={"w-full h-[450px] flex flex-col gap-3"}>
            <label className="text-xl font-bold mt-6 ml-3">
              {isEditing ? "Zmień treść:" : "Wpisz treść:"}
            </label>
            <textarea
              maxLength={200}
              className={`w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[65%] border-4 rounded-xl border-black resize-none ${errors?.content && "border-red-500"}`}
              {...register("content", {
                required: "Treść postu jest wymagana!",
                validate: {
                  lengthCheck: (value) => {
                    return value.length >= 25 && value.length <= 200
                      ? true
                      : "Treść musi mieć od 20 do 200 znaków!";
                  },
                },
              })}
            ></textarea>
            {errors?.content && (
              <p className="w-full text-center mt-2 text-lg text-red-500 font-bold">
                {errors?.content?.message}
              </p>
            )}
          </div>
        </AdminFormSection>
      </div>
    </AnimatedPage>
  );
};

export default HomeNewsPostForm;
