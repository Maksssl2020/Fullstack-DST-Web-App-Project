import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import AnimatedPage from "../../animation/AnimatedPage";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchNewsPostDataByPostId,
  handleNewsPostUpdate,
} from "../../helpers/api-integration/NewsPostsHandling";
import Spinner from "../../components/universal/Spinner";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import AdminForumSection from "../../components/form/AdminForumSection";

const NewsPostForm = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { register, getValues, handleSubmit, formState, watch } = useForm();
  const navigate = useNavigate();

  const { data: postData, isLoading: fetchingPostData } = useQuery(
    ["newsPostDataToUpdate", id],
    () => fetchNewsPostDataByPostId(id),
  );

  const { mutate: updatePostData, isLoading: updatingPostData } = useMutation({
    mutationKey: ["updateNewsPostData", id],
    mutationFn: () => handleNewsPostUpdate(id, getValues().content),
    onSuccess: () => {
      queryClient.invalidateQueries("newsSectionPostsData");
      queryClient.invalidateQueries("newsPostDataToUpdate");
      toast.success("Zaktualizowano post tęczowych aktualności!");
      navigate("/news");
    },
    onError: (error) => console.log(error),
  });

  if (fetchingPostData || updatingPostData) {
    return <Spinner />;
  }

  let contentLength = watch().content?.length;

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminForumSection
          handleSubmit={handleSubmit(updatePostData)}
          submitTitle={"Zaktualizuj post"}
          disabledButton={contentLength < 10}
          cancelLink={"/news"}
        >
          <p className="text-2xl font-bold mt-6 ml-4 mr-auto">
            Edytuj treść posta:
          </p>
          <textarea
            defaultValue={postData.content}
            maxLength={300}
            className="w-full bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl h-[450px] border-4 rounded-2xl border-black resize-none"
            {...register("content")}
          />
        </AdminForumSection>
      </div>
    </AnimatedPage>
  );
};

export default NewsPostForm;
