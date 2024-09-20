import React, { useContext } from "react";
import AnimatedPage from "../../animation/AnimatedPage.jsx";
import AdminForumSection from "../../components/form/AdminForumSection.jsx";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";
import { handleSendUserMessage } from "../../helpers/api-integration/UserDataHandling.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../components/universal/Spinner.jsx";

const MessageForm = () => {
  const { username } = useContext(AuthContext);
  const { userId, user } = useParams();
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: sendMessageToUser, isLoading: sendingMessageToUser } =
    useMutation({
      mutationKey: ["sendingMessageToUser", userId],
      mutationFn: () =>
        handleSendUserMessage(userId, {
          author: username,
          message: getValues().messageContent,
          messageType: "INFORMATION",
        }),
      onSuccess: () => {
        queryClient.invalidateQueries("allUserNonReadMessages");
        toast.success(`Wysłano wiadomość użytkownikowi ${user}!`);
        navigate(-1);
      },
    });

  if (sendingMessageToUser) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminForumSection
          cancelLink={"/users"}
          handleSubmit={handleSubmit(sendMessageToUser)}
          submitTitle={"Wyślij wiadomość"}
        >
          <label className="font-bold text-2xl mr-auto">
            Wpisz treść wiadomości:
          </label>
          <textarea
            className="w-full h-[650px] border-black border-4 bg-white rounded-2xl text-2xl p-4 resize-none focus:border-custom-orange-200 focus:outline-none"
            {...register("messageContent", {
              required: "Treść wiadomości nie może być pusta!",
            })}
          />
          {errors?.messageContent?.message && (
            <label className="w-full text-center mt-2 text-lg text-red-500 font-bold">
              {errors?.messageContent?.message}
            </label>
          )}
        </AdminForumSection>
      </div>
    </AnimatedPage>
  );
};

export default MessageForm;
