import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../helpers/provider/AuthProvider.jsx";
import DefaultModal from "../../modal/DefaultModal.jsx";
import AccountAdminSection from "./AccountAdminSection.jsx";
import AccountUserSection from "./AccountUserSection.jsx";
import ButtonWithLink from "../../universal/ButtonWithLink.jsx";
import { AnimatePresence } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchUserById,
  handleUpdateUserFiles,
  handleUpdateUserData,
} from "../../../helpers/api-integration/UserDataHandling.js";
import Spinner from "../../universal/Spinner.jsx";
import { useForm } from "react-hook-form";

const AccountInformationSection = () => {
  const { userId, isAuthenticated, role, username, logout } =
    useContext(AuthContext);
  const queryClient = useQueryClient();
  const { register, setValue, watch, handleSubmit, getValues, formState } =
    useForm({});
  const { errors } = formState;
  const [avatar, setAvatar] = useState(null);
  const [isChangeInTextData, setIsChangeInTextData] = React.useState(false);
  const [isChangeInFilesData, setIsChangeInFilesData] = React.useState(false);
  const [updatedDataForm, setUpdatedDataForm] = React.useState({});
  const [updatedImagesForm, setUpdatedImagesForm] = React.useState({
    avatar: null,
    identifyPhoto: null,
  });

  const { data: userData, isLoading: fetchingUserData } = useQuery(
    ["accountUserData", userId],
    () => fetchUserById(userId),
    {
      enabled: isAuthenticated === true,
    },
  );

  const { mutate: updateUser, isLoading: updatingUser } = useMutation({
    mutationKey: ["accountUpdateUser", userId, updatedDataForm],
    mutationFn: () => handleUpdateUserData(userId, updatedDataForm),
    onSuccess: () => {
      queryClient.invalidateQueries("accountUserData");
      setIsChangeInTextData(false);
      if (updatedDataForm.username !== userData.username) {
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
    if (userData) {
      setValue("username", userData.username);
      setValue("email", userData.email);
      setValue("phoneNumber", userData.phoneNumber);
      setValue("identifyPhoto", userData.identifyPhoto);
      setValue("avatar", userData.avatar);
      setAvatar(userData.avatar);

      setUpdatedDataForm({
        username: userData.username,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
    }
  }, [userData, setValue]);

  useEffect(() => {
    if (userData) {
      watch((values) => {
        const isUsernameChanged = values.username !== userData.username;
        const isEmailChanged = values.email !== userData.email;
        const isPhoneNumberChanged =
          values.phoneNumber !== userData.phoneNumber;

        setUpdatedDataForm({
          username: isUsernameChanged ? values.username : userData.username,
          email: isEmailChanged ? values.email : userData.email,
          phoneNumber: isPhoneNumberChanged
            ? values.phoneNumber
            : userData.phoneNumber,
        });

        setIsChangeInTextData(
          isUsernameChanged || isEmailChanged || isPhoneNumberChanged,
        );
      });
    }
  }, [watch, userData]);

  useEffect(() => {
    setIsChangeInFilesData(
      updatedImagesForm.avatar !== null ||
        updatedImagesForm.identifyPhoto !== null,
    );
  }, [role, updatedImagesForm]);

  console.log(updatedImagesForm);
  console.log(updatedDataForm);
  console.log(getValues());
  console.log(errors);

  const handleImagesChange = (field, value) => {
    if (field === "avatar") {
      if (value instanceof File) {
        const imageUrl = URL.createObjectURL(value);
        setAvatar(imageUrl);
      }
    }

    setUpdatedImagesForm((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

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
    if (isChangeInTextData) {
      updateUser();
    }
    if (isChangeInFilesData) {
      updateUserFiles();
    }
  };

  return (
    <>
      <div
        className={`w-full flex bg-custom-gray-300 flex-col font-lato min-h-[950px] h-auto`}
      >
        <div className="flex items-center mt-8">
          <h1 className="ml-[15%] w-[600px] text-white items-center flex text-2xl justify-center h-[75px] bg-custom-blue-300 rounded-full">{`Cześć, ${username} witamy Cię serdecznie <3`}</h1>
          {(isChangeInTextData || isChangeInFilesData) && (
            <button
              onClick={handleSubmit(onSubmit)}
              className="bg-custom-orange-200 rounded-2xl ml-auto mr-[15%] text-white h-[75px] font-bold border-4 border-black p-4 w-auto"
            >
              AKCEPTUJ ZMIANY
            </button>
          )}
        </div>
        <div className="flex w-full justify-center">
          <div className="w-[85%] max-w-[1630px] flex mt-8 min-h-[700px] rounded-3xl bg-white">
            {role === "ADMIN" ? (
              <AccountAdminSection
                userData={userData}
                avatar={avatar}
                register={register}
                handleImagesChange={handleImagesChange}
                watch={watch}
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
