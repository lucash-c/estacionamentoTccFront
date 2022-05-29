/* eslint-disable vue/no-parsing-error */
/* eslint-disable vue/no-parsing-error */
<template>
<q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
  <div align="center" class="q-pa-md">
   <q-card style="width:250px; height:400px ;">
   <q-card-section class="bg-primary text-white" >
      <div class="text-h6 q-pl-md">Caixa</div>
    </q-card-section>
      <q-card-section style=height:280px>
          <q-input v-if="!open" style="margin-top: 70px" outlined label="Codigo do Ticket"/>
        <div  v-if="open" align="center">
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
          Valor: R${{formatCurrency(ticket.valor)}}
         </q-badge>
         <br>
        <q-input v-if="newTicket.tipoPagamento == 'Dinheiro'" style="padding:10px" dense outlined v-model="newTicket.valorPago" label="Valor Pago R$"/>
        <q-select style="padding:10px" dense outlined options-dense :options="['Cartão', 'Dinheiro']" v-model="newTicket.tipoPagamento" label="Tipo de pagamento" />
        <span v-if="newTicket.tipoPagamento == 'Dinheiro'"> {{ (newTicket.valorPago - ticket.valor) >= 0 ? 'Troco: R$'+formatCurrency(newTicket.valorPago - ticket.valor) : 'Digite o valor pago'}}</span>
        </div>
      </q-card-section>
    <!-- footer----------------------------------------------------------------------->
    <q-card-actions align="center">
      <div>
         <q-btn
        :disable="newTicket.tipoPagamento == 'Dinheiro' && (newTicket.valorPago - ticket.valor) < 0"
          :label="open?'Cobrar': 'Prosseguir'"
          type="submit"
          color="primary"
          @click="open?save():prosseguir()"
        >
        </q-btn>
      </div>
    </q-card-actions>
  </q-card>
  </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { formatCurrency } from 'src/util/format'
const ticket =
  {
    numero: '546645465',
    dhEntrada: '25/04/2022 11:15:12',
    dhSaida: '25/04/2022 11:15:12',
    tipo: 'comum',
    valor: 30
  }

export default defineComponent({
  name: 'Movimento',

  methods: {
    prosseguir () {
      this.open = true
    },

    openTicket () {
      this.newTicket = this.ticket
      this.newTicket = {
        tipoPagamento: 'Dinheiro',
        valorPago: 0
      }
      this.open = true
    }
  },

  data () {
    return {
      open: ref(false),
      newTicket: {}
    }
  },

  setup () {
    return {
      ticket,
      formatCurrency
    }
  }
})
</script>

<style scoped>
</style>
