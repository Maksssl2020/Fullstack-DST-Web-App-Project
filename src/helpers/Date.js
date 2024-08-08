export const TodayDate = () => {
  return new Date(Date.now()).toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const DateParser = (date) => {
  return new Date(date).toLocaleString("pl-PL", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
};

export const PeriodOfDays = (date) => {
  const dayInMilliseconds = 24 * 60 * 60 * 1000;
  const differenceInMilliseconds = new Date() - new Date(date);
  const result = Math.floor(differenceInMilliseconds / dayInMilliseconds);

  if (result === 0) {
    return "Dzisiaj";
  } else {
    return result;
  }
};
