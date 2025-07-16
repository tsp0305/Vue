<template>
    <div class="wrapper">

        <div class="controls">
            <label>Sort:</label>
            <input type="radio" id="asc" value="asc" v-model="sortOrder" />
            <label for="asc">Asc</label>
            <input type="radio" id="desc" value="desc" v-model="sortOrder" />
            <label for="desc">Desc</label>

            <input type="text" v-model="search" placeholder="Search..." />
        </div>


        <table>
            <thead>
                <tr>
                    <th v-for="(head, index) in table.header" :key="index" @click="sortByColumn(head)"
                        style="cursor: pointer">
                        {{ head }}
                        <span v-if="selectedOption === head">
                            {{ sortOrder === 'asc' ? '▲' : '▼' }}
                        </span>
                    </th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in paginatedList" :key="item.id">
                    <td v-for="(field, i) in table.header" :key="i">{{ item[field] }}</td>
                    <td>
                        <button @click="$emit('edit-item', item)">Edit</button>
                        <button @click="$emit('delete-item', item.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>


        <div class="pagination">
            <button @click="previous" :disabled="curr === 1">Prev</button>
            <span>Page {{ totalpg ? curr : 0 }} of {{ totalpg }}</span>
            <button @click="next" :disabled="curr === totalpg">Next</button>
        </div>
    </div>
</template>

<script setup>
import { watch } from 'vue'
import { ref, computed } from 'vue'

const props = defineProps({
    table: Object
})

const sortOrder = ref('')
const selectedOption = ref('')
const search = ref('')
const curr = ref(1)
const nrow = 3

watch(search, () => {
    curr.value = 1
})

function sortByColumn(column) {
    if (selectedOption.value === column) {
        sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
    } else {
        selectedOption.value = column
        sortOrder.value = 'asc'
    }
}

const filteredList = computed(() => {

    let copy = props.table.list.map((item) => ({ ...item }))


    const val = search.value.toLowerCase()

    copy = copy.filter(item =>
        Object.values(item).some(i =>
            String(i).toLowerCase().includes(val)
        )
    )

    return copy.sort((a, b) => a.id - b.id)
})

const totalpg = computed(() => {

    return Math.ceil(filteredList.value.length / nrow)
})

const paginatedList = computed(() => {

    const start = (curr.value - 1) * nrow
    const end = start + nrow
    let paged = filteredList.value.slice(start, end)

    if (sortOrder.value && selectedOption.value) {
        paged.sort((a, b) => {
            const valA = a[selectedOption.value]
            const valB = b[selectedOption.value]
            return sortOrder.value === 'asc'
                ? String(valA).localeCompare(String(valB))
                : String(valB).localeCompare(String(valA))
        })
    }

    return paged
})

function previous() {
    if (curr.value > 1) curr.value--
}

function next() {
    if (curr.value < totalpg.value) curr.value++
}
</script>

<style scoped>
.wrapper {
    font-family: sans-serif;
    padding: 10px;
}

.controls {
    margin-bottom: 10px;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 10px;
}

th,
td {
    border: 1px solid #ccc;
    padding: 8px;
    text-align: left;
}

th {
    background-color: #1a1818;
}

button {
    margin-right: 5px;
    padding: 4px 8px;
    cursor: pointer;
}

.pagination {
    display: flex;
    gap: 10px;
    align-items: center;
}
</style>
