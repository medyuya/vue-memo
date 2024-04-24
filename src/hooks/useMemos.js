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

  return { memos, addNewMemo }
}
