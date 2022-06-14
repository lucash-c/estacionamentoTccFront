/* eslint-disable */
<template>
  <q-card style="width: 300px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Adicionar Novo Cliente</div>
    </q-card-section>
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px">
        <q-input outlined v-model="cliente.nome" label="Nome" />
        <q-input outlined v-model="cliente.rg" label="Rg" />
        <q-input outlined v-model="cliente.telefone" label="Telefone" />
        <q-input outlined v-model="cliente.mensalidade" label="Mensalidade" />
        <q-input outlined v-model="cliente.vencimento" label="Vencimento" />
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
        <q-btn
          label="Adicionar"
          type="submit"
          color="primary"
          v-close-popup
          @click="addCliente()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { postCliente } from "src/services/cliente";
export default {
  name: "addNovoCliente",
  methods: {
    async addCliente() {
      await postCliente(this.cliente);
      window.location.reload();
    },
  },

  data() {
    return {
      cliente: ref({}),
    };
  },
};
</script>
