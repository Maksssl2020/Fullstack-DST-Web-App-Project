import React from "react";

const UserAccountImageCard = ({
  key,
  className,
  label,
  image,
  alt,
  children,
}) => {
  return (
    <div
      key={key}
      className={`flex h-full flex-col p-4 max-md:w-full ${className}`}
    >
      <p className="mb-2 ml-3 text-xl">{label}</p>
      <div className="relative flex h-full w-full items-center justify-center rounded-3xl border-4 border-custom-gray-300 p-4">
        {children}
        {image === null ? (
          <h2 className="text-3xl font-bold italic">BRAK</h2>
        ) : (
          <img
            className="inset-0 h-[75%] w-[80%] rounded-3xl object-cover"
            src={`data:image/png;base64,${image}`}
            alt={alt}
          />
        )}
      </div>
    </div>
  );
};

export default UserAccountImageCard;
