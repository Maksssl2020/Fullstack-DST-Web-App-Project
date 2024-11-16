import { FieldErrors } from "react-hook-form";

type FormField = {
  title: string;
  type: string;
  dataName: string;
  errors?: string;
};

export const getSignUpFormData = (errors: FieldErrors): FormField[] => [
  {
    title: "Imię",
    type: "text",
    dataName: "firstName",
    errors: errors?.firstName?.message as string | undefined,
  },
  {
    title: "Nazwisko",
    type: "text",
    dataName: "lastName",
    errors: errors?.lastName?.message as string | undefined,
  },
  {
    title: "Nazwa użytkownika",
    type: "text",
    dataName: "username",
    errors: errors?.username?.message as string | undefined,
  },
  {
    title: "E-mail",
    type: "email",
    dataName: "email",
    errors: errors?.email?.message as string | undefined,
  },
  {
    title: "Data urodzenia",
    type: "date",
    dataName: "dateOfBirth",
    errors: errors?.dateOfBirth?.message as string | undefined,
  },
  {
    title: "Hasło",
    type: "password",
    dataName: "password",
    errors: errors?.password?.message as string | undefined,
  },
  {
    title: "Powtórz hasło",
    type: "password",
    dataName: "retypePassword",
    errors: errors?.retypePassword?.message as string | undefined,
  },
];
