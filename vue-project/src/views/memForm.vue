<template>
    <div class="container">
        <div class="content-wrapper">
            <form @submit.prevent="submitForm" class="form-box">
                <h2>Member List</h2>

                <label for="name">Name:</label>
                <input type="text" id="name" v-model="form.Name" />
                <span class="error" v-if="errors.Name">{{ errors.Name }}</span>

                <label for="email">Email:</label>
                <input type="email" id="email" v-model="form.Email" />
                <span class="error" v-if="errors.Email">{{ errors.Email }}</span>

                <label for="phone">Phone:</label>
                <input type="tel" id="phone" maxlength="10" v-model="form.Phone" />
                <span class="error" v-if="errors.Phone">{{ errors.Phone }}</span>

                <label for="role">Role:</label>
                <select id="role" v-model="form.Role">
                    <option disabled value="">Select role</option>
                    <option value="Student">Student</option>
                    <option value="Staff">Staff</option>
                    <option value="Admin">Admin</option>
                </select>
                <span class="error" v-if="errors.Role">{{ errors.Role }}</span>

                <div class="btn-group">
                    <button type="submit">
                        {{ isEditing ? 'Update Member' : 'Add Member' }}
                    </button>
                    <button type="button" @click="resetForm">Reset</button>
                </div>
            </form>

            <show-list :table="{
                header: store.list.length
                    ? Object.keys(store.list[0])
                    : ['Name', 'Email', 'Phone', 'Role'],
                list: store.list,
            }" @delete-item="handleDelete" @edit-item="handleEdit" />
        </div>
    </div>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import showList from '../components/showList.vue'
import { useMemStore } from '@/stores/memStore'

export default {
    components: { showList },
    setup() {
        const store = useMemStore()

        onMounted(() => {
            store.fetchMem()
        })

        const form = reactive({
            Name: '',
            Email: '',
            Phone: '',
            Role: '',
        })

        const errors = reactive({
            Name: '',
            Email: '',
            Phone: '',
            Role: '',
        })

        const isEditing = ref(false)
        const editId = ref(null)

        function validateForm() {
            let valid = true

            // Reset errors
            Object.keys(errors).forEach((key) => (errors[key] = ''))

            if (!form.Name.trim()) {
                errors.Name = 'Name is required.'
                valid = false
            }

            if (!form.Email.trim()) {
                errors.Email = 'Email is required.'
                valid = false
            } else if (!/^\S+@\S+\.\S+$/.test(form.Email)) {
                errors.Email = 'Invalid email format.'
                valid = false
            }

            if (!form.Phone.trim()) {
                errors.Phone = 'Phone number is required.'
                valid = false
            } else if (!/^[0-9]{10}$/.test(form.Phone)) {
                errors.Phone = 'Phone number must be 10 digits.'
                valid = false
            }

            if (!form.Role) {
                errors.Role = 'Please select a role.'
                valid = false
            }

            return valid
        }

        function submitForm() {
            if (!validateForm()) return

            const { Name, Email, Phone, Role } = form

            if (isEditing.value) {
                store.updateMem(editId.value, { Name, Email, Phone, Role })
            } else {
                store.addMem({ Name, Email, Phone, Role })
            }

            resetForm()
        }

        function handleDelete(id) {
            store.deleteMem(id)
            if (isEditing.value && editId.value === id) {
                resetForm()
            }
        }

        function handleEdit(item) {
            Object.assign(form, item)
            isEditing.value = true
            editId.value = item.id
        }

        function resetForm() {
            form.Name = ''
            form.Email = ''
            form.Phone = ''
            form.Role = ''
            isEditing.value = false
            editId.value = null

            // Clear errors
            Object.keys(errors).forEach((key) => (errors[key] = ''))
        }

        return {
            form,
            errors,
            isEditing,
            submitForm,
            handleDelete,
            handleEdit,
            resetForm,
            store,
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
    box-shadow: 0 0 10px rgba(52, 152, 219, 0.7);
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
    margin-bottom: 0.25rem;
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
