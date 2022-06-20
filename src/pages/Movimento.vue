<template>
  <q-page class="q-pr-sm q-pl-sm q-pt-sm q-pb-sm">
    <div class="q-pa-sm">
      <q-table
        card-class="fileiras"
        style="min-height: 80vh"
        dense
        title="Registros de Movimentação"
        :rows="rows"
        :filter="filter"
        :columns="columns"
        row-key="id"
        virtual-scroll
        :virtual-scroll-item-size="48"
        :pagination="{ rowsPerPage: 10 }"
      >
        <template v-slot:top-right>
          <q-input
            style="color: white"
            borderless
            dense
            debounce="300"
            v-model="filter"
            placeholder="Buscar"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>

        <template v-slot:no-data="{ icon, message, filter }">
          <div class="full-width row flex-center text-accent q-gutter-sm">
            <q-icon size="2em" name="sentiment_dissatisfied" />
            <span>
              Desculpe, não encontramos nenhum registro... {{ message }}
            </span>
            <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
          </div>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { format } from "date-fns";
import { showNegativeNotify } from "src/util/plugins";
import { defineComponent, ref } from "vue";
import { getTickets } from "src/services/ticket";
import { formatCurrency } from "src/util/format";

const columns = [
  {
    name: "id",
    align: "center",
    label: "Ticket nº",
    field: "id",
    sortable: true,
  },
  {
    name: "chegada",
    label: "Data/ Hora Entrada",
    align: "center",
    field: "chegada",
    format: (val) => (val ? format(new Date(val), "dd-MM-yyyy HH:mm:ss") : ""),
    sortable: true,
  },
  {
    name: "saida",
    label: "Data/Hora Saída",
    align: "center",
    field: "saida",
    format: (val) =>
      val ? format(new Date(val), "dd-MM-yyyy HH:mm:ss") : "Até o momento",
    sortable: true,
  },
  {
    name: "vaga",
    label: "Vaga",
    align: "center",
    field: "vaga",
    format: (val) => val.descFileira + val.id,
    sortable: true,
  },
  {
    name: "vaga",
    label: "Tipo",
    align: "center",
    field: "vaga",
    format: (val) => val.tipo,
    sortable: true,
  },
  {
    name: "valor",
    label: "Valor R$",
    align: "center",
    field: "valor",
    format: (val) => formatCurrency(val),
    sortable: true,
  },
  {
    name: "tipoPagamento",
    label: "Tipo de Pagamento",
    align: "center",
    field: "tipoPagamento",
    format: (val) => val ?? "Aguardando",
    sortable: true,
  },
  {
    name: "cliente",
    label: "Cliente",
    align: "center",
    field: "cliente",
    format: (val) => (val ? val.nome : "Visitante"),
    sortable: true,
  },
  {
    name: "usuario",
    label: "Usuario",
    align: "center",
    format: (val) => val.email,
    field: "usuario",
    sortable: true,
  },
];
export default defineComponent({
  name: "Movimento",
  components: {},
  methods: {
    async load() {
      let response = await getTickets();
      if (response.data) {
        this.rows = response.data;
        console.log(this.rows);
      } else {
        showNegativeNotify(
          "Opss... Houve uma falha no carregamento do movimento. Tente novamente mais tarde."
        );
      }
    },
  },
  mounted() {
    this.load();
  },

  data() {
    return {
      openNovaFileira: ref(false),
      rows: [],
      columns,
      filter: ref(""),
    };
  },

  setup() {
    return {};
  },
});
</script>

<style scoped>
</style>
