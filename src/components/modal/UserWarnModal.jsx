import React from "react";
import DefaultModal from "./DefaultModal";
import { useMutation, useQueryClient } from "react-query";
import { handleMarkWarnAsRead } from "../../helpers/api-integration/UserDataHandling";
import Spinner from "../universal/Spinner";

const UserWarnModal = ({ warnData }) => {
  const { warnId, author, message } = warnData;
  const queryClient = useQueryClient();

  const { mutate: markWarnAsRead, isLoading: markingWarnAsRead } = useMutation({
    mutationKey: ["markWarnAsRead", warnId],
    mutationFn: () => handleMarkWarnAsRead(warnId),
    onSuccess: () => {
      queryClient.invalidateQueries("allUserNonReadWarns");
    },
    onError: (error) => console.log(error),
  });

  if (markingWarnAsRead) {
    return <Spinner />;
  }

  return (
    <DefaultModal
      title={"Otrzymano warna!"}
      subtitle={`Warn został utworzony przez admina: ${author}!`}
    >
      <div className="flex flex-col gap-1 w-full h-auto">
        <label className="font-bold mr-auto ml-3 text-xl">Wiadomość:</label>
        <div className="w-full h-auto text-xl rounded-2xl border-4 border-black p-4 text-justify bg-red-200">
          {message}
        </div>
      </div>
      <button
        onClick={markWarnAsRead}
        className="w-[250px] h-[75px] border-4 border-black rounded-2xl mt-6 bg-custom-orange-200 uppercase text-white text-2xl font-bold"
      >
        Potwierdź
      </button>
    </DefaultModal>
  );
};

export default UserWarnModal;
