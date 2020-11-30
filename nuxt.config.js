import colors from "vuetify/es5/util/colors";

export default {
  head: {
    titleTemplate: "%s - smart ambulance",
    title: "smart ambulance",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  css: [],

  plugins: [
    { src: "@/plugins/ymaps", mode: "client" },
    "@/plugins/v-mask",
    { src: "@/plugins/vuex-persist", ssr: false },
  ],

  components: true,

  buildModules: ["@nuxt/typescript-build", "@nuxtjs/vuetify", "@nuxtjs/device"],

  modules: ["@nuxtjs/axios", "@nuxtjs/pwa", "@nuxtjs/toast"],

  axios: {},

  toast: {
    position: "bottom-right",
    duration: 3000,
  },

  pwa: {
    meta: {
      title: "SmartAmbulance",
      author: "Петухи",
    },
    manifest: {
      name: "Умная скорая",
      short_name: "Умная скорая",
      lang: "ru",
      useWebmanifestExtension: false,
      display: "standalone",
    },
  },

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.teal.darken2,
          accent: colors.grey.darken3,
          secondary: colors.blue.darken2,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {},

  router: {
    middleware: ["auth"],
  },

  server: {
    port: 8000,
  },
};
