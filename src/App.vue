<script setup>
import { ref } from 'vue'
import './assets/app.css'
import { useMemos } from './hooks/useMemos.js'
import { extractFirstLine } from './utils/stringHelpers.js'

const { memos, addNewMemo, removeMemo, updateMemo } = useMemos()

const isFormDisplay = ref(false)

const focusingMemoOnForm = ref({ id: '', content: '' })

const handleClickNewLink = () => {
  focusingMemoOnForm.value = addNewMemo()
  isFormDisplay.value = true
}

const handleClickShowLink = (targetId, targetText) => {
  isFormDisplay.value = true
  focusingMemoOnForm.value = { id: targetId, content: targetText }
}

const handleUpdateMemo = () => {
  updateMemo(focusingMemoOnForm.value.id, focusingMemoOnForm.value.content)
  isFormDisplay.value = false
}

const handleRemoveMemo = () => {
  removeMemo(focusingMemoOnForm.value.id)
  isFormDisplay.value = false
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
      <form @submit.prevent="handleUpdateMemo">
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
