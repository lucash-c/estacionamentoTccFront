<template>
<q-layout view="lHh Lpr lFf" class="bg-main" >
<q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
  <br>
  <div align="center">
   <q-input outlined v-model="ticket" />
   <br>
   <br>
    <q-card style="width:350px; height:200px ;">
    <br>
   <br>
    <div align="center">
      <span> Insira o seu ticket no leitor...</span>
    </div>

    </q-card>

</div>
  </q-page>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  data () {
    return {
      ticket: ref('')
    }
  }
})
</script>

<style scoped>
.bg-main {
  background-image: url("~assets/bg-entrada.webp");
  background-position: center;
  background-size: cover;
}
</style>
