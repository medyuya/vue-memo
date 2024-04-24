import { ref } from 'vue'
import * as localStorageHandlers from '../utils/localStorageHandlers.js'

export const useMemos = () => {
  const memos = ref(localStorageHandlers.get('memos'))

  const addNewMemo = (newText) => {
    if (newText.trim() === '') {
      return
    }

    const freshMemoId = crypto.randomUUID()

    const newMemo = {
      id: freshMemoId,
      content: newText
    }

    localStorageHandlers.create('memos', newMemo)

    memos.value.push(newMemo)
  }

  const removeMemo = (targetId) => {
    localStorageHandlers.remove('memos', targetId)

    const indexToRemove = memos.value.findIndex((memo) => memo.id === targetId)
    memos.value.splice(indexToRemove, 1)
  }

  const updateMemo = (targetId, updateText) => {
    localStorageHandlers.update('memos', targetId, updateText)

    memos.value = memos.value.map((memo) => {
      if (memo.id === targetId) {
        return { ...memo, content: updateText }
      }

      return memo
    })
  }

  return { memos, addNewMemo, removeMemo, updateMemo }
}
