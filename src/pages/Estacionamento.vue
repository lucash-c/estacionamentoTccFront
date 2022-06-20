/* eslint-disable */

<template>
  <q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
    <div class="q-pa-md">
      <q-table
        grid
        dense
        title-class="title"
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
          style="margin: 10px"
          :disable="!selected[0]"
          dense
          color="red"
          icon="delete"
          no-caps
          @click="confirmDeleteFileiraDialog = true"
          label="Excluir Fileira"
        />

        <q-btn
          dense
          style="margin: 10px"
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
    <EditFileira :selected="selected" />
  </q-dialog>
  <q-dialog v-model="confirmDeleteFileiraDialog">
    <confirmDeleteFileira :selected="selected" />
  </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import AddNovaFileira from "src/components/AddNovaFileira.vue";
import confirmDeleteFileira from "src/components/confirmDeleteFileira.vue";
import EditFileira from "src/components/EditFileira.vue";
import { getFileiras } from "src/services/fileira";
const columns = [
  {
    name: "descricao",
    align: "center",
    label: "Fileira",
    field: "descricao",
    sortable: true,
  },
  {
    name: "countComuns",
    label: "Comum",
    align: "center",
    field: "countComuns",
    format: (val, row) => row.countDispComuns + " / " + row.countComuns,
    sortable: true,
  },
  {
    name: "countPreferencial",
    label: "Preferencial",
    align: "center",
    field: "countPreferencial",
    format: (val, row) =>
      row.countDispPreferencial + " / " + row.countPreferencial,
    sortable: true,
  },
  {
    name: "countMensalista",
    label: "Mensalista",
    align: "center",
    field: "countMensalista",
    format: (val, row) => row.countDispMensalista + " / " + row.countMensalista,
    sortable: true,
  },
  {
    name: "total",
    label: "Total",
    align: "center",
    field: "total",
    sortable: true,
    format: (val, row) =>
      Number(row.countDispComuns) +
      Number(row.countDispPreferencial) +
      Number(row.countDispMensalista) +
      " / " +
      (Number(row.countComuns) +
        Number(row.countPreferencial) +
        Number(row.countMensalista)),
  },
];

export default defineComponent({
  name: "Estacionamento",

  components: {
    AddNovaFileira,
    EditFileira,
    confirmDeleteFileira,
  },

  methods: {},

  setup() {
    return {
      selected: ref([]),
      confirmDeleteFileiraDialog: ref(false),
      openNovaFileira: ref(false),
      openEditFileira: ref(false),
      columns,
      rows: ref([]),
    };
  },

  async mounted() {
    let response = await getFileiras();
    this.rows = response.data;
    console.log(this.rows);
  },
});
</script>

<style scoped>
</style>
