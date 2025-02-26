// src/App.vue
<template>
  <n-space vertical>
    <AccountList />
  </n-space>
</template>

<script setup lang="ts">
import AccountList from '@/components/AccountList.vue';
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
</style>