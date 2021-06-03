<template>
  <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>

  <form @submit="onSubmit">
    <div class="formContainer">
      <!-- ---------------------------content--------------------------------- -->
      <div class="form-floating">
        <input
          class="form-control"
          id="contentInput"
          name="content"
          v-model="content"
          :class="{
            'is-invalid': errors.content && errors.content.length > 0,
          }"
        />
        <label for="contentInput">content</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
        <div class="invalid-feedback">{{ errors.content }}</div>
      </div>
      <!-- -------------------------------------------------------------------- -->

      <!-- ---------------------------priority--------------------------------- -->
      <div class="form-floating">
        <select v-model="priority" id="priorityInput" name="priority">
          <option value="" selected>None</option>
          <option
            v-for="option in priorityOptions"
            :value="option.value"
            :key="option.value"
          >
            {{ option.viewValue }}
          </option>
        </select>
        <label for="priorityInput">priority</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
      </div>

      <!-- -------------------------------------------------------------------- -->

      <!-- ---------------------------categoryId--------------------------------- -->
      <div class="form-floating">
        <select v-model="categoryId" id="categoryIdInput" name="categoryId">
          <option value="">None</option>

          <option
            v-for="option in categoriesOptions"
            :value="option.value"
            :key="option.value"
          >
            {{ option.viewValue }}
          </option>
        </select>
        <label for="categoryIdInput">Category</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
      </div>
      <!-- -------------------------------------------------------------------- -->

      <button type="submit" :disabled="!meta.dirty || isSubmitting">
        Submit
      </button>
    </div>
  </form>

  {{ categoriesOptions }}
</template>

<script>
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { computed } from "vue";
import {
  EDIT_NOTE_ACT,
  CREATE_NOTE_ACT,
  GET_NOTE_ACT,
  GET_NOTE_GET,
  GET_ALL_CATEGORIES_ACT,
} from "../storeDef.js";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { ref } from "vue";

const FormMode = {
  EDIT: "Edit",
  CREATE: "Create",
};

export default {
  components: {
    ErrPresenter,
  },
  props: {
    id: {
      type: Number,
      required: false,
    },
  },

  setup(props) {
    let formMode = props.id ? FormMode.EDIT : FormMode.CREATE;

    const store = useStore();

    //--------------------------------------------------------------------------------------
    const priorityOptions = [
      // { value: null, viewValue: "None" },
      { value: 1, viewValue: "1" },
      { value: 2, viewValue: "2" },
      { value: 3, viewValue: "3" },
      { value: 4, viewValue: "4" },
      { value: 5, viewValue: "5" },
    ];

    const categoriesOptions = computed(() => {
      let catList = Object.values(store.state.categories);

      let catOpt = [];
      let temp = catList.map((elm) => {
        return { value: elm.id, viewValue: elm.type };
      });

      catOpt.push(...temp);
      return catOpt;
    });

    //--------------------------------------------------------------------------------------

    // Define a validation schema
    const myValidationSchema = {
      content(v) {
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
          return "Content is a required field!";
        }
        return true;
      },
    };

    let myInitialValues = {};

    let submittionAction = "";

    if (formMode == FormMode.EDIT) {
      // Edit mode
      myInitialValues = computed(() => {
        let temp = store.getters[GET_NOTE_GET](props.id);
        if (temp) {
          temp.categoryId = temp.categoryId ? temp.categoryId : "";
          temp.priority = temp.priority ? temp.priority : "";
        }
        return temp;
      });
      submittionAction = EDIT_NOTE_ACT;
    } else {
      // create mode
      submittionAction = CREATE_NOTE_ACT;
      myInitialValues = {
        priority: "",
        categoryId: "",
      };
    }

    console.log(myInitialValues);

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
      initialValues: myInitialValues,
    });
    const formattedError = ref({title: null, message: null});

    const onSubmit = handleSubmit(async (values) => {
      values.userId = store.state.current_user.id;
      if (formMode == FormMode.EDIT) values.id = props.id;
      if (
        typeof values.priority === "undefined" ||
        typeof values.priority === "string"
      )
        values.priority = null;

      if (
        typeof values.categoryId === "undefined" ||
        typeof values.categoryId === "string"
      )
        values.categoryId = null;

      try {
        await store.dispatch(submittionAction, values);
        formattedError.value = { title: null, message: null };
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    });

    // No need to define rules for fields
    const { value: content } = useField("content");
    const { value: priority } = useField("priority");
    const { value: categoryId } = useField("categoryId");

    return {
      priorityOptions,
      categoriesOptions,
      store,
      formMode,
      categoryId,
      priority,

      meta,
      errors,
      handleSubmit,
      isSubmitting,
      setFieldError,
      setErrors,
      onSubmit,
      content,
      formattedError,
    };
  },
  async created() {
    // bring all categories to populate the dropDownMenu "categoriesOptions"
    try {
      await this.store.dispatch(GET_ALL_CATEGORIES_ACT);
      this.formattedError = { title: null, message: null };
    } catch (err) {
      this.formattedError = errHandler(err);
      console.log(this.formattedError);
    } finally {
    }

    if (this.formMode == FormMode.EDIT)
      try {
        await this.store.dispatch(GET_NOTE_ACT, this.id);
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


    

    