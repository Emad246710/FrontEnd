<template>
  <p>IDfsdff: {{user.id}}</p>
  <p>Username: {{user.username}}</p>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { ref } from "vue";

export default {
  props:{
    id:String
  },
  setup() {
    const store = useStore();
    const user = computed(() => store.state.user);
  return{
    store,
    user
  }
  }
,
created() {
    // this.store.dispatch("getCategory" , this.$props.id);
  },
}
</script>

<style>

</style>