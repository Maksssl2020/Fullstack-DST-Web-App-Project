import React, { useEffect, useState } from "react";
import HeartIcon from "../../icons/HeartIcon.jsx";
import Spinner from "../universal/Spinner.jsx";
import { getCartIdForNonRegisterUser } from "../../helpers/NonRegisteredUserCartId.js";
import ProductQuantityButton from "../button/ProductQuantityButton.jsx";
import SizesDropdown from "../dropdown/SizesDropdown.jsx";
import { motion } from "framer-motion";
import useAddItemToCartMutation from "../../hooks/mutations/useAddItemToCartMutation.js";
import useProductSizes from "../../hooks/queries/useProductSizes.js";
import useProductCategories from "../../hooks/queries/useProductCategories.js";
import useAuthentication from "../../hooks/others/useAuthentication.js";
import useAddFavouriteUserProductMutation from "../../hooks/mutations/useAddFavouriteUserProductMutation.js";
import useDeleteFavouriteUserProductMutation from "../../hooks/mutations/useDeleteFavouriteUserProductMutation.js";

const ShopProductBuyOptionsPanel = ({
  productData,
  cardColor,
  setProductCategories,
  markedAsFavourite,
}) => {
  const { userId, isAuthenticated } = useAuthentication();
  const { id, title, name, price, productType } = productData;
  const [cartIdentifier, setCartIdentifier] = useState("");
  const [quantity, setQuantity] = React.useState(1);
  const [chosenSize, setChosenSize] = React.useState(null);
  const [addedToFavourite, setAddedToFavourite] = useState(
    markedAsFavourite?.mainProductId === id,
  );
  const { productCategories, fetchingProductCategories } =
    useProductCategories(id);
  const { productSizes, fetchingProductSizes } = useProductSizes(
    id,
    productType,
  );
  const { addItemToCart, addingItemToCart } = useAddItemToCartMutation(
    cartIdentifier,
    { id, quantity, chosenSize },
  );
  const { addFavouriteProduct, addingFavouriteProduct } =
    useAddFavouriteUserProductMutation();
  const { deleteFavouriteUserProduct, deletingFavouriteUserProduct } =
    useDeleteFavouriteUserProductMutation();

  useEffect(() => {
    if (isAuthenticated) {
      setCartIdentifier(`${userId}`);
    } else {
      setCartIdentifier(getCartIdForNonRegisterUser);
    }
  }, [isAuthenticated, userId]);

  useEffect(() => {
    if (productCategories) {
      setProductCategories(productCategories);
    }
  }, [productCategories, setProductCategories]);

  const handleAddDeleteFavourite = () => {
    setAddedToFavourite(!addedToFavourite);

    if (markedAsFavourite === undefined) {
      addFavouriteProduct({ mainProductId: id, cardColor: cardColor });
    } else {
      deleteFavouriteUserProduct(markedAsFavourite.favouriteItemId);
    }
  };

  if (
    fetchingProductCategories ||
    addingItemToCart ||
    fetchingProductSizes ||
    addingFavouriteProduct ||
    deletingFavouriteUserProduct
  ) {
    return <Spinner />;
  }

  const handleQuantitySubtraction = () => {
    if (quantity - 1 >= 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantityAdding = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div
      className={`w-[50%] h relative py-4 px-10 h-[550px] rounded-2xl ${cardColor}`}
    >
      <h2 className="w-full h-[65px] flex justify-center items-center font-bold text-5xl left-0 bg-white absolute indent-0">
        {title}
      </h2>
      <div className="w-full flex flex-col gap-4 h-full mt-20">
        <p className="font-bold text-3xl">{price}</p>
        <p className="font-bold text-2xl">{name}</p>
        {productType === "CLOTHING" && (
          <>
            <button className="text-xl w-full h-[50px] bg-white rounded-full">
              Rozmiar
            </button>
            <SizesDropdown
              title={"Wybierz opcję"}
              className={
                "text-xl w-full h-[50px] z-20 bg-white rounded-full italic"
              }
              data={productSizes}
              chosenSize={chosenSize}
              onClick={setChosenSize}
            />
          </>
        )}
        <ProductQuantityButton
          quantity={quantity}
          subFunction={handleQuantitySubtraction}
          addFunction={handleQuantityAdding}
          className={
            "flex justify-between items-center px-4 py-2 text-xl font-bold bg-white w-[125px] h-[50px] rounded-full"
          }
        />
        <div className="w-full flex h-[75px] bg-white rounded-2xl">
          <motion.button
            whileHover={{ backgroundColor: "#FF5A5A", color: "#FFFFFF" }}
            style={{ backgroundColor: "#D0D0D0", color: "#111111" }}
            onClick={addItemToCart}
            className=" w-[50%] rounded-2xl h-full  uppercase text-2xl"
          >
            Dodaj do koszyka
          </motion.button>
          <button
            onClick={handleAddDeleteFavourite}
            className="w-[50%] gap-2 h-full text-xl flex justify-center items-center"
          >
            <HeartIcon
              isFavourite={addedToFavourite}
              className={"size-10 stroke-1"}
            />
            <p>dodaj do ulubionych</p>
          </button>
        </div>
        <p className="text-xl">{`Kategoria: ${productCategories}`}</p>
      </div>
    </div>
  );
};

export default ShopProductBuyOptionsPanel;
