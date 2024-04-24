<script setup>
import { ref } from 'vue'
import './assets/app.css'
import { useMemos } from './hooks/useMemos.js'
import { extractFirstLine } from './utils/stringHelpers.js'

const { memos, addNewMemo, removeMemo, updateMemo } = useMemos()

const isFormDisplay = ref(false)
const toggleFormDisplay = () => {
  isFormDisplay.value = !isFormDisplay.value
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
    <div v-if="isFormDisplay">
      <form @submit.prevent="handleSubmit">
        <textarea
          v-model="focusingMemoOnForm.content"
          placeholder="メモを入力してください"
          required
        />
        <div>
          <button type="submit">編集</button>
          <button type="button" @click="handleRemoveMemo">削除</button>
        </div>
      </form>
    </div>
  </div>
</template>
