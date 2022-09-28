export const getStatOrder = (status) => {
  switch (status) {
    case 0:
      return "Preparation";
      break;
    case 1:
      return "Pret";
      break;
    case 2:
      return "En Route";
      break;
    case 3:
      return "Non Trouve";
      break;
    case 4:
      return "Retourne";
      break;
    case 5:
      return "Livre";
      break;
    default:
      break;
  }
};
