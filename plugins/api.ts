import axios, { AxiosRequestConfig } from "axios";
import { userStore } from "@/store";

const baseUrl: string = "http://hantaton.herokuapp.com/api";

function defaultConfig(isAuth: boolean): AxiosRequestConfig {
  const headers: { "Content-Type": string; Authorization?: string } = {
    "Content-Type": "application/json",
  };

  if (isAuth) {
    headers.Authorization = userStore.context.getters.tokenAuth;
  }
  return {
    baseURL: baseUrl,
    headers,
  };
}

export default {
  account: {
    auth: (phone: string) =>
      axios.post("/Account/SendCode", phone, { ...defaultConfig(false) }),
    code: (data: JSON) =>
      axios.post("/Account/Verify", data, { ...defaultConfig(false) }),
    info: () => axios.get("/Account/Info", { ...defaultConfig(true) }),
    updateProfile: (data: JSON) =>
      axios.post("/Account/UpdateProfile", data, { ...defaultConfig(true) }),
  },
  call: {
    create: (data: JSON) =>
      axios.post("/Call/Create", data, { ...defaultConfig(true) }),
    setState: (data: JSON) =>
      axios.post("/Call/SetState", data, { ...defaultConfig(true) }),
  },
};
