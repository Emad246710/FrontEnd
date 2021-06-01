<template>
  <div v-if="note">
    <p>ID: {{ note.id }}</p>
    <p>Content: {{ note.content }}</p>
    <p>CreatedOn: {{ note.createdOn }}</p>
    <p>Priority: {{ note.priority }}</p>
    <p>UserId: {{ note.userid }}</p>
    <p>CategoryId: {{ note.categoryId }}</p>
  </div>
</template>


<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { GET_NOTE_GET, GET_NOTE_ACT} from "../storeDef.js";

export default {
  props: {
    id: Number,
  },
  setup(props) {
    const store = useStore();
    const note = computed(() => (store.getters[GET_NOTE_GET](props.id) ));

    return {
      store,
      note
    };
  },
  created() {
    this.store.dispatch(GET_NOTE_ACT, this.$props.id);
  },
};
</script>

<style>
</style>