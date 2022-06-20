/* eslint-disable vue/no-parsing-error */
/* eslint-disable vue/no-parsing-error */
<template>
  <q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
    <div align="center" class="q-pa-md">
      <q-card style="max-width: 300px">
        <q-card-section style="heigth: 70vh" class="bg-primary text-white">
          <div class="text-h6 q-pl-md">Caixa</div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-if="!open"
            style="padding: 10px"
            dense
            outlined
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
            input-class="text-right"
            v-model="newTicket.valorHora"
            label="Valor/Hora R$"
          />
          <br />
          <q-input
            v-if="!open"
            v-model="codigo"
            style="margin-top: 70px"
            outlined
            label="Codigo do Ticket"
          />
          <div v-if="open" align="center">
            <q-badge color="blue"> Numero: {{ ticket.id }} </q-badge>
            <br />
            <q-badge color="blue">
              Hora de entrada: {{ ticket.chegada }}
            </q-badge>
            <br />
            <q-badge color="blue"> Hora de saida: {{ ticket.saida }} </q-badge>
            <br />
            <q-badge color="blue"> Tipo: {{ ticket.tipoVaga }} </q-badge>
            <br />
            <q-badge color="blue">
              Permanência: {{ newTicket.tempoPermanencia }}
            </q-badge>
            <br />
            <q-badge color="blue">
              Valor: R${{ formatCurrency(ticket.valor) }}
            </q-badge>
            <br />

            <q-input
              v-if="newTicket.tipoPagamento == 'Dinheiro'"
              style="padding: 10px"
              dense
              outlined
              mask="#,##"
              unmasked-value
              fill-mask="0"
              reverse-fill-mask
              input-class="text-right"
              v-model="newTicket.valorPago"
              label="Valor Pago R$"
            />
            <q-select
              style="padding: 10px"
              dense
              outlined
              options-dense
              :options="['Cartão', 'Dinheiro']"
              v-model="newTicket.tipoPagamento"
              label="Tipo de pagamento"
            />
            <span v-if="newTicket.tipoPagamento == 'Dinheiro'">
              {{
                Number(String(newTicket.valorPago).replace(",", "")) / 100 -
                  Number(String(ticket.valor).replace(",", "")) >=
                0
                  ? "Troco: R$" +
                    formatCurrency(newTicket.valorPago / 100 - ticket.valor)
                  : "Digite o valor pago"
              }}</span
            >
          </div>
        </q-card-section>

        <q-separator />
        <!-- footer----------------------------------------------------------------------->
        <q-card-actions align="center">
          <div>
            <q-btn
              v-if="open"
              label="Cancelar"
              type="onReset"
              color="primary"
              flat
              class="q-ml-sm"
              @click="open = false"
            />

            <q-btn
              :disable="
                newTicket.tipoPagamento == 'Dinheiro' &&
                newTicket.valorPago - ticket.valor < 0
              "
              :label="open ? 'Cobrar' : 'Prosseguir'"
              type="submit"
              color="primary"
              @click="open ? save() : prosseguir(codigo)"
            >
            </q-btn>
          </div>
        </q-card-actions>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import { formatCurrency } from "src/util/format";
import { getTicketById, putTicket } from "src/services/ticket";
import { showPositiveNotify, showWarningNotify } from "src/util/plugins";
import { format, differenceInMinutes } from "date-fns";

export default defineComponent({
  name: "Movimento",

  methods: {
    async save() {
      this.ticket.bloqueado = false;
      this.ticket.permanencia = 0;
      this.ticket.tipoPagamento = this.newTicket.tipoPagamento;

      let response = await putTicket(this.ticket);

      if (response.status == 200) {
        showPositiveNotify("Pagamento do Ticket realizado com sucesso.");
        this.open = false;
        this.codigo = "";
      } else {
        showWarningNotify("Houve uma falha ao tentar realizar o pagamento");
      }
    },

    async prosseguir(id) {
      let responseTicket = await getTicketById(id);

      if (responseTicket.status == 200) {
        this.ticket = responseTicket.data;

        if (this.ticket.cliente) {
          this.open = false;
          showWarningNotify("Ticket inválido");
          return;
        }

        if (this.ticket.saida) {
          this.open = false;
          showWarningNotify("Ticket inválido");
          return;
        }

        this.open = true;

        this.ticket.saida = format(new Date(), "dd-MM-yyyy HH:mm:ss");
        this.ticket.permanencia = differenceInMinutes(
          new Date(),
          new Date(this.ticket.chegada)
        );
        this.ticket.chegada = format(
          new Date(this.ticket.chegada),
          "dd-MM-yyyy HH:mm:ss"
        );

        this.newTicket.tipoPagamento = "Dinheiro";
        this.ticket.valor =
          (Number(String(this.newTicket.valorHora).replace(",", "")) /
            100 /
            60) *
          Number(this.ticket.permanencia);

        this.newTicket.tempoPermanencia = this.converter(
          this.ticket.permanencia
        );
      } else {
        this.open = false;
        showWarningNotify("Codigo inválido");
        return;
      }
    },

    converter(minutos) {
      const horas = Math.floor(minutos / 60);
      const min = minutos % 60;
      const textoHoras = `00${horas}`.slice(-2);
      const textoMinutos = `00${min}`.slice(-2);

      return `${textoHoras}:${textoMinutos}`;
    },
  },

  data() {
    return {
      open: ref(false),
      newTicket: {
        valorHora: 200,
      },
      ticket: {},
      codigo: "",
    };
  },

  setup() {
    return {
      formatCurrency,
    };
  },
});
</script>

<style scoped>
</style>
