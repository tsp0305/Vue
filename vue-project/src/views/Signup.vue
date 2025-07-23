<template>
    <div class="form-box">
        <h2>Sign Up</h2>
        <form @submit.prevent="submitSignup">
            <input v-model="form.name" placeholder="Name" required />
            <input v-model="form.email" type="email" placeholder="Email" required />
            <input v-model="form.phone" placeholder="Phone" required />
            <input v-model="form.password" type="password" placeholder="Password" required />
            <select v-model="form.role">
                <option value="Student">Student</option>
                <option value="Staff">Staff</option>
                <option value="Admin">Admin</option>
            </select>
            <button type="submit">Sign Up</button>
        </form>

        <p v-if="auth.error" class="error">{{ auth.error }}</p>

        <p class="switch-link">
            Already have an account? <router-link to="/login">Login</router-link>
        </p>

    </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'

const auth = useAuthStore()

const form = ref({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'Student'
})

const submitSignup = () => {
    auth.signup(form.value)
}
</script>
<style scoped>
.form-box {
    max-width: 400px;
    margin: 60px auto;
    padding: 30px 25px;
    background-color: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    font-family: "Segoe UI", sans-serif;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
}

form {
    display: flex;
    flex-direction: column;
}

input,
select {
    margin-bottom: 15px;
    padding: 10px 12px;
    border: 1px solid #ccc;
    border-radius: 8px;
    font-size: 14px;
    transition: border 0.3s;
}

input:focus,
select:focus {
    border-color: #007bff;
    outline: none;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background 0.3s;
}

button:hover {
    background-color: #0056b3;
}

.error {
    margin-top: 10px;
    color: #e74c3c;
    text-align: center;
    font-size: 14px;
}
</style>
