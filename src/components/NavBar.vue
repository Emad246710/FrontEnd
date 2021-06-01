<template>
  <div >
    <router-link :to="{ name: 'root' }">Home</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'notes' }">Notes</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'note' , params: {id:1} }">note</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'login' }">login</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'signup' }">signup</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'user' , params: {id:1} }">user</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'categories' }">categories</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'category' , params: {id:1} }">category</router-link>
    <br />
    <br />
    <router-link :to="{ name: 'note_create' }">note_create</router-link>
    <br />
    <br />
    <!-- <router-link :to="{ name: 'user_edit' }">user_edit</router-link> -->
    <br />
    <br />
    <!-- <router-link :to="{ name: 'note_edit' }">note_edit</router-link> -->
    <br />
    <br />
    <!-- <router-link :to="{ name: 'category_edit' }">category_edit</router-link> -->
    <br />
    <br />
    <router-link :to="{ name: 'category_create' }">category_create</router-link>
  </div>
</template>

<style scoped>
div {
  grid-area: nav;
  border: 5px solid;
  margin-right: 0.75rem;
  padding: 0.3rem;
  background-color: beige;
}
</style>