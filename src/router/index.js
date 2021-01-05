import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Recommend = () => import('../views/Recommend')
const Singer = () => import('../views/Singer')
const Rank = () => import('../views/Rank')
const Search = () => import('../views/Search')
const Detail = () => import('../views/Detail')
const Account = () => import('../views/Account')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/recommend'
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: Recommend,
    children: [
      {
        path: 'detail/:id/:type',
        name: 'Detail',
        component: Detail
      }
    ]
  },
  {
    path: '/singer',
    name: 'Singer',
    component: Singer,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/rank',
    name: 'Rank',
    component: Rank,
    children: [
      {
        path: 'detail/:id/:type',
        component: Detail
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  }
]

const router = new VueRouter({
  // mode: 'history',
  // base: process.env.BASE_URL,
  routes
})

export default router
