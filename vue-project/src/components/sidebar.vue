<template>
    <div class="sidebar">
        <h4>🔍 Filter Options</h4>
        <div class="filter-group">
            <Option :table="table" @sortList="$emit('sortList', $event)" />
        </div>
    </div>
</template>

<script>
import Option from './Option.vue';
export default {
    name: 'sidebar',
    components: {
        Option
    },
    props: {
        table: Object
    }
}
</script>

<style scoped>
.sidebar {
    background-color: #34495e;
    color: #fff;
    padding: 1rem;
    border-radius: 10px;
    width: 200px;
    min-height: 300px;
}

.filter-group {
    margin-top: 1rem;
}

.checkboxes label {
    display: block;
    margin-top: 0.5rem;
}
</style>
