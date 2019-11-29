import Vue from 'vue'
import VueRouter from 'vue-router'



const Home = () => import('views/home/home')
const Cart = () => import('views/cart/cart')
const Profile = () => import('views/profile/profile')
const Category = () => import('views/category/category')
//1 安裝插件
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: Home,
    component: Home
  },
  {
    path: '/cart',
    name: Cart,
    component: Cart
  },
  {
    path: '/profile',
    name: Profile,
    component: Profile
  },
  {
    path: '/category',
    name: Category,
    component: Category
  }
]
// 創建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router