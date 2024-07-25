import React from "react";
import FacebookIcon from "./icons/FacebookIcon";
import InstagramIcon from "./icons/InstagramIcon";
import XIcon from "./icons/XIcon";
import TikTokIcon from "./icons/TikTokIcon";
import YouTubeIcon from "./icons/YouTubeIcon";

const icons = [
  <FacebookIcon size={"size-16"} />,
  <XIcon size={"size-16"} />,
  <InstagramIcon size={"size-16"} />,
  <TikTokIcon size={"size-16"} />,
  <YouTubeIcon size={"size-16"} />,
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
