// src/App.vue
<template>
  <n-space vertical>
    <AccountForm />
    <AccountList />
  </n-space>
</template>

<script setup lang="ts">
import AccountForm from '@/components/AccountForm.vue';
import AccountList from '@/components/AccountList.vue';
</script>
