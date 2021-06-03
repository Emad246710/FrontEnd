<template>
  <div v-if="formattedError.title && formattedError.message">
    <err-presenter
      :title="formattedError.title"
      :message="formattedError.message"
    />
  </div>
  <div v-else-if="notes">
    <!-- <input type="text" placeholder="Filter Search" v-model="query" />
    <button @click="reset">Reset</button> -->
    <p>Notes</p>

    <div v-for="item in notes" :key="item.id">
      <note-card v-bind="item" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { GET_ALL_NOTES_ACT } from "../storeDef";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import NoteCard from "./NoteCard.vue";
import { ref } from "vue";

export default {
  components: {
    ErrPresenter,
    NoteCard,
  },
  setup() {
    const store = useStore();
    const formattedError = ref({ title: null, message: null });

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
      reset,
      formattedError,
    };
  },

  async created() {
    try {
      await this.store.dispatch(GET_ALL_NOTES_ACT);
      this.formattedError = { title: null, message: null };
    } catch (err) {
      this.formattedError = errHandler(err);
    } finally {
    }
  },
};
</script>

<style>
</style>

