import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import api from "@/plugins/api";

@Module({
  name: "call",
  stateFactory: true,
  namespaced: true,
  preserveState: true,
})
export default class Call extends VuexModule {
  public status: string = "Нет заявки";
  public id: number = 0;

  @Mutation
  public setStatus(payload: { state: string; id: number }): void {
    this.status = payload.state;
    this.id = payload.id;
  }

  @Action
  /**
   * @description Вызов скорой помощи
   */
  public async call(data: JSON): Promise<void> {
    await api.call
      .create(data)
      .then(({ data }) => {
        this.context.commit("setStatus", {
          state: data.entity.state,
          id: data.entity.id,
        });
      })
      .catch((err: any) => {
        // err
      });
  }

  @Action
  public async setState(data: JSON): Promise<void> {
    await api.call
      .setState(data)
      .then(({ data }) => {
        this.context.commit("setStatus", {
          state: data.entity.state,
          id: data.entity.id,
        });
      })
      .catch((err: any) => {
        // err
      });
  }
}
