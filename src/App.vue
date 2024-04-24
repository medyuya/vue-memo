<script setup>
import { ref, reactive } from 'vue'
import { useMemos } from './hooks/useMemos.js'
import { extractFirstLine } from './utils/stringHelpers.js'

const { memos, addNewMemo, removeMemo } = useMemos()

const isDisplayed = ref(false)
const toggleDisplay = () => {
  isDisplayed.value = !isDisplayed.value
}

const focusingMemoOnForm = reactive({ id: '', content: '' })

// 新規作成メモのリンクを押した時の挙動
const handleClickNewMemo = () => {
  toggleDisplay()
  focusingMemoOnForm.content = '新規メモ'
}

// 投稿済みのメモのリンクを押した時の挙動
const handleClickMemoTitle = (targetId, targetText) => {
  toggleDisplay()
  focusingMemoOnForm.id = targetId
  focusingMemoOnForm.content = targetText
}

const handleAddNewMemo = () => {
  addNewMemo(focusingMemoOnForm.content)
  toggleDisplay()
}

const handleRemoveMemo = () => {
  removeMemo(focusingMemoOnForm.id)
  toggleDisplay()
}
</script>

<template>
  <div class="card">
    <div class="links-wrapper">
      <div
        class="link-wrapper"
        v-for="memo in memos"
        :key="memo.id"
        @click="handleClickMemoTitle(memo.id, memo.content)"
      >
        <a>{{ extractFirstLine(memo.content) }}</a>
      </div>
      <div class="link-wrapper">
        <a @click="handleClickNewMemo">+</a>
      </div>
    </div>
    <div class="form-wrapper" v-if="isDisplayed">
      <form @submit.prevent="handleAddNewMemo">
        <textarea
          v-model="focusingMemoOnForm.content"
          placeholder="メモを入力してください"
          required
        />
        <div class="btns-wrapper">
          <button type="submit">作成</button>
          <button type="button" @click="handleRemoveMemo">削除</button>
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
  width: 250px;
  border-radius: 10px;
}

.links-wrapper {
}

.form-wrapper {
}

.btns-wrapper {
}
</style>
