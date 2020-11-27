<template>
  <div class="container">
    <div class="row">
      <h3 class="">Войти</h3>
      <form class="col s6" @submit.prevent="signin">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="input-field col s12">
          <label for="email" class="label">E-mail Адресс</label>
          <input type="email" v-model="email" class="input" id="email">
        </div>
        <div class="input-field col s12">
          <label for="password" class="label">Пароль</label>
          <input type="password" v-model="password" class="input" id="password">
        </div>
        <button type="submit" class="waves-effect btn">Войти</button>

        <div class="col s4"><router-link to="/signup" class="link-grey">Зарегистрироваться</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signin',
  data () {
    return {
      email: '',
      password: '',
      error: ''
    }
  },
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signin', { email: this.email, password: this.password })
        .then(response => this.signinSuccessful(response))
        .catch(error => this.signinFailed(error))
    },
    signinSuccessful (response) {
      if (!response.data.csrf) {
        this.signinFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/books')
    },
    signinFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || ''
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/books')
      }
    }
  }
}
</script>

<style>

</style>
