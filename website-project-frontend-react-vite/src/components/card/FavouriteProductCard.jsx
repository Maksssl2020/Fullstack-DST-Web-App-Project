import React from "react";
import { transformProductTitleIntoLinkTitle } from "../../helpers/transformProductTitle.js";
import CloseIcon from "../drawer/icons/CloseIcon.jsx";
import { formatCurrency } from "../../helpers/CurrencyFormatter.js";
import { useNavigate } from "react-router-dom";
import useDeleteFavouriteUserProductMutation from "../../hooks/mutations/useDeleteFavouriteUserProductMutation.js";
import Spinner from "../universal/Spinner.jsx";
import AnimatedCancelButton from "../button/AnimatedCancelButton.jsx";

function FavouriteProductCard({ productData }) {
  const {
    id,
    mainProductId,
    cardColor,
    productFullTitle,
    unitPrice,
    mainImage,
    productSize,
  } = productData;

  const { deleteFavouriteUserProduct, deletingFavouriteUserProduct } =
    useDeleteFavouriteUserProductMutation();
  const navigate = useNavigate();

  if (deletingFavouriteUserProduct) {
    return <Spinner />;
  }

  return (
    <div
      onClick={() =>
        navigate(
          `/rainbow-shop/products/${mainProductId}/${transformProductTitleIntoLinkTitle(productFullTitle)}`,
          { state: { cardColor: cardColor } },
        )
      }
      className={`w-[75%] cursor-pointer flex items-center justify-between rounded-xl h-[150px] px-12 border-2 border-black ${cardColor}`}
      key={id}
    >
      <div className={"w-auto h-full flex items-center gap-8"}>
        <AnimatedCancelButton
          onClick={(e) => {
            e.stopPropagation();
            deleteFavouriteUserProduct(id);
          }}
          iconSize={"size-10"}
        />
        <div className={"size-[125px]"}>
          <img
            className={"size-full object-cover inset-0"}
            src={`data:image/png;base64,${mainImage}`}
            alt={id}
          />
        </div>
      </div>
      <p className={"text-3xl"}>
        {productFullTitle} {productSize && `- ${productSize}`}
      </p>
      <p className={"text-3xl"}>{formatCurrency(unitPrice)}</p>
    </div>
  );
}

export default FavouriteProductCard;
