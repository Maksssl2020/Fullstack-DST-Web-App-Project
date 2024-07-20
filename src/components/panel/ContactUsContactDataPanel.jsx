import React from "react";
import InstagramIcon from "../list/icons/InstagramIcon";
import XIcon from "../list/icons/XIcon";
import FacebookIcon from "../list/icons/FacebookIcon";

const socialMediaIcons = [
  <InstagramIcon size={"size-20"} />,
  <XIcon size={"size-20"} />,
  <FacebookIcon size={"size-20"} />,
];

const ContactUsContactDataPanel = () => {
  return (
    <div className="w-[50%] h-full flex flex-col justify-between">
      <div className="w-full gap-4 justify-center items-center h-[200px] flex flex-col bg-custom-gray-200 rounded-3xl">
        <h2 className="font-bold text-5xl">Kontakt e-mail</h2>
        <h3 className="text-4xl">dwiestronyteczy@gmail.com</h3>
      </div>
      <div className="w-full flex flex-col justify-between p-4 items-center h-[200px] bg-custom-gray-200 rounded-3xl">
        <h2 className="font-bold text-5xl">Kontakt przez social media</h2>
        <ul className="w-full bg-white items-center flex px-6 py-2 justify-center gap-24 rounded-full h-[100px]">
          {socialMediaIcons.map((icon, index) => (
            <li key={index}>{icon}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ContactUsContactDataPanel;
