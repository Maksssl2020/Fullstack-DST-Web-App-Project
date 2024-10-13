import React from "react";
import { socialMediaLinks } from "../../helpers/MediaLinks.js";
import InstagramIcon from "../../icons/InstagramIcon.jsx";
import XIcon from "../../icons/XIcon.jsx";
import FacebookIcon from "../../icons/FacebookIcon.jsx";

const socialMediaIcons = [
  {
    icon: <InstagramIcon className={"md:size-10 lg:size-12 xl:size-14"} />,
    link: socialMediaLinks.instagram,
  },
  {
    icon: <XIcon className={"md:size-10 lg:size-12 xl:size-14"} />,
    link: socialMediaLinks.x,
  },
  {
    icon: <FacebookIcon className={"md:size-10 lg:size-12 xl:size-14"} />,
    link: socialMediaLinks.facebook,
  },
];

const ContactUsContactDataPanel = () => {
  return (
    <div className="w-[50%] h-full flex flex-col justify-between">
      <div className="w-full gap-4 justify-center items-center md:h-[125px] lg:h-[150px] xl:h-[200px] flex flex-col bg-custom-gray-200 rounded-3xl">
        <h2 className="font-bold md:text-1xl lg:text-3xl xl:text-4xl">
          Kontakt e-mail
        </h2>
        <h3 className="md:text-sm lg:text-1xl xl:text-3xl">
          dwiestronyteczy@gmail.com
        </h3>
      </div>
      <div className="w-full flex flex-col justify-between p-4 items-center md:h-[135px] lg:h-[165px] xl:h-[200px] bg-custom-gray-200 rounded-3xl">
        <h2 className="md:text-sm lg:text-2xl xl:text-3xl">
          Kontakt przez social media
        </h2>
        <ul className="w-full bg-white items-center flex px-6 py-2 justify-center md:gap-8 lg:gap-16 xl:gap-20 2xl:gap-24 rounded-full lg:h-[60px] xl:h-[80px]">
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
