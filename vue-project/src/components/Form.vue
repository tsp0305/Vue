<template>
  <div class="container">
    <div class="content-wrapper">
      <form @submit.prevent class="form-box">
        <h2>Student Registration</h2>

        <label for="name"> Name:</label>
        <input type="text" id="name" v-model="form.name" />

        <label for="id">Student ID:</label>
        <input type="number" id="id" v-model="form.id" @input="blockNegative" />

        <label for="dob">Student DOB:</label>
        <input type="date" id="dob" v-model="form.dob" />

        <label for="mail">Student Email:</label>
        <input type="email" id="mail" v-model="form.mail" />

        <div class="btn-group">
          <button @click="addList">Add Student</button>
          <button @click="reset" type="button">Reset</button>
        </div>
      </form>

      <!-- Pass full student list to show-list -->
      <show-list :students="Studentlist.list" @delete-student="deleteStudent" />
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
import showList from './showList.vue';

export default {
  components: {
    showList
  },
  setup() {
    const Studentlist = reactive({ list: [] });

    const form = reactive({
      name: '',
      id: '',
      dob: '',
      mail: ''
    });

    function blockNegative(event) {
      const value = parseInt(event.target.value);
      if (value < 0) {
        alert('Negative value not allowed!');
        form.id = '';
      }
    }

    function addList() {
      const { name, id, dob, mail } = form;
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (name && id && dob && mail) {
        Studentlist.list.push({ name, id, dob, mail });
        reset();
      }
      else if (!emailPattern.test(mail)) {
        alert("Invalid email address!")
      }
      else {
        alert('All fields are required!');
      }
    }

    function deleteStudent(index) {
      Studentlist.list.splice(index, 1);
    }

    function reset() {
      form.name = '';
      form.id = '';
      form.dob = '';
      form.mail = '';
    }

    return {
      Studentlist,
      form,
      reset,
      addList,
      deleteStudent,
      blockNegative
    };
  }
};
</script>

<style scoped>
.container {
  border-color: aqua;
  background-color: #1e1e1e;
  color: #f0f0f0;
  min-height: 100vh;
  padding: 2rem;
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
  border-color: rgb(23, 223, 156);
  max-width: 450px;
  width: 100%;
  box-shadow: 0 0 10px hsla(157, 98%, 48%, 0.87);
}

.form-box h2 {
  text-align: center;
  margin-bottom: 1rem;
  border-color: aqua;
}

label {
  display: block;
  margin: 0.5rem 0 0.25rem;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #444;
  color: white;
}

input:focus {
  outline: 2px solid hsla(157, 98%, 48%, 0.87);
}

.btn-group {
  display: flex;
  justify-content: space-between;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  background-color: hsla(157, 98%, 48%, 0.87);
  color: white;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;

}

button:hover {
  background-color: hsla(157, 98%, 48%, 0.87);
}

.table-container {
  flex: 1;
  min-width: 300px;
  overflow-x: auto;
}

table {
  width: 90%;
  border-collapse: collapse;
  background-color: #2c2c2c;
  box-shadow: 0 0 10px hsla(157, 98%, 48%, 0.87);

}

th,
td {
  padding: 0.50rem;
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
