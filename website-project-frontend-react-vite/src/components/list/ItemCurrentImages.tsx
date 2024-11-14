import React from "react";

const ItemCurrentImages = ({ images }) => {
  return (
    <div className={"w-full h-auto flex flex-col gap-4 my-4"}>
      <h2 className={"ml-3 font-bold text-xl"}>Obecne zdjęcia:</h2>
      <div className={"w-full flex flex-wrap gap-4 "}>
        {images?.map((file, index) => (
          <img
            className={
              "size-[175px] rounded-xl inset-0 object-cover border-4 border-black"
            }
            key={index}
            src={URL.createObjectURL(file)}
            alt={index}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemCurrentImages;
