<template>
  <div class="card">
    <h5 class="card-header">Category</h5>
    <div class="card-body">
      <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>

      <!-- <div v-else> -->
      <p class="card-text">Type: {{ type }}</p>

      <button type="button" class="btn btn-primary" @click.prevent="editCategory">
         Edit
      </button>
      <button
        type="button"
        class="btn btn-primary"
        @click.prevent="deleteCategory"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import {DELETE_CATEGORY_ACT} from "../storeDef.js"

export default {
    components:{
    ErrPresenter,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();


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

    const editCategory = () => {
      router.push({ name: "category_edit", params: { id: props.id } });
    };

    return {
      id: props.id,
      type: props.type,
      userId: props.userId,
      deleteCategory,
      editCategory,
      formattedError,
    };
  },
};
</script>


<style>
</style>