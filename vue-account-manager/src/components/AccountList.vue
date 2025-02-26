<template>
    <n-card title="Список учетных записей">
      <n-list>
        <n-list-item v-for="account in store.accounts" :key="account.id">
          <n-space>
            <n-tag v-for="tag in account.label" :key="tag.text">{{ tag.text }}</n-tag>
            <span>{{ account.login }} ({{ account.type }})</span>
            <n-button type="error" @click="store.removeAccount(account.id)">Удалить</n-button>
          </n-space>
        </n-list-item>
      </n-list>
    </n-card>
  </template>
  
  <script setup lang="ts">
  import { useAccountStore } from '@/stores/accounts';
  
  const store = useAccountStore();
  </script>
  