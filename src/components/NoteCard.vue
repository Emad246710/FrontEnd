<template>
  <div class="card">
    <h5 class="card-header">Note</h5>
    <div class="card-body">
      <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>

      <div v-else>
        <p class="card-text">Content: {{ content }}</p>
        <p class="card-text">CreatedOn: {{ createdOn }}</p>
        <p class="card-text">Priority: {{ priority }}</p>
        <p class="card-text">Category: {{ category }}</p>

        <button
          class="btn btn-secondary"
          type="button"
          @click.prevent="editNote"
        >
          Edit
        </button>
        <button
          type="button"
          class="btn btn-primary"
          @click.prevent="deleteNote"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { ref , watch} from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { DELETE_NOTE_ACT } from "../storeDef.js";

export default {
  components: {
    ErrPresenter,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Number,
      required: false,
    },
    category: {
      type: Object,
      required: false,
    },
    priority: {
      type: Number,
      required: false,
    },
    createdOn: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();

    const formattedError = ref({ title: null, message: null });

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

    const editNote = () => {
      router.push({ name: "note_edit", params: { id: props.id } });
    };

    const id = ref(props.id);
    const content = ref(props.content);
    const userId = ref(props.userId);
    const createdOn = ref(props.createdOn);
    const priority = ref(props.priority);
    let temp = props.category ? props.category.type : null;
    const category = ref(temp);

    watch(props, (currentValue, oldValue) => {
      id.value = currentValue.id;
      content.value = currentValue.content;
      userId.value = currentValue.userId;
      createdOn.value = currentValue.createdOn;
      priority.value = currentValue.priority;
      category.value = currentValue.category ? currentValue.category.type : null;
    });

    return {
      id,
      content,
      userId,
      createdOn,
      priority,
      category,
      deleteNote,
      editNote,
      formattedError,
    };
  },
};
</script>


<style>
</style>