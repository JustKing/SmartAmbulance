import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import api from "@/plugins/api";
import { IUser } from "@/typings/index";

@Module({
  name: "user",
  stateFactory: true,
  namespaced: true,
  preserveState: true,
})
export default class User extends VuexModule {
  public phone: string = "";
  public token: string | null = null;
  public coords: [number, number] = [0, 0];
  public user: IUser = {
    id: 0,
    firstName: "",
    middleName: "",
    lastName: "",
    sex: 0,
    bornYear: "",
    passportSeries: 0,
    passportNumber: 0,
    insurancePolicySeries: "",
    insurancePolicyNumber: "",
    address: "",
    addressFiasCode: "",
    snils: "",
    medicalCard: {
      disability: 0,
      bloodType: "",
      rhesus: "",
      chronicDiseases: "",
      allergy: "",
      others: "",
    },
  };

  public get isAuth(): boolean {
    return !!this.token ? true : false;
  }

  public get tokenAuth(): string {
    return `Bearer ${this.token}`;
  }

  @Mutation
  /**
   * @description Запись текущих координат
   *
   * @param {[number, number]} payload - телефон
   */
  public setCoords(payload: [number, number]) {
    this.coords = payload;
  }

  @Mutation
  /**
   * @description Запись токена
   *
   * @param {string} payload - телефон
   */
  public setPhone(payload: string): void {
    this.phone = payload;
  }

  @Mutation
  /**
   * @description Запись токена
   *
   * @param {string} payload - токен
   */
  private setToken(payload: string): void {
    this.token = payload;
  }

  @Mutation
  /**
   * @description Запись пользователя
   *
   * @param {IUser} payload - пользователь
   */
  private setUser(payload: IUser) {
    this.user = payload;
  }

  @Action
  /**
   * @description Авторизация пользователя
   *
   * @param {JSON} payload - телефон и проверочный код пользователя
   */
  public async auth(payload: JSON): Promise<void> {
    await api.account
      .code(payload)
      .then(({ data }) => {
        this.context.commit("setToken", data.entity.token);
      })
      .catch((err: any) => {
        // err
      });
  }

  @Action
  /**
   * @description Определение местоположения
   */
  public changeGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.context.commit("setCoords", [position.coords.latitude, position.coords.longitude])
      });
    }
  }

  @Action
  /**
   * @description Получение инфы о пользователе
   */
  public async getUserInfo(): Promise<void> {
    await api.account
      .info()
      .then(({ data }) => {
        this.context.commit("setUser", data.entity);
      })
      .catch((err: any) => {
        // err
      });
  }

  @Action
  /**
   * @description Обновление данных пользователя
   */
  public async update(data: JSON): Promise<void> {
    await api.account
      .updateProfile(data)
      .then(({ data }) => {
        this.context.commit("setUser", data.entity);
      })
      .catch((err: any) => {
        // err
      });
  }
}
