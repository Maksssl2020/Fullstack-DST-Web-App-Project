export const sizesDropdownData = ["XS", "S", "M", "L", "XL"];

export const categoriesDropdownData = [
  "UBRANIA",
  "KOSZULKI",
  "BLUZY",
  "AKCESORIA",
  "ZAWIESZKI",
  "KUBKI",
  "FLAGI",
  "BIDONY",
  "PIÓRA",
  "PRZYPINKI",
  "SKARPETY",
];

export const productMainDataFormStructure = (errors) => {
  return [
    {
      title: "Wpisz tytuł:",
      dataName: "title",
      type: "text",
      errors: errors?.title?.message,
    },
    {
      title: "Wpisz pełną nazwę:",
      dataName: "fullName",
      type: "text",
      errors: errors?.fullName?.message,
    },
    {
      title: "Wpisz cenę:",
      dataName: "price",
      type: "number",
      errors: errors?.price?.message,
    },
    {
      title: "Wpisz wagę:",
      dataName: "weight",
      type: "number",
      errors: errors?.weight?.message,
    },
    {
      title: "Wpisz rozmiar paczki:",
      dataName: "packageSize",
      type: "text",
      errors: errors?.packageSize?.message,
    },
  ];
};
