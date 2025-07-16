<template>
  <div class="container">
    <div class="content-wrapper">
      <form @submit.prevent="submitForm" class="form-box">
        <h2>Book List</h2>

        <label for="title">Book Title:</label>
        <input type="text" id="title" v-model="form.title" />
        <span class="error" v-if="errors.title">{{ errors.title }}</span>

        <label for="author">Author:</label>
        <input type="text" id="author" v-model="form.author" />
        <span class="error" v-if="errors.author">{{ errors.author }}</span>

        <label for="copiesTotal">Total Copies:</label>
        <input type="number" id="copiesTotal" v-model.number="form.copiesTotal" />
        <span class="error" v-if="errors.copiesTotal">{{ errors.copiesTotal }}</span>

        <label for="copiesAvailable">Available Copies:</label>
        <input type="number" id="copiesAvailable" v-model.number="form.copiesAvailable" />
        <span class="error" v-if="errors.copiesAvailable">{{ errors.copiesAvailable }}</span>

        <div class="btn-group">
          <button type="submit">
            {{ isEditing ? 'Update Book' : 'Add Book' }}
          </button>
          <button @click="reset" type="button">Reset</button>
        </div>
      </form>

      <show-list v-if="Array.isArray(store.list)" :table="{
        header: store.list.length
          ? Object.keys(store.list[0])
          : ['Title', 'Author', 'Total copies', 'Available copies'],
        list: store.list,
      }" @delete-item="deleteBook" @edit-item="editBook" />
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import showList from '../components/showList.vue'
import { useBookStore } from '@/stores/bookStore'

export default {
  components: { showList },
  setup() {
    const store = useBookStore()

    onMounted(() => {
      store.fetchBook()
    })

    const form = reactive({
      title: '',
      author: '',
      copiesTotal: 0,
      copiesAvailable: 0,
    })

    const errors = reactive({
      title: '',
      author: '',
      copiesTotal: '',
      copiesAvailable: '',
    })

    const isEditing = ref(false)
    const editIndex = ref(-1)

    function validateForm() {
      let valid = true

      errors.title = ''
      errors.author = ''
      errors.copiesTotal = ''
      errors.copiesAvailable = ''

      if (!form.title.trim()) {
        errors.title = 'Book title is required.'
        valid = false
      }

      if (!form.author.trim()) {
        errors.author = 'Author is required.'
        valid = false
      }

      if (form.copiesTotal === null || form.copiesTotal === '' || form.copiesTotal < 0) {
        errors.copiesTotal = 'Total copies must be 0 or more.'
        valid = false
      }

      if (form.copiesAvailable === null || form.copiesAvailable === '' || form.copiesAvailable < 0) {
        errors.copiesAvailable = 'Available copies must be 0 or more.'
        valid = false
      } else if (form.copiesAvailable > form.copiesTotal) {
        errors.copiesAvailable = 'Available copies cannot exceed total copies.'
        valid = false
      }

      return valid
    }

    function submitForm() {
      if (!validateForm()) return

      const payload = {
        title: form.title,
        author: form.author,
        copies_total: form.copiesTotal,
        copies_available: form.copiesAvailable,
      }

      if (isEditing.value) {
        store.updateBook({ ...payload, bid: editIndex.value })
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

    function editBook(i) {
      form.title = i.title
      form.author = i.author
      form.copiesTotal = i.copies_total
      form.copiesAvailable = i.copies_available
      editIndex.value = i.id
      isEditing.value = true
    }

    function reset() {
      form.title = ''
      form.author = ''
      form.copiesTotal = 0
      form.copiesAvailable = 0
      isEditing.value = false
      editIndex.value = -1

      Object.keys(errors).forEach((key) => (errors[key] = ''))
    }

    return {
      store,
      form,
      errors,
      isEditing,
      submitForm,
      deleteBook,
      editBook,
      reset,
    }
  },
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

.content-wrapper {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
}

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

label {
  display: block;
  margin: 0.5rem 0 0.25rem;
  font-weight: bold;
}

input,
select {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
}

input:focus,
select:focus {
  outline: 2px solid #3498db;
}

.btn-group {
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
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

.error {
  color: #e74c3c;
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  display: block;
}

.table-container {
  flex: 1;
  min-width: 300px;
  overflow-x: auto;
}

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
