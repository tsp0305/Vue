<template>
    <div class="table-container" v-if="students.length > 0">
        <h3>Student List</h3>
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Id</th>
                    <th>DOB</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(student, index) in students" :key="index">
                    <td>{{ student.name }}</td>
                    <td>{{ student.id }}</td>
                    <td>{{ student.dob }}</td>
                    <td>{{ student.mail }}</td>
                    <td>
                        <button @click="remove(index)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
const props = defineProps({
    students: Array
});

const emit = defineEmits(['delete-student']);

function remove(index) {
    emit('delete-student', index);
}
</script>





<style scoped>
.table-container {
    flex: 1;
    min-width: 500px;
    overflow-x: auto;
}

table {
    width: 100%;
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