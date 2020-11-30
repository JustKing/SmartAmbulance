/* eslint-disable import/no-mutable-exports */
import { Store } from "vuex";
import { getModule } from "vuex-module-decorators";
import app from "@/store/modules/app";
import user from "@/store/modules/user";
import call from "@/store/modules/call";

let appStore: app;
let userStore: user;
let callStore: call;

function initialiseStores(store: Store<any>): void {
  appStore = getModule(app, store);
  userStore = getModule(user, store);
  callStore = getModule(call, store);
}

export { initialiseStores, appStore, userStore, callStore };
