<template>
  <q-card style="width: 300px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Atenção!</div>
    </q-card-section>
    <div class="q-pa-md">
      Deseja realmente excluir a fileira {{ selected[0].descricao }} ?
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
          @click="removerFileira()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { deleteFileira } from "../services/fileira";
export default {
  name: "confirmDeleteFileira",

  props: {
    selected: {
      default: ref([]),
      type: Array,
    },
  },

  methods: {
    async removerFileira() {
      console.log(this.selected[0].id);
      let response = await deleteFileira(this.selected[0].id);
      console.log(response);
      window.location.reload();
    },
  },
  data() {
    return {};
  },
};
</script>
