/* eslint-disable */
<template>
  <q-card style="width: 300px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Adicionar nova fileira</div>
    </q-card-section>
    <q-card-section style="heigth: 80vh">
      <div class="q-pa-md">
        <div class="q-gutter-md" style="max-width: 300px">
          <q-input
            outlined
            v-model="fileira.descricao"
            label="Descrição da fileira"
          />
          <q-input
            outlined
            v-model="fileira.countComuns"
            label="Quantidade de vagas Comuns"
          />
          <q-input
            outlined
            v-model="fileira.countPreferencial"
            label="Quantidade de vagas Preferenciais"
          />
          <q-input
            outlined
            v-model="fileira.countMensalista"
            label="Quantidade de vagas de Mensalistas"
          />
        </div>
      </div>
    </q-card-section>

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
          label="Adicionar"
          type="submit"
          color="primary"
          @click="addFileira()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { postFileira, deleteFileira } from "../services/fileira";
import { showNegativeNotify, showPositiveNotify } from "src/util/plugins";
export default {
  name: "addNovaFileira",
  methods: {
    async addFileira() {
      await postFileira(this.fileira);
      window.location.reload();
    },
  },
  data() {
    return {
      fileira: {
        descricao: "",
        countComuns: 0,
        countPreferencial: 0,
        countMensalista: 0,
      },
    };
  },
};
</script>
