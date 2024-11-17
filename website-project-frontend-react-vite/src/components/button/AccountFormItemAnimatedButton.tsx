import React from "react";
import { motion } from "framer-motion";

type AccountFormItemAnimatedButtonProps = {
  isEditing: boolean;
  onClick: () => void;
};

const AccountFormItemAnimatedButton = ({
  isEditing,
  onClick,
}: AccountFormItemAnimatedButtonProps) => {
  return (
    <motion.button
      whileHover={{ backgroundColor: "#FF5A5A", color: "#FFFFFF" }}
      style={{ backgroundColor: "#D0D0D0", color: "#111111" }}
      initial={{ backgroundColor: "#D0D0D0", color: "#111111" }}
      animate={
        isEditing
          ? { backgroundColor: "#FF5A5A", color: "#FFFFFF" }
          : { backgroundColor: "#D0D0D0", color: "#111111" }
      }
      type={"button"}
      onClick={onClick}
      className={`absolute inset-0 ml-auto h-[60px] w-[100px] -translate-x-4 rounded-2xl font-bold`}
    >
      ZMIEŃ
    </motion.button>
  );
};

export default AccountFormItemAnimatedButton;
