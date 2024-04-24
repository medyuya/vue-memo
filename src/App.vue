<script setup>
import { ref } from 'vue'
import { useMemos } from './hooks/useMemos.js'
import { extractFirstLine } from './utils/stringHelpers.js'

const { memos, addNewMemo, removeMemo, updateMemo } = useMemos()

const isDisplayed = ref(false)
const toggleFormDisplay = () => {
  isDisplayed.value = !isDisplayed.value
}

const focusingMemoOnForm = ref({ id: '', content: '', type: '' })

const handleClickNewLink = () => {
  toggleFormDisplay()
  focusingMemoOnForm.value = { id: '', content: '新規メモ', type: 'new' }
}

const handleClickShowLink = (targetId, targetText) => {
  toggleFormDisplay()
  focusingMemoOnForm.value = { id: targetId, content: targetText, type: 'edit' }
}

const handleSubmit = () => {
  if (focusingMemoOnForm.value.type === 'new') {
    handleAddNewMemo()
  }

  if (focusingMemoOnForm.value.type === 'edit') {
    handleUpdateMemo()
  }
}

const toggleSubmitLabel = () => {
  if (focusingMemoOnForm.value.type === 'new') {
    return '作成'
  }

  if (focusingMemoOnForm.value.type === 'edit') {
    return '編集'
  }
}

const handleAddNewMemo = () => {
  addNewMemo(focusingMemoOnForm.value.content)
  toggleFormDisplay()
}

const handleRemoveMemo = () => {
  removeMemo(focusingMemoOnForm.value.id)
  toggleFormDisplay()
}

const handleUpdateMemo = () => {
  updateMemo(focusingMemoOnForm.value.id, focusingMemoOnForm.value.content)
  toggleFormDisplay()
}
</script>

<template>
  <div class="card">
    <div>
      <div v-for="memo in memos" :key="memo.id" @click="handleClickShowLink(memo.id, memo.content)">
        <a>{{ extractFirstLine(memo.content) }}</a>
      </div>
      <div>
        <a @click="handleClickNewLink">+</a>
      </div>
    </div>
    <div v-if="isDisplayed">
      <form @submit.prevent="handleSubmit">
        <textarea
          v-model="focusingMemoOnForm.content"
          placeholder="メモを入力してください"
          required
        />
        <div>
          <button type="submit">{{ toggleSubmitLabel() }}</button>
          <button type="button" @click="handleRemoveMemo">削除</button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
a {
  text-decoration: none;
  display: inline;
  font-size: 20px;
  cursor: pointer;
}

textarea {
  height: 400px;
  width: 250px;
  border-radius: 10px;
}

.card {
  display: flex;
  justify-content: space-between;
  height: 500px;
  width: 500px;
  background: white;
  box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
  padding: 10px;
}
</style>
