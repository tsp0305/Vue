<template>
  <div class="container">
    <div class="content-wrapper">


      <form @submit.prevent class="form-box">
        <h2>Book list</h2>

        <label for="title">Book Title:</label>
        <input type="text" id="title" v-model="form.Title" />

        <label for="author">Author:</label>
        <input type="text" id="author" v-model="form.Author" />

        <label for="status">Status:</label>
        <select id="status" v-model="form.Status">
          <option disabled="">Select Status</option>
          <option value="Read">Read</option>
          <option value="Unread">Unread</option>
          <option value="reading">reading</option>
        </select>

        <div class="btn-group">
          <button @click="submitForm">{{ isEditing ? 'Update Book' : 'Add Book' }}</button>
          <button @click="reset" type="button">Reset</button>
        </div>
      </form>

      <show-list
        :table="{ header: store.list.length ? Object.keys(store.list[0]) : ['Title', 'Author', 'Status'], list: store.list }"
        @delete-item="deleteBook" @edit-item="editBook" @sortList="" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import showList from './showList.vue'
import { useBookStore } from '@/stores/bookStore'


export default {


  components: { showList },
  setup() {

    onMounted(() => {
      store.fetchBook()
    })

    const store = useBookStore()

    const form = reactive({
      Title: '',
      Author: '',
      Status: ''
    })

    const isEditing = ref(false)
    const editIndex = ref(-1)


    function submitForm() {
      const payload = {
        bookname: form.Title,
        author: form.Author,
        status: form.Status.toLowerCase()
      }

      if (isEditing.value) {
        store.updateBook(editIndex.value, payload)
      } else {
        store.addBook(payload)
      }

      reset()
    }

    function deleteBook(index) {
      store.deleteBook(index)
      if (isEditing.value && editIndex.value === index) {
        reset()
      }
    }

    function editBook({ index, i }) {
      form.title = i.bookname
      form.Author = i.author
      form.Status = i.status.charAt(0).toUpperCase() + i.status.slice(1)
      editIndex.value = i.bid // your table returns full object
      isEditing.value = true
      Object.assign(form, i)

    }

    function reset() {
      form.Title = ''
      form.Author = ''
      form.Status = ''
      isEditing.value = false
      editIndex.value = -1
    }

    return {
      store,
      form,
      isEditing,
      editIndex,
      reset,
      submitForm,
      deleteBook,
      editBook,
    }
  }
}
</script>


<style scoped>
.container {
  background-color: #1e1e1e;
  color: #f0f0f0;
  min-height: 100vh;
  padding: 1rem;
  font-family: 'Segoe UI', sans-serif;
}

/* Flex layout */
.content-wrapper {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

/* Form styling */
.form-box {
  background-color: #2c2c2c;
  padding: 1.5rem;
  border-radius: 10px;
  border: 2px solid #3498db;
  max-width: 450px;
  width: 100%;
}

.form-box h2 {
  text-align: center;
  margin-bottom: 1rem;
}

/* Input fields */
label {
  display: block;
  margin: 0.5rem 0 0.25rem;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
}

input:focus,
select:focus {
  outline: 2px solid #3498db;
}

/* Buttons */
.btn-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: #3498db;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

button:hover {
  background-color: #2980b9;
}

/* Table container */
.table-container {
  flex: 1;
  min-width: 300px;
  overflow-x: auto;
}

/* Table styling */
table {
  width: 100%;
  border-collapse: collapse;
  background-color: #2c2c2c;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.7);
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #444;
}

th {
  background-color: #3a3a3a;
}

tr:hover {
  background-color: #383838;
}
</style>