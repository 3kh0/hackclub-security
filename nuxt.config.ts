// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    tprivate: process.env.TURNSTILE_SECRET_KEY,
    webhook: process.env.SLACK_WEBHOOK_URL,
    ekey: process.env.RESEND_API_KEY,
    public: {
      tpublic: process.env.TURNSTILE_SITE_KEY,
    },
  },
  app: {
    head: {
      title: "Hack Club Security Program",
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { charset: "utf-8" },
        {
          name: "description",
          content: "Help keep Hack Club secure. Report vulnerabilities and earn bounties through our security program.",
        },
        { property: "og:site_name", content: "Hack Club Security Program" },
        { property: "og:title", content: "Hack Club Security Program" },
        { property: "og:description", content: "Help keep Hack Club secure. Report vulnerabilities and earn bounties through our security program." },
        { property: "og:url", content: "https://security.hackclub.com" },
      ],
      htmlAttrs: {
        lang: "en",
      },
      link: [
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "manifest", href: "/site.webmanifest" },
      ],
      script: [{ src: "https://challenges.cloudflare.com/turnstile/v0/api.js", async: true, defer: true }],
    },
  },
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image", "@nuxt/icon", "nuxt-auth-utils"],
  vite: {
    plugins: [tailwindcss()],
  },
});