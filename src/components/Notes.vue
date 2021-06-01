<template>
<!-- <input type="text" placeholder="Filter Search" v-model="query" />
    <button @click="reset">Reset</button> -->
  <p>Notes</p>
  <ul>
    <li v-for="(x, index) in notes" :key="x.id">
        id: {{ index +1 }}
        <br />

        {{ x.content }}
    </li>
  </ul>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  setup() {
    const store = useStore();
    const notes = computed(() => store.state.notes);
    console.log(notes);

    const query = ref("");

    const reset = (evt) => {
      query.value = ""; // clears the query
      };
       // const filteredItems = computed(() => {
    //   return categories.filter((item) => {
    //     return item.content.toLowerCase().includes(query.toLowerCase());
    //   });
    // });


    return {
      store,
      notes,
      //filteredItems,
      query,
      reset
    };

  },
   
  created() {
    this.store.dispatch("getAllNotes");
  },
};
</script>

<style>
</style>