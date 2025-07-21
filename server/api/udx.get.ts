export default defineEventHandler(async (event) => {
  const total = 1115;
  // we will add some cooler shit here later
  return {
    t: total.toLocaleString(),
  };
});