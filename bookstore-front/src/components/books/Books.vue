<template>
  <div class="row">
    <div class="container">
      <div class="text-red" v-if="error">{{ error }}</div>
      <h3> Добавить новую Книгу</h3>

      <form @submit.prevent="addBook">
      <div class="col s6">
        <label for="book_title" class="label">Описание</label>
        <input
          type="text"
          id="book_title"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Введите название книги"
          v-model="newBook.title">
      </div>
      <div class="col s6">
        <label for="book_year" class="label">Год</label>
        <input
          type="text"
          id="book_year"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Год"
          v-model="newBook.year">
      </div>
      <div class="mb-6">
        <label for="author" class="label">Автор</label>
        <select id="author" class="select" v-model="newBook.author">
          <option disabled value="">Выберите автора</option>
          <option :value="author.id" v-for="author in authors" :key="author.id">{{ author.name }}</option>
        </select>
        <p class="pt-4">Не видите автора? <router-link to="/authors" class="link-grey">Создать</router-link></p>
      </div>
      <input type="submit" value="Добавить книгу">
    </form>

    <hr />

    <ul class="col s4">
      <li class="py-4" v-for="book in books" :key="book.id" :book="book">
        <div class="">
          <div class="">
          <p class="">
            {{ book.title }} &mdash; {{ book.year }}
          </p>
          <p class="block font-mono font-semibold">{{ getAuthor(book) }}</p>
        </div>

        <button class="btn" @click.prevent="editBook(book)">Изменить</button>
        <button class="btn" @click.prevent="removeBook(book)">Удалить</button>
        </div>

        <div v-if="book == editedBook">
          <form action="" @submit.prevent="updateBook(book)">
            <div class="col s6">

              <div class="col s6">
                <label class="label">Описание</label>
                <input class="input" v-model="book.title">
              </div>

              <div class="col s6">
                <label class="label">Год</label>
                <input class="input" v-model="book.year">
              </div>

              <div class="col s6">
                <select id="author_update" class="select" v-model="book.author">
                  <option disabled value="">Выберите автора</option>
                  <option :value="author.id" v-for="author in authors" :key="author.id">{{ author.name }}</option>
                </select>
              </div>

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
  name: 'Books',
  data () {
    return {
      authors: [],
      books: [],
      newBook: [],
      error: '',
      editedBook: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http.secured.get('/api/v1/books')
        .then(response => { this.books = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
      this.$http.secured.get('/api/v1/authors')
        .then(response => { this.authors = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    getAuthor (book) {
      const bookAuthorsValues = this.authors.filter(authors => authors.id === book.authors_id)
      let authors
      bookAuthorsValues.forEach(function (element) {
        authors = element.name
      })
      return authors
    },
    addBook () {
      const value = this.newBook
      if (!value) {
        return
      }
      this.$http.secured.post('/api/v1/books/', { book: { title: this.newBook.title, year: this.newBook.year, author_id: this.newBook.author } })
        .then(response => {
          this.books.push(response.data)
          this.newBook = ''
        })
        .catch(error => this.setError(error, 'Не добавить книгу'))
    },
    removeBook (book) {
      this.$http.secured.delete(`/api/v1/books/${book.id}`)
        .then(response => {
          this.books.splice(this.books.indexOf(book), 1)
        })
        .catch(error => this.setError(error, 'Не удалось удалить книгу'))
    },
    editBook (book) {
      this.editedBook = book
    },
    updateBook (book) {
      this.editedBook = ''
      this.$http.secured.patch(`/api/v1/books/${book.id}`, { book: { title: book.title, year: book.year, author_id: book.author } })
        .catch(error => this.setError(error, 'Не удалось обновить книгу'))
    }
  }
}
</script>
