<template>
  <v-app dark>
    <v-app-bar fixed app color="secondary" class="white--text" flat>
      <v-toolbar-title>
        <nuxt-link to="/" class="white--text text-decoration-none">
          {{ title }}
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main class="grey lighten-3">
      <nuxt />
    </v-main>
    <v-footer app padless color="primary">
      <v-row no-gutters>
        <v-col class="text-center" cols="4">
          <nuxt-link to="/map" class="white--text text-decoration-none">
            <v-btn icon fab color="white">
              <v-icon> mdi-home </v-icon>
            </v-btn>
          </nuxt-link>
        </v-col>
        <v-col v-show="isAuth" class="text-center" cols="4">
          <nuxt-link to="/user/sos" class="white--text text-decoration-none">
            <v-btn icon fab color="white">
              <v-icon large> mdi-alert-circle </v-icon>
            </v-btn>
          </nuxt-link>
        </v-col>
        <v-col v-show="isAuth" class="text-center" cols="4">
          <nuxt-link to="/user" class="white--text text-decoration-none">
            <v-btn icon fab color="white">
              <v-icon> mdi-account </v-icon>
            </v-btn>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import { appModule, userModule } from "@/plugins/store-namespaces";

@Component
export default class DefaultLayout extends Vue {
  @appModule.State("title") title!: string;
  @userModule.Getter("isAuth") isAuth!: boolean;
  @userModule.Action("changeGeolocation") changeGeolocation!: any;

  mounted() {
    this.changeGeolocation();
    setInterval(() => {
      this.changeGeolocation();
    }, 60000);
  }
}
</script>
