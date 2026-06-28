export const getTodayInputDate = () => {
  const now = new Date();
  const timezoneAdjusted = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return timezoneAdjusted.toISOString().split('T')[0];
};

export const getEndOfYearInputDate = () => {
  const now = new Date();
  const endOfYear = new Date(now.getFullYear(), 11, 31);
  const timezoneAdjusted = new Date(endOfYear.getTime() - endOfYear.getTimezoneOffset() * 60000);
  return timezoneAdjusted.toISOString().split('T')[0];
};