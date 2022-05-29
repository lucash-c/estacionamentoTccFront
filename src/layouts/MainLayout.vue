<template>
  <q-layout view="lHh Lpr lFf" class="main">
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
       <img
      alt="logo"
      src="~assets/img/logo.png"
      style="width: 15vh; height: 8vh"
    />

      </q-toolbar>
    </q-header>

  <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
        Menu
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Entrada de veículos ',
    icon: 'toys',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Saída de veículos',
    icon: 'output',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Clientes',
    icon: 'groups',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Estacionamento',
    icon: 'directions',
    link: '#/estacionamento'
  },
  {
    title: 'Caixa',
    icon: 'monetization_on',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Registro de Movimentação',
    icon: 'leaderboard',
    link: '#/movimento'
  }
]

import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
