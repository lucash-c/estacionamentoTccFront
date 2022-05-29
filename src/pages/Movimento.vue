<template>
<q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
  <div class="q-pa-md">
    <q-table
     style="height: 400px;"
      dense
      title="Registros de Movimentação"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
  </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from 'vue'
const columns = [
  {
    name: 'ticket',
    align: 'center',
    label: 'Ticket nº',
    field: 'ticket',
    sortable: true
  },
  {
    name: 'dhEntrada',
    label: 'Data/ Hora Entrada',
    align: 'center',
    field: 'dhEntrada',
    sortable: true
  },
  {
    name: 'dhSaida',
    label: 'Data/Hora Saída',
    align: 'center',
    field: 'dhSaida',
    sortable: true
  },
  {
    name: 'tipo',
    label: 'Tipo',
    align: 'center',
    field: 'tipo',
    sortable: true
  },
  {
    name: 'valor',
    label: 'Valor',
    align: 'center',
    field: 'valor',
    sortable: true
  },
  {
    name: 'tipoPagamento',
    label: 'Tipo de Pagamento',
    align: 'center',
    field: 'tipoPagamento',
    sortable: true
  },
  {
    name: 'usuario',
    label: 'Usuario',
    align: 'center',
    field: 'usuario',
    sortable: true
  }
]

const rows = [
  {
    ticket: '546645465',
    dhEntrada: '25/04/2022 11:15:12',
    dhSaida: '25/04/2022 11:15:12',
    tipo: 'mensalista',
    valor: 250,
    usuario: 'teste',
    tipoPagamento: 'dinheiro'
  },
  {
    ticket: '2556666',
    dhEntrada: '25/04/2022 11:15:12',
    dhSaida: '25/04/2022 11:15:12',
    tipo: 'comum',
    valor: 250,
    usuario: 'teste2',
    tipoPagamento: 'cartão'
  },
  {
    ticket: '5445456',
    dhEntrada: '25/04/2022 11:15:12',
    dhSaida: '25/04/2022 11:15:12',
    tipo: 'preferencial',
    valor: 250,
    usuario: 'teste33',
    tipoPagamento: 'cartão'
  }
]
export default defineComponent({
  name: 'Movimento',

  components: {

  },
  data () {
    return {
      openNovaFileira: ref(false)
    }
  },

  setup () {
    return {
      columns,
      rows
    }
  }
})
</script>

<style scoped>
</style>
