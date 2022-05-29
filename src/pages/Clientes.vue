/* eslint-disable vue/no-unused-vars */

<template>
<q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
  <div class="q-pa-md">
    <q-table
      dense
      style="height: 400px;"
      title-class="title"
      hide-bottom
      selection="single"
      v-model:selected="selected"
      card-class="fileiras"
      title="Clientes Cadastrados"
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
        label="Excluir Cliente"

        />
       <q-btn
       :disable="!selected[0]"
       style="margin:10px"
        dense
        color="green"
        icon="edit"
        no-caps
        label="Editar Cliente"
        @click="openEditCliente = true"
        />
      <q-btn
        dense
         style="margin:10px"
        color="primary"
        icon="library_add"
        no-caps
        label="Novo Cliente"
        @click="openNovoCliente = true"
      />
    </div>
  </div>
  </q-page>
  <q-dialog v-model="openNovoCliente">
    <addNovoCliente />
  </q-dialog>
  <q-dialog v-model="openEditCliente">
    <EditCliente  :selected="selected" />
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EditCliente from 'src/components/EditCliente.vue'
import addNovoCliente from 'src/components/addNovoCliente.vue'

const columns = [
  {
    name: 'nome',
    align: 'center',
    label: 'Nome',
    field: 'nome',
    sortable: true
  },
  {
    name: 'rg',
    label: 'Rg',
    align: 'center',
    field: 'rg',
    sortable: true
  },
  {
    name: 'telefone',
    label: 'Telefone',
    align: 'center',
    field: 'telefone',
    sortable: true
  },
  {
    name: 'mensalidade',
    label: 'Valor da Mensalidade',
    align: 'center',
    field: 'mensalidade',
    sortable: true
  },
  {
    name: 'vencimento',
    label: 'Vencimento',
    align: 'center',
    field: 'vencimento',
    sortable: true
  },
  {
    name: 'observacao',
    label: 'Observação',
    align: 'center',
    field: 'observacao',
    sortable: true
  },
  {
    name: 'bloqueado',
    label: 'Status',
    align: 'center',
    field: 'bloqueado',
    format: (val, row) => val ? 'Bloqueado' : 'Liberado',
    sortable: true
  }

]

const rows = [
  {
    id: 1,
    nome: 'Fabio Assunção',
    rg: '56546546556',
    telefone: '36585874',
    mensalidade: 150,
    vencimento: 25,
    observacao: '',
    bloqueado: false
  },
  {
    id: 2,
    nome: 'Aline Almeida',
    rg: '56546546556',
    telefone: '36585874',
    mensalidade: 150,
    vencimento: 30,
    observacao: '',
    bloqueado: false
  },
  {
    id: 3,
    nome: 'Afonso Santos',
    rg: '56465465465',
    telefone: '22555555',
    mensalidade: 150,
    vencimento: 10,
    observacao: '',
    bloqueado: false
  }
]
export default defineComponent({
  name: 'Clientes',

  components: {
    addNovoCliente,
    EditCliente
  },

  methods: {
  },

  setup () {
    return {
      selected: ref([]),
      openNovoCliente: ref(false),
      openEditCliente: ref(false),
      columns,
      rows
    }
  }

})
</script>

<style scoped>
</style>
