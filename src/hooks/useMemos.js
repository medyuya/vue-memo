import { ref } from 'vue'
import * as localStorageHandlers from '../utils/localStorageHandlers.js'

export const useMemos = () => {
  const memos = ref(localStorageHandlers.get('memos'))

  const addNewMemo = (newText) => {
    if (newText.trim() === '') {
      return
    }

    const freshTodoId = crypto.randomUUID()

    const newMemo = {
      id: freshTodoId,
      content: newText
    }

    localStorageHandlers.create('memos', newMemo)

    memos.value.push(newMemo)
  }

  const removeMemo = (targetId) => {
    localStorageHandlers.remove('memos', targetId)

    const indexToRemove = memos.value.findIndex((todo) => todo.id === targetId)
    memos.value.splice(indexToRemove, 1)
  }

  return { memos, addNewMemo, removeMemo }
}
