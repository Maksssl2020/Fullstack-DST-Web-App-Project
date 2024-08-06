import React, { useEffect } from "react";
import axios from "../../helpers/AxiosConfig";

const ShopProductImagesPanel = ({ productId, cardColor }) => {
  const [productImages, setProductImages] = React.useState([]);
  const [chosenImage, setChosenImage] = React.useState(0);

  useEffect(() => {
    try {
      axios.get(`/products/images/${productId}`).then((response) => {
        setProductImages(response.data.flatMap((data) => data.image));
      });

      console.log(productImages);
    } catch (error) {
      console.error(error);
    }
  }, [productId]);

  const handleImageClick = (imageIndex) => {
    setChosenImage(imageIndex);
  };

  return (
    <>
      <ul className="flex flex-col gap-6 w-[5%]">
        {productImages.map((image, index) => (
          <button
            onClick={() => handleImageClick(index)}
            key={index}
            className={`${cardColor} rounded-2xl size-[100px]`}
          >
            <img
              className="size-full inset-0 object-cover self-center rounded-2xl"
              src={`data:image/png;base64,${image}`}
              alt={`image-number-${index}`}
            />
          </button>
        ))}
      </ul>
      <div className={`w-[35%] h-[450px] rounded-2xl p-8 ${cardColor}`}>
        <img
          className="size-full inset-0 object-cover self-center rounded-2xl"
          src={`data:image/png;base64,${productImages[chosenImage]}`}
          alt={`image-number-${chosenImage}`}
        />
      </div>
    </>
  );
};

export default ShopProductImagesPanel;
