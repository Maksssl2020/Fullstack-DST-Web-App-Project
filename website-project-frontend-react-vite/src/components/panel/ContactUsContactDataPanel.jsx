import React from "react";
import { socialMediaLinks } from "../../helpers/MediaLinks.js";
import InstagramIcon from "../../icons/InstagramIcon.jsx";
import XIcon from "../../icons/XIcon.jsx";
import FacebookIcon from "../../icons/FacebookIcon.jsx";

const socialMediaIcons = [
  {
    icon: (
      <InstagramIcon
        className={"max-sm:size-8 sm:size-10 lg:size-12 xl:size-14"}
      />
    ),
    link: socialMediaLinks.instagram,
  },
  {
    icon: (
      <XIcon className={"max-sm:size-8 sm:size-10 lg:size-12 xl:size-14"} />
    ),
    link: socialMediaLinks.x,
  },
  {
    icon: (
      <FacebookIcon
        className={"max-sm:size-8 sm:size-10 lg:size-12 xl:size-14"}
      />
    ),
    link: socialMediaLinks.facebook,
  },
];

const ContactUsContactDataPanel = () => {
  return (
    <div className="max-lg:w-full lg:w-[50%] h-full max-lg:gap-6 flex flex-col lg:justify-between">
      <div className="w-full gap-4 justify-center items-center max-lg:h-[125px] lg:h-[150px] xl:h-[200px] flex flex-col bg-custom-gray-200 rounded-3xl">
        <h2 className="font-bold max-sm:text-xl sm:text-2xl md:text-3xl xl:text-4xl">
          Kontakt e-mail
        </h2>
        <h3 className="max-sm:text-lg sm:text-xl xl:text-3xl">
          dwiestronyteczy@gmail.com
        </h3>
      </div>
      <div className="w-full flex flex-col justify-between p-4 items-center max-lg:h-[135px] lg:h-[165px] xl:h-[200px] bg-custom-gray-200 rounded-3xl">
        <h2 className="max-sm:text-lg sm:text-xl md:text-2xl xl:text-3xl">
          Kontakt przez social media
        </h2>
        <ul className="w-full bg-white items-center flex px-6 py-2 justify-center max-sm:gap-6 sm:gap-8 lg:gap-16 xl:gap-20 2xl:gap-24 rounded-full sm:h-[50px] lg:h-[60px] xl:h-[80px]">
          {socialMediaIcons.map((icon, index) => (
            <a href={icon.link} target={"_blank"} key={index}>
              {icon.icon}
            </a>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactUsContactDataPanel;
