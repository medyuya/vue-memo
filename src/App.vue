<script setup>
import { ref } from 'vue'

const isDisplayed = ref(false)

const toggleDisplay = () => {
  isDisplayed.value = !isDisplayed.value
}
</script>

<template>
  <div class="card">
    <div class="links-wrapper">
      <a @click="toggleDisplay">+</a>
    </div>
    <div class="form-wrapper" v-if="isDisplayed">
      <form>
        <textarea value="新規メモ" placeholder="メモを入力してください" required />
        <div class="btns-wrapper">
          <button type="submit">更新</button>
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
