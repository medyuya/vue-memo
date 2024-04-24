<script setup>
import { ref } from 'vue'
import { useMemos } from './hooks/useMemos.js'
import { extractFirstLine } from './utils/stringHelpers.js'

const { memos, addNewMemo } = useMemos()

const isDisplayed = ref(false)

const toggleDisplay = () => {
  isDisplayed.value = !isDisplayed.value
}

const newMemo = ref('')

const handleAddNewMemo = () => {
  addNewMemo(newMemo.value)
  newMemo.value = ''
}
</script>

<template>
  <div class="card">
    <div class="links-wrapper">
      <div class="link-wrapper" v-for="memo in memos" :key="memo.id">
        <a>{{ extractFirstLine(memo.content) }}</a>
      </div>
      <div class="link-wrapper">
        <a @click="toggleDisplay">+</a>
      </div>
    </div>
    <div class="form-wrapper" v-if="isDisplayed">
      <form @submit.prevent="handleAddNewMemo">
        <textarea v-model="newMemo" placeholder="メモを入力してください" required />
        <div class="btns-wrapper">
          <button type="submit">作成</button>
          <button type="button">削除</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  height: 500px;
  width: 500px;
  background: white;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}

a {
  text-decoration: none;
  display: inline;
  font-size: 20px;
  cursor: pointer;
}

textarea {
  height: 400px;
  border-radius: 10px;
}

.links-wrapper {
}

.form-wrapper {
}

.btns-wrapper {
}
</style>
