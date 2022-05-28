/* eslint-disable */
<template>
  <q-card style="min-width: 50%">
    <q-card-section class="bg-primary text-white">
      <div class="text-h6 q-pl-md">Adicionar nova fileira</div>
    </q-card-section>
    <div class="q-pa-md">
      <div class="q-gutter-md" style="max-width: 300px">
        <q-input outlined v-model="descricao" label="Descrição da fileira" />
        <q-input outlined v-model="comum" label="Quantidade de vagas Comuns" />
        <q-input
          outlined
          v-model="preferencial"
          label="Quantidade de vagas Preferenciais"
        />
        <q-input
          outlined
          v-model="mensalista"
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
  name: 'AddNovaFileira',
  methods: {},
  data () {
    return {
      descricao: ref(''),
      comum: ref(0),
      preferencial: ref(0),
      mensalista: ref(0)
    }
  }
}

</script>
