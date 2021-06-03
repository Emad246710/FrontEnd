<template>
  <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>
  <div v-else-if="note">
    <p>ID: {{ note.id }}</p>
    <p>Content: {{ note.content }}</p>
    <p>CreatedOn: {{ note.createdOn }}</p>
    <p>Priority: {{ note.priority }}</p>
    <p>UserId: {{ note.userId }}</p>
    <p>CategoryId: {{ note.categoryId }}</p>
    <button type="submit" @click.prevent="deleteNote">Delete</button>
  </div>
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { GET_NOTE_GET, GET_NOTE_ACT, DELETE_NOTE_ACT } from "../storeDef.js";
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
     const formattedError = ref({title: null, message: null})

    const note = computed(() => store.getters[GET_NOTE_GET](props.id));
    const deleteNote = async () => {
      try {
        await store.dispatch(DELETE_NOTE_ACT, props.id);
        formattedError.value = { title: null, message: null };
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    };

    return {
      store,
      note,
      deleteNote,
      formattedError,
    };
  },
  async created() {
    try {
      await this.store.dispatch(GET_NOTE_ACT, this.$props.id);
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



    