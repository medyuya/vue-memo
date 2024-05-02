import { ref } from 'vue'
import * as localStorageHandlers from '../utils/localStorageHandlers.js'

export const useMemos = () => {
  const MEMOS_STORAGE_KEY = 'memos'

  const memos = ref(localStorageHandlers.get(MEMOS_STORAGE_KEY))

  const addNewMemo = (newText) => {
    if (newText.trim() === '') {
      return
    }

    const freshMemoId = crypto.randomUUID()

    const newMemo = {
      id: freshMemoId,
      content: newText
    }

    localStorageHandlers.create(MEMOS_STORAGE_KEY, newMemo)

    memos.value.push(newMemo)
  }

  const removeMemo = (targetId) => {
    localStorageHandlers.remove(MEMOS_STORAGE_KEY, targetId)

    const indexToRemove = memos.value.findIndex((memo) => memo.id === targetId)
    memos.value.splice(indexToRemove, 1)
  }

  const updateMemo = (targetId, updateText) => {
    localStorageHandlers.update(MEMOS_STORAGE_KEY, targetId, updateText)

    memos.value = memos.value.map((memo) => {
      if (memo.id === targetId) {
        return { ...memo, content: updateText }
      }

      return memo
    })
  }

  return { memos, addNewMemo, removeMemo, updateMemo }
}
