<template>
  <v-container fill-height>
    <v-card flat rounded="lg" align="center" justify="center" class="fullWidth">
      <v-card-title> Вход </v-card-title>
      <v-card-text>
        <v-stepper v-model="stepper" style="box-shadow: none">
          <v-stepper-items>
            <v-stepper-content step="1">
              <v-row align="center" justify="space-around">
                <v-form ref="phone" v-model="valid.phone" class="fullWidth">
                  <v-col cols="12">
                    <v-text-field
                      v-model="phone"
                      v-mask="'+7 (###) ##-##-###'"
                      placeholder="+7 (xxx) xx-xx-xxx"
                      :counter="18"
                      :rules="rules.phone"
                      label="Введите телефон"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-btn
                    color="secondary"
                    :loading="loading"
                    @click="validatePhone()"
                  >
                    Отправить код
                  </v-btn>
                </v-form>
              </v-row>
            </v-stepper-content>

            <v-stepper-content step="2">
              <v-row align="center" justify="space-around">
                <v-form ref="code" v-model="valid.code" class="fullWidth">
                  <v-col cols="12">
                    <v-text-field
                      v-model="code"
                      :counter="4"
                      :rules="rules.code"
                      label="Код"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-btn
                    color="secondary"
                    :loading="loading"
                    @click="stepper = 1"
                  >
                    Назад
                  </v-btn>
                  <v-btn
                    color="secondary"
                    :loading="loading"
                    @click="validateCode()"
                  >
                    Войти
                  </v-btn>
                </v-form>
              </v-row>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import api from "@/plugins/api";
import { userModule } from "@/plugins/store-namespaces";

@Component
export default class Auth extends Vue {
  public layout(ctx: any) {
    return ctx.isMobile ? "default" : "noMobile";
  }

  public stepper = 1;
  public phone = "";
  public code: number | null = null;
  public loading = false;
  public rules = {
    phone: [
      (phone: string) => !!phone || "Номер телефона обязателен к заполнению",
      (phone: string) =>
        (phone && phone.length < 19) ||
        "Номер телефона не может состоять больше 11 символов",
      (phone: string) =>
        (phone && phone.length >= 18) ||
        "Номер телефона не может состоять меньше 11 символов",
    ],
    code: [
      (code: string) => !!code || "Код обязателен к заполнению",
      (code: string) =>
        (code && code.length < 5) || "Код не может состоять больше 4 символов",
      (code: string) =>
        (code && code.length >= 4) || "Код не может состоять меньше 4 символов",
    ],
  };

  public valid = {
    phone: false,
    code: false,
  };

  $refs!: {
    phone: any;
    code: any;
  };

  @userModule.Mutation("setPhone") setPhone!: any;
  @userModule.Action("auth") auth!: any;
  @userModule.Action("getUserInfo") getUserInfo!: any;
  @userModule.Getter("isAuth") isAuth!: boolean;

  @Watch("isAuth")
  onChageIsAuth(val: boolean) {
    if (val) {
      this.$router.push("/map");
    }
  }

  /**
   * @description Валидация номера телефона
   */
  public validatePhone(): void {
    this.loading = true;
    this.$refs.phone.validate();
    if (this.valid.phone) {
      let phone: string = this.phone.replace(/[^\+\d]/g, "");
      this.setPhone(phone);
      phone = `\"${phone}\"`;
      api["account"]
        .auth(phone)
        .then(() => {
          this.stepper = 2;
          this.loading = false;
        })
        .catch((err) => console.log(err));
    } else {
      this.loading = false;
    }
  }

  /**
   * @description Валидация кода
   */
  public validateCode(): void {
    this.loading = true;
    this.$refs.code.validate();
    if (this.valid.code) {
      let phone: string = this.phone.replace(/[^\+\d]/g, "");
      this.auth({ phone: phone, code: this.code }).then(() => {
        this.phone = "";
        this.code = null;
        this.$router.push("/map");
        this.getUserInfo();
        this.loading = false;
      });
    } else {
      this.loading = false;
    }
  }
}
</script>

<style>
.fullWidth {
  width: 100% !important;
}
</style>
