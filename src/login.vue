<template>
 <div class="login">
  <h1> Login </h1>
    <input type="text" placeholder="usuário">
    <br>
    <input type="password" placeholder="senha">
    <br>
<div class="btn-login">
  <button> Login</button>
</div>
<p>
  Você não tem conta?
  <a href="">Crie sua conta</a>
</p>
</div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {}
  }
}
</script>
