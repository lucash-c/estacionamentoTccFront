/* eslint-disable */
<template>
  <q-card style="width: 250px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Editar Cliente</div>
    </q-card-section>
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px">
        <q-toggle v-model="cliente.bloqueado"> Bloquear </q-toggle>
        <q-input dense outlined v-model="cliente.nome" label="Nome" />
        <q-input dense outlined v-model="cliente.rg" label="Rg" />
        <q-input dense outlined v-model="cliente.telefone" label="Telefone" />
        <q-input
          dense
          outlined
          v-model="cliente.mensalidade"
          label="Mensalidade"
        />
        <q-input
          dense
          outlined
          v-model="cliente.vencimento"
          label="Vencimento"
        />
        <q-input
          type="text-area"
          outlined
          v-model="cliente.observacao"
          label="Observação"
        />
      </div>
    </div>
    <!-- footer----------------------------------------------------------------------->
    <q-card-actions align="right">
      <div>
        <q-btn
          label="Cancelar"
          type="onReset"
          color="primary"
          flat
          class="q-ml-sm"
          v-close-popup
        />
        <q-btn label="Editar" type="submit" color="primary" @click="save()" />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { putCliente } from "src/services/cliente";

export default {
  name: "EditCliente",
  props: {
    selected: {
      type: Array,
      default: ref([]),
    },
  },
  methods: {
    async save() {
      await putCliente(this.cliente);
      window.location.reload();
    },
    load() {
      this.cliente = this.selected[0];
    },
  },
  data() {
    return {
      cliente: ref({}),
    };
  },
  mounted() {
    this.load();
  },
};
</script>
