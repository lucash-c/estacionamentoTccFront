<template>
  <q-layout view="lHh Lpr lFf" class="bg-main">
    <q-header elevated style="background-color: black">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-space />
        <span color="white">V-Intelligent</span>
        <img
          alt="logo"
          src="~assets/img/logo.png"
          style="width: 15vh; height: 8vh"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>
          <div align="center">
            <q-avatar size="80px" class="q-mb-sm">
              <q-img src="~assets/profile.png" />
            </q-avatar>
            <div>Usuario: {{ userMail }}</div>
            <q-menu dense touch-position context-menu>
              <q-btn
                dense
                icon="output"
                label="Sair"
                color="red"
                @click="logout"
              />
            </q-menu>
          </div>

          <br />
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
          active-class="text-primary menu-active"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from "components/EssentialLink.vue";
import { LocalStorage } from "quasar";
import { USER_STORAGE } from "../variables/LocalStorage";
import { logout } from "src/services/auth";

const linksList = [
  {
    title: "Entrada de veículos ",
    icon: "toys",
    link: "#/entrada",
  },
  {
    title: "Saída de veículos",
    icon: "output",
    link: "#/saida",
  },
  {
    title: "Clientes",
    icon: "groups",
    link: "#/clientes",
  },
  {
    title: "Estacionamento",
    icon: "directions",
    link: "#/estacionamento",
  },
  {
    title: "Caixa",
    icon: "monetization_on",
    link: "#/caixa",
  },
  {
    title: "Registro de Movimentação",
    icon: "leaderboard",
    link: "#/movimento",
  },
];

import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {
    EssentialLink,
  },

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      logout,
      essentialLinks: linksList,
      userMail: "",
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
  mounted() {
    this.userMail = LocalStorage.getItem(USER_STORAGE).email;
  },
});
</script>
<style>
.bg-main {
  background-image: url("~assets/background.jpg");
  background-position: center;
  background-size: cover;
}
</style>
