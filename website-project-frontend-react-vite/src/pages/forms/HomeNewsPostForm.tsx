import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "../../animation/AnimatedPage.jsx";
import AdminFormSection from "../../components/form/AdminFormSection.jsx";
import Spinner from "../../components/universal/Spinner.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useHomeNewsPost from "../../hooks/queries/useHomeNewsPost.js";
import useUpdateHomeNewsPostMutation from "../../hooks/mutations/useUpdateHomeNewsPostMutation.js";
import { decodeImageFile } from "../../helpers/PostManager.js";

const HomeNewsPostForm = () => {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();
  const { homeNewsPost, fetchingHomeNewsPost } = useHomeNewsPost(id);
  const { updateHomeNewsPost, updatingHomeNewsPost } =
    useUpdateHomeNewsPostMutation(() => {
      toast.success("Zaktualizowano post!");
      navigate(-1);
    });

  useEffect(() => {
    setValue("content", homeNewsPost?.content);
    setValue("image", decodeImageFile(homeNewsPost?.image));
    setCurrentImage(homeNewsPost?.image);
  }, [homeNewsPost, setValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCurrentImage(file);
  };

  if (fetchingHomeNewsPost || updatingHomeNewsPost) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full font-lato h-auto flex justify-center">
        <AdminFormSection
          cancelLink={-1}
          sendNotification={false}
          submitTitle={"Zaktualizuj Post"}
          handleSubmit={handleSubmit((data) =>
            updateHomeNewsPost({
              homeNewsPostId: id,
              updatedData: {
                content: data.content,
                image: data.image,
              },
            }),
          )}
        >
          <div className={"w-full flex flex-col gap-3"}>
            <label className="text-xl font-bold mt-6 ml-3">
              Zmień zdjęcie:
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
            <label className="text-xl font-bold mt-6 ml-3">Zmień treść:</label>
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
