import React from "react";
import useFavouriteUserProducts from "../hooks/queries/useFavouriteUserProducts.js";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import FavouriteProductCard from "../components/card/FavouriteProductCard.jsx";

function UserFavouriteProducts() {
  const { userFavouriteProducts, fetchingUserFavouriteProducts } =
    useFavouriteUserProducts();

  if (fetchingUserFavouriteProducts) {
    return <Spinner />;
  }

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
            <FavouriteProductCard productData={data} key={data.id} />
          ))}
        </div>
      </div>
    </AnimatedPage>
  );
}

export default UserFavouriteProducts;
