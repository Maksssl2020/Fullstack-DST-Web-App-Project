import React from "react";
import AnimatedPage from "../../animation/AnimatedPage.jsx";
import AdminFormSection from "../../components/form/AdminFormSection.jsx";
import FormItem from "../../components/form/FormItem.jsx";
import AcceptIcon from "../../icons/AcceptIcon.jsx";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import {
  generateRandomDiscountCode,
  handleAddNewDiscountCode,
} from "../../helpers/api-integration/DiscountCodesHandling.js";
import toast from "react-hot-toast";
import Spinner from "../../components/universal/Spinner.jsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { discountCodeSchema } from "../../helpers/ValidationSchemas.js";

const DiscountCodeForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    setValue,
  } = useForm({ resolver: yupResolver(discountCodeSchema) });
  const queryClient = useQueryClient();
  const [discountType, setDiscountType] = React.useState("PERCENTAGE");
  const [isGlobal, setIsGlobal] = React.useState(false);

  const { mutate: generateCode, isLoading: generatingCode } = useMutation({
    mutationKey: ["generatedCode"],
    mutationFn: () => generateRandomDiscountCode(),
    onSuccess: (response) => {
      toast.success("Wygenerowano kod!");
      setValue("code", response);
    },
    onError: (error) => console.log(error),
  });

  const { mutate: addNewDiscountCode, isLoading: addingNewDiscountCode } =
    useMutation({
      mutationKey: ["addingNewDiscountCode", getValues().code],
      mutationFn: async () =>
        handleAddNewDiscountCode({
          code: getValues().code,
          discountType: discountType,
          discountValue: getValues().discountValue,
          minimumOrderValue: getValues().minimalOrderValue,
          numberOfValidityDays: getValues().numberOfValidityDays,
          usageLimit: getValues().usageLimit,
          isGlobal: isGlobal,
        }),
      onSuccess: () => {
        queryClient.invalidateQueries("allDiscountCodesData");
        toast.success("Utworzono nowy kod rabatowy!");
        reset();
      },
      onError: (error) => console.log(error),
    });

  const handleDiscountTypeChange = (buttonNumber) => {
    switch (buttonNumber) {
      case 0:
        setDiscountType("PERCENTAGE");
        break;
      case 1:
        setDiscountType("FIXED_AMOUNT");
        break;
      default:
        setDiscountType("PERCENTAGE");
    }
  };

  if (generatingCode || addingNewDiscountCode) {
    return <Spinner />;
  }

  console.log(errors);
  console.log(getValues());

  return (
    <AnimatedPage>
      <div className="w-full h-auto my-8 flex flex-col items-center font-lato">
        <AdminFormSection
          submitTitle={"Utwórz kod"}
          disabledButton={errors.length > 0}
          handleSubmit={handleSubmit(addNewDiscountCode)}
          cancelLink={"/account"}
        >
          <div className="w-full flex justify-center gap-4">
            <FormItem
              labelData={"Wpisz lub wygeneruj kod:"}
              containerStyling={
                "w-[45%] h-auto flex flex-col font-bold text-xl mt-auto gap-2 items-center"
              }
              inputStyling={
                "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
              }
              register={{
                ...register("code"),
              }}
              errors={errors?.code?.message}
            />
            <button
              onClick={generateCode}
              className="h-[50px] w-[45%] border-4 border-black bg-custom-orange-200 rounded-2xl text-white uppercase text-xl font-bold mt-auto"
            >
              generuj
            </button>
          </div>
          <div className="w-full flex flex-col justify-center gap-4">
            <label className="ml-10 text-xl font-bold">
              Wybierz formę zniżki:
            </label>
            <div className="flex w-full items-center justify-center gap-4">
              <button
                onClick={() => handleDiscountTypeChange(0)}
                key={0}
                className={`h-[50px] w-[45%] border-4 border-black rounded-2xl text-black uppercase text-xl font-bold mt-auto ${discountType === "PERCENTAGE" && "bg-custom-orange-200 text-white"}`}
              >
                Procent
              </button>
              <button
                onClick={() => handleDiscountTypeChange(1)}
                key={1}
                className={`h-[50px] w-[45%] border-4 border-black rounded-2xl text-black uppercase text-xl font-bold mt-auto ${discountType === "FIXED_AMOUNT" && "bg-custom-orange-200 text-white"}`}
              >
                Stała kwota
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center gap-4">
            <FormItem
              labelData={"Wpisz wielkość zniżki:"}
              containerStyling={
                "w-[45%] h-auto flex flex-col font-bold text-xl mt-auto gap-2 items-center"
              }
              inputStyling={
                "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
              }
              register={{
                ...register("discountValue", {
                  onChange: (event) => {
                    const correctedValue = event.target.value.replace(",", ".");
                    setValue("discountValue", correctedValue);
                  },
                }),
              }}
              errors={errors?.discountValue?.message}
            />
            <FormItem
              labelData={"Wpisz min. wartość zamówienia:"}
              containerStyling={
                "w-[45%] h-auto flex flex-col font-bold text-xl mt-auto gap-2 items-center"
              }
              inputStyling={
                "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
              }
              register={{
                ...register("minimalOrderValue", {
                  onChange: (event) => {
                    const correctedValue = event.target.value.replace(",", ".");
                    setValue("minimalOrderValue", correctedValue);
                  },
                }),
              }}
              errors={errors?.minimalOrderValue?.message}
            />
          </div>
          <div className="w-full flex justify-center gap-4">
            <FormItem
              labelData={"Wpisz ilość dni ważności:"}
              containerStyling={
                "w-[45%] h-auto flex flex-col font-bold text-xl mt-auto gap-2 items-center"
              }
              inputStyling={
                "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
              }
              register={{
                ...register("numberOfValidityDays"),
              }}
              errors={errors?.numberOfValidityDays?.message}
            />
            <FormItem
              labelData={"Wpisz limit użyć:"}
              containerStyling={
                "w-[45%] h-auto flex flex-col font-bold text-xl mt-auto gap-2 items-center"
              }
              inputStyling={
                "border-4 border-black px-2 h-[50px] rounded-2xl focus:border-custom-orange-200 text-lg flex text-black bg-custom-gray-200 "
              }
              register={{
                ...register("usageLimit"),
              }}
              errors={errors?.usageLimit?.message}
            />
          </div>
          <div className="w-[90%] flex mt-6">
            <div className="mb-auto w-[200px] flex flex-col justify-center mr-auto gap-2">
              <label className="text-xl font-bold">Kod Globalny</label>
              <div
                onClick={() => setIsGlobal(!isGlobal)}
                className="size-[50px] flex justify-center items-center"
              >
                <input
                  type={"checkbox"}
                  className="size-[50px] peer shrink-0 relative checked:bg-custom-orange-200 rounded-2xl border-4 border-black appearance-none mt-auto"
                />
                <AcceptIcon
                  size={
                    "size-10 text-white absolute peer-checked:block pointer-events-none"
                  }
                />
              </div>
            </div>
            <div className="w-[85%] text-lg">
              <p className="text-justify">
                *&nbsp;<span className={"font-bold"}>Kod Globalny</span> -
                oznacza to, że kod jest dostępny dla wszystkich kupujących w
                sklepie. W takim wypadku ilość użyć nie sumuje się względem
                wszystkich użytkowników, natomiast każdego użytkownika
                obowiązuje określony limit użyć.
              </p>
            </div>
          </div>
        </AdminFormSection>
      </div>
    </AnimatedPage>
  );
};

export default DiscountCodeForm;
