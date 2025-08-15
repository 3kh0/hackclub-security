async function turnstile(token, key) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: key,
        response: token,
      }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (!response.ok) {
      return { success: false };
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile:", error);
    return { success: false };
  }
}

export { turnstile };
