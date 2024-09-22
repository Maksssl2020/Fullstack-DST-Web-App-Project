import React from "react";
import { useQuery } from "react-query";
import { fetchProductImages } from "../../helpers/api-integration/ShopProductsHandling.js";
import Spinner from "../universal/Spinner.jsx";
import { motion } from "framer-motion";

const ShopProductImagesPanel = ({ productId, cardColor }) => {
  const [chosenImage, setChosenImage] = React.useState(0);

  const { data: productImages, isLoading: fetchingProductImages } = useQuery(
    ["productPageImages", productId],
    () => fetchProductImages(productId),
  );

  const handleImageClick = (imageIndex) => {
    setChosenImage(imageIndex);
  };

  if (fetchingProductImages) {
    return <Spinner />;
  }

  return (
    <>
      <ul className="flex flex-col gap-6 w-[5%]">
        {productImages.map((image, index) => (
          <button
            onClick={() => handleImageClick(index)}
            key={index}
            className={`${cardColor} rounded-2xl size-[100px]`}
          >
            <motion.img
              whileHover={{ scale: 1.1 }}
              className="size-full inset-0 object-cover self-center rounded-2xl"
              src={`data:image/png;base64,${image}`}
              alt={`image-number-${index}`}
            />
          </button>
        ))}
      </ul>
      <div className={`w-[35%] h-[450px] rounded-2xl p-8 ${cardColor}`}>
        <motion.img
          key={chosenImage}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.3 }}
          className="size-full inset-0 object-cover self-center rounded-2xl"
          src={`data:image/png;base64,${productImages[chosenImage]}`}
          alt={`image-number-${chosenImage}`}
        />
      </div>
    </>
  );
};

export default ShopProductImagesPanel;
