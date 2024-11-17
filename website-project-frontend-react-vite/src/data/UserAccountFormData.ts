import { FieldErrors } from "react-hook-form";

type FormField = {
  title: string;
  type?: string;
  dataName: string;
  errors?: string;
};

export const getUserAccountFormData = (errors: FieldErrors): FormField[] => [
  {
    title: "Nazwa użytkownika:",
    dataName: "username",
    errors: errors?.username?.message as string | undefined,
  },
  {
    title: "Adres e-mail:",
    dataName: "email",
    errors: errors?.email?.message as string | undefined,
  },
  {
    title: "Numer telefonu:",
    dataName: "phoneNumber",
    errors: errors?.phoneNumber?.message as string | undefined,
  },
];
