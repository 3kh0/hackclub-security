export default defineEventHandler(async (event) => {
  const total = 965;
  // we will add some cooler shit here later
  return {
    t: total.toLocaleString(),
  };
});