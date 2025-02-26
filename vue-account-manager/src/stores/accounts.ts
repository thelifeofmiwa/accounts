import { defineStore } from 'pinia';

interface Account {
  id: number;
  label: { text: string }[];
  type: 'LDAP' | 'Локальная';
  login: string;
  password: string | null;
}

export const useAccountStore = defineStore('accountStore', {
  state: () => ({
    accounts: [] as Account[],
  }),
  actions: {
    addAccount(account: Account) {
      this.accounts.push(account);
    },
    removeAccount(id: number) {
      this.accounts = this.accounts.filter(acc => acc.id !== id);
    },
    updateAccount(updatedAccount: Account) {
      const index = this.accounts.findIndex(acc => acc.id === updatedAccount.id);
      if (index !== -1) {
        this.accounts[index] = updatedAccount;
      }
    },
  },
});
