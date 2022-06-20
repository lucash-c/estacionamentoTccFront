<template>
  <q-layout view="lHh Lpr lFf" class="bg-main">
    <q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
      <div style="background-color: white" align="center">
        <span> BEM VINDO. Por favor selecione o tipo de vaga desejada:</span>
      </div>
      <br />
      <br />
      <br />
      <div align="center">
        <q-btn
          style="width: 500px"
          size="50px"
          color="teal"
          icon="face"
          @click="onClickComum"
          label="Comum"
        />
      </div>
      <div style="padding: 15px" align="center">
        <q-btn
          style="width: 500px"
          size="50px"
          color="primary"
          icon="accessible"
          label="Preferencial"
          @click="onClickPreferencial()"
        />
      </div>
      <div align="center">
        <q-btn
          style="width: 500px"
          size="50px"
          color="red"
          icon="badge"
          label="Mensalista"
          @click="dialogMensalista = true"
        />
      </div>
    </q-page>
    <q-dialog v-model="dialogMensalista" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Seu Código de Mensalista</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <q-input
            dense
            v-model="codigoMensalista"
            autofocus
            @keyup.enter="
              onClickMensalista(codigoMensalista);
              v - close - popup;
            "
          />
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn
            flat
            label="Enviar"
            v-close-popup
            @click="onClickMensalista(codigoMensalista)"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="openCupomDialog">
      <q-card style="min-width: 200px">
        <q-card-section>
          <div align="center" class="text-h6">Cupom</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          <div align="center">
            V-Intelligent <br />
            Codigo: {{ cupom.id }} <br />
            Data/Hora de Chegada:
            {{ format(new Date(cupom.chegada), "dd-MM-yyyy HH:mm:ss") }} <br />
            tipo:
            {{ cupom.vaga.tipo }}
          </div>
          <br />
          <q-separator />
          <div align="center">
            <br />
            ESTACIONE NA VAGA:
            {{ cupom.vaga.fileira.descricao + " " + cupom.vaga.indexFileira }}
          </div>
          <br />
          <q-separator />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-layout>
</template>
<script>
import { format } from "date-fns";
import { defineComponent } from "vue";
import { LocalStorage } from "quasar";
import { USER_STORAGE } from "../variables/LocalStorage";
import { getVaga, updateVaga } from "src/services/vagas";
import { getFileirasById } from "src/services/fileira";
import { createTicket } from "src/services/ticket";
import { getClienteByCod, putCliente } from "src/services/cliente";
import {
  showNegativeNotify,
  showWarningNotify,
  showPositiveNotify,
} from "src/util/plugins";
export default defineComponent({
  methods: {
    async onClickComum() {
      let responseVaga = await getVaga("comum");
      if (!responseVaga.data)
        return showWarningNotify(
          "Sentimos muito. Nosso estacionamento encontra-se lotado no momento."
        );

      let vaga = responseVaga.data;
      vaga.estado = 1;
      vaga.fileira = (await getFileirasById(vaga.idFileira)).data;

      await updateVaga(vaga);
      let chegada = format(new Date(), "dd-MM-yyyy HH:mm:ss");
      let body = {
        chegada: chegada,
        vaga: vaga,
        tipoVaga: "comum",
        usuario: LocalStorage.getItem(USER_STORAGE),
        bloqueado: true,
      };
      let response = await createTicket(body);
      if (response.data) {
        this.cupom = response.data;
        this.cupom.vaga.fileira = body.vaga.fileira;
        showPositiveNotify("Seja bem vindo! retire seu ticket.");
        this.openCupomDialog = true;
      } else {
        showNegativeNotify(
          "Opss... estamos com problemas, por favor contate um de nossos colaboradores"
        );
      }
    },

    async onClickPreferencial() {
      let responseVaga = await getVaga("preferencial");
      if (!responseVaga.data) return this.onClickComum();
      let vaga = responseVaga.data;
      vaga.estado = 1;
      vaga.fileira = (await getFileirasById(vaga.idFileira)).data;
      await updateVaga(vaga);
      let chegada = format(new Date(), "dd-MM-yyyy HH:mm:ss");
      let body = {
        chegada: chegada,
        vaga: vaga,
        tipoVaga: "preferencial",
        usuario: LocalStorage.getItem(USER_STORAGE),
        bloqueado: true,
      };
      let response = await createTicket(body);
      if (response.data) {
        this.cupom = response.data;
        this.cupom.vaga.fileira = body.vaga.fileira;
        showPositiveNotify("Seja bem vindo! retire seu ticket.");
        this.openCupomDialog = true;
      } else {
        showNegativeNotify(
          "Opss... estamos com problemas, por favor contate um de nossos colaboradores"
        );
      }
    },

    async onClickMensalista(cod) {
      this.codigoMensalista = "";
      let response = await getClienteByCod(cod);
      if (response.status == 200) {
        let cliente = response.data;
        if (!cliente.bloqueado) {
          cliente.bloqueado = true;
          cliente.mensalidade = String(cliente.mensalidade);
          await putCliente(cliente);
          let responseVaga = await getVaga("mensalista");
          if (!responseVaga.data) return this.mensalistaVagaComum(cliente);
          let vaga = responseVaga.data;
          vaga.estado = 1;
          vaga.fileira = (await getFileirasById(vaga.idFileira)).data;
          await updateVaga(vaga);

          let chegada = format(new Date(), "dd-MM-yyyy HH:mm:ss");
          let body = {
            chegada: chegada,
            vaga: vaga,
            tipoVaga: "mensalista",
            usuario: LocalStorage.getItem(USER_STORAGE),
            bloqueado: false,
            serial: cliente.serial,
            valor: cliente.mensalidade,
            tipoPagamento: "Mensal",
            cliente: cliente,
          };
          let response = await createTicket(body);
          if (response.data) {
            this.cupom = response.data;
            console.log(this.cupom);
            this.cupom.vaga.fileira = vaga.fileira;
            showPositiveNotify("Seja bem vindo! retire seu ticket.");
            this.openCupomDialog = true;
          } else {
            showNegativeNotify(
              "Opss... estamos com problemas, por favor contate um de nossos colaboradores"
            );
          }
        } else {
          showWarningNotify(
            "Olá " +
              cliente.nome +
              " seu acesso está bloqueado. Por favor contate nossos atendentes para realizar o desbloqueio!"
          );
        }
      } else {
        showWarningNotify(
          "Houve uma falha na leitura do seu codigo, por favor tente novamente ou procure um de nossos atendentes!"
        );
      }
    },
    async mensalistaVagaComum(cliente) {
      this.codigoMensalista = "";
      let responseVaga = await getVaga("comum");
      if (!responseVaga.data)
        return showWarningNotify(
          "Sentimos muito. Nosso estacionamento encontra-se lotado no momento."
        );

      let vaga = responseVaga.data;
      vaga.estado = 1;
      vaga.fileira = (await getFileirasById(vaga.idFileira)).data;
      vaga.fileiraId = (await getFileirasById(vaga.idFileira)).data.id;
      await updateVaga(vaga);

      let chegada = format(new Date(), "dd-MM-yyyy HH:mm:ss");
      let body = {
        chegada: chegada,
        vaga: vaga,
        tipoVaga: "comum",
        usuario: LocalStorage.getItem(USER_STORAGE),
        bloqueado: false,
        cliente: cliente,
        serial: cliente.serial,
        valor: cliente.mensalidade,
        tipoPagamento: "Mensal",
      };

      let response = await createTicket(body);
      if (response.data) {
        this.cupom = response.data;
        this.cupom.vaga.fileira = body.vaga.fileira;
        showPositiveNotify("Seja bem vindo! retire seu ticket.");
        this.openCupomDialog = true;
      } else {
        showNegativeNotify(
          "Opss... estamos com problemas, por favor contate um de nossos colaboradores"
        );
      }
    },
  },
  data() {
    return {
      format,
      openCupomDialog: false,
      cupom: {},
      codigoMensalista: "",
      dialogMensalista: false,
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
