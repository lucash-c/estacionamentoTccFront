<template>
<q-layout view="lHh Lpr lFf" class="bg-main" >
<q-page class="q-pr-md q-pl-md q-pt-md q-pb-md">
  <div style="background-color:white" align="center">
    <span> BEM VINDO. Por favor selecione o tipo de vaga desejada:</span>
  </div>
  <br>
  <br>
  <br>
  <div align="center">
    <q-btn
    style="width: 500px"
      size="50px"
      color="teal"
      icon="face"
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
    />
    </div>
     <div align="center">
     <q-btn
       style="width: 500px"
      size="50px"
      color="red"
      icon="badge"
      label="Mensalista"
    />
</div>
  </q-page>
  </q-layout>
</template>

<style scoped>
.bg-main {
  background-image: url("~assets/bg-entrada.webp");
  background-position: center;
  background-size: cover;
}
</style>
