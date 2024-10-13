import React from "react";
import AnimatedPage from "../../animation/AnimatedPage.jsx";
import AdminFormSection from "../../components/form/AdminFormSection.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../components/universal/Spinner.jsx";
import useSendMessageToUserMutation from "../../hooks/mutations/useSendMessageToUserMutation.js";
import useAuthentication from "../../hooks/queries/useAuthentication.js";

const MessageForm = () => {
  const { username } = useAuthentication();
  const { userId, user } = useParams();
  const { register, handleSubmit, getValues, formState } = useForm();
  const { errors } = formState;
  const navigate = useNavigate();
  const { sendMessageToUser, sendingMessageToUser } =
    useSendMessageToUserMutation(userId, () => {
      toast.success(`Wysłano wiadomość użytkownikowi ${user}!`);
      navigate(-1);
    });

  if (sendingMessageToUser) {
    return <Spinner />;
  }

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminFormSection
          cancelLink={"/users"}
          handleSubmit={handleSubmit((data) => {
            sendMessageToUser({
              requestId: null,
              messageData: {
                author: username,
                message: data.messageContent,
                messageType: "INFORMATION",
              },
            });
          })}
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
        </AdminFormSection>
      </div>
    </AnimatedPage>
  );
};

export default MessageForm;
