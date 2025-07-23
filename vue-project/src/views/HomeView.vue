<template>
  <div class="home-container">
    <!-- Navbar -->
    <nav class="navbar">
      <div class="nav-left">
        <RouterLink to="/" class="logo">Library</RouterLink>
      </div>

      <div class="nav-right">
        <router-link v-if="auth.user?.role === 'Admin' || auth.user?.role === 'Staff'" to="/book">Book
          Form</router-link>
        <router-link v-if="auth.user?.role === 'Admin'" to="/mem">Member Form</router-link>
        <router-link to="/rec">Record</router-link>
        <button @click="logout" class="logout-btn">Logout</button>
      </div>
    </nav>

    <div class="main-content">
      <div class="content-area">

        <div v-if="isHome">
          <p v-if="store.isLoading" style="color: white">Loading books...</p>

          <ShowList v-if="Array.isArray(store.list)" :table="{
            header: store.list.length
              ? Object.keys(store.list[0])
              : ['Title', 'Author', 'Total copies', 'Available copies'],
            list: store.list
          }" @borrow="handleBorrow" @return="handleReturn" />
        </div>

        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, computed } from 'vue'
import ShowList from '@/components/showList.vue'
import { useAuthStore } from '@/stores/authStore'
import { useBookStore } from '@/stores/bookStore'
import { useRecordStore } from '@/stores/recordStore'

const recordStore = useRecordStore()

const auth = useAuthStore()

const store = useBookStore()

const memberId = localStorage.getItem('user_id')

onMounted(() => {
  store.fetchBook()
})
const route = useRoute()

const isHome = computed(() => route.path === '/')


const handleBorrow = async (book) => {
  try {
    await recordStore.borrowBook({
      bid: book.id,
      mid: memberId
    })
    console.log(book)
    if (book.AvailableCopies) {
      alert(`Borrowed "${book.title}",${memberId}`)
    }
    else {
      alert('Unavailable')
    }


    await store.fetchBook()
  } catch (err) {
    const errorMsg = err.response?.data?.message || recordStore.error || 'Borrow failed'

    alert('Borrow failed', errorMsg)
  }
}

const handleReturn = async (book) => {
  try {
    const data = {
      bid: book.id,
      mid: memberId
    }
    await recordStore.returnBook(data)
    alert(`Returned "${book.title}"`)
    await store.fetchBook()
  } catch (err) {
    alert('Return failed')
  }
}

function logout() {
  auth.logout()
}
</script>

<style scoped>
/* Overall container */
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #121212;
  color: #ffffff;
  font-family: 'Segoe UI', sans-serif;
}

/* Navbar styling */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1e1e;
  padding: 1rem 2rem;
  border-bottom: 1px solid #2c2c2c;
}

.nav-left .logo {
  font-size: 1.3rem;
  font-weight: bold;
  color: #ffffff;
  text-decoration: none;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-right a {
  color: #dddddd;
  text-decoration: none;
  font-weight: 500;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-right a.router-link-active {
  background-color: #3498db;
  color: #fff;
}

.nav-right a:hover {
  background-color: #2c2c2c;
}

/* Logout Button */
.logout-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.logout-btn:hover {
  background-color: #c0392b;
}

/* Main content layout */
.main-content {
  flex: 1;
  display: flex;
}

.content-area {
  flex: 1;
  padding: 2rem;
}
</style>
