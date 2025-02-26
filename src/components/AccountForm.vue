<template>
    <n-card title="Добавить учетную запись">
        <n-space vertical>
            <n-input
                v-model:value="label"
                placeholder="Метка (разделять ;)"
                :status="labelError ? 'error' : ''"
            ></n-input>
            <n-select
                v-model:value="type"
                :options="typeOptions"
                placeholder="Выберите тип записи"
            ></n-select>
            <n-input
                v-model:value="login"
                placeholder="Логин"
                :status="loginError ? 'error' : ''"
            ></n-input>
            <n-input
                v-if="type === 'Локальная'"
                v-model:value="password"
                type="password"
                placeholder="Пароль"
                :status="passwordError ? 'error' : ''"
            />
            <n-button @click="addAccount">Добавить</n-button>
        </n-space>
    </n-card>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useAccountStore } from "@/stores/accounts";

const store = useAccountStore();
const label = ref("");
const type = ref("LDAP");
const login = ref("");
const password = ref("");
const labelError = ref(false);
const loginError = ref(false);
const passwordError = ref(false);

const typeOptions = [
    { label: "LDAP", value: "LDAP" },
    { label: "Локальная", value: "Локальная" },
];

const validateForm = () => {
    let isValid = true;

    if (!login.value) {
        loginError.value = true;
        isValid = false;
    } else {
        loginError.value = false;
    }

    if (type.value === "Локальная" && !password.value) {
        passwordError.value = true;
        isValid = false;
    } else {
        passwordError.value = false;
    }

    if (label.value.length > 50) {
        labelError.value = true;
        isValid = false;
    } else {
        labelError.value = false;
    }

    return isValid;
};

const addAccount = () => {
    if (!validateForm()) {
        return;
    }

    store.addAccount({
        id: Date.now(),
        label: label.value.split(";").map((text) => ({ text: text.trim() })),
        type: type.value,
        login: login.value,
        password: type.value === "Локальная" ? password.value : null,
    });

    label.value = "";
    login.value = "";
    password.value = "";
};
</script>
