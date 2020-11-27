<template>
  <div class="row">
    <div class="container">
      <div class="text-red" v-if="error">{{ error }}</div>
      <h3> Добавить нового Автора</h3>

      <form @submit.prevent="addAuthor">
          <div class="col s6">
              <input type="text"
                class="input"
                autofocus
                autocomplete="off"
                v-model="newAuthor.name">
          </div>

          <input type="submit" value="Добавить Автора">
      </form>

      <hr>

      <ul class="list-reset">
          <li class="" v-for="author in authors" :key="author.id" :author="author">
            <div class="authors">
                <p class="authors-name">{{ authors.name }}</p>
                <button class="btn" @click.prevent="editAuthor(author)">Изменить</button>
                <button class="btn" @click.prevent="removeAuthor(author)">Удалить</button>
            </div>
            <div v-if="author == editedAuthor">
              <form @submit.prevent="updateAuthor(author)">
                <div>
                    <input class="input" v-model="author.name">
                    <input type="submit" value="Update">
                </div>
              </form>
            </div>
          </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Author',
  data () {
    return {
      authors: [],
      newAuthor: [],
      error: '',
      editedAuthor: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/artists')
        .then(response => { this.authors = response.data })
        .catch(error => this.setError(error, 'Что то пошло не так'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    // Create Author
    addAuthor () {
      const value = this.newAuthor
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/authors', {author: { name: this.newAuthor.name }})
        .then(response => {
          this.authors.push(response.data)
          this.newAuthor = ''
        })
        .catch(error => this.setError(error, 'Автор не создан'))
    },
    // Delete Author
    removeAuthor (author) {
      this.$http.secured.delete(`/api/v1/authors/${author.id}`)
        .then(response => {
          this.authors.splice(this.authors.indexOf(author), 1)
        })
        .catch(error => this.setError(error, 'Новозможно удалить автора'))
    },
    editAuthor (author) {
      this.editedAuthor = author
    },
    updateAuthor (author) {
      this.editAuthor = ''
      this.$http.secured.patch(`/api/v1/authoes/${author.id}`, {author: { title: author.name }})
        .catch(error => this.setError(error, 'Невозможно обновить автора'))
    }
  }

}
</script>
