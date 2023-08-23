export const formatVND = (number: number) => {
  const newNumber = Math.trunc(number / 1000) * 1000;
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(newNumber);
};
