/* eslint-disable vue/require-valid-default-prop */
/* eslint-disable vue/require-valid-default-prop */
/* eslint-disable */
<template>
  <q-card style="width: 250px">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Editar fileira</div>
    </q-card-section>
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px">
        <q-input outlined v-model="fileira.fileira" label="Descrição da fileira" />
        <q-input outlined v-model="fileira.comum" label="Quantidade de vagas Comuns" />
        <q-input
          outlined
          v-model="fileira.preferencial"
          label="Quantidade de vagas Preferenciais"
        />
        <q-input
          outlined
          v-model="fileira.mensalista"
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
        <q-btn
          label="Adicionar"
          type="submit"
          color="primary"
          @click="save()"
        />
      </div>
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'EditFileira',

  props: {
    selected: {
      default: ref([]),
      type: Array

    }
  },
  methods: {

    load () {
      this.fileira = this.selected[0]
    }
  },
  data () {
    return {
      fileira: ref({})
    }
  },
  mounted () {
    this.load()
  }

}

</script>
