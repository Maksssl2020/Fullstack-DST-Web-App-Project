import React from "react";

const MainBannerWithLogo = ({
  mainContainerStyling,
  imageContainerStyling,
}) => {
  return (
    <div
      className={"ml-6 flex items-center justify-center gap-4 rounded-full bg-custom-gray-100 ".concat(
        mainContainerStyling,
      )}
    >
      <div className={imageContainerStyling}>
        <img
          className="inset-0 h-full w-full rounded-full object-cover"
          src="/assets/images/website-logo.jpg"
          alt=""
        />
      </div>
      <h2 className="text-2xl font-bold">DWIE strony TĘCZY</h2>
    </div>
  );
};

export default MainBannerWithLogo;
