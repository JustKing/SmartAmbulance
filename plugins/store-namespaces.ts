import { namespace } from "vuex-class";

const appModule = namespace("modules/app");
const userModule = namespace("modules/user");
const callModule = namespace("modules/call");

export { appModule, userModule, callModule };
