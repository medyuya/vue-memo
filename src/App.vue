<script setup>
import MemoCard from './components/MemoCard.vue'
</script>

<template>
  <MemoCard>
    <template v-slot:memo-links>
      <h1>link</h1>
    </template>
  </MemoCard>
</template>
