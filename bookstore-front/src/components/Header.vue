<template>
  <nav>
    <div class="nav-wrapper container">
      <a href="/" class="brand-logo">BOOKSTORE CLASSIC</a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li> <router-link to="/" v-if="!signedIn()">Sign in</router-link></li>
        <li><router-link to="/signup" v-if="!signedIn()">Sign Up</router-link></li>
        <li><router-link to="/records" v-if="signedIn()">Records</router-link></li>
        <li><router-link to="/artists" v-if="signedIn()">Artists</router-link></li>
        <a href="#" @click.prevent="signOut" v-if="signedIn()">Sign out</a>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut () {
      this.$http.secured.delete('/signin')
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
