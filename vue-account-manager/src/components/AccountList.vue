<template>
    <div class="account-list">
        <n-card>
            <div class="header">
                <h2>Список учётных записей</h2>
                <p>
                    Для указания нескольких меток для одной пары логин/пароль
                    используйте разделитель ;
                </p>
                <n-button
                    type="primary"
                    style="margin-top: 10px"
                    size="large"
                    @click="addNewAccount"
                    >+</n-button
                >
            </div>

            <div class="account-items-container">
                <div
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
                            style="margin-top: 10px"
                            size="small"
                            @change="updateAccount(account)"
                        />
                        <n-input
                            v-model:value="account.login"
                            placeholder="Логин"
                            style="margin-top: 10px"
                            size="small"
                            clearable
                            @input="updateAccount(account)"
                        />
                        <n-input
                            v-if="account.type === 'Локальная'"
                            v-model:value="account.password"
                            style="margin-top: 10px"
                            type="password"
                            show-password-on="mousedown"
                            placeholder="Пароль"
                            size="small"
                            @input="updateAccount(account)"
                        />
                        <n-button
                            type="error"
                            style="margin-top: 10px"
                            size="tiny"
                            @click="removeAccount(account.id)"
                        >
                            Удалить
                        </n-button>
                    </n-card>
                </div>
            </div>
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
    justify-content: flex-start;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 12px;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    min-height: 100vh;
}

.header {
    text-align: center;
    margin-bottom: 20px;
    font-family: "Roboto", sans-serif;
    position: sticky;
    top: 0;
    background-color: #f9f9f9;
    padding: 20px 0;
    z-index: 1;
}

.account-items-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: space-between;
    width: 100%;
    margin-top: 20px;
}

.account-item {
    width: 400px;
    height: 250px;
}

.account-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 15px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 400px;
    height: 220px;
    transition: all 0.3s ease-in-out;
}

.account-card:hover {
    box-shadow: 0 6px 10px rgba(0, 0, 0, 0.2);
    transform: translateY(-2px);
}

.account-card n-input,
.account-card n-select {
    margin-right: 10px;
    width: 100%;
}

.account-card n-button {
    align-self: flex-end;
}

.account-card n-space {
    width: 100%;
}

.account-card .account-label {
    font-weight: 600;
    font-size: 14px;
    color: #555;
}

.account-card .account-login {
    font-size: 16px;
}

.account-card .delete-btn {
    align-self: flex-start;
    color: #ff4d4f;
    font-size: 12px;
    border: none;
    background: none;
    cursor: pointer;
    transition: color 0.3s ease;
}

.account-card .delete-btn:hover {
    color: #d43f3a;
}
</style>
