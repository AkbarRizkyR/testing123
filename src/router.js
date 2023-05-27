import Vue from 'vue'
import Router from 'vue-router'
import LoginViewPage from './components/LoginViewPage.vue'
import RegisterViewPage from './components/RegisterViewPage.vue'
import DashboardViewPage from './components/DashboardViewPage.vue'
import BarangList from './components/BarangList.vue'
import TambahBarang from './components/TambahBarang.vue'
import SupplierList from './components/SupplierList.vue'
import UpdateBarang from './components/UpdateBarang.vue'
import TambahSupplier from './components/TambahSupplier.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
     {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: LoginViewPage
    },
    {
      path: '/register',
      component: RegisterViewPage
    },
    {
      path: '/dashboard',
      component: DashboardViewPage,
      children: [
        {
          path: 'barang',
          component: BarangList,
        },
        {
          path: 'barang/tambah',
          component: TambahBarang,
        },
        {
            path: 'barang/update',
            component: UpdateBarang,
          },
        {
          path: 'supplier',
          component: SupplierList,
        },
        {
          path: 'supplier/tambah',
          component: TambahSupplier,
        }
      ]
    }
  ]
})
