<template>
  <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>

  <div v-else-if="user">
    <p>IDfsdff: {{ user.id }}</p>
    <p>Username: {{ user.username }}</p>
    <button class="btn btn-secondary" type="submit" @click.prevent="deleteUser">Delete</button>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { DELETE_USER_ACT } from "../storeDef";
import { ref } from "vue";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";

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
    const formattedError = ref({title: null, message: null});
    const user = computed(() => store.state.current_user);
    const deleteUser = async () => {
      try {
        await store.dispatch(DELETE_USER_ACT, props.id);
        formattedError.value = { title: null, message: null };
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    };
    return {
      store,
      user,
      deleteUser,
      formattedError,
    };
  },
  created() {},
};
</script>

<style>
</style>