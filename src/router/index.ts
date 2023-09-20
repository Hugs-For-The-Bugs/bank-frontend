import { createRouter, createWebHistory } from 'vue-router'
import AccountDetailsView from '../views/AccountDetailsView.vue'
import HomeView from '../views/HomeView.vue'
import CreateAccountView from '../views/CreateAccountView.vue'
import LoginView from '../views/LoginView.vue'
import TransferView from '../views/TransferView.vue'
import WithdrawView from '../views/WithdrawView.vue'
import DepositView from '../views/DepositView.vue'
import SettingsView from '../views/SettingsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Root',
      redirect: { name: 'Home' }
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView
    },
    {
      path: '/create-account',
      name: 'CreateAccount',
      component: CreateAccountView
    },
    {
      path: '/account-details',
      name: 'AccountDetails',
      component: AccountDetailsView
    },
    {
      path: '/transfer',
      name: 'Transfer',
      component: TransferView
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      component: WithdrawView
    },
    {
      path: '/deposit',
      name: 'Deposit',
      component: DepositView
    },
    {
      path: '/settings',
      name: 'Settings',
      component: SettingsView
    },
  ]
})

export default router
