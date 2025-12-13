export default defineEventHandler(async (event) => {
  const total = 4700;
  // we will add some cooler shit here later
  // update, we did not add the cool shit, this is manually updated lmao
  return {
    t: total.toLocaleString(),
  };
});