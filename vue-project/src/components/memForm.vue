<template>
    <div class="container">
        <div class="content-wrapper">
            <form @submit.prevent class="form-box">
                <h2>Member list</h2>

                <label for="name">Name:</label>
                <input type="text" id="name" minlength="100" v-model="form.Name" />

                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.Email" />

                <label for="phone">Phone:</label>
                <input type="tel" pattern="^[0-9]{10}$" maxlength="10" id="phone" required v-model="form.Phone" />

                <label for="role">Role:</label>
                <select id="role" v-model="form.Role">
                    <option disabled value="">Select role</option>
                    <option value="Student">Student</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                </select>

                <div class="btn-group">
                    <button @click="addMem"> {{ isEditing ? 'Edit Member' : 'Add Member' }}</button>
                    <button @click="reset" type="button">Reset</button>
                </div>
            </form>
            <show-list
                :table="{ header: store.list.length ? Object.keys(store.list[0]) : ['Name', 'Email', 'Phone', 'Role'], list: store.list }"
                @delete-item="deleteMem" @edit-item="editMem" />


        </div>
    </div>
</template>

<script>
import { reactive, ref } from 'vue'
import showList from './showList.vue'
import { useMemStore } from '@/stores/memStore'
export default {

    components: { showList },
    setup() {
        const store = useMemStore()
        const form = reactive({
            Name: '',
            Email: '',
            Phone: '',
            Role: ''
        })

        const isEditing = ref(false)
        const editIndex = ref(-1)

        function addMem() {
            const { Name, Email, Phone, Role } = form

            if (!Name || !Email || !Phone || !Role) {
                alert('All fields are required!')
                return
            }

            if (isEditing.value) {
                store.updateMem(editIndex.value, { Name, Email, Phone, Role })
                isEditing.value = false
                editIndex.value = -1
            } else {
                store.addMem({ Name, Email, Phone, Role })
            }

            reset()
        }

        function deleteMem(index) {
            store.deleteMem(index)
            if (isEditing.value && editIndex.value === index) {
                reset()
            }
        }

        function editMem({ index, i }) {
            isEditing.value = true
            editIndex.value = index
            Object.assign(form, i)

        }

        function reset() {
            form.Name = ''
            form.Email = ''
            form.Phone = ''
            form.Role = ''
            isEditing.value = false
            editIndex.value = -1
        }

        return {
            reset,
            editMem,
            deleteMem,
            addMem,
            isEditing,
            editIndex,
            form,
            store
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
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.7);
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