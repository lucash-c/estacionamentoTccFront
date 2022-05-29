/* eslint-disable semi */
/* eslint-disable quotes */
<template>
  <q-layout v-if="state.isSplashing">
    <q-page class="row justify-center items-center content-center bg-primary">
      <div class="fade-in-login">
        <q-img src="~assets/img/logo.png" alt="Logo VIntelligent" class="logo" />
      </div>
    </q-page>
  </q-layout>

  <q-layout v-else view="hHh lpR fFf" class="bg-login">
    <q-page class="flex flex-center">
      <div class="bg-filtered">
        <q-img src="~assets/img/logo.png" alt="Logo VIntelligent" class="logo" />

        <router-view />
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { onBeforeMount, onUnmounted, reactive } from '@vue/runtime-core'
// eslint-disable-next-line quotes
import { useRouter } from "vue-router"
export default {
  setup () {
    const state = reactive({
      isSplashing: true
    })
    onBeforeMount(() => {
      const router = useRouter()
      const { path: currentRoute } = router.currentRoute.value
      // eslint-disable-next-line quotes
      if (currentRoute === "/") {
        setTimeout(() => {
          state.isSplashing = false
        // eslint-disable-next-line semi
        }, 1500);
      } else {
        state.isSplashing = false
      }
    })
    onUnmounted(() => (state.isLoading = false))
    return {
      state
    }
  }
}
</script>

<style scoped>
.logo {
  width: 300px;
  align-content: center;
}
</style>

<style>
.bg-login {
  background-image: url("~assets/img/img2.jpg");
  background-position: center;
  background-size: cover;
}
.bg-filtered {
  background: rgb(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  padding: 2rem;
  border-radius: 1rem;
}
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
.fade-in-login {
  animation: fadeIn 2.5s;
  -webkit-animation: fadeIn 2.5s;
  -moz-animation: fadeIn 2.5s;
  -o-animation: fadeIn 2.5s;
  -ms-animation: fadeIn 2.5s;
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-o-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@-ms-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
