export const translateErrorsForUsers = (error) => {
  switch (error) {
    case "There isn't any user with this email!": {
      return "Brak konta o podanym adresie e-mail!";
    }
    case "Bad credentials": {
      return "Nieprawidłowa nazwa użytkownika lub hasło!";
    }
    case "Account isn't activated!": {
      return "Konto nie zostało aktywowane! Sprawdź e-mail.";
    }
    default: {
      return error;
    }
  }
};
