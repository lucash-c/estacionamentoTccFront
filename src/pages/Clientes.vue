/* eslint-disable vue/no-unused-vars */

<template>
  <q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
    <div class="q-pa-md">
      <q-table
        dense
        style="height: 400px"
        title-class="title"
        hide-bottom
        selection="single"
        v-model:selected="selected"
        card-class="fileiras"
        title="Clientes Cadastrados"
        :rows="rows"
        :columns="columns"
        row-key="cod"
        :filter="filter"
        virtual-scroll
        :virtual-scroll-item-size="48"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template v-slot:top-right>
          <q-input
            style="color: white"
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar Cliente"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              Desculpe, não encontramos nenhum registro... {{ message }}
            </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
      <br />
      <div align="center">
        <q-btn
          style="margin: 10px"
          :disable="!selected[0]"
          dense
          color="red"
          icon="delete"
          no-caps
          @click="confirmDeleteClienteDialog = true"
          label="Excluir Cliente"
        />
        <q-btn
          :disable="!selected[0]"
          style="margin: 10px"
          dense
          color="green"
          icon="edit"
          no-caps
          label="Editar Cliente"
          @click="openEditCliente = true"
        />
        <q-btn
          dense
          style="margin: 10px"
          color="primary"
          icon="library_add"
          no-caps
          label="Novo Cliente"
          @click="openNovoCliente = true"
        />
      </div>
    </div>
  </q-page>
  <q-dialog persistent v-model="openNovoCliente">
    <addNovoCliente />
  </q-dialog>
  <q-dialog persistent v-model="openEditCliente">
    <EditCliente :selected="selected" />
  </q-dialog>
  <q-dialog v-model="confirmDeleteClienteDialog">
    <confirmDeleteCliente :selected="selected" />
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import EditCliente from "src/components/EditCliente.vue";
import addNovoCliente from "src/components/addNovoCliente.vue";
import confirmDeleteCliente from "src/components/confirmDeleteCliente.vue";
import { getClientes } from "src/services/cliente";
import { formatCurrency } from "src/util/format";

const columns = [
  {
    name: "cod",
    label: "Código",
    align: "center",
    field: "cod",
    sortable: true,
  },
  {
    name: "nome",
    align: "center",
    label: "Nome",
    field: "nome",
    sortable: true,
  },
  {
    name: "rg",
    label: "Rg",
    align: "center",
    field: "rg",
    sortable: true,
  },
  {
    name: "telefone",
    label: "Telefone",
    align: "center",
    field: "telefone",
    sortable: true,
  },
  {
    name: "mensalidade",
    label: "Mensalidade R$",
    align: "center",
    field: "mensalidade",
    format: (val, row) => (val ? formatCurrency(val) : ""),
    sortable: true,
  },
  {
    name: "vencimento",
    label: "Vencimento",
    align: "center",
    field: "vencimento",
    sortable: true,
  },
  {
    name: "bloqueado",
    label: "Status",
    align: "center",
    field: "bloqueado",
    format: (val, row) => (val ? "Bloqueado" : "Liberado"),
    sortable: true,
  },
  {
    name: "observacao",
    label: "Observação",
    align: "center",
    field: "observacao",
    sortable: true,
  },
];

export default defineComponent({
  name: "Clientes",

  components: {
    addNovoCliente,
    EditCliente,
    confirmDeleteCliente,
  },

  methods: {},

  setup() {
    return {
      filter: ref(""),
      selected: ref([]),
      confirmDeleteClienteDialog: ref(false),
      openNovoCliente: ref(false),
      openEditCliente: ref(false),
      columns,
      rows: ref([]),
    };
  },
  async mounted() {
    let response = await getClientes();
    if (response.data) this.rows = response.data;
  },
});
</script>

<style scoped>
</style>
