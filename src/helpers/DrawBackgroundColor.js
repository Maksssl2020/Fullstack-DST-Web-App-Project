export const getBackgroundColor = (index) => {
  const colors = [
    "bg-[#B4E4FF]",
    "bg-[#D1BAFF]",
    "bg-[#CEFFB9]",
    "bg-[#FFF3C5]",
    "bg-[#FFCACA]",
    "bg-[#FFA6A6]",
  ];

  return colors[index % colors.length];
};
