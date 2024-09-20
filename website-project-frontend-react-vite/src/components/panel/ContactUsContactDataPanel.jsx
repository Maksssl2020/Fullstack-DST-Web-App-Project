import React from "react";
import InstagramIcon from "../../icons/InstagramIcon.jsx";
import XIcon from "../../icons/XIcon.jsx";
import FacebookIcon from "../../icons/FacebookIcon.jsx";
import { Link } from "react-router-dom";
import { socialMediaLinks } from "../../helpers/MediaLinks.js";

const socialMediaIcons = [
  <Link target={"_blank"} to={socialMediaLinks.instagram}>
    <InstagramIcon size={"md:size-10 lg:size-12 xl:size-16 2xl:size-20"} />
  </Link>,
  <Link target={"_blank"} to={socialMediaLinks.x}>
    <XIcon size={"md:size-10 lg:size-12 xl:size-16 2xl:size-20"} />
  </Link>,
  <Link target={"_blank"} to={socialMediaLinks.facebook}>
    <FacebookIcon size={"md:size-10 lg:size-12 xl:size-16 2xl:size-20"} />
  </Link>,
];

const ContactUsContactDataPanel = () => {
  return (
    <div className="w-[50%] h-full flex flex-col justify-between">
      <div className="w-full gap-4 justify-center items-center md:h-[125px] lg:h-[150px] xl:h-[200px] flex flex-col bg-custom-gray-200 rounded-3xl">
        <h2 className="font-bold md:text-2xl lg:text-4xl xl:text-5xl">
          Kontakt e-mail
        </h2>
        <h3 className="md:text-lg lg:text-2xl xl:text-4xl">
          dwiestronyteczy@gmail.com
        </h3>
      </div>
      <div className="w-full flex flex-col justify-between p-4 items-center md:h-[135px] lg:h-[165px] xl:h-[200px] bg-custom-gray-200 rounded-3xl">
        <h2 className="md:text-lg lg:text-3xl xl::text-4xl 2xl:text-5xl">
          Kontakt przez social media
        </h2>
        <ul className="w-full bg-white items-center flex px-6 py-2 justify-center md:gap-8 lg:gap-16 xl:gap-20 2xl:gap-24 rounded-full lg:h-[80px] xl:h-[100px]">
          {socialMediaIcons.map((icon, index) => (
            <li key={index}>{icon}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactUsContactDataPanel;
