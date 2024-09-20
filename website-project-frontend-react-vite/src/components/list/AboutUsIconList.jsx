import React from "react";
import FacebookIcon from "../../icons/FacebookIcon.jsx";
import InstagramIcon from "../../icons/InstagramIcon.jsx";
import XIcon from "../../icons/XIcon.jsx";
import TikTokIcon from "../../icons/TikTokIcon.jsx";
import YouTubeIcon from "../../icons/YouTubeIcon.jsx";

const icons = [
  <FacebookIcon className={"size-16"} />,
  <XIcon className={"size-16"} />,
  <InstagramIcon className={"size-16"} />,
  <TikTokIcon className={"size-16"} />,
  <YouTubeIcon className={"size-16"} />,
];

const AboutUsIconList = () => {
  return (
    <ul className="flex gap-8 size-16 w-auto h-auto">
      {icons.map((icon, index) => (
        <li key={index}>{icon}</li>
      ))}
    </ul>
  );
};

export default AboutUsIconList;
