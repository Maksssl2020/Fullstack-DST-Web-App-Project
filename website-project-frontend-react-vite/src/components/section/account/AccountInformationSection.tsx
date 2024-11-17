import React, { useEffect, useState } from "react";
import Spinner from "../../universal/Spinner.jsx";
import { useForm } from "react-hook-form";
import useUser from "../../../hooks/queries/useUser.js";
import useUserDisplay from "../../../hooks/queries/useUserDisplay.js";
import useUpdateUserInAccountPageMutation from "../../../hooks/mutations/useUpdateUserInAccountPageMutation.js";
import useAuthentication from "../../../hooks/others/useAuthentication.js";
import UserAccountInformationSection from "./UserAccountInformationSection";
import AccountAdminSection from "./AccountAdminSection";

const AccountInformationSection = () => {
  const { role, username } = useAuthentication();
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
  const { user, fetchingUser } = useUser();
  const { userDisplay, fetchingUserDisplay } = useUserDisplay();
  const { updateUser, updatingUser } = useUpdateUserInAccountPageMutation(
    () => {
      setIsChangeInTextData(false);
      if (updatedDataForm.username !== user.username) {
        logout();
      }
    },
  );

  useEffect(() => {
    if (user) {
      setValue("username", user.username);
      setValue("email", user.email);
      setValue("phoneNumber", user.phoneNumber);
      setValue("identifyPhoto", user.identifyPhoto);
      setValue("avatar", user.avatar);
      setAvatar(user.avatar);

      setUpdatedDataForm({
        username: user.username,
        email: user.email,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [user, setValue]);

  useEffect(() => {
    if (user) {
      watch((values) => {
        const isUsernameChanged = values.username !== user.username;
        const isEmailChanged = values.email !== user.email;
        const isPhoneNumberChanged = values.phoneNumber !== user.phoneNumber;

        setUpdatedDataForm({
          username: isUsernameChanged ? values.username : user.username,
          email: isEmailChanged ? values.email : user.email,
          phoneNumber: isPhoneNumberChanged
            ? values.phoneNumber
            : user.phoneNumber,
        });

        setIsChangeInTextData(
          isUsernameChanged || isEmailChanged || isPhoneNumberChanged,
        );
      });
    }
  }, [watch, user]);

  useEffect(() => {
    setIsChangeInFilesData(
      updatedImagesForm.avatar !== null ||
        updatedImagesForm.identifyPhoto !== null,
    );
  }, [role, updatedImagesForm]);

  if (fetchingUser || updatingUser || fetchingUserDisplay || !user) {
    return <Spinner />;
  }

  const onSubmit = (data) => {
    if (isChangeInTextData) {
      updateUser(data);
      setIsChangeInTextData(false);
    }
  };

  return (
    <div
      className={`flex h-auto min-h-[950px] w-full flex-col items-center bg-custom-gray-300 py-8 font-lato`}
    >
      <div className={"flex w-full flex-col"}>
        {/*<div className="flex items-center max-md:justify-center">*/}
        {/*  <h1 className="flex h-[75px] items-center justify-center rounded-full bg-custom-blue-300 text-2xl text-white max-md:w-[95%] md:ml-[15%] md:w-[600px]">{`Cześć, ${username} witamy Cię serdecznie <3`}</h1>*/}
        {/*  {(isChangeInTextData || isChangeInFilesData) && (*/}
        {/*    <button*/}
        {/*      onClick={handleSubmit(() => onSubmit(updatedDataForm))}*/}
        {/*      className="ml-auto mr-[15%] h-[75px] w-auto rounded-2xl border-4 border-black bg-custom-orange-200 p-4 font-bold text-white"*/}
        {/*    >*/}
        {/*      AKCEPTUJ ZMIANY*/}
        {/*    </button>*/}
        {/*  )}*/}
        {/*</div>*/}
        <div className="mt-8 flex h-auto w-full justify-center rounded-3xl">
          <UserAccountInformationSection>
            {role === "ADMIN" ? (
              <AccountAdminSection userData={user} />
            ) : (
              <AccountUserSection userData={user} />
            )}
          </UserAccountInformationSection>
          {/*{role === "ADMIN" ? (*/}
          {/*  <AccountAdminSection*/}
          {/*    userData={user}*/}
          {/*    avatar={userDisplay.avatar}*/}
          {/*    register={register}*/}
          {/*    handleImagesChange={handleImagesChange}*/}
          {/*    watch={watch}*/}
          {/*    errors={errors}*/}
          {/*  />*/}
          {/*) : (*/}
          {/*  <AccountUserSection*/}
          {/*    userData={user}*/}
          {/*    userDisplayData={userDisplay}*/}
          {/*    register={register}*/}
          {/*    handleImagesChange={handleImagesChange}*/}
          {/*    watch={watch}*/}
          {/*    errors={errors}*/}
          {/*  />*/}
          {/*)}*/}
        </div>
      </div>
    </div>
  );
};

export default AccountInformationSection;
