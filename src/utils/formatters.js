/**
 * Format a number as currency
 * @param {number} amount - The amount to format
 * @returns {string} Formatted amount with thousand separators
 */
export const formatCurrency = (amount) => {
  return amount?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") || "0";
};
