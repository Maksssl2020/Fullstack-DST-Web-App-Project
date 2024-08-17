import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import DefaultModal from "../../modal/DefaultModal";
import AccountAdminSection from "./AccountAdminSection";
import AccountUserSection from "./AccountUserSection";
import ButtonWithLink from "../../universal/ButtonWithLink";
import { AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchUserById,
  handleUpdateUserFiles,
  updateUserData,
} from "../../../helpers/api-integration/UserDataHandling";
import Spinner from "../../universal/Spinner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AccountInformationSection = () => {
  const { userId, isAuthenticated, role, username, logout } =
    useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, setValue, watch, handleSubmit, getValues, formState } =
    useForm({});
  const { errors } = formState;
  const [showModal, setShowModal] = React.useState(false);
  const [isChange, setIsChange] = React.useState(false);
  const [updatedDataForm, setUpdatedDataForm] = React.useState({});
  const [updatedImagesForm, setUpdatedImagesForm] = React.useState({});
  const navigate = useNavigate();

  const { data: userData, isLoading: fetchingUserData } = useQuery(
    ["accountUserData", userId],
    () => fetchUserById(userId),
    {
      enabled: isAuthenticated === true,
    },
  );

  const { mutate: updateUser, isLoading: updatingUser } = useMutation({
    mutationKey: ["accountUpdateUser", userId, updatedDataForm],
    mutationFn: () => updateUserData(userId, updatedDataForm),
    onSuccess: () => {
      queryClient.invalidateQueries("accountUserData");
      if (updatedDataForm.username !== null) {
        logout();
      }
    },
    onError: (error) => console.log(error),
  });

  const { mutate: updateUserFiles, isLoading: updatingUserFiles } = useMutation(
    {
      mutationKey: ["accountUpdateUserFiles", userId, updatedImagesForm],
      mutationFn: () =>
        handleUpdateUserFiles(
          userId,
          updatedImagesForm.avatar,
          updatedImagesForm.identifyPhoto,
        ),
      onSuccess: () => {
        queryClient.invalidateQueries("accountUserData");
      },
      onError: (error) => console.log("Error updating user files:", error),
    },
  );

  useEffect(() => {
    setValue("username", userData?.username);
    setValue("email", userData?.email);
    setValue("phoneNumber", userData?.phoneNumber);
    setValue("identifyPhoto", userData?.identifyPhoto);
    setValue("avatar", userData?.avatar);
  }, [setValue, userData]);

  useEffect(() => {
    watch((values) => {
      setUpdatedDataForm({
        username:
          values.username !== userData?.username ? values.username : null,
        email: values.email !== userData?.email ? values.email : null,
        phoneNumber:
          values.phoneNumber !== userData?.phoneNumber &&
          values.phoneNumber !== ""
            ? values.phoneNumber
            : null,
      });
    });
  }, [watch, userData]);

  useEffect(() => {
    setIsChange(
      updatedDataForm.username !== null ||
        updatedDataForm.email !== null ||
        updatedDataForm.phoneNumber !== null ||
        updatedImagesForm.avatar !== null ||
        updatedImagesForm.identifyPhoto !== null,
    );
  }, [updatingUser, updatedDataForm, updatedImagesForm]);

  const handleImagesChange = (field, value) => {
    setUpdatedImagesForm((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  console.log(updatedImagesForm);
  console.log(updatedDataForm);

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <DefaultModal
          title={"Informacja"}
          subtitle={"Musisz się zalogować, aby mieć dostęp do tej strony."}
          blur={"backdrop-blur-3xl"}
        >
          <div className="flex gap-6">
            <ButtonWithLink
              title={"Zaloguj się"}
              link={"/sign-in"}
              className={
                "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              }
            />
            <ButtonWithLink
              title={"Strona główna"}
              link={"/"}
              className={
                "uppercase font-bold text-white rounded-2xl bg-custom-orange-200 h-[75px] w-[250px] text-xl flex items-center justify-center border-4 border-black"
              }
            />
          </div>
        </DefaultModal>
      </AnimatePresence>
    );
  }

  if (fetchingUserData || updatingUser || updatingUserFiles || !userData) {
    return <Spinner />;
  }

  const onSubmit = () => {
    updateUser();
    updateUserFiles();
  };

  return (
    <>
      <div className="w-full flex bg-custom-gray-300 flex-col font-lato h-[950px]">
        <div className="flex items-center mt-8">
          <h1 className="ml-[15%] w-[600px] text-white items-center flex text-2xl justify-center h-[75px] bg-custom-blue-300 rounded-full">{`Cześć, ${username} witamy Cię serdecznie <3`}</h1>
          {isChange && (
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-custom-orange-200 rounded-2xl ml-auto mr-[15%] text-white h-[75px] font-bold border-4 border-black p-4 w-auto"
            >
              AKCEPTUJ ZMIANY
            </button>
          )}
        </div>
        <div className="flex w-full justify-center">
          <div className="w-[85%] max-w-[1630px] flex mt-8 h-[700px] rounded-3xl bg-white">
            {role === "ADMIN" ? (
              <AccountAdminSection
                userData={userData}
                register={register}
                handleImagesChange={handleImagesChange}
                errors={errors}
              />
            ) : (
              <AccountUserSection
                userData={userData}
                register={register}
                handleImagesChange={handleImagesChange}
                watch={watch}
                errors={errors}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountInformationSection;
