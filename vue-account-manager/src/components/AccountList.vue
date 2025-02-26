<template>
    <div class="account-list">
        <n-card>
            <div class="header">
                <h2>Список учётных записей</h2>
                <p>
                    Для указания нескольких меток для одной пары логин/пароль
                    используйте разделитель ;
                </p>
                <n-button type="primary" size="large" @click="addNewAccount"
                >+</n-button
            >
            </div>
            <n-space
                v-for="account in accounts"
                :key="account.id"
                class="account-item"
            >
                <n-card class="account-card">
                    <n-input
                        v-model:value="account.label"
                        placeholder="Метки"
                        size="small"
                        clearable
                        @input="updateAccount(account)"
                    />
                    <n-select
                        v-model:value="account.type"
                        :options="typeOptions"
                        size="small"
                        @change="updateAccount(account)"
                    />
                    <n-input
                        v-model:value="account.login"
                        placeholder="Логин"
                        size="small"
                        clearable
                        @input="updateAccount(account)"
                    />
                    <n-input
                        v-if="account.type === 'Локальная'"
                        v-model:value="account.password"
                        type="password"
                        show-password-on="mousedown"
                        placeholder="Пароль"
                        size="small"
                        @input="updateAccount(account)"
                    />
                    <n-button
                        type="error"
                        size="tiny"
                        @click="removeAccount(account.id)"
                    >
                        Удалить
                    </n-button>
                </n-card>
            </n-space>
        </n-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAccountStore } from "@/stores/accounts";

const store = useAccountStore();
const accounts = ref(store.accounts);
const typeOptions = [
    { label: "LDAP", value: "LDAP" },
    { label: "Локальная", value: "Локальная" },
];

const addNewAccount = () => {
    const newAccount = {
        id: Date.now(),
        label: [],
        type: "LDAP",
        login: "",
        password: null,
    };
    store.addAccount(newAccount);
    accounts.value = store.accounts;
};

const updateAccount = (account: any) => {
    if (account.type === "LDAP") {
        account.password = null;
    }

    store.updateAccount(account);
};

const removeAccount = (id: number) => {
    store.removeAccount(id);
    accounts.value = store.accounts;
};
</script>

<style scoped>
.account-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    width: 100%;
    height: 1080px;
}

.header {
    text-align: center;
    margin-bottom: 20px;
}

.account-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    width: 100%;
}

.account-card {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 10px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 400px;
    max-width: 800px;
}

.account-card n-input,
.account-card n-select {
    margin-right: 10px;
    width: 150px;
}

.account-card n-select {
    width: 150px !important;
}

.account-card n-button {
    margin-left: 10px;
}

.account-card n-space {
    width: 100%;
}
</style>
