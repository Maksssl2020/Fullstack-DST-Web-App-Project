import React, { useContext } from "react";
import AnimatedPage from "../../animation/AnimatedPage";
import AdminForumSection from "../../components/form/AdminForumSection";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import { handleSendUserWarn } from "../../helpers/api-integration/UserDataHandling";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../components/universal/Spinner";

const WarnForm = () => {
  const { username } = useContext(AuthContext);
  const { userId, user } = useParams();
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: sendWarnToUser, isLoading: sendingWarnToUser } = useMutation({
    mutationKey: ["sendingWarnToUser", userId],
    mutationFn: () =>
      handleSendUserWarn(userId, {
        author: username,
        message: getValues().warnMessage,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries("allUserNonReadWarns");
      toast.success(`Wysłano warn użytkownikowi ${user}!`);
      navigate(-1);
    },
  });

  if (sendingWarnToUser) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminForumSection
          cancelLink={"/users"}
          handleSubmit={handleSubmit(sendWarnToUser)}
          submitTitle={"Daj Warn"}
        >
          <label className="font-bold text-2xl mr-auto">
            Wpisz treść warna:
          </label>
          <textarea
            className="w-full h-[650px] border-black border-4 bg-white rounded-2xl text-2xl p-4 resize-none focus:border-custom-orange-200 focus:outline-none"
            {...register("warnMessage", {
              required: "Treść warna nie może być pusta!",
            })}
          />
          {errors?.warnMessage?.message && (
            <label className="w-full text-center mt-2 text-lg text-red-500 font-bold">
              {errors?.warnMessage?.message}
            </label>
          )}
        </AdminForumSection>
      </div>
    </AnimatedPage>
  );
};

export default WarnForm;
