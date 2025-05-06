export const translateCondition = (condition: string) => {
  switch (condition) {
    case "new":
      return "نو";
    case "like-new":
      return "در حد نو";
    case "used":
      return "کارکرده";
    case "needs-repair":
      return "نیاز به تعمیر";
    default:
      return condition;
  }
};

export const translateCity = (city: string) => {
  switch (city) {
    case "tehran":
      return "تهران";
    case "mashhad":
      return "مشهد";
    case "isfahan":
      return "اصفهان";
    case "shiraz":
      return "شیراز";
    case "tabriz":
      return "تبریز";
    case "karaj":
      return "کرج";
    default:
      return city;
  }
};
