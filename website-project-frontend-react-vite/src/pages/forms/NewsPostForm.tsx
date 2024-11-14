import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "../../animation/AnimatedPage.jsx";
import Spinner from "../../components/universal/Spinner.jsx";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AdminFormSection from "../../components/form/AdminFormSection.jsx";
import useNewsPost from "../../hooks/queries/useNewsPost.js";
import useUpdateNewsPostMutation from "../../hooks/mutations/useUpdateNewsPostMutation.js";

const NewsPostForm = () => {
  const { id } = useParams();
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const { newsPost, fetchingNewsPost } = useNewsPost(id);
  const { updateNewsPostData, updatingNewsPostData } =
    useUpdateNewsPostMutation(() => {
      toast.success("Zaktualizowano post tęczowych aktualności!");
      navigate("/news");
    });

  if (fetchingNewsPost || updatingNewsPostData) {
    return <Spinner />;
  }

  let contentLength = watch().content?.length;

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminFormSection
          handleSubmit={handleSubmit((data) =>
            updateNewsPostData({
              newsPostId: newsPost.id,
              dataToUpdate: data.content,
            }),
          )}
          submitTitle={"Zaktualizuj post"}
          disabledButton={contentLength < 10}
          cancelLink={"/news"}
        >
          <p className="text-2xl font-bold mt-6 ml-4 mr-auto">
            Edytuj treść posta:
          </p>
          <textarea
            defaultValue={newsPost.content}
            maxLength={300}
            className="w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[450px] border-4 rounded-2xl border-black resize-none"
            {...register("content")}
          />
        </AdminFormSection>
      </div>
    </AnimatedPage>
  );
};

export default NewsPostForm;
