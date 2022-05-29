/* eslint-disable vue/no-unused-vars */

<template>
<q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
  <div class="q-pa-md">
    <q-table
     grid
      dense
      title-class="title"
      hide-bottom
      hide-header
      selection="single"
      v-model:selected="selected"
      card-class="fileiras"
      title="Vagas Disponiveis"
      :rows="rows"
      :columns="columns"
      row-key="id"
    />
    <br />
    <div align="center">
      <q-btn
       style="margin:10px"
        :disable="!selected[0]"
        dense
        color="red"
        icon="delete"
        no-caps
        label="Excluir Fileira"

        />
       <q-btn
       :disable="!selected[0]"
       style="margin:10px"
        dense
        color="green"
        icon="edit"
        no-caps
        label="Editar Fileira"
        @click="openEditFileira = true"
        />
      <q-btn
        dense
         style="margin:10px"
        color="primary"
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
  <q-dialog v-model="openEditFileira">
    <EditFileira  :selected="selected" />
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import AddNovaFileira from 'src/components/AddNovaFileira.vue'
import EditFileira from 'src/components/EditFileira.vue'
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
    id: 1,
    fileira: 'A',
    comum: 35,
    preferencial: 12,
    mensalista: 15
  },
  {
    id: 2,
    fileira: 'B',
    comum: 35,
    preferencial: 12,
    mensalista: 8
  },
  {
    id: 3,
    fileira: 'C',
    comum: 48,
    preferencial: 12,
    mensalista: 3
  }
]
export default defineComponent({
  name: 'Estacionamento',

  components: {
    AddNovaFileira,
    EditFileira
  },

  methods: {
  },

  setup () {
    return {
      selected: ref([]),
      openNovaFileira: ref(false),
      openEditFileira: ref(false),
      columns,
      rows
    }
  }

})
</script>

<style scoped>
</style>
