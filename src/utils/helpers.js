export const parsePaginationParams = ({ page, perPage }) => ({
  page: Math.max(1, Number(page) || 1),
  perPage: Math.max(1, Number(perPage) || 12),
});
export const parseSortOrder = (sortOrder) => {
  return String(sortOrder).toLowerCase() === 'desc' ? -1 : 1;
};
