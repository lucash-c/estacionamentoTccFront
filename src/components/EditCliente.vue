/* eslint-disable */
<template>
  <q-card style="width: 300px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Editar Cliente</div>
    </q-card-section>
    <q-card-section style="height: 70vh">
      <div class="q-gutter-sm">
        <q-toggle dense v-model="cliente.bloqueado">
          {{ cliente.bloqueado ? "Desbloquear" : "Bloquear" }}
        </q-toggle>
        <q-input dense outlined v-model="cliente.nome" label="Nome" />
        <q-input
          dense
          outlined
          v-model="cliente.rg"
          label="Rg"
          mask="##.###.###"
        />
        <q-input
          dense
          outlined
          v-model="cliente.telefone"
          label="Telefone"
          mask="(##)-####-####"
        />
        <q-input
          dense
          outlined
          v-model="cliente.mensalidade"
          label="Mensalidade R$"
          input-class="text-right"
        />
        <q-input
          dense
          outlined
          v-model="cliente.vencimento"
          label="Vencimento / Dia do mês"
          mask="##"
        />
        <q-input
          dense
          type="textarea"
          outlined
          v-model="cliente.observacao"
          label="Observação"
          maxlength="1000"
          counter
        />
      </div>
    </q-card-section>

    <!-- footer----------------------------------------------------------------------->
    <q-card-actions align="right">
      <q-btn
        dense
        label="Cancelar"
        type="onReset"
        color="primary"
        flat
        class="q-ml-sm"
        v-close-popup
      />
      <q-btn
        dense
        label="Editar"
        type="submit"
        color="primary"
        @click="save()"
      />
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
      this.cliente.mensalidade = String(this.cliente.mensalidade).replace(
        ",",
        "."
      );
      let response = await putCliente(this.cliente);
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
