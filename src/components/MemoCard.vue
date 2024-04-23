<script setup></script>

<template>
  <div class="div-card"><slot name="memo-links"></slot></div>
</template>

<style scoped>
.div-card {
  display: flex;
  justify-content: space-between;
  height: 300px;
  width: 300px;
  background: white;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
}
</style>
