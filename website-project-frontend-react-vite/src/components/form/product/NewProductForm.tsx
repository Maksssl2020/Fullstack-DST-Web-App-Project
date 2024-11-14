import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormItem from "../FormItem.jsx";
import AnimatedPage from "../../../animation/AnimatedPage.jsx";
import NewClothingForm from "./NewClothingForm.jsx";
import DropdownWithCheckboxes from "../../dropdown/DropdownWithCheckboxes.jsx";
import NewPenForm from "./NewPenForm.jsx";
import NewMugForm from "./NewMugForm.jsx";
import NewGadgetForm from "./NewGadgetForm.jsx";
import AdminFormSection from "../AdminFormSection.jsx";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { newProductFormSchema } from "../../../helpers/ValidationSchemas.js";
import Spinner from "../../universal/Spinner.jsx";
import toast from "react-hot-toast";
import {
  categoriesDropdownData,
  productMainDataFormStructure,
  sizesDropdownData,
} from "../../../data/NewProductFormData.js";
import { decodeImageFile } from "../../../helpers/PostManager.js";
import ItemCurrentImages from "../../list/ItemCurrentImages.jsx";
import useProductMutation from "../../../hooks/mutations/useProductMutation.js";
import useUpdateProductMutation from "../../../hooks/mutations/useUpdateProductMutation.js";
import useAddProductMutation from "../../../hooks/mutations/useAddProductMutation.js";

const NewProductForm = ({ isEditing }) => {
  const { type, id } = useParams();
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

  const { fetchProductDataToUpdate, fetchingProductDataToUpdate } =
    useProductMutation((data) => {
      setCurrentProductData(data);
    });
  const { addProduct, addingProduct } = useAddProductMutation(() => {
    toast.success("Dodano nowy produkt!");
    reset();
  });
  const { updateProduct, updatingProduct } = useUpdateProductMutation(() => {
    toast("Pomyślnie zaktualizowano produkt!");
    navigate("/rainbow-shop");
  });

  useEffect(() => {
    if (isEditing && id) {
      fetchProductDataToUpdate(id);
    }
  }, [fetchProductDataToUpdate, id, isEditing]);

  const setCurrentProductData = (currentProductData) => {
    console.log(currentProductData);

    const currentValues = {
      title: currentProductData.title,
      fullName: currentProductData.name,
      description: currentProductData.description,
      packageSize: currentProductData.packageSize,
      weight: currentProductData.weight,
      price: currentProductData.price,
      categories: [
        ...currentProductData.categories.map((value) => value.category),
      ],
      images: [
        ...currentProductData.images.map((value) =>
          decodeImageFile(value.imageData),
        ),
      ],
    };

    if (type === "clothes") {
      currentValues.color = currentProductData.color;
      currentValues.productComposition = currentProductData.productComposition;
      currentValues.productOverprint = currentProductData.productOverprint;
      currentValues.sizes = [
        ...currentProductData.productSize.map((value) => value.size),
      ];
    } else if (type === "pens") {
      currentValues.color = currentProductData.color;
      currentValues.inkColor = currentProductData.inkColor;
    } else if (type === "mugs") {
      currentValues.material = currentProductData.material;
      currentValues.height = currentProductData.height;
      currentValues.color = currentProductData.color;
    } else {
      currentValues.material = currentProductData.material;
      currentValues.type = currentProductData.type;
    }

    reset(currentValues);
  };

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
      addProduct({
        productData: getProductDataFormDependsOnProductType(),
        productType: type,
      });
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

  if (addingProduct || fetchingProductDataToUpdate || updatingProduct) {
    return <Spinner />;
  }

  console.log(getValues().title);

  return (
    <AnimatedPage>
      <div className="flex h-auto w-full justify-center py-8 font-lato">
        <AdminFormSection
          cancelLink={isEditing ? "/rainbow-shop" : "/account"}
          submitTitle={isEditing ? "zaktualizuj produkt" : "dodaj produkt"}
          handleSubmit={
            isEditing
              ? handleSubmit(() => {
                  updateProduct({
                    productId: id,
                    productData: getProductDataFormDependsOnProductType(),
                    productType: type,
                  });
                })
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
          <div className="flex h-auto w-full flex-col items-center gap-6">
            {getFormDependsOnProductType()}
          </div>
          <div className="flex w-full justify-center gap-4">
            <div className="flex flex-col gap-4">
              <p className="text-xl font-bold">Wybierz kategorie:</p>
              <DropdownWithCheckboxes
                title={"Kategorie"}
                options={categoriesDropdownData}
                fieldName={"categories"}
                value={getValues().categories}
                setValue={setValue}
              />

              {errors?.categories && (
                <p className="mt-2 text-lg font-bold text-red-500">
                  {errors?.categories.message}
                </p>
              )}
            </div>
            {type === "clothes" && (
              <div className="flex flex-col gap-4">
                <p className="text-xl font-bold">Wybierz rozmiary:</p>
                <DropdownWithCheckboxes
                  title={"rozmiary"}
                  options={sizesDropdownData}
                  containerClassName={"w-[350px] relative"}
                  fieldName={"sizes"}
                  value={getValues().sizes}
                  setValue={setValue}
                />
                {errors?.sizes && (
                  <p className="mt-2 text-lg font-bold text-red-500">
                    {errors?.sizes.message}
                  </p>
                )}
              </div>
            )}
          </div>
          {isEditing && <ItemCurrentImages images={getValues()?.images} />}
          <div className="w-full">
            <p className="ml-4 text-xl font-bold">
              Wybierz zdjęcia ( maksymalnie 4 ):
            </p>
            <input
              type="file"
              accept="image/*"
              id={"test"}
              multiple
              max={4}
              min={1}
              className={`mt-2 flex h-[75px] w-full rounded-2xl border-4 border-black bg-custom-gray-200 text-lg font-bold text-black file:h-full file:w-[25%] file:flex-wrap file:rounded-l-xl file:border-0 file:border-r-4 file:bg-custom-orange-200 file:text-sm file:font-bold file:uppercase file:text-white file:hover:bg-custom-orange-100`}
              onChange={handleFileChange}
              {...register("images")}
            />
            {errors?.images && (
              <p className="ml-3 mt-2 text-lg font-bold text-red-500">
                {errors?.images.message}
              </p>
            )}
          </div>
          <div className={"min-h-[300px] w-full pb-4"}>
            <p className="ml-4 text-2xl font-bold">Wpisz opis:</p>
            <textarea
              maxLength={225}
              className={`mt-2 size-full resize-none rounded-2xl border-4 border-black bg-custom-gray-200 p-4 text-xl focus:border-custom-orange-200 focus:outline-none ${errors?.description && "border-red-500"}`}
              {...register("description")}
            />
            {errors?.description && (
              <p className="ml-3 mt-2 text-lg font-bold text-red-500">
                {errors?.description?.message}
              </p>
            )}
          </div>
        </AdminFormSection>
      </div>
    </AnimatedPage>
  );
};

export default NewProductForm;
