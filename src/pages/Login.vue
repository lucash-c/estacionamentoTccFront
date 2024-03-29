/* eslint-disable */
<template>
  <q-page style="min-height: 300px">
    <h5 class="text-white text-bold q-mb-lg">Bem vindo!</h5>

    <q-form @submit="login">
      <q-input
        class="q-mb-md bg-grey-4 rounded-borders"
        color="primary"
        dense
        outlined
        label="Usuário"
        v-model="state.user.username"
        type="text"
        autofocus
      >
        <template
          v-slot:append
          v-if="state.user.username !== '' || state.user.password !== ''"
        >
          <q-icon class="cursor-pointer" name="close" @click="resetLoginForm" />
        </template>
      </q-input>

      <q-input
        class="q-mb-md bg-grey-4 rounded-borders"
        color="primary"
        dense
        outlined
        label="Senha"
        v-model="state.user.password"
        :type="!state.isVisiblePassword ? 'password' : 'text'"
      >
        <template v-slot:append v-if="state.user.password !== ''">
          <q-icon
            class="cursor-pointer"
            :name="state.isVisiblePassword ? 'visibility' : 'visibility_off'"
            @click="toggleVisibility"
          />
        </template>
      </q-input>

      <div class="q-mt-md">
        <q-btn
          class="fit"
          color="primary"
          label="Entrar"
          type="submit"
          :loading="state.isLoading"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { reactive } from "@vue/reactivity";
import { useRouter } from "vue-router";
import { LocalStorage } from "quasar";
import { USER_STORAGE } from "../variables/LocalStorage";
import { isEmpty, isLength } from "../util/validator";
import { loginService } from "../services/auth";
import { onBeforeMount } from "@vue/runtime-core";
import { useQuasar } from "quasar";
import { showNegativeNotify, showWarningNotify } from "src/util/plugins";

const $q = useQuasar();

export default {
  setup() {
    const state = reactive({
      isLoading: false,
      errorsState: {},
      isVisiblePassword: false,
      currentScreen: "login",
      user: {
        username: "",
        password: "",
      },
    });
    const router = useRouter();

    onBeforeMount(() => {
      if (LocalStorage.getItem(USER_STORAGE)) {
        return router.push("/estacionamento");
      }
    });
    function resetLoginForm() {
      state.user.username = "";
      state.user.password = "";
    }
    function toggleVisibility() {
      state.isVisiblePassword = !state.isVisiblePassword;
    }
    function login() {
      if (validateLoginForm()) {
        state.isLoading = true;
        handleLogin();
      }
    }
    function validateLoginForm() {
      if (isEmpty(state.user.username)) {
        showWarningNotify("Email de Usuario não preenchido");
        return false;
      }
      if (isEmpty(state.user.password)) {
        showWarningNotify("Senha não preenchida");
        return false;
      } else if (
        !isLength(state.user.password, { gte: 4, lte: 255, trim: true })
      ) {
        showWarningNotify("Senha inválida.");
        return false;
      }
      return true;
    }
    async function handleLogin() {
      const username = state.user.username;
      const password = state.user.password;
      let response = await loginService(username, password);
      if (!response.status) {
        state.isLoading = false;
        showNegativeNotify("Ocorreu um erro ao fazer o login.");
        return;
      }

      if (response.status == 200) {
        state.isLoading = false;
        if (response.data.success) {
          const data = response.data;
          LocalStorage.set(USER_STORAGE, data);

          return router.push("/estacionamento");
        } else {
          state.isLoading = false;
          showNegativeNotify("Usuário ou senha inválidos.");
        }
      }
      // eslint-disable-next-line eqeqeq
      if (response.status == 404) {
        state.isLoading = false;
        showNegativeNotify("Usuário ou senha inválidos.");
      }
      // eslint-disable-next-line eqeqeq
      if (response.status == 500) {
        state.isLoading = false;
        showWarningNotify("O servidor está temporariamente indisponível");
      }
    }
    return {
      state,
      resetLoginForm,
      toggleVisibility,
      login,
    };
  },
};
</script>

<style scoped>
.link {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
  transition: 0.2s;
  cursor: pointer;
}
.link:hover {
  color: #00a99d;
}
</style>
