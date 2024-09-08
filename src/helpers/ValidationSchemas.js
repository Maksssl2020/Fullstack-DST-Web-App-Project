import * as Yup from "yup";
import instance from "./AxiosConfig";
import { ArraySchema, object } from "yup";

export const discountCodeSchema = Yup.object().shape({
  code: Yup.string().required("Kod nie może być pusty!"),
  discountValue: Yup.number()
    .required("Wielkość zniżki nie może być pusta!")
    .typeError("Wprowadzona wartość musi być liczbą!")
    .min(1, "Wartość nie może być mniejsza, niż 1!"),
  minimalOrderValue: Yup.number()
    .typeError("Wprowadzona wartość musi być liczbą!")
    .min(0, "Wartość nie może być ujemna!"),
  numberOfValidityDays: Yup.number()
    .required("Liczba dni nie może być pusta!")
    .typeError("Wprowadzona wartość musi być liczbą całkowitą!")
    .min(1, "Wartość nie może być mniejsza od 1!"),
  usageLimit: Yup.number()
    .required("Limit użyć nie może być pusty!")
    .typeError("Wprowadzona wartość musi być liczbą całkowitą!")
    .min(1, "Wartość nie może być mniejsza od 1!"),
});

export const orderFormWithoutAnotherAddress = Yup.object().shape({
  firstName: Yup.string().required("Imię jest obowiązkowe!"),
  lastName: Yup.string().required("Nazwisko jest obowiązkowe!"),
  street: Yup.string().required("Ulica jest obowiązkowa!"),
  buildingNumber: Yup.string()
    .required("Number budynku / lokalu jest obowiązkowy!")
    .matches(
      /^[0-9]+[a-zA-z]*([\s/]*[0-9a-zA-Z]*)/,
      "Numer budynku / lokalu musi być poprawny (np. 10, 10 / 3A",
    ),
  postalCode: Yup.string()
    .required("Kod pocztowy jest obowiązkowy!")
    .matches(
      /^\d{2,5}([- ]?\d{3,4})?$|^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\d[A-Za-z]{2}$|^[A-Za-z]{3,4}\d{2,4}$/,
      "Kod pocztowy musi mieć poprawny format!",
    ),
  city: Yup.string().required("Miejscowość jest obowiązkowa!"),
  phoneNumber: Yup.string().required("Numer telefonu jest obowiązkowy!"),
  email: Yup.string().required("Adres e-mail jest obowiązkowy!"),
});

export const orderFormWithAnotherAddress = Yup.object().shape({
  firstName: Yup.string().required("Imię jest obowiązkowe!"),
  lastName: Yup.string().required("Nazwisko jest obowiązkowe!"),
  street: Yup.string().required("Ulica jest obowiązkowa!"),
  buildingNumber: Yup.string()
    .required("Number budynku / lokalu jest obowiązkowy!")
    .matches(
      /^[0-9]+[a-zA-z]*([\s/]*[0-9a-zA-Z]*)/,
      "Numer budynku / lokalu musi być poprawny (np. 10, 10 / 3A)",
    ),
  postalCode: Yup.string()
    .required("Kod pocztowy jest obowiązkowy!")
    .matches(
      /^\d{2,5}([- ]?\d{3,4})?$|^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\d[A-Za-z]{2}$|^[A-Za-z]{3,4}\d{2,4}$/,
      "Kod pocztowy musi mieć poprawny format!",
    ),
  city: Yup.string().required("Miejscowość jest obowiązkowa!"),
  phoneNumber: Yup.string().required("Numer telefonu jest obowiązkowy!"),
  email: Yup.string().required("Adres e-mail jest obowiązkowy!"),
  anotherStreet: Yup.string().required("Ulica jest obowiązkowa!"),
  anotherBuildingNumber: Yup.string()
    .required("Number budynku / lokalu jest obowiązkowy!")
    .matches(
      /^[0-9]+[a-zA-z]*([\s/]*[0-9a-zA-Z]*)/,
      "Numer budynku / lokalu musi być poprawny (np. 10, 10 / 3A",
    ),
  anotherPostalCode: Yup.string()
    .required("Kod pocztowy jest obowiązkowy!")
    .matches(
      /^\d{2,5}([- ]?\d{3,4})?$|^[A-Za-z]{1,2}\d{1,2}[A-Za-z]?\d[A-Za-z]{2}$|^[A-Za-z]{3,4}\d{2,4}$/,
      "Kod pocztowy musi mieć poprawny format!",
    ),
  anotherCity: Yup.string().required("Miejscowość jest obowiązkowa!"),
});

export const activationCodeSchema = Yup.object().shape({
  0: Yup.number().required(),
  1: Yup.number().required(),
  2: Yup.number().required(),
  3: Yup.number().required(),
  4: Yup.number().required(),
  5: Yup.number().required(),
});

export const userRegistrationSchema = Yup.object().shape({
  firstName: Yup.string().required("Imię nie może być puste!"),
  lastName: Yup.string().required("Nazwisko nie może być puste!"),
  username: Yup.string().required("Nazwa użytkownika nie może być pusta!"),
  email: Yup.string()
    .email("Podany adres e-mail jest nieprawidłowy!")
    .required("E-mail nie może być pusty!"),
  dateOfBirth: Yup.date()
    .typeError("Data urodzenia musi być prawidłową datą!")
    .required("Data urodzenia nie może być pusta!")
    .test("is-past", "Data urodzenia musi być w przeszłości!", (value) => {
      return value && new Date(value) < new Date();
    }),
  password: Yup.string()
    .required("Hasło nie może być puste!")
    .min(8, "Hasło musi mieć co najmniej 8 znaków!"),
  retypePassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Hasła nie mogę się różnić!",
  ),
});

const getAdditionalProductFieldsSchema = (productType) => {
  switch (productType) {
    case "clothes": {
      return {
        color: Yup.string().required("Kolor nie może być pusty!"),
        productComposition: Yup.string().required("Skład nie może być pusty!"),
        productOverprint: Yup.string().required("Nadruk nie może być pusty!"),
        sizes: Yup.array().required("Produkt musi mieć co najmniej 1 rozmiar!"),
      };
    }
    case "pens": {
      return {
        color: Yup.string().required("Kolor nie może być pusty!"),
        inkColor: Yup.string().required("Kolor tuszu nie może być pusty!"),
      };
    }
    case "mugs": {
      return {
        color: Yup.string().required("Kolor nie może być pusty!"),
        height: Yup.number()
          .typeError("Wysokość musi być poprawną liczbą!")
          .required("Wysokość nie może być pusta!")
          .min(0.1, "Wysokość musi być większa bądź równa 0.1!"),
        material: Yup.string().required("Materiał nie może być pusty!"),
      };
    }
    case "gadgets": {
      return {
        type: Yup.string().required("Typ nie może być pusty!"),
        material: Yup.string().required("Materiał nie może być pusty!"),
      };
    }
    default:
      return {};
  }
};

export const newProductFormSchema = (productType) =>
  Yup.object().shape({
    title: Yup.string().required("Tytuł nie może być pusty!"),
    fullName: Yup.string().required("Pełna nazwa nie może być pusta!"),
    description: Yup.string().required("Opis nie może być pusty!"),
    packageSize: Yup.string().required("Rozmiar paczki nie może być pusty!"),
    weight: Yup.number()
      .typeError("Waga musi być prawidłową liczbą!")
      .required("Waga nie może być pusta!")
      .min(0.1, "Waga musi być większa bądź równa 0.1!"),
    price: Yup.number()
      .typeError("Cena musi być prawidłową liczbą!")
      .required("Cena nie może być pusta!")
      .min(0.0, "Cena musi być większa bądź równa 0.0!"),
    categories: Yup.array().required(
      "Produkt musi mieć co najmniej 1 kategorię!",
    ),
    ...getAdditionalProductFieldsSchema(productType),
  });
