import React, { useEffect, useState } from "react";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import FormItem from "../components/form/FormItem.jsx";
import AcceptIcon from "../icons/AcceptIcon.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  orderFormWithAnotherAddress,
  orderFormWithoutAnotherAddress,
} from "../helpers/ValidationSchemas.js";
import { useParams } from "react-router-dom";
import { deleteAllProductsFromCart } from "../helpers/api-integration/ShoppingCartHandling.js";
import Spinner from "../components/universal/Spinner.jsx";
import { formatCurrency } from "../helpers/CurrencyFormatter.js";
import toast from "react-hot-toast";
import OrderPageItemsTable from "../components/table/OrderPageItemsTable.jsx";
import { calcCartTotalPriceWithDiscount } from "../helpers/ApplyDiscountCodes.js";
import useCart from "../hooks/queries/useCart.js";
import useAuthentication from "../hooks/queries/useAuthentication.js";
import useDeleteAllItemsFromCartMutation from "../hooks/mutations/useDeleteAllItemsFromCartMutation.js";
import useApplyDiscountCodeInCart from "../hooks/mutations/useApplyDiscountCodeInCart.js";
import useCreatePaymentMutation from "../hooks/mutations/useCreatePaymentMutation.js";
import useCreateOrderMutation from "../hooks/mutations/useCreateOrderMutation.js";

const PlaceAnOrder = () => {
  const { userId } = useAuthentication();
  const { cartIdentifier } = useParams();
  const [anotherAddress, setAnotherAddress] = React.useState(false);
  const [deliveryType, setDeliveryType] = useState();
  const [billingForm, setBillingForm] = React.useState({});
  const [shippingForm, setShippingForm] = React.useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(
      anotherAddress
        ? orderFormWithAnotherAddress
        : orderFormWithoutAnotherAddress,
    ),
  });

  const { cart, fetchingCart } = useCart(cartIdentifier);
  const { createOrder, creatingOrder } = useCreateOrderMutation((orderId) => {
    createPayment({
      orderId: orderId,
      amount: cart.discountCode
        ? calcCartTotalPriceWithDiscount(cart.discountCode, cart.totalPrice)
        : cart.totalPrice,
      paymentDescription: "Test Payment React",
      firstName: getValues().firstName,
      lastName: getValues().lastName,
      email: getValues().email,
    });
  });

  const { createPayment, creatingPayment } = useCreatePaymentMutation(() => {
    if (cart.discountCode !== null) {
      return applyDiscountCodeInCart({
        cartId: cart.id,
        userId: userId,
      });
    } else {
      return deleteAllProductsFromCart(cart.id);
    }
  });

  const { applyDiscountCodeInCart, applyingDiscountCodeInCart } =
    useApplyDiscountCodeInCart(() => {
      deleteAllItemsFromCart(cart.id);
    });

  const { deleteAllItemsFromCart, deletingAllItemsFromCart } =
    useDeleteAllItemsFromCartMutation(cart.id, cartIdentifier);

  const handleSubmitOrder = () => {
    try {
      createOrder({
        authenticatedCustomerId: userId || null,
        cartId: cart.id,
        billing: billingForm,
        shipping: shippingForm,
      });
    } catch (error) {
      console.error("Order processing error:", error);
      toast.error(
        "An error occurred while processing your order. Please try again.",
      );
    }
  };

  useEffect(() => {
    const billingData = {
      firstName: getValues().firstName,
      lastName: getValues().lastName,
      email: getValues().email,
      phoneNumber: getValues().phoneNumber,
      companyName: getValues().companyName,
      city: getValues().city,
      postalCode: getValues().postalCode,
      street: getValues().street,
      buildingNumber: getValues().buildingNumber,
    };

    setBillingForm(billingData);

    const shippingData = anotherAddress
      ? {
          city: getValues().anotherCity,
          postalCode: getValues().anotherPostalCode,
          street: getValues().anotherStreet,
          buildingNumber: getValues().anotherBuildingNumber,
          shippingType: deliveryType,
        }
      : {
          city: getValues().city,
          postalCode: getValues().postalCode,
          street: getValues().street,
          buildingNumber: getValues().buildingNumber,
          shippingType: deliveryType,
        };

    console.log(shippingData);

    setShippingForm(shippingData);
  }, [anotherAddress, deliveryType, getValues]);

  const orderFormData = [
    {
      label: "Imię: *",
      dataName: "firstName",
    },
    {
      label: "Nazwisko: *",
      dataName: "lastName",
    },
    {
      label: "Nazwa firmy ( opcjonalne ): ",
      dataName: "companyName",
    },
    {
      label: "Ulica: *",
      dataName: "street",
    },
    {
      label: "Numer budynku / lokalu: *",
      dataName: "buildingNumber",
    },
    {
      label: "Kod pocztowy: *",
      dataName: "postalCode",
    },
    {
      label: "Miejscowość: *",
      dataName: "city",
    },
    {
      label: "Numer telefonu: *",
      dataName: "phoneNumber",
    },
    {
      label: "Adres e-mail: *",
      dataName: "email",
    },
    {
      label: "Ulica: *",
      dataName: "anotherStreet",
    },
    {
      label: "Numer budynku / lokalu: *",
      dataName: "anotherBuildingNumber",
    },
    {
      label: "Kod pocztowy: *",
      dataName: "anotherPostalCode",
    },
    {
      label: "Miejscowość: *",
      dataName: "anotherCity",
    },
  ];

  const firstTwoInputsData = orderFormData.slice(0, 2);
  const remainingInputsData = orderFormData.slice(2, 9);
  const anotherAddressInputsData = orderFormData.slice(9);
  // console.log(getValues());
  // console.log(errors);
  // console.log(cartIdentifier);

  console.log(getValues());

  const handleDeliveryChange = (buttonNumber) => {
    switch (buttonNumber) {
      case 0: {
        setDeliveryType("PARCEL_LOCKER");
        break;
      }
      case 1: {
        setDeliveryType("COURIER");
        break;
      }
      case 2: {
        setDeliveryType("PERSONALLY");
        break;
      }
      default: {
        setDeliveryType("");
      }
    }
  };

  if (
    fetchingCart ||
    creatingPayment ||
    creatingOrder ||
    deletingAllItemsFromCart ||
    applyingDiscountCodeInCart
  ) {
    return <Spinner />;
  }

  // console.log(anotherAddress);

  return (
    <AnimatedPage>
      <div
        className={
          "w-full gap-8 h-auto font-lato flex my-8 py-8 flex-col items-center bg-custom-gray-400"
        }
      >
        <MainBannerWithoutLogo bannerTitle={"Zamówienie"} />
        <div
          className={
            "w-[1350px] p-4 bg-custom-gray-100 rounded-2xl flex justify-between h-auto"
          }
        >
          <div className={"w-[48%] h-auto"}>
            <h2 className={"text-3xl font-bold"}>Dane klienta:</h2>
            <form className={"w-full gap-6 flex flex-col"}>
              <div className={"flex w-full mt-8 justify-between"}>
                {firstTwoInputsData.map((data) => (
                  <FormItem
                    key={data.label}
                    labelData={data.label}
                    containerStyling={"font-bold w-[48%] text-xl"}
                    inputStyling={
                      "focus:outline-none h-[50px] font-normal text-lg focus:border-custom-orange-200 rounded-xl px-2"
                    }
                    register={{ ...register(data.dataName) }}
                    errors={errors[data.dataName]?.message}
                  />
                ))}
              </div>
              {remainingInputsData.map((data) => (
                <FormItem
                  key={data.label}
                  labelData={data.label}
                  containerStyling={"font-bold w-full text-xl"}
                  inputStyling={
                    "focus:outline-none h-[50px] font-normal text-lg focus:border-custom-orange-200 rounded-xl px-2"
                  }
                  register={{ ...register(data.dataName) }}
                  errors={errors[data.dataName]?.message}
                />
              ))}
              <AnimatePresence>
                <div className="mb-auto w-auto flex justify-center items-center mr-auto gap-4">
                  <div className="size-[50px] flex justify-center items-center">
                    <input
                      onClick={() => setAnotherAddress(!anotherAddress)}
                      type={"checkbox"}
                      className="size-[50px] peer shrink-0 relative checked:bg-custom-orange-200 rounded-2xl border-4 border-black appearance-none mt-auto"
                    />
                    <AcceptIcon
                      size={
                        "size-10 text-custom-gray-100 absolute peer-checked:block pointer-events-none"
                      }
                    />
                  </div>
                  <label className="text-xl font-bold">
                    Wysyłka na inny adres?
                  </label>
                </div>
                <AnimatePresence>
                  {anotherAddress && (
                    <motion.div
                      hidden={!anotherAddress}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "max-content" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2, type: "just" }}
                      className={"w-full gap-6 flex flex-col"}
                    >
                      {anotherAddressInputsData.map((data) => (
                        <FormItem
                          key={data.label}
                          labelData={data.label}
                          containerStyling={"font-bold w-full text-xl"}
                          inputStyling={
                            "focus:outline-none h-[50px] font-normal text-lg focus:border-custom-orange-200 rounded-xl px-2"
                          }
                          register={{ ...register(data.dataName) }}
                        />
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </AnimatePresence>
            </form>
          </div>
          <div className={"w-[48%] h-auto bg-custom-gray-100"}>
            <h2 className={"text-3xl font-bold"}>Zamówienie:</h2>
            <div className={"w-full mt-8 border-black border-2 rounded-2xl"}>
              <OrderPageItemsTable cartId={cart?.id} />
              <div className={"w-full px-2 mt-8 text-2xl gap-4 flex flex-col"}>
                <label className={"font-bold"}>Wysyłka:</label>
                <div
                  className={
                    "flex w-[50%] self-center justify-between items-center gap-12"
                  }
                >
                  <button
                    onClick={() => handleDeliveryChange(0)}
                    className={`size-6 border-2 rounded-full border-black ${deliveryType === "PARCEL_LOCKER" && "bg-custom-orange-200"}`}
                  ></button>
                  <p>Paczkomaty INPOST</p>
                </div>
                <div
                  className={
                    "flex w-[50%] self-center justify-between items-center gap-12"
                  }
                >
                  <button
                    onClick={() => handleDeliveryChange(1)}
                    className={`size-6 border-2 rounded-full border-black ${deliveryType === "COURIER" && "bg-custom-orange-200"}`}
                  ></button>
                  <p>Kurier</p>
                </div>
                <div
                  className={
                    "flex w-[50%] self-center justify-between items-center gap-12"
                  }
                >
                  <button
                    onClick={() => handleDeliveryChange(2)}
                    className={`size-6 border-2 rounded-full border-black ${deliveryType === "PERSONALLY" && "bg-custom-orange-200"}`}
                  ></button>
                  <p>Odbiór osobisty</p>
                </div>
                <p className={"mt-8 self-center"}>
                  * Darmowa wysyłka od 150 zł!
                </p>
              </div>
              <div
                className={
                  "w-full font-bold text-2xl px-2 pt-8 mt-4 flex justify-between border-t-4"
                }
              >
                <h3>ŁĄCZNIE:</h3>
                <div className={"flex gap-2"}>
                  <p
                    className={`${cart.discountCode ? "text-custom-gray-400 line-through" : "text-black"}`}
                  >
                    {formatCurrency(cart.totalPrice)}
                  </p>
                  {cart.discountCode && (
                    <p>
                      {formatCurrency(
                        calcCartTotalPriceWithDiscount(
                          cart.discountCode,
                          cart.totalPrice,
                        ),
                      )}
                    </p>
                  )}
                </div>
              </div>
              <div
                className={
                  "w-full font-bold text-2xl px-2 pt-8 mt-8 flex justify-between border-t-4"
                }
              >
                <label className={"font-bold"}>Metody płatności:</label>

                <button
                  onClick={handleSubmit(handleSubmitOrder)}
                  className="w-[250px] h-[50px] bg-custom-gray-400"
                >
                  ZAPŁAĆ
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatedPage>
  );
};

export default PlaceAnOrder;
