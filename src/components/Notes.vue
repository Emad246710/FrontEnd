<template>
  <div v-if="formattedError.title && formattedError.message">
    <err-presenter
      :title="formattedError.title"
      :message="formattedError.message"
    />
  </div>
  <div v-else-if="filteredNotes">
  <div>
    <label for="input-filter">Filter by username:</label>
    <input type="text" id="input-filter" v-model="query" />
  </div>
  <button @click="reset">Reset</button>

  <p>Notes</p>

  <p>Showing {{ filteredNotes.length }} results for "{{ query }}"</p>
  <div v-for="item in filteredNotes" :key="item.id">
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
import { ref, unref } from "vue";


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

    const filteredNotes = computed(() => {
      const unwrapped = JSON.parse(JSON.stringify(notes.value));
      let tempNotes = unwrapped;
      console.log(tempNotes)
      if (query.value != "" && query.value) {
        tempNotes = tempNotes.filter((note) =>
          note.content.toLowerCase().includes(query.value.toLowerCase())
        );
      }
      console.log(tempNotes)

      return tempNotes;
    });


    return {
      store,
      //notes,
      filteredNotes,
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

