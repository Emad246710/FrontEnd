<template>
  <header
    class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow"
  >
    <a class="navbar-brand col-md-3 col-lg-2 me-0 px-3" href="#">NoteBook</a>
    <button
      class="navbar-toggler position-absolute d-md-none collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#sidebarMenu"
      aria-controls="sidebarMenu"
      aria-expanded="false"
      aria-label="Toggle navigation"
    ></button>
    <div class="w-100"></div>
    <!--  -->

    <div class="navbar-nav px-3" v-if="is_loggedIn" @click="logout">
      <button type="button" class="btn btn-dark nav-link text-nowrap">
        Sign out
      </button>
    </div>
  </header>

  <div class="container-fluid bg-primary">
    <div class="row">
      <nav-bar v-if="is_loggedIn" />

      <main  :class="{'col-md-9': is_loggedIn, 'col-lg-10': is_loggedIn,}" class=" ms-sm-auto  px-md-4" >
        <div
          class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
        >
          <h1 class="h2"></h1>
        </div>
        <div class="container-md bg-secondary">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import NavBar from "./NavBar.vue";
import { IS_LOGGED_IN, LOGOUT_ACT } from "../storeDef.js";
import { useRoute, useRouter } from "vue-router";

import { Collapse } from "bootstrap";

export default {
  components: {
    NavBar,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const is_loggedIn = computed(() => {
      let temp = store.getters[IS_LOGGED_IN];
      return temp;
    });

    const logout = () => {
      store.dispatch(LOGOUT_ACT);
      router.push({ name: "login" });


    //       try {
    //   await this.store.dispatch(GET_ALL_CATEGORIES_ACT);
    //   this.formattedError = { title: null, message: null };
    // } catch (err) {
    //   this.formattedError = errHandler(err);
    //   console.log(this.formattedError);
    // } finally {
    // }

    };

    return {
      is_loggedIn,
      logout,
    };
  },
};
</script>

<style scoped>
body {
  font-size: 0.875rem;
}

.feather {
  width: 16px;
  height: 16px;
  vertical-align: text-bottom;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #727272;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
  top: 0.25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: 0.75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>
