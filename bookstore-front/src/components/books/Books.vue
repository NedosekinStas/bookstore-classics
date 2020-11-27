<template>
  <div class="row">
    <div class="container">
      <div class="text-red" v-if="error">{{ error }}</div>
      <h3> Добавить новую Книгу</h3>

      <form @submit.prevent="addBook">
      <div class="mb-6">
        <label for="book_title" class="label">Title</label>
        <input
          type="text"
          id="book_title"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Введите название книги"
          v-model="newBook.title">
      </div>
    </div>
  </div>
</template>