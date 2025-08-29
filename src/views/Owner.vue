<template>
  <div class="layout">
    <div class="sidebar">
      <VerticalNavbar />
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import VerticalNavbar from '@/components/VerticalNavbar.vue'
</script>
<style>
.layout {
  display: flex;
  height: 100vh;
}

.sidebar {
  width: 250px;
  background: #f9fafb;
  border-right: 1px solid #ddd;
  box-shadow: 2px 0 6px rgba(0, 0, 0, 0.08);
}

.main-content {
  flex: 1;
  background-color: #f4f6f8;
  padding: 1.5rem;
  overflow-y: auto;
}

.header-bar {
  background: #fff;
  border-bottom: 1px solid #eee;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
