export const formatPrice = (price: number) => {
  if (price === 0) return "توافقی";
  return `${price.toLocaleString()} تومان`;
};
