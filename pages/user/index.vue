<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card flat>
          <v-card-title>Учетные данные</v-card-title>
          <v-card-text>
            <v-form ref="person" v-model="validPerson">
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="firstName"
                    label="Имя"
                    dense
                    required
                    :rules="rules.field"
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="lastName"
                    label="Фамилия"
                    dense
                    :rules="rules.field"
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="middleName"
                    label="Отчество"
                    dense
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="4">
                  <v-select
                    v-model="sex"
                    dense
                    :items="['Ж', 'М']"
                    label="Пол"
                  ></v-select>
                </v-col>
                <v-col cols="8">
                  <v-menu
                    dense
                    v-model="datePicker"
                    :close-on-content-click="false"
                    transition="scale-transition"
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        dense
                        v-model="bornYear"
                        label="День рождения"
                        :rules="rules.field"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      dense
                      v-model="bornYear"
                      @input="datePicker = false"
                    ></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="6">
                  <v-text-field
                    v-model="passportSeries"
                    label="Паспорт серия"
                    :counter="4"
                    :rules="rules.passportSeries"
                    dense
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field
                    v-model="passportNumber"
                    label="Паспорт номер"
                    :counter="6"
                    :rules="rules.passportNumber"
                    dense
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="insurancePolicySeries"
                    label="Страховой полис серия"
                    :counter="11"
                    :rules="rules.insurancePolicySeries"
                    dense
                    required
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    v-model="insurancePolicyNumber"
                    label="Страховой полис номер"
                    :counter="16"
                    :rules="rules.insurancePolicyNumber"
                    dense
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="address"
                    label="Адрес"
                    readnoly
                    dense
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="snils"
                    v-mask="'###-###-### ##'"
                    placeholder="###-###-### ##"
                    label="СНИЛС"
                    :counter="14"
                    :rules="rules.snils"
                    dense
                    required
                  >
                  </v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-card flat>
          <v-card-title>Медицинские данные</v-card-title>
          <v-card-text>
            <v-form ref="med" v-model="validMed">
              <v-row>
                <v-col cols="5">
                  <v-select
                    v-model="disability"
                    dense
                    :items="['Нет', 'По слуху', 'По зрению', 'По речи', 'Другое']"
                    label="Ограничения"
                  ></v-select>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    v-model="bloodType"
                    label="Группа крови"
                    dense
                    required
                    :rules="rules.bloodType"
                  >
                  </v-text-field>
                </v-col>
                <v-col cols="3">
                  <v-select
                    v-model="rhesus"
                    dense
                    :items="['-', '+']"
                    label="Резус"
                    :rules="rules.rhesus"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="chronicDiseases"
                    dense
                    label="Хронические заболевания"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="allergy"
                    dense
                    label="Аллергии"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    v-model="others"
                    dense
                    label="Примечания"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense align="center" justify="space-around">
      <v-col cols="12" class="text-center">
        <v-card flat>
          <v-card-text>
            <v-btn color="secondary" @click="updateProfile()">Сохранить</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "nuxt-property-decorator";
import { IUser } from "@/typings/index";
import { userModule } from "@/plugins/store-namespaces";

// @todo создать компонент Card со слотами
@Component
export default class Profile extends Vue {
  public firstName = "";
  public lastName = "";
  public middleName = "";
  private _sex = 0;
  public passportSeries = "";
  public passportNumber = "";
  public insurancePolicySeries = "";
  public insurancePolicyNumber = "";
  public address = "Ханты-Мансийск";
  private addressFiasCode = "d66e5325-3a25-4d29-ba86-4ca351d9704b";
  public snils = "";
  public datePicker = false;
  public bornYear = "";
  public _disability: 0 | 1 | 2 | 3 | 10 = 0;
  public bloodType = "";
  public _rhesus = "";
  public chronicDiseases = "";
  public allergy = "";
  public others = "";

  public validPerson = false;
  public validMed = false;
  public rules = {
    field: [(field: string) => !!field || "Поле обязательно к заполнению"],
    passportSeries: [
      (v: string) => !!v || "Серия паспорта обязательна к заполнению",
      (v: string) =>
        (v && v.length < 5) ||
        "Серия паспорта не может состоять больше 4 символов",
      (v: string) =>
        (v && v.length >= 4) ||
        "Серия паспорта не может состоять меньше 4 символов",
    ],
    passportNumber: [
      (v: string) => !!v || "Номер паспорта обязательна к заполнению",
      (v: string) =>
        (v && v.length < 7) ||
        "Номер паспорта не может состоять больше 6 символов",
      (v: string) =>
        (v && v.length >= 6) ||
        "Номер паспорта не может состоять меньше 6 символов",
    ],
    insurancePolicySeries: [
      (v: string) => !!v || "Серия страхового полиса обязательна к заполнению",
      (v: string) =>
        (v && v.length < 12) ||
        "Серия страхового полиса не может состоять больше 11 символов",
      (v: string) =>
        (v && v.length >= 11) ||
        "Серия страхового полиса не может состоять меньше 11 символов",
    ],
    insurancePolicyNumber: [
      (v: string) => !!v || "Номер страхового полиса обязательна к заполнению",
      (v: string) =>
        (v && v.length < 17) ||
        "Номер страхового полиса не может состоять больше 16 символов",
      (v: string) =>
        (v && v.length >= 16) ||
        "Номер страхового полиса не может состоять меньше 16 символов",
    ],
    snils: [
      (v: string) => !!v || "Номер страхового полиса обязательна к заполнению",
      (v: string) =>
        (v && v.length < 15) ||
        "Номер страхового полиса не может состоять больше 14 символов",
      (v: string) =>
        (v && v.length >= 14) ||
        "Номер страхового полиса не может состоять меньше 14 символов",
    ],
    rhesus: [
      (v: string) => !!v || "Резус обязателен к заполнению",
      (v: string) =>
        (v && v.length < 2) || "Резус должен состоять из 1 символа",
    ],
    bloodType: [
      (v: string) => !!v || "Группа крови обязательна к заполнению",
      (v: string) =>
        (v && v.length < 2) || "Группа крови должна состоять из 1 символа",
    ],
  };

  $refs!: {
    person: any;
    med: any;
  };

  @userModule.State("user") user!: IUser;
  @userModule.Action("update") update!: any;
  @userModule.Action("getUserInfo") getUserInfo!: any;

  @Watch("user")
  onChangeUser() {
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.middleName = this.user.middleName;
    this._sex = this.user.sex;
    this.bornYear = this.user.bornYear;
    this.passportSeries = this.user.passportSeries.toString();
    this.passportNumber = this.user.passportNumber.toString();
    this.insurancePolicySeries = this.user.insurancePolicySeries;
    this.insurancePolicyNumber = this.user.insurancePolicyNumber;
    this.snils = this.user.snils;
    this._disability = this.user.medicalCard.disability;
    this.bloodType = this.user.medicalCard.bloodType ? this.user.medicalCard.bloodType.toString() : "0";
    this._rhesus = this.user.medicalCard.rhesus ? this.user.medicalCard.rhesus.toString() : "0";
    this.chronicDiseases = this.user.medicalCard.chronicDiseases;
    this.allergy = this.user.medicalCard.allergy;
    this.others = this.user.medicalCard.others;
  }

  public mounted(): void {
    this.getUserInfo();
  }

  get sex(): string {
    return this.user.sex ? "М" : "Ж";
  }

  set sex(value: string) {
    this._sex = value === "М" ? 1 : 0;
  }

  get rhesus(): string {
    return this.user.medicalCard.rhesus ? "+" : "-"; 
  }

  set rhesus(value: string) {
    this._rhesus = value === "+" ? "1" : "0";
  }

  get disability(): string {
    switch (this.user.medicalCard.disability) {
      case 0:
        return "Нет"
        break;
      case 1:
        return "По слуху"
        break;
      case 2:
        return "По зрению"
        break;
      case 3:
        return "По речи"
        break;
      case 10:
        return "Другое"
        break;
    }
  }

  set disability(value: string) {
    switch (value) {
      case "Нет":
        this._disability = 0;
        break;
      case "По слуху":
        this._disability = 1;
        break;
      case "По зрению":
        this._disability = 2
        break;
      case "По речи":
        this._disability = 3
        break;
      case "Другое":
        this._disability = 10
        break;
    }
  }

  /**
   * @description обновление профиля пользователя
   */
  public updateProfile(): void {
    this.$refs.person.validate();
    this.$refs.med.validate();
    if (this.validPerson && this.validMed) {
      const data = {
        firstName: this.firstName,
        lastName: this.lastName,
        middleName: this.middleName,
        sex: this._sex,
        bornYear: this.bornYear,
        passportSeries: +this.passportSeries,
        passportNumber: +this.passportNumber,
        insurancePolicySeries: this.insurancePolicySeries,
        insurancePolicyNumber: this.insurancePolicyNumber,
        address: this.address,
        addressFiasCode: this.addressFiasCode,
        snils: this.snils,
        medicalCard: {
          disability: +this._disability,
          bloodType: +this.bloodType,
          rhesus: +this._rhesus,
          chronicDiseases: this.chronicDiseases,
          allergy: this.allergy,
          others: this.others,
        },
      };
      this.update(data).then(() => {});
    }
  }
}
</script>
