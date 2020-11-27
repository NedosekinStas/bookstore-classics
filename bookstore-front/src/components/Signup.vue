<template>
  <div class="container">
    <div class="row">
      <h3 class="">Зарегистрироваться</h3>
      <form class="col s6" @submit.prevent="signup">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="input-field col s12">
          <label for="email" class="label">E-mail Адресс</label>
          <input type="email" v-model="email" class="input" id="email" >
        </div>
        <div class="input-field col s12">
          <label for="password" class="label">Пароль</label>
          <input type="password" v-model="password" class="input" id="password">
        </div>
        <div class="input-field col s12">
          <label for="password_confirmation" class="label">Подтвержение пароля</label>
          <input type="password" v-model="password_confirmation" class="input" id="password_confirmation">
        </div>
        <button type="submit" class="waves-effect btn">Зарегистрироваться</button>

       <div class="col s2"><router-link to="/" class="link-grey">Войти</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  created () {
    this.checkedSignedIn()
  },
  updated () {
    this.checkedSignedIn()
  },
  methods: {
    signup () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.signupFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/books')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Что то пошло не так'
      delete localStorage.csrf
      delete localStorage.signedIn
    },
    checkedSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/books')
      }
    }
  }
}
</script>

<style>

</style>
