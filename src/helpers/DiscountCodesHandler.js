import { formatCurrency } from "./CurrencyFormatter";

export const isDiscountCodeValid = (
  discountCode,
  currentOrderValue,
  isUserAuthenticated,
) => {
  const { active, minimumOrderValue, global } = discountCode;

  if (!active) {
    throw new Error("Wprowadzony kod jest nieaktywny!");
  } else if (minimumOrderValue > currentOrderValue) {
    throw new Error(
      `Minimalna kwota zamówienia dla tego kodu wynosi: ${formatCurrency(minimumOrderValue)}`,
    );
  } else if (global && !isUserAuthenticated) {
    throw new Error("Aby skorzystać z tego kodu, musisz się zalogować!");
  } else {
    return true;
  }
};
