<template>

<div class="us">
<h2>qqqqqqqqq</h2>
  <NavBar/>
  <router-view />
</div>

</template>

<script>
import { defineProps, reactive } from "vue";
import NavBar from "./NavBar.vue";

export default {
components:{
  NavBar,
}
}


</script>

<style scoped>
.us {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "header header"
    "nav content"
    "nav helper";
  background-color: burlywood;
}

h2 {
  grid-area: header;
}
.us__content {
  grid-area: content;
}
.us__content--helper {
  grid-area: helper;
}
</style>
