import React from "react";

const AccountImageCard = ({ username, image, title }) => {
  return (
    <div className="h-[400px] w-[358px] border-4 border-black rounded-2xl">
      <div className="size-[350px] rounded-2xl flex items-center justify-center">
        {image ? (
          <img
            className="size-full inset-0 object-cover rounded-t-xl self-center"
            src={`data:image/png;base64,${image}`}
            alt={username}
          />
        ) : (
          <h2 className="text-2xl italic font-bold">BRAK</h2>
        )}
      </div>
      <h2 className="w-full rounded-b-xl h-[40px] text-2xl font-bold uppercase text-center border-t-4 border-black bg-white">
        {title}
      </h2>
    </div>
  );
};

export default AccountImageCard;
