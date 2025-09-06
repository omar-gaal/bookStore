// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   runtimeConfig: {
    public: {
      UMBRACO_BASE_URL: process.env.NUXT_PUBLIC_UMBRACO_BASE_URL
    }
  },
  modules: ['@nuxt/eslint']
})