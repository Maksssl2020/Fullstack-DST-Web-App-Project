import { formatCurrency } from "./CurrencyFormatter";
import {
  applyGlobalDiscountCode,
  applyNonGlobalDiscountCode,
} from "./api-integration/DiscountCodesHandling";

export const handleApplyingDiscountCode = async (
  discountCodeData,
  orderValue,
  userId,
) => {
  const {
    discountType,
    global,
    code,
    minimumOrderValue,
    usageLimit,
    usedCount,
  } = discountCodeData;

  console.log(discountCodeData);
  let discountValue;

  if (orderValue >= minimumOrderValue) {
    discountValue = global
      ? await applyGlobalDiscountCode(code, userId)
      : await applyNonGlobalDiscountCode(code);
  } else {
    throw new Error(
      `Minimalna wartość zamówienia dla kodu ${code} wynosi: ${formatCurrency(minimumOrderValue)}`,
    );
  }

  if (discountValue === 0) {
    throw new Error("Nie można już wykorzystać kodu!");
  }

  return calcTotalSumWithDiscount(orderValue, discountValue, discountType);
};

export const calcTotalSumWithDiscount = (sum, discountValue, discountType) => {
  if (discountType === "PERCENTAGE") {
    const convertedValueIntoPercent = discountValue / 100;
    const calculatedValue = sum * convertedValueIntoPercent;

    return formatCurrency(sum - calculatedValue);
  } else {
    return formatCurrency(sum - discountValue);
  }
};
