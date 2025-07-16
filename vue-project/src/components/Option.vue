<template>
    <div>
        <input type="radio" id="asc" value="asc" v-model="sortOrder">
        <label for="asc">Asc</label>

        <input type="radio" id="desc" value="desc" v-model="sortOrder">
        <label for="desc">Desc</label>
        <div> Sort By</div>
        <select v-model="selectedOption">
            <option disabled value="">Select an option</option>
            <option v-for="(item, index) in table.header" :key="index" :value="item">
                {{ item }}
            </option>
        </select>
        <button @click="$emit('sortList', { sortOrder, selectedOption })"> Show result </button>
    </div>

</template>

<script setup>

import { ref } from 'vue';

defineProps({
    table: Object
})

const sortOrder = ref('')
const selectedOption = ref('')
const emit = defineEmits(['sortList'])

</script>



<style scoped></style>
