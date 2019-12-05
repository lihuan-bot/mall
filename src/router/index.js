import Vue from 'vue'
import VueRouter from 'vue-router'



const Home = () => import('views/home/Home')
const Cart = () => import('views/cart/Cart')
const Profile = () => import('views/profile/Profile')
const Category = () => import('views/category/Category')
const Detail = () => import('views/detail/Detail')
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
  },
  {
    path: '/detail' ,
    name: Detail,
    component: Detail
  }
]
// 創建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router