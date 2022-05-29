<template>
<q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
  <div align="center" class="q-pa-md">
   <q-card style="width:250px; height:400px ;">
   <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Caixa</div>
    </q-card-section>
      <q-card-section>
        <div align="center">
          <q-badge color="blue">
          Numero: {{ticket.numero}}
         </q-badge>
          <br>
         <q-badge color="blue">
          Hora de entrada: {{ticket.dhEntrada}}
         </q-badge>
          <br>
          <q-badge color="blue">
          Hora de saida: {{ticket.dhSaida}}
         </q-badge>
          <br>
          <q-badge color="blue">
          Tipo: {{ticket.tipo}}
         </q-badge>
          <br>
          <q-badge color="blue">
          Valor: {{ticket.valor}}
         </q-badge>
         <br>
        <br>
        <q-input outlined v-model="ticket.valorPago" label="Valor Pago" />
        </div>
      </q-card-section>
    </q-card>
  </div>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
const ticket =
  {
    numero: '546645465',
    dhEntrada: '25/04/2022 11:15:12',
    dhSaida: '25/04/2022 11:15:12',
    tipo: 'comum',
    valor: 25
  }
export default defineComponent({
  name: 'Movimento',

  components: {

  },
  data () {
    return {
    }
  },

  setup () {
    return {
      ticket
    }
  }
})
</script>

<style scoped>
</style>
