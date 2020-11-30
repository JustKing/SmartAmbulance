import Vue from "vue";
import YmapPlugin from "vue-yandex-maps";

const settings = {
  apiKey: "afa25d65-c720-442a-af90-0df78ac428d4",
  lang: "ru_RU",
  coordorder: "latlong",
  version: "2.1",
};

Vue.use(YmapPlugin, settings);
