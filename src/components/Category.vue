<template>
  <div v-if="category">
    <p>ID: {{category.id}}</p>
    <p>Type: {{category.type}}</p>
  </div>
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { GET_CATEGORY_GET , GET_CATEGORY_ACT } from "../storeDef.js";

export default {
  props: {
    id: Number,
    
  },
  setup(props) {
    const store = useStore();
    const category =  computed(() => (store.getters[GET_CATEGORY_GET](props.id )));

    return {
      store,
      category
    };
  },
  created() {
    this.store.dispatch(GET_CATEGORY_ACT, this.$props.id);
  },
};
</script>

<style>
</style>