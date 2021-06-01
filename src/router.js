import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Categories from "./components/Categories.vue"
import Category from "./components/Category.vue"
import CategoryForm from "./components/CategoryForm.vue"
import Home from "./components/Home.vue"
import Note from "./components/Note.vue"
import NoteForm from "./components/NoteForm.vue"
import Notes from "./components/Notes.vue"
import User from "./components/User.vue"
import UserForm from "./components/UserForm.vue"
import Login from "./components/UserLogin.vue"

const routes = [
    { path: '/', name: 'root',component: Home,},

    { path: '/login', name: 'login', component:Login },
    { path: '/signup', name: 'signup', component: UserForm },

    { path: '/users/:id', name: 'user', component: User, props: true }, // Pass route.params to props
    { path: '/users/form/:id', name: 'user_edit', component: UserForm, props: true }, // Pass route.params to props


    
    { path: '/notes', name: 'notes', component: Notes },
    { path: '/notes/:id', name: 'note', component: Note, props: true }, // Pass route.params to props
    { path: '/notes/form', name: 'note_create', component: NoteForm },
    { path: '/notes/form/:id', name: 'note_edit', component: NoteForm, props: true }, // Pass route.params to props

    { path: '/categories', name: 'categories', component: Categories },
    { path: '/categories/:id', name: 'category', component: Category, props: true }, // Pass route.params to props
    { path: '/categories/form', name: 'category_create', component: CategoryForm },
    { path: '/categories/form/:id', name: 'category_edit', component: CategoryForm, props: true }, // Pass route.params to props

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router

