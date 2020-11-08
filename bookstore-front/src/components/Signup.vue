<template>
  <v-container>
    <v-card class="sign-form">
      <v-card-title>Регистрация</v-card-title>
      <v-card-text>
        <v-form v-model="isValid" @submit.prevent="signup">
          <v-text-field
                  id="email"
                  label="Email"
                  v-model="email"
                  :rules="[v => !!v || 'Введите Email']"
                  required
          ></v-text-field>
          <v-text-field
                  id="password"
                  label="Пароль"
                  v-model="пароль"
                  type="password"
                  :rules="[v => !!v || 'Введите пароль']"
                  required
          ></v-text-field>
          <v-text-field
                  id="password_confirmation"
                  label=" Подтвердите пароль"
                  v-model="password_confirmation"
                  type="password"
                  :rules="[v => !!v || 'Подтвердите пароль пароль']"
                  required
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" :disabled="!isValid">Зарегистрироваться</v-btn>
      </v-card-actions>
      <v-card-actions>
        <v-btn to="/">Войти</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Signup',
  data: () => ({
    email: '',
    password: '',
    password_confirmation: '',
    error: ''
  }),
  created () {
    this.checkSignedIn()
  },
  updated () {
    this.checkSignedIn()
  },
  methods: {
    signin () {
      this.$http.plain.post('/signup', { email: this.email, password: this.password, password_confirmation: this.password_confirmation })
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
