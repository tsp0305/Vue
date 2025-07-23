<template>
    <div>
        <h2 style="color: white;">Borrow/Return Records</h2>
        <p v-if="store.isLoading" style="color: white;">Loading records...</p>

        <ShowList v-if="Array.isArray(store.records) && store.records.length" :table="{
            header: Object.keys(store.records[0]),
            list: store.records
        }" mode="record" />

        <p v-else style="color: white;">No records found.</p>
    </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRecordStore } from '@/stores/recordStore'
import { useAuthStore } from '@/stores/authStore'
import ShowList from '@/components/showList.vue'

const store = useRecordStore()

const auth = useAuthStore()

onMounted(() => {
    if (auth.user?.role === 'Student') {
        console.log(auth.user.role)
        store.fetchRecordsByMember(auth.user.id)
    } else {
        store.fetchRecords()
    }
})
</script>
