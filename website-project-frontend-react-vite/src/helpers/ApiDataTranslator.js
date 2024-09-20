export const getRole = (role) => {
  switch (role) {
    case "ADMIN": {
      return "Administrator";
    }
    case "REGISTERED": {
      return "Zarejestrowany";
    }
    case "VOLUNTEER": {
      return "Wolontariusz";
    }
    default: {
      return "NIEZNANY!";
    }
  }
};

export const getShippingType = (shippingType) => {
  switch (shippingType) {
    case "COURIER": {
      return "Kurier";
    }
    case "PERSONALLY": {
      return "Odbiór osobisty";
    }
    case "PARCEL_LOCKER": {
      return "Paczkomat INPOST";
    }
    default: {
      return "NIEZNANY!";
    }
  }
};

export const getOrderStatus = (orderStatus) => {
  switch (orderStatus) {
    case "WAITING_FOR_PAYMENT": {
      return "Oczekiwanie na płatność";
    }
    case "ACCEPTED": {
      return "Zaakceptowane";
    }
    case "IN_PROGRESS": {
      return "W trakcie realizacji";
    }
    case "SENT": {
      return "Wysłane";
    }
    case "CANCELED": {
      return "Anulowane";
    }
    default: {
      return "NIEZNANY!";
    }
  }
};

export const getPaymentStatus = (paymentStatus) => {
  switch (paymentStatus) {
    case "CORRECT": {
      return "Dokonano płatności";
    }
    case "PENDING": {
      return "Oczekuje na opłacenie";
    }
    default: {
      return "NIEZNANY!";
    }
  }
};

export const getPaymentResult = (paymentResult) => {
  switch (paymentResult) {
    case "SUCCESS": {
      return "Płatność utworzona pomyślnie";
    }
    default: {
      return "NIEZNANY!";
    }
  }
};

// WAITING_FOR_PAYMENT,
//     ACCEPTED,
//     IN_PROGRESS,
//     SENT,
//     CANCELED
