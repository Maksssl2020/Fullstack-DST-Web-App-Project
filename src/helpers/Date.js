export const TodayDate = () => {
  return new Date(Date.now()).toLocaleDateString();
};

export const DateParser = (date) => {
  return `${date[2]}.${date[1]}.${date[0]}`;
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
