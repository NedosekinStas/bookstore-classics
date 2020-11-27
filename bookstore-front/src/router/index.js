import Vue from 'vue'
import Router from 'vue-router'
import Books from '@/components/books/Books'
import Authors from '@/components/authors/Authors'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/authors',
      name: 'Authors',
      component: Authors
    },
    {
      path: '/books',
      name: 'Books',
      component: Books
    }
  ]
})
