import React, { useContext, useEffect, useState } from "react";
import HeartIcon from "../../icons/HeartIcon";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchProductCategoriesData } from "../../helpers/api-integration/ShopProductsHandling";
import Spinner from "../universal/Spinner";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import { addProductToCart } from "../../helpers/api-integration/ShoppingCartHandling";
import toast from "react-hot-toast";
import { getCartIdForNonRegisterUser } from "../../helpers/NonRegisteredUserCartId";
import ProductQuantityButton from "../button/ProductQuantityButton";

const ShopProductBuyOptionsPanel = ({
  productData,
  cardColor,
  setProductCategories,
}) => {
  const { username, isAuthenticated } = useContext(AuthContext);
  const { id, title, name, price, productType } = productData;
  const [cartIdentifier, setCartIdentifier] = useState();
  const [quantity, setQuantity] = React.useState(1);
  const [chosenSize, setChosenSize] = React.useState(null);
  const queryClient = useQueryClient();
  const { data: productCategories, isLoading: categoriesLoading } = useQuery(
    ["productCategories", id],
    () => fetchProductCategoriesData(id),
  );

  useEffect(() => {
    if (isAuthenticated) {
      setCartIdentifier(username);
    } else {
      setCartIdentifier(getCartIdForNonRegisterUser);
    }
  }, [isAuthenticated, username]);

  const { mutate: addProductToUserCart, isLoading: addingProductToCart } =
    useMutation({
      mutationKey: ["addProductToCart", username, id, quantity, chosenSize],
      mutationFn: () =>
        addProductToCart(
          cartIdentifier,
          id,
          quantity,
          chosenSize,
          isAuthenticated,
        ),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: "cartItems" });
        toast.success("Produkt dodany do koszyka!", {
          position: "top-center",
        });
      },
      onError: (error) => console.log(error),
    });

  if (categoriesLoading || addingProductToCart) {
    return <Spinner />;
  }

  setProductCategories(productCategories);

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
            <button className="text-xl w-full h-[50px] bg-white rounded-full italic">
              wybierz opcję
            </button>
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
          <button
            onClick={addProductToUserCart}
            className=" w-[50%] rounded-2xl h-full hover:bg-custom-orange-200 hover:text-white uppercase text-2xl bg-custom-gray-300"
          >
            Dodaj do koszyka
          </button>
          <button className="w-[50%] gap-2 h-full text-xl flex justify-center items-center">
            <HeartIcon size={"size-10"} />
            <p>dodaj do ulubionych</p>
          </button>
        </div>
        <p className="text-xl">{`Kategoria: ${productCategories}`}</p>
      </div>
    </div>
  );
};

export default ShopProductBuyOptionsPanel;
