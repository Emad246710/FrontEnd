<template>
  <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>
  <!-- <input type="text" placeholder="Filter Search" v-model="query" />
    <button @click="reset">Reset</button> -->


  <div v-else-if="categories">
    <p>Showing {{ categories.length }} results for "{{ query }}"</p>
      <div v-for="item in categories" :key="item.id">
        <category-card  v-bind="item"/>
      </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { GET_ALL_CATEGORIES_ACT } from "../storeDef";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { ref } from "vue";
import CategoryCard from './CategoryCard.vue';

export default {
  components: {
    ErrPresenter,
    CategoryCard,
  },
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
     const formattedError = ref({title: null, message: null})


    return {
      store,
      categories,
      // filteredItems,
      query,
      reset,
      formattedError,

    };
  },
  async created() {
    try {
      await this.store.dispatch(GET_ALL_CATEGORIES_ACT);
      this.formattedError = { title: null, message: null };
    } catch (err) {
      this.formattedError = errHandler(err);
      console.log(this.formattedError);
    } finally {
    }
  },
};
</script>


<style>
</style>

