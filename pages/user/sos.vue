<template>
  <v-container>
    <v-row dense>
      <v-col cols="12">
        <v-card flat>
          <v-card-title>Вызов скорой помощи</v-card-title>
          <v-card-text class="text-center">
            <v-btn @click="callAmbulance()" large color="secondary">
              Вызвать Скорую помощь</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-card flat>
          <v-card-text>
            <p>Кому нужна помощь?</p>
            <v-radio-group v-model="help" dense>
              <v-radio label="Мне" :value="0"></v-radio>
              <v-radio label="Другому человеку" :value="1"></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-card flat>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <p>Причина вызова</p>
                <v-chip
                  class="ma-1"
                  :color="description === 'Травма' ? 'primary' : ''"
                  @click="changeReason('Травма')"
                >
                  Травма
                </v-chip>
                <v-chip
                  class="ma-1"
                  :color="description === 'Отравлениe' ? 'primary' : ''"
                  @click="changeReason('Отравлениe')"
                >
                  Отравление
                </v-chip>
                <v-chip
                  class="ma-1"
                  :color="description === 'Covid-19' ? 'primary' : ''"
                  @click="changeReason('Covid-19')"
                >
                  Covid-19
                </v-chip>
                <v-chip
                  class="ma-1"
                  :color="
                    description === 'Роды и паталогии при беременности'
                      ? 'primary'
                      : ''
                  "
                  @click="changeReason('Роды и паталогии при беременности')"
                >
                  Роды и паталогии при беременности
                </v-chip>
                <v-chip
                  class="ma-1"
                  :color="description === 'Другое' ? 'primary' : ''"
                  @click="changeReason('Другое')"
                >
                  Другое
                </v-chip>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12">
        <v-card flat>
          <v-card-text>
            <v-row dense>
              <v-col cols="12">
                <v-textarea
                  v-model="remark"
                  placeholder="Введите дополнительную информацию"
                  rows="1"
                  dense
                  label="Описание"
                ></v-textarea>
              </v-col>
            </v-row>
            <v-row dense>
              <v-col cols="12">
                <v-text-field
                  v-model="callAddress"
                  label="Адрес"
                  dense
                  required
                >
                </v-text-field>
                <p>Координаты: {{ coords[0] }}, {{ coords[1] }}</p>
              </v-col>
            </v-row>
            <v-row dense align="center" justify="space-around">
              <v-col cols="12" class="text-center">
                <v-btn @click="callAmbulance()" large color="secondary">
                  Вызвать Скорую помощь
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { userModule, callModule } from "@/plugins/store-namespaces";
import { IUser } from "@/typings/index";

@Component
export default class Sos extends Vue {
  public help = 0;
  public description = "Другое";
  public remark = "";
  public callAddress = "";

  @userModule.State("coords") coords!: [number, number];
  @userModule.State("user") user!: IUser;
  @callModule.State("status") status!: string;
  @callModule.Action("call") call!: any;
  @callModule.Action("setState") setState!: any;
  @callModule.State("id") id!: number;

  public mounted(): void {
    this.callAddress = this.user.address;
  }

  /**
   * @description Изменение причины вызова скорой помощи
   */
  public changeReason(reason: string): void {
    if (this.description === reason) {
      this.description = "";
    } else {
      this.description = reason;
    }
  }

  /**
   * @description Вызов скорой помощт
   */
  public callAmbulance(): void {
    const data = {
      description: this.description,
      remark: this.remark,
      addressAdditionalInfo: this.callAddress,
      lat: this.coords[0].toString(),
      lng: this.coords[1].toString(),
      addressFias: "fias",
    };
    this.call(data).then(() => {
      this.$toast.success(this.status);
      this.setState({ id: this.id, state: 3 });
      this.$router.push("/map");
    });
  }
}
</script>
