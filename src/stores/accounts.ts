import { defineStore } from 'pinia';

interface Account {
  id: number;
  label: { text: string }[];
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
}

const loadAccountsFromLocalStorage = (): Account[] => {
  const accounts = localStorage.getItem('accounts');
  return accounts ? JSON.parse(accounts) : [];
};

const saveAccountsToLocalStorage = (accounts: Account[]) => {
  localStorage.setItem('accounts', JSON.stringify(accounts));
};

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    accounts: loadAccountsFromLocalStorage(),
  }),
  actions: {
    addAccount(account: Account) {
      this.accounts.push(account);
      saveAccountsToLocalStorage(this.accounts);
    },
    removeAccount(id: number) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
      saveAccountsToLocalStorage(this.accounts);
    },
    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex(acc => acc.id === updatedAccount.id);
      if (index !== -1) {
        this.accounts[index] = updatedAccount;
        saveAccountsToLocalStorage(this.accounts); // Сохраняем в localStorage
      }
    },
  },
});