import { formatCurrency } from "./CurrencyFormatter.js";

export const calcCartTotalPriceWithDiscount = (
  discountCodeData,
  orderValue,
) => {
  const { discountType, discountValue, code, minimumOrderValue } =
    discountCodeData;

  console.log(discountCodeData);

  if (orderValue <= minimumOrderValue) {
    throw new Error(
      `Minimalna wartość zamówienia dla kodu ${code} wynosi: ${formatCurrency(minimumOrderValue)}`,
    );
  }

  return calcTotalSumWithDiscount(orderValue, discountValue, discountType);
};

export const calcTotalSumWithDiscount = (sum, discountValue, discountType) => {
  if (discountType === "PERCENTAGE") {
    const convertedValueIntoPercent = discountValue / 100;
    const calculatedValue = sum * convertedValueIntoPercent;

    return sum - calculatedValue;
  } else {
    return sum - discountValue;
  }
};
