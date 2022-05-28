
<template>
<q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
  <div class="q-pa-md">
    <q-table
      dense
      title-class="title"
      hide-bottom
      bordered
      grid
      card-class="fileiras"
      title="Vagas Disponiveis"
      :rows="rows"
      :columns="columns"
      row-key="name"
    />
    <br />
    <div align="center">
      <q-btn
        dense
        color="secondary"
        icon="library_add"
        no-caps
        label="Nova Fileira"
        @click="openNovaFileira = true"
      />
    </div>
  </div>
  </q-page>
  <q-dialog v-model="openNovaFileira">
    <AddNovaFileira />
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import AddNovaFileira from 'src/components/AddNovaFileira.vue'
const columns = [
  {
    name: 'fileira',
    align: 'center',
    label: 'Fileira',
    field: 'fileira',
    sortable: true
  },
  {
    name: 'comum',
    label: 'Comum',
    align: 'center',
    field: 'comum',
    sortable: true
  },
  {
    name: 'preferencial',
    label: 'Preferencial',
    align: 'center',
    field: 'preferencial',
    sortable: true
  },
  {
    name: 'mensalista',
    label: 'Mensalista',
    align: 'center',
    field: 'mensalista',
    sortable: true
  },
  {
    name: 'total',
    label: 'Total',
    align: 'center',
    field: 'total',
    sortable: true,
    format: (val, row) =>
      Number(row.comum) + Number(row.preferencial) + Number(row.mensalista)
  }
]

const rows = [
  {
    fileira: 'A',
    comum: 35,
    preferencial: 12,
    mensalista: 15
  },
  {
    fileira: 'B',
    comum: 35,
    preferencial: 12,
    mensalista: 8
  },
  {
    fileira: 'C',
    comum: 48,
    preferencial: 12,
    mensalista: 3
  }
]
export default defineComponent({
  name: 'Estacionamento',

  components: {
    AddNovaFileira
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
