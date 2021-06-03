<template>
  <div>
    <label for="input-filter">Filter by content:</label>
    <input type="text" id="input-filter" v-model="filterTerm" />
  </div>


  <select v-model="sortByProperty" @change="sortFunction">
    <option
      v-for="option in sortOptions"
      :value="option.value"
      :key="option.value"
    >
      {{ option.viewValue }}
    </option>
  </select>

  <u>
    <li v-for="item in filtered_notes" :key="item.id">
      <p>id {{ item.id }}</p>
      <p>userId {{ item.userId }}</p>
      <p>priority{{ item.priority }}</p>
      <p>categoryId {{ item.categoryId }}</p>
      <p>content {{ item.content }}</p>
      <p>createdOn {{ item.createdOn }}</p>
    </li>
  </u>
</template>



<script >
import data from "../mock-data";
import { reactive, ref, computed } from "vue";

export default {
  setup() {
    const filterTerm = ref("");

    const notes = reactive([]);
    const fetchDataFromApi = () => {
      // should empty the list first!!!!
      notes.push(...data.Notes);
    };

    const filtered_notes = computed(() => {
      let temp = notes;
      // Process search input
      if (filterTerm.value != "" && filterTerm.value) {
        temp = temp.filter((note) =>
          note.content.toLowerCase().includes(filterTerm.value.toLowerCase())
        );
        console.log(temp);
      }

      return temp;
    });

    const sortOptions = [
      { value: "id", viewValue: "None nnkj" },
      { value: "userId", viewValue: "User" },
      { value: "priority", viewValue: "Priority" },
      { value: "categoryId", viewValue: "Category" },
      { value: "content", viewValue: "Content" },
      { value: "createdOn", viewValue: "Creation date" },
    ];
    const sortByProperty = ref(sortOptions[0].value);

    const sortFunction = () => {
      const compareFn = (a, b) => {
        let property = sortByProperty.value;

        var v1 =
          typeof a[property] == "string"
            ? a[property].toLowerCase()
            : a[property];
        var v2 =
          typeof b[property] == "string"
            ? b[property].toLowerCase()
            : b[property];
        if (!v2 || v1 < v2) {
          // !v2 condition will sort the list in such way where null values are at the back
          return -1;
        }
        if (v1 > v2) {
          return 1;
        }
        return 0;
      };
      // const numSortFunction = (a, b) => a[sortByProperty] - b[sortByProperty];
      notes.sort(compareFn);
    };

    return {
      fetchDataFromApi,
      notes,
      filterTerm,
      filtered_notes,
      sortOptions,
      sortByProperty,
      sortFunction,
    };
  },
  created() {
    this.fetchDataFromApi();
  },
};

// {
// USER_ID: { value: "userId", viewValue: "User" },
// PRIORITY: { value: "priority", viewValue: "Priority" },
// CATEGORY_ID: { value: "categoryId", viewValue: "Category" },
// CONTENT: { value: "content", viewValue: "Content" },
// CREATED_ON: { value: "createdOn", viewValue: "Creation date" },
// ID: { value: "id", viewValue: "None" },
// };
</script>

<style scoped>

</style>
