import React from "react";
import useFavouriteUserProducts from "../hooks/queries/useFavouriteUserProducts.js";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import CloseIcon from "../components/drawer/icons/CloseIcon.jsx";
import { formatCurrency } from "../helpers/CurrencyFormatter.js";

function UserFavouriteProducts() {
  const { userFavouriteProducts, fetchingUserFavouriteProducts } =
    useFavouriteUserProducts();

  if (fetchingUserFavouriteProducts) {
    return <Spinner />;
  }

  console.log(userFavouriteProducts);

  return (
    <AnimatedPage>
      <div
        className={
          "w-full h-auto font-lato flex my-8 flex-col items-center bg-custom-gray-400"
        }
      >
        <div
          className={
            "w-[1350px] min-h-[600px] py-4 h-auto flex flex-col items-center gap-4 bg-custom-gray-300 rounded-xl"
          }
        >
          <MainBannerWithoutLogo bannerTitle={"Ulubione Produkty"} />
          {userFavouriteProducts?.map((data) => (
            <div
              className={
                "w-[75%] flex items-center justify-between rounded-xl h-[150px] px-12 bg-custom-gray-100 border-b-4 border-custom-gray-300"
              }
              key={data.id}
            >
              <div className={"w-auto h-full flex items-center gap-8"}>
                <button>
                  <CloseIcon size={"size-10"} />
                </button>
                <div className={"size-[125px]"}>
                  <img
                    className={"size-full object-cover inset-0"}
                    src={`data:image/png;base64,${data.mainImage}`}
                    alt={data.id}
                  />
                </div>
              </div>
              <p className={"text-3xl"}>
                {data.productFullTitle}{" "}
                {data.productSize && `- ${data.productSize}`}
              </p>
              <p className={"text-3xl"}>{formatCurrency(data.unitPrice)}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default UserFavouriteProducts;
