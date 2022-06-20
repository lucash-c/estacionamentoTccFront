<template>
  <q-layout view="lHh Lpr lFf" class="bg-main">
    <q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
      <br />
      <div align="center">
        <q-input
          outlined
          dense
          v-model="ticketId"
          autofocus
          @keyup.enter="loadTicket()"
        />
        <br />
        <br />

        <q-card style="width: 350px; height: 100px">
          <br />
          <br />
          <div align="center">
            <span> {{ mensagem }}</span>
          </div>
        </q-card>
      </div>
    </q-page>
  </q-layout>
</template>

<script>
import { showWarningNotify, showPositiveNotify } from "src/util/plugins";
import { differenceInMinutes, format } from "date-fns";
import { defineComponent, ref } from "vue";
import { getTicketById, putTicket } from "src/services/ticket";
import { updateVaga } from "src/services/vagas";
import { putCliente } from "src/services/cliente";

export default defineComponent({
  methods: {
    async loadTicket() {
      let response = await getTicketById(this.ticketId);
      if (response.status == 200) {
        let ticket = response.data;

        if (ticket.cliente) {
          showPositiveNotify("Agradecemos a sua visita, Volte sempre!!!");
          ticket.vaga.estado = 0;
          ticket.saida = format(new Date(), "dd-MM-yyyy HH:mm:ss");
          ticket.chegada = format(
            new Date(ticket.chegada),
            "dd-MM-yyyy HH:mm:ss"
          );
          await updateVaga(ticket.vaga);
          this.ticketId = "";
          ticket.bloqueado = false;
          ticket.cliente.bloqueado = false;
          await putCliente(ticket.cliente);
          console.log(ticket);
          let responseTeste = await putTicket(ticket);
          console.log(responseTeste);
          return;
        }
        let chegada = ticket.chegada;
        ticket.permanencia = differenceInMinutes(new Date(), new Date(chegada));

        if (ticket.permanencia < 5) {
          showPositiveNotify("Agradecemos a sua visita, Volte sempre!!");
          ticket.vaga.estado = 0;
          ticket.saida = format(new Date(), "dd-MM-yyyy HH:mm:ss");
          ticket.chegada = format(
            new Date(ticket.chegada),
            "dd-MM-yyyy HH:mm:ss"
          );
          ticket.valor = 0;
          ticket.tipoPagamento = "---";
          await updateVaga(ticket.vaga);
          console.log("permanencia inferior a 5 min");
          console.log(ticket);
          await putTicket(ticket);
          this.ticketId = "";

          return;
        }

        if (ticket.bloqueado) {
          showWarningNotify(
            "Seu ticket esta bloqueado, por favor procure um de nossos colaboradores para desbloquea-lo."
          );
          this.ticketId = "";
          return;
        } else {
          showPositiveNotify("Agradecemos a sua visita, Volte sempre!");
          ticket.vaga.estado = 0;
          ticket.saida = format(new Date(), "dd-MM-yyyy HH:mm:ss");
          ticket.chegada = format(
            new Date(ticket.chegada),
            "dd-MM-yyyy HH:mm:ss"
          );
          await updateVaga(ticket.vaga);
          await putTicket(ticket);
          this.ticketId = "";
          return;
        }
      } else {
        showWarningNotify(
          "Opss...Houve uma falha por favor procure um de nossos colaboradores."
        );
      }
    },
  },
  data() {
    return {
      ticketId: ref(""),
      mensagem: ref("Insira o seu ticket ou código no leitor..."),
    };
  },
});
</script>

<style scoped>
.bg-main {
  background-image: url("~assets/bg-entrada.webp");
  background-position: center;
  background-size: cover;
}
</style>
