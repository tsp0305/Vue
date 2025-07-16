<script>
import sidebar from '../components/sidebar.vue'

export default {
  components: {
    sidebar
  }
}
</script>

<template>
  <div class="home-container">
    <!-- Navbar -->
    <nav class="navbar">
      <h3>Library Dashboard</h3>
      <div class="nav-links">
        <router-link to="/book">Book Form</router-link>
        <router-link to="/mem">Member Form</router-link>
      </div>
    </nav>

    <div class="main-content">


      <div class="content-area">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #1c1c1c;
}

/* Navbar */
.navbar {
  background-color: #2c3e50;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar h3 {
  color: #ecf0f1;
  margin: 0;
}

.nav-links a {
  margin-left: 1.5rem;
  text-decoration: none;
  color: #ecf0f1;
  font-weight: bold;
}

.nav-links a.router-link-active {
  border-bottom: 2px solid #3498db;
}

/* Main content layout */
.main-content {
  display: flex;
  flex: 1;
  height: 100%;
}

/* Routed content area */
.content-area {
  flex: 1;
  padding: 2rem;
}

.sidebar {
  background-color: #2c3e50;
  color: white;
  padding: 1rem;
  width: 220px;
  min-height: calc(100vh - 60px);
  /* subtract navbar height */
  border-radius: 0;
}
</style>
