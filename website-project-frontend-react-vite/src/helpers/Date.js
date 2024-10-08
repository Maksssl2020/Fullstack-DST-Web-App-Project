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

export const DateTimeParser = (date) => {
  return new Date(
    date[0],
    date[1] - 1,
    date[2],
    date[3],
    date[4],
  ).toLocaleString("pl-PL", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
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
