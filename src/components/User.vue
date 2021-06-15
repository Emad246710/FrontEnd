<template>
  <div v-if="user">
    <p>UserId: {{ user.id }}</p>
    <p>Username: {{ user.username }}</p>

    <div class="d-md-flex flex-md-row justify-content-md-end">
      <button class="btn btn-secondary" type="button" @click.prevent="editUserDetails">
        Edit
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Remove my account
      </button>
    </div>
  </div>
  <remove-confirmation />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import {  useRouter } from "vue-router";

import ErrPresenter from "./ErrPresenter.vue";

import RemoveConfirmation from "./RemoveConfirmation.vue";

export default {
  components: {
    ErrPresenter,
    RemoveConfirmation,
  },

  setup() {
    const store = useStore();
    const user = computed(() => store.state.current_user);
    const router = useRouter();

    const editUserDetails = () => {
      router.push({ name: "user_edit" });
    };

    return {
      store,
      user,
      editUserDetails
    };
  },
  created() {},
};
</script>

<style>
</style>