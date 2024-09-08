import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormItem from "../../../components/form/FormItem";
import AnimatedPage from "../../../animation/AnimatedPage";
import NewClothingForm from "./NewClothingForm";
import DropdownWithCheckboxes from "../../dropdown/DropdownWithCheckboxes";
import NewPenForm from "./NewPenForm";
import NewMugForm from "./NewMugForm";
import NewGadgetForm from "./NewGadgetForm";
import AdminForumSection from "../AdminForumSection";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchProductData,
  handleAddNewProduct,
  handleUpdateProduct,
} from "../../../helpers/api-integration/ShopProductsHandling";
import { yupResolver } from "@hookform/resolvers/yup";
import { newProductFormSchema } from "../../../helpers/ValidationSchemas";
import Spinner from "../../universal/Spinner";
import toast from "react-hot-toast";
import {
  categoriesDropdownData,
  productMainDataFormStructure,
  sizesDropdownData,
} from "../../../data/NewProductFormData";
import { decodeImageFile } from "../../../helpers/PostManager";

const NewProductForm = () => {
  const { type, id } = useParams();
  const productEditing = id !== undefined && id !== null;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    reset,
    register,
    getValues,
    formState: { errors },
    handleSubmit,
    setValue,
    setError,
    clearErrors,
  } = useForm({
    resolver: yupResolver(newProductFormSchema(type)),
  });

  const { data: productDataToEdit, isLoading: fetchingProductDataToEdit } =
    useQuery(["productDataToEdit", id], () => {
      if (id !== undefined && id !== null) {
        return fetchProductData(id);
      }
    });

  const { mutate: addNewProduct, isLoading: addingNewProduct } = useMutation({
    mutationKey: ["addNewProduct"],
    mutationFn: () =>
      handleAddNewProduct(getProductDataFormDependsOnProductType(), type),
    onSuccess: () => {
      queryClient.invalidateQueries("shopProductsData");
      toast.success("Dodano nowy produkt!");
      reset();
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { mutate: updateProduct, isLoading: updatingProduct } = useMutation({
    mutationKey: ["updateProduct", id],
    mutationFn: () => {
      if (productEditing) {
        return handleUpdateProduct(
          id,
          getProductDataFormDependsOnProductType(),
          type,
        );
      }
    },
    onSuccess: () => {
      toast("Pomyślnie zaktualizowano produkt!");
      navigate("/rainbow-shop");
    },
    onError: (error) => console.log(error),
  });

  console.log(productDataToEdit);

  useEffect(() => {
    if (productEditing && productDataToEdit) {
      const currentValues = {
        title: productDataToEdit.title,
        fullName: productDataToEdit.name,
        description: productDataToEdit.description,
        packageSize: productDataToEdit.packageSize,
        weight: productDataToEdit.weight,
        price: productDataToEdit.price,
        categories: [
          ...productDataToEdit.categories.map((value) => value.category),
        ],
        images: [
          ...productDataToEdit.images.map((value) =>
            decodeImageFile(value.image),
          ),
        ],
      };

      if (type === "clothes") {
        currentValues.color = productDataToEdit.color;
        currentValues.productComposition = productDataToEdit.productComposition;
        currentValues.productOverprint = productDataToEdit.productOverprint;
        currentValues.sizes = [
          ...productDataToEdit.productSize.map((value) => value.size),
        ];
      } else if (type === "pens") {
        currentValues.color = productDataToEdit.color;
        currentValues.inkColor = productDataToEdit.inkColor;
      } else if (type === "mugs") {
        currentValues.material = productDataToEdit.material;
        currentValues.height = productDataToEdit.height;
        currentValues.color = productDataToEdit.color;
      } else {
        currentValues.material = productDataToEdit.material;
        currentValues.type = productDataToEdit.type;
      }

      reset(currentValues);
    }
  }, [id, productDataToEdit, productEditing, reset, setValue, type]);

  const getFormDependsOnProductType = () => {
    switch (type) {
      case "clothes": {
        return <NewClothingForm register={register} errors={errors} />;
      }
      case "pens": {
        return <NewPenForm register={register} errors={errors} />;
      }
      case "mugs": {
        return <NewMugForm register={register} errors={errors} />;
      }
      case "gadgets": {
        return <NewGadgetForm register={register} errors={errors} />;
      }
      default:
        return null;
    }
  };

  const getProductDataFormDependsOnProductType = () => {
    const formData = new FormData();
    formData.append("title", getValues().title);
    formData.append("name", getValues().fullName);
    formData.append("description", getValues().description);
    formData.append("packageSize", getValues().packageSize);
    formData.append("weight", getValues().weight);
    formData.append("price", getValues().price);
    formData.append("categories", getValues().categories);

    Array.from(getValues().images).forEach((image) => {
      formData.append("images", image);
    });

    switch (type) {
      case "clothes": {
        formData.append("color", getValues().color);
        formData.append("productComposition", getValues().productComposition);
        formData.append("productOverprint", getValues().productOverprint);
        formData.append("productsSizes", getValues().sizes);
        break;
      }
      case "pens": {
        formData.append("color", getValues().color);
        formData.append("inkColor", getValues().inkColor);
        break;
      }
      case "mugs": {
        formData.append("color", getValues().color);
        formData.append("height", getValues().height);
        formData.append("material", getValues().material);
        break;
      }
      case "gadgets": {
        formData.append("type", getValues().type);
        formData.append("material", getValues().material);
        break;
      }
      default: {
        return null;
      }
    }

    return formData;
  };

  console.log(errors);
  console.log(getValues());
  console.log(getValues().images);

  const handleProductSubmit = () => {
    if (getValues().images.length === 0) {
      setError("images", {
        type: "manual",
        message: "Produkt musi mieć co najmniej 1 zdjęcie!",
      });
    } else {
      addNewProduct();
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.of(e.target.files);

    if (selectedFiles.length > 4) {
      toast.error("Możesz wybrać maksymalnie 4 zdjęcia.");
      setValue("images", []);
    } else {
      setValue("images", selectedFiles);
      clearErrors("images");
    }
  };

  if (addingNewProduct || fetchingProductDataToEdit || updatingProduct) {
    return <Spinner />;
  }

  console.log(getValues().title);

  return (
    <AnimatedPage>
      <div className="w-full h-auto flex justify-center font-lato py-8">
        <AdminForumSection
          cancelLink={productEditing ? "/rainbow-shop" : "/account"}
          submitTitle={productEditing ? "zaktualizuj produkt" : "dodaj produkt"}
          handleSubmit={
            productEditing
              ? handleSubmit(updateProduct)
              : handleSubmit(handleProductSubmit)
          }
        >
          {productMainDataFormStructure(errors).map((data, index) => (
            <FormItem
              key={index}
              labelData={data.title}
              type={data.type}
              register={{ ...register(data.dataName) }}
              containerStyling={
                "w-full h-auto flex flex-col font-bold text-xl gap-2 items-center"
              }
              inputStyling={
                "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
              }
              errors={data.errors}
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
                options={categoriesDropdownData}
                fieldName={"categories"}
                value={getValues().categories}
                setValue={setValue}
              />

              {errors?.categories && (
                <p className="mt-2 text-lg text-red-500 font-bold">
                  {errors?.categories.message}
                </p>
              )}
            </div>
            {type === "clothes" && (
              <div className="gap-4 flex flex-col">
                <p className="font-bold text-xl">Wybierz rozmiary:</p>
                <DropdownWithCheckboxes
                  title={"rozmiary"}
                  options={sizesDropdownData}
                  containerClassName={"w-[350px] relative"}
                  fieldName={"sizes"}
                  value={getValues().sizes}
                  setValue={setValue}
                />
                {errors?.sizes && (
                  <p className="mt-2 text-lg text-red-500 font-bold">
                    {errors?.sizes.message}
                  </p>
                )}
              </div>
            )}
          </div>
          {productEditing && (
            <div className={"w-full flex flex-col gap-4 my-4"}>
              <h2 className={"ml-3 font-bold text-2xl"}>
                Obecne zdjęcia produktu:
              </h2>
              <div className={"w-full flex gap-4 justify-center"}>
                {getValues().images?.map((file, index) => (
                  <img
                    className={
                      "size-[175px] rounded-xl inset-0 object-cover border-4 border-black"
                    }
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={index}
                  />
                ))}
              </div>
            </div>
          )}
          <div className="w-full">
            <p className="text-xl font-bold ml-4">
              Wybierz zdjęcia ( maksymalnie 4 ):
            </p>
            <input
              type="file"
              accept="image/*"
              id={"test"}
              multiple
              max={4}
              min={1}
              className={`w-full file:w-[25%] mt-2 file:border-0 border-4 border-black file:flex-wrap file:border-r-4 file:bg-custom-orange-200 file:text-white file:font-bold file:hover:bg-custom-orange-100 file:text-sm file:uppercase file:rounded-l-xl file:h-full h-[75px] font-bold text-lg flex text-black bg-custom-gray-200 rounded-2xl`}
              onChange={handleFileChange}
              {...register("images")}
            />
            {errors?.images && (
              <p className="ml-3 mt-2 text-lg text-red-500 font-bold">
                {errors?.images.message}
              </p>
            )}
          </div>
          <div className={"w-full pb-4 min-h-[300px]"}>
            <p className="text-2xl font-bold ml-4">Wpisz opis:</p>
            <textarea
              maxLength={225}
              className={`size-full mt-2 bg-custom-gray-200 focus:outline-none focus:border-custom-orange-200 p-4 text-xl border-4 rounded-2xl border-black resize-none ${errors?.description && "border-red-500"}`}
              {...register("description")}
            />
            {errors?.description && (
              <p className="ml-3 mt-2 text-lg text-red-500 font-bold">
                {errors?.description?.message}
              </p>
            )}
          </div>
        </AdminForumSection>
      </div>
    </AnimatedPage>
  );
};

export default NewProductForm;
