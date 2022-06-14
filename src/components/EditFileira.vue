
<template>
  <q-card style="width: 250px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Editar fileira</div>
    </q-card-section>
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
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
import { putFileira } from "../services/fileira";
import { showPositiveNotify, showNegativeNotify } from "../util/plugins";

export default {
  name: "EditFileira",

  props: {
    selected: {
      default: ref([]),
      type: Array,
    },
  },
  methods: {
    async editarFileira() {
      let response = await putFileira(this.fileira);
      console.log(response);
      /* if (response.status == 200) {
        showPositiveNotify("Os dados da fileira foram alterados com sucesso");
      } else {
        showNegativeNotify(
          "Houve uma falha ao tentar editar a fileira selecionada. Por favor tente novamente mais tarde."
        );
      }*/
    },
    load() {
      this.fileira = this.selected[0];
    },
  },
  data() {
    return {
      fileira: ref({}),
    };
  },
  mounted() {
    this.load();
  },
};
</script>
