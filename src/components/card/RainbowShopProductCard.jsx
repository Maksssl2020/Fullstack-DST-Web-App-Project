import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { transformProductTitleIntoLinkTitle } from "../../helpers/transformProductTitle";
import axios from "../../helpers/AxiosConfig";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  fetchProductImages,
  handleDeleteProduct,
} from "../../helpers/api-integration/ShopProductsHandling";
import Spinner from "../universal/Spinner";
import { AuthContext } from "../../helpers/provider/AuthProvider";
import DeleteIcon from "../../icons/DeleteIcon";
import EditIcon from "../../icons/EditIcon";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import DefaultModal from "../modal/DefaultModal";

const RainbowShopProductCard = ({
  cardData,
  cardColor,
  cardType = "MAIN",
  size = "size-[500px]",
}) => {
  const { role } = useContext(AuthContext);
  const { id, title, price, productType } = cardData;
  const [openModal, setOpenModal] = useState();
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
    <div className="w-auto h-auto">
      <div
        onClick={() =>
          navigate(
            `/rainbow-shop/products/${id}/${transformProductTitleIntoLinkTitle(title)}`,
            { state: { cardColor } },
          )
        }
        className={`flex flex-col justify-center items-center hover:cursor-pointer ${size}`.concat(
          " " + cardColor,
        )}
      >
        {role === "ADMIN" && cardType === "MAIN" && (
          <div className={"flex ml-auto mr-4 gap-2"}>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                navigate(
                  `/rainbow-shop/products/admin-options/${productType !== "CLOTHING" ? productType.toLowerCase().concat("s") : "clothes"}/edit/${id}`,
                );
              }}
              className={
                "size-12 rounded-full bg-white border-2 border-black flex justify-center items-center"
              }
            >
              <EditIcon size={"size-10"} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(true);
              }}
              className={
                "size-12 rounded-full bg-white border-2 border-black flex justify-center items-center"
              }
            >
              <DeleteIcon size={"size-10"} />
            </motion.button>
          </div>
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
      <AnimatePresence>
        {openModal && (
          <DefaultModal
            title="UWAGA!"
            subtitle="Czy na pewno chcesz usunąć produkt?"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                deleteProduct();
                setOpenModal(false);
              }}
              className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-4 border-black bg-custom-orange-200 py-1 rounded-full"
            >
              tak
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpenModal(false);
              }}
              className="w-[50%] uppercase font-bold text-xl text-white h-[50px] flex items-center justify-center border-4 border-black bg-custom-orange-200 py-1 rounded-full"
            >
              nie
            </button>
          </DefaultModal>
        )}
      </AnimatePresence>
    </div>
  );
};

export default RainbowShopProductCard;
