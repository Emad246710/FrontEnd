<template>
  <form @submit="onSubmit">
    <div class="formContainer">
      <!-- ---------------------------username--------------------------------- -->
      <div class="form-floating">
        <input
          class="form-control"
          id="usernameInput"
          name="username"
          v-model="username"
          :class="{
            'is-invalid': errors.username && errors.username.length > 0,
          }"
        />
        <label for="usernameInput">Username</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <!-- -------------------------------------------------------------------- -->

      <!-- ---------------------------password--------------------------------- -->
      <div class="form-floating">
        <input
          class="form-control"
          id="passwordInput"
          name="password"
          v-model="password"
          :class="{
            'is-invalid': errors.password && errors.password.length > 0,
          }"
          type="password"
        />
        <label for="passwordInput">Password</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <!-- -------------------------------------------------------------------- -->

      <button type="submit" :disabled="!meta.dirty || isSubmitting">
        Submit
      </button>
      <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { LOGIN_ACT } from "../storeDef.js";

import { useForm, useField, defineRule } from "vee-validate";

import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";

import { ref } from "vue";

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }

  return "Passwords must match";
});

export default {
  components: {
    ErrPresenter,
  },

  props: {
    id: Number,
  },

  setup(props) {
    const store = useStore();

    // Define a validation schema
    const myValidationSchema = {
      username(v) {
        // NOTE: isSubmitting.value
        // To validate only after submittion, we can check the isSubmitting.value
        /**
         * Submission Behavior
         *    Before validation stage
         *      isSubmitting:true
         *      touched: true
         *    Validation stage
         *      pending:true
         *      Runs the validation function/schema/rule
         *        If there are errors then it will skip the next stage and update the validation state (meta, errors) for the form and fields
         *    After validation stage
         *      Calls the handleSubmit
         *      isSubmitting:false
         */
        if (!isSubmitting.value) return true;

        if (!v) {
          // if not valid: return false or null or a costume errMsg
          // return false;
          return "Username is a requied field!";
        }
        return true;
      },
      password(v) {
        // validate ONLY after submittion
        if (!isSubmitting.value) return true;

        if (!v) return "Password is a required field!";

        let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let valid = pattern.test(String(v));

        if (valid) {
          return true;
        } else {
          return "Invalid format. (The password must have minimum eight characters, at least one letter and one number)!";
          // return false;
        }
      },
    };

    // Create a form context with the validation schema
    const {
      meta, // this will hold the form validity state
      errors, // the errMsgs that are returned from the functions inside "validationSchema"
      handleSubmit,
      isSubmitting, // to be used inside validatingfuncs inside "validationSchema", inorder to validate ONLY after submittion
      setFieldError,
      setErrors, // can be used to set err manually, for ex. unique email validation inside  "handleSubmit"
    } = useForm({
      validationSchema: myValidationSchema,
    });
    const formattedError = ref({ title: null, message: null });

    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch(LOGIN_ACT, values);

        formattedError.value = { title: null, message: null };
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    });

    // No need to define rules for fields
    const { value: username } = useField("username");
    const { value: password } = useField("password");

    return {
      store,
      meta,
      errors,
      handleSubmit,
      isSubmitting,
      setFieldError,
      setErrors,
      onSubmit,
      username,
      password,
      formattedError,
    };
  },
};
</script>

<style>
</style>