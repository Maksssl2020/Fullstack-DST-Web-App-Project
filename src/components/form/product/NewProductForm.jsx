import React, { useContext, useState } from "react";
import DefaultModal from "../../../components/modal/DefaultModal";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../helpers/provider/AuthProvider";
import FormItem from "../../../components/form/FormItem";
import axios from "../../../helpers/AxiosConfig";
import AnimatedPage from "../../../animation/AnimatedPage";
import NewClothingForm from "./NewClothingForm";
import DropdownWithCheckboxes from "../../dropdown/DropdownWithCheckboxes";
import NewPenForm from "./NewPenForm";
import NewMugForm from "./NewMugForm";
import NewGadgetForm from "./NewGadgetForm";
import AdminForumSection from "../AdminForumSection";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { handleAddNewProduct } from "../../../helpers/api-integration/ShopProductsHandling";

const NewProductForm = () => {
  const { category, type } = useParams();
  const queryClient = useQueryClient();
  const { username } = useContext(AuthContext);
  const { register, getValues, formState, handleSubmit } = useForm();
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [sizes, setSizes] = useState([]);
  const navigate = useNavigate();
  const formData = new FormData();

  const firstDropdownData = ["XS", "S", "M", "L", "XL"];

  const getFormDependsOnProductType = () => {
    switch (category) {
      case "clothes": {
        return <NewClothingForm register={register} />;
      }
      case "pens": {
        return <NewPenForm register={register} />;
      }
      case "mugs": {
        return <NewMugForm register={register} />;
      }
      case "gadgets": {
        return <NewGadgetForm register={register} />;
      }
      default:
        return null;
    }
  };

  const { mutate: addNewProduct, isLoading: addingNewProduct } = useMutation({
    mutationKey: ["addNewProduct"],
    mutationFn: () =>
      handleAddNewProduct(
        {
          title: getValues().title,
          fullName: getValues().fullName,
          description: getValues().description,
          packageSize: getValues().packageSize,
          weight: getValues().weight,
          price: getValues().price,
          categories: categories,
          images: files,
        },
        category,
      ),
  });

  // const submit = (e) => {
  //   e.preventDefault();
  //
  //   categories.forEach((category) => {
  //     formData.append("categories[]", category);
  //   });
  //
  //   for (var pair of formData) {
  //     console.log(pair[0] + ", " + pair[1]);
  //   }
  //
  //   if (files) {
  //     Array.from(files).forEach((file) => {
  //       formData.append(`images`, file);
  //     });
  //   }
  //
  //   try {
  //     axios.post(`/products/${category}/${type}`, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //     setOpenModal(true);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files) {
      setFiles(files);
    } else {
      setFiles(null);
    }
  };

  const formDataStructure = [
    {
      title: "Wpisz tytuł:",
      dataName: "title",
    },
    {
      title: "Wpisz pełną nazwę:",
      dataName: "fullName",
    },
    {
      title: "Wpisz cenę:",
      dataName: "price",
    },
    {
      title: "Wpisz wagę:",
      dataName: "weight",
    },
    {
      title: "Wpisz rozmiar paczki:",
      dataName: "packageSize",
    },
  ];

  const secondDropdownData = [
    "Ubrania",
    "Koszulki",
    "Bluzy",
    "Akcesoria",
    "Zawieszki",
    "Kubki",
    "Flagi",
    "Bidony",
    "Pióra",
    "Przypinki",
    "Skarpety",
  ];

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminForumSection
          cancelLink={"/account"}
          submitTitle={"dodaj produkt"}
        >
          {formDataStructure.map((data, index) => (
            <FormItem
              key={index}
              labelData={data.title}
              type={"text"}
              register={{ ...register(data.dataName) }}
              containerStyling={
                "w-full h-auto flex flex-col font-bold text-xl gap-2 items-center"
              }
              inputStyling={
                "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
              }
            />
          ))}
          <div className="w-full h-auto flex flex-col gap-6 items-center">
            {getFormDependsOnProductType()}
          </div>
          <div className="w-full justify-center flex gap-4">
            <div className="gap-4 flex flex-col">
              <p className="font-bold text-xl">Wybierz kategorie:</p>
              <DropdownWithCheckboxes
                title={"Kategorie"}
                containerClassName={"w-[350px] relative"}
                options={secondDropdownData}
                selectedOptions={categories}
                setChosenOptions={setCategories}
              />
            </div>
            {type === "add-clothing" && (
              <div className="gap-4 flex flex-col">
                <p className="font-bold text-xl">Wybierz rozmiary:</p>
                <DropdownWithCheckboxes
                  title={"rozmiary"}
                  containerClassName={"w-[350px] relative"}
                  options={firstDropdownData}
                  selectedOptions={sizes}
                  setChosenOptions={setSizes}
                />
              </div>
            )}
          </div>
          <div className="w-full">
            <p className="text-xl font-bold ml-4">
              Wybierz zdjęcia ( maksymalnie 4 ):
            </p>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="w-full file:w-[25%] mt-2 file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-sm file:uppercase file:rounded-l-xl file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 rounded-2xl"
            />
          </div>
          <div className="w-full h-[250px]">
            <p className="text-2xl font-bold ml-4">Wpisz opis:</p>
            <textarea
              maxLength={225}
              className="size-full mt-2 bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl border-4 rounded-2xl border-black resize-none"
              {...register("description")}
            />
          </div>
          {openModal && (
            <DefaultModal
              title={"Produkt dodany"}
              subtitle={"Nowy produkt w sklepie został dodany!"}
            ></DefaultModal>
          )}
        </AdminForumSection>
      </div>
    </AnimatedPage>
  );
};

export default NewProductForm;
