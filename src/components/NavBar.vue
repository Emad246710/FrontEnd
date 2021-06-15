<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
    ref="sidebarMenuRef"
  >
    <!-- 
      <button
        data-bs-toggle="collapse"
        data-bs-target="#sidebarMenu"
        aria-controls="sidebarMenu"
        aria-expanded="false"
      >
        Hide the bar   
      </button> 
      <a
        href="#sidebarMenu"
        data-bs-toggle="collapse"
        aria-expanded="false"
        aria-controls="sidebarMenu" 
      >
        Hide the bar   
      </a>

    -->
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item" @click="hideSidebarWhenScreenLTmd">
          <router-link :to="{ name: 'notes' }" v-slot="{ navigate, isActive }">
            <a
              class="nav-link"
              :class="{
                'bg-primary text-light': isActive,
              }"
              @click="navigate"
              href="whatEver!"
              >Notes</a
            >
          </router-link>
        </li>

        <li class="nav-item" @click="hideSidebarWhenScreenLTmd">
          <router-link :to="{ name: 'categories' }" v-slot="{ isActive }">
            <span
              class="nav-link"
              :class="{
                'bg-primary text-light': isActive,
              }"
              >Categories</span
            >
          </router-link>
        </li>
        <li class="nav-item" @click="hideSidebarWhenScreenLTmd">
          <router-link :to="{ name: 'note_create' }" v-slot="{ isActive }">
            <span
              class="nav-link"
              :class="{
                'bg-primary text-light': isActive,
              }"
              >note_create</span
            >
          </router-link>
        </li>
        <li class="nav-item" @click="hideSidebarWhenScreenLTmd">
          <router-link :to="{ name: 'category_create' }" v-slot="{ isActive }">
            <span
              class="nav-link"
              :class="{
                'bg-primary text-light': isActive,
              }"
              >category_create</span
            >
          </router-link>
        </li>
        <li class="nav-item" @click="hideSidebarWhenScreenLTmd">
          <router-link :to="{ name: 'user' }" v-slot="{ isActive }">
            <span
              class="nav-link"
              :class="{
                'bg-primary text-light': isActive,
              }"
              >User</span
            >
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
// import { Collapse } from "bootstrap";
import { ref, onMounted } from "vue";

export default {
  setup(props, context) {
    // https://v3.vuejs.org/guide/composition-api-template-refs.html
    // https://markus.oberlehner.net/blog/refs-and-the-vue-3-composition-api/
    // start value is null becuase "setup" function is excuted before the rendering of the dom
    const sidebarMenuRef = ref(null);

    const hideSidebarWhenScreenLTmd = () => {
      // Since the cssClass "show" will be set ONLY when ( (the viewPort < md) && (the sidebar is visible) )
      // We can hide the sidebar (which fills the screen), when the user clicks on a link by removing cssClass "show"
      // This means this function will have no effect when the sidebar does not fill the screen, by other
      // words: when the viewPort larger than md
      console.log(sidebarMenuRef.value.classList);
      // https://developer.mozilla.org/fr/docs/Web/API/Element/classList
      sidebarMenuRef.value.classList.remove("show");
      console.log(sidebarMenuRef.value.classList);
    };

    onMounted(() => {
      console.log(sidebarMenuRef.value.classList);
    });

    return { sidebarMenuRef, hideSidebarWhenScreenLTmd };
  },
};
</script>

<style>
</style>