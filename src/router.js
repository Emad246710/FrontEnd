import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Categories from "./components/Categories.vue"
import CategoryForm from "./components/CategoryForm.vue"
import NoteForm from "./components/NoteForm.vue"
import Notes from "./components/Notes.vue"
import Note from "./components/Note.vue"
import User from "./components/User.vue"
import UserForm from "./components/UserForm.vue"
import Login from "./components/UserLogin.vue"

import store from "./store.js";
import { IS_LOGGED_IN , LOGOUT_MUT,SET_USER_DETAILS_MUT, GET_USER_ACT } from './storeDef';

const castIdToInt = (route) => {
  let temp = Number.parseInt(route.params.id);
  return { id: temp };
}

const routes = [
  {
    path: '/', name: 'root', redirect: { name: 'notes' }
  },

  { path: '/login', name: 'login', component: Login, meta: { requiresAuth: false } },
  { path: '/signup', name: 'signup', component: UserForm, meta: { requiresAuth: false } },

  { path: '/user', name: 'user', component: User, meta: { requiresAuth: true } }, // Pass route.params to props
  { path: '/users/form', name: 'user_edit', component: UserForm,  meta: { requiresAuth: true } }, // Pass route.params to props

  { path: '/notes', name: 'notes', component: Notes, meta: { requiresAuth: true } },
  { path: '/notes/:id', name: 'note', component: Note, props: castIdToInt, meta: { requiresAuth: true } }, // Pass route.params to props
  { path: '/notes/form', name: 'note_create', component: NoteForm, meta: { requiresAuth: true } },
  { path: '/notes/form/:id', name: 'note_edit', component: NoteForm, props: castIdToInt, meta: { requiresAuth: true } }, // Pass route.params to props

  { path: '/categories', name: 'categories', component: Categories, meta: { requiresAuth: true } },
  { path: '/categories/form', name: 'category_create', component: CategoryForm, meta: { requiresAuth: true } },
  { path: '/categories/form/:id', name: 'category_edit', component: CategoryForm, props: castIdToInt, meta: { requiresAuth: true } }, // Pass route.params to props

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach(async(to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)


  // check if this route requires auth, and the user auth status
  if (to.meta.requiresAuth && !store.getters[IS_LOGGED_IN]) {

    // check if user data are stored in localStorage
    if (localStorage.current_user_id) {

      try {
        await store.dispatch(GET_USER_ACT, localStorage.current_user_id);
        return true
      } catch (err) {
        // delete any localy stored data (if any) and redirect to login page.
        store.commit(LOGOUT_MUT)
        return {
          name: 'login',
          // save the location we were at to come back later
          query: { redirect_to_name: to.name },
        }
      }

    } else {
      // else, delete any localy stored data (if any) and redirect to login page.
      store.commit(LOGOUT_MUT)
      return {
        name: 'login',
        // save the location we were at to come back later
        query: { redirect_to_name: to.name },
      }
    }
  }
  return true
})

export default router

