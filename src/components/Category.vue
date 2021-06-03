<template>
  <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>
  <div v-else-if="category">
    <p>ID: {{ category.id }}</p>
    <p>Type: {{ category.type }}</p>
    <button type="submit" @click.prevent="deleteCategory">Delete</button>
  </div>
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";
import {
  GET_CATEGORY_GET,
  GET_CATEGORY_ACT,
  DELETE_CATEGORY_ACT,
} from "../storeDef.js";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { ref } from "vue";

export default {
  components: {
    ErrPresenter,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const category = computed(() => store.getters[GET_CATEGORY_GET](props.id));
     const formattedError = ref({title: null, message: null})

    const deleteCategory = async () => {
      try {
        await store.dispatch(DELETE_CATEGORY_ACT, props.id);
        formattedError.value = { title: null, message: null };
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    };

    return {
      store,
      category,
      deleteCategory,
      formattedError,
    };
  },
  async created() {
    try {
      await this.store.dispatch(GET_CATEGORY_ACT, this.$props.id);
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

