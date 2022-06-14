<template>
  <q-card style="width: 300px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Atenção!</div>
    </q-card-section>
    <div class="q-pa-md">
      Deseja realmente excluir o cliente {{ selected[0].nome }} ?
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
          v-close-popup
          label="Excluir"
          type="submit"
          color="primary"
          @click="removerCliente()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { deleteCliente } from "../services/cliente";
export default {
  name: "confirmDeleteCliente",

  props: {
    selected: {
      default: ref([]),
      type: Array,
    },
  },

  methods: {
    async removerCliente() {
      await deleteCliente(this.selected[0].cod);
      window.location.reload();
    },
  },
  data() {
    return {};
  },
};
</script>
