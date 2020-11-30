import { Module, VuexModule } from "vuex-module-decorators"

@Module({
  name: "app",
  stateFactory: true,
  namespaced: true,
  preserveState: true,
})
export default class App extends VuexModule {
  public title: string = "Умная скорая"
}
