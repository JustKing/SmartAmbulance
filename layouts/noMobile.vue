<template>
  <v-app dark>
    <v-app-bar fixed app color="secondary" class="white--text" flat>
      <v-toolbar-title>
        <nuxt-link to="/" class="white--text text-decoration-none">
          Умная скорая
        </nuxt-link>
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-container>
        <v-alert border="bottom" colored-border type="warning" elevation="2">
          Сервис <strong>"Умная скорая"</strong> доступен только с
          <strong>мобильного устройства</strong>
        </v-alert>

        <v-alert border="bottom" colored-border type="warning" elevation="2">
          Пожалуйста зайдите с <strong>мобильного устройства</strong> :)
        </v-alert>
      </v-container>
    </v-main>
    <v-footer app padless color="primary"></v-footer>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";

@Component
export default class DefaultLayout extends Vue {}
</script>
