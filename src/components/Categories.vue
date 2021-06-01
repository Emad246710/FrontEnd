<template>
    <!-- <input type="text" placeholder="Filter Search" v-model="query" />
    <button @click="reset">Reset</button> -->

    <p>Showing {{ categories.length }} results for "{{ query }}"</p>
    <ul>

      <li v-for="(item , index) in categories" :key="item.id">
        id: {{ index +1 }}
        <br />

        {{ item.type }}
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
    const categories = computed(() => store.state.categories);

    console.log(categories);

    const query = ref("");

    const reset = (evt) => {
      query.value = ""; // clears the query
    };

    // const filteredItems = computed(() => {
    //   return categories.filter((item) => {
    //     return item.type.toLowerCase().includes(query.toLowerCase());
    //   });
    // });

    return {
      store,
      categories,
      // filteredItems,
      query,
      reset
    };
  },
  created() {
    this.store.dispatch("getAllCategories");
  },
};
</script>


<style>
</style>