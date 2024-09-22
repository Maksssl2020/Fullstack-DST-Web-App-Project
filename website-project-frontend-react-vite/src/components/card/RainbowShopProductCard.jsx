import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { transformProductTitleIntoLinkTitle } from "../../helpers/transformProductTitle.js";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchProductImages,
  handleDeleteProduct,
} from "../../helpers/api-integration/ShopProductsHandling.js";
import Spinner from "../universal/Spinner.jsx";
import { AuthContext } from "../../helpers/provider/AuthProvider.jsx";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import AdminOptionsButtons from "../button/AdminOptionsButtons.jsx";

const RainbowShopProductCard = ({
  cardData,
  cardColor,
  cardType = "MAIN",
  size = "size-[500px]",
}) => {
  const { role } = useContext(AuthContext);
  const { id, title, price, productType } = cardData;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: productImages, isLoading: fetchingProductImages } = useQuery(
    ["mainCardProductImages", id],
    () => fetchProductImages(id),
  );

  console.log(cardData);
  console.log(productImages);

  const { mutate: deleteProduct, isLoading: deletingProduct } = useMutation({
    mutationKey: ["deleteProductById", id],
    mutationFn: () => handleDeleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries("shopProductsData");
      toast.success("Usunięto produkt!");
    },
    onError: (error) => console.log(error),
  });

  if (fetchingProductImages || deletingProduct) {
    return <Spinner />;
  }

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="w-auto h-auto">
      <div
        onClick={() =>
          navigate(
            `/rainbow-shop/products/${id}/${transformProductTitleIntoLinkTitle(title)}`,
            { state: { cardColor } },
          )
        }
        className={`flex flex-col relative justify-center items-center hover:cursor-pointer ${size}`.concat(
          " " + cardColor,
        )}
      >
        {role === "ADMIN" && cardType === "MAIN" && (
          <AdminOptionsButtons
            deleteFunction={deleteProduct}
            editButtonLink={`/rainbow-shop/products/admin-options/${productType !== "CLOTHING" ? productType.toLowerCase().concat("s") : "clothes"}/edit/${id}`}
            modalSubtitle={"Czy na pewno chesz usunąć ten produkt?"}
          />
        )}
        <div className="size-[350px] flex justify-center items-center">
          <img
            className="inset-0 object-cover size-[85%]"
            src={`data:image/png;base64,${productImages[0]}`}
            alt={title}
          />
        </div>
        {cardType === "MAIN" && (
          <div className="w-[75%] text-3xl flex justify-center items-center bg-white h-[50px] rounded-full italic">
            {title}
          </div>
        )}
      </div>
      {cardType !== "MAIN" && (
        <div className="w-full h-auto text-3xl flex mt-2 flex-col items-center">
          <p className="italic">{title}</p>
          <p className="font-light">{price}</p>
        </div>
      )}
    </motion.div>
  );
};

export default RainbowShopProductCard;
