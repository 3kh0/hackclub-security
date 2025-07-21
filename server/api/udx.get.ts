export default defineEventHandler(async (event) => {
  const total = 1454;
  // we will add some cooler shit here later
  return {
    t: total.toLocaleString(),
  };
});