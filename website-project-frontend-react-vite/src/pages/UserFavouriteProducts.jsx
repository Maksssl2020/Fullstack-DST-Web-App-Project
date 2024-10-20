import React from "react";
import useFavouriteUserProducts from "../hooks/queries/useFavouriteUserProducts.js";
import AnimatedPage from "../animation/AnimatedPage.jsx";
import MainBannerWithoutLogo from "../components/universal/MainBannerWithoutLogo.jsx";
import Spinner from "../components/universal/Spinner.jsx";
import CloseIcon from "../components/drawer/icons/CloseIcon.jsx";
import { formatCurrency } from "../helpers/CurrencyFormatter.js";
import { useNavigate } from "react-router-dom";
import { transformProductTitleIntoLinkTitle } from "../helpers/transformProductTitle.js";
import useDeleteFavouriteUserProductMutation from "../hooks/mutations/useDeleteFavouriteUserProductMutation.js";

function UserFavouriteProducts() {
  const { userFavouriteProducts, fetchingUserFavouriteProducts } =
    useFavouriteUserProducts();
  const { deleteFavouriteUserProduct, deletingFavouriteUserProduct } =
    useDeleteFavouriteUserProductMutation();
  const navigate = useNavigate();

  if (fetchingUserFavouriteProducts || deletingFavouriteUserProduct) {
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
              onClick={() =>
                navigate(
                  `/rainbow-shop/products/${data.mainProductId}/${transformProductTitleIntoLinkTitle(data.productFullTitle)}`,
                  { state: { cardColor: data.cardColor } },
                )
              }
              className={`w-[75%] cursor-pointer flex items-center justify-between rounded-xl h-[150px] px-12 border-2 border-black ${data.cardColor}`}
              key={data.id}
            >
              <div className={"w-auto h-full flex items-center gap-8"}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFavouriteUserProduct(data.id);
                  }}
                >
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
