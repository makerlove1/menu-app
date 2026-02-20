import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/Home.vue';
import { getAuth } from 'firebase/auth';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/signin',
    name: 'SignIn',
    component: () => import('@/views/SignIn.vue'),
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('@/views/SignUp.vue'),
  },

  {
    path: '/user-dashboard',
    name: 'UserDashboard',
    component: () => import('@/views/UserDashboard.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/admin-dashboard',
    name: 'AdminDashboard',
    component: () => import('@/views/AdminDashboard.vue'),
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
    },
  },

  {
    path: '/meal-details/:id',
    name: 'MealDetails',
    component: () => import('@/views/MealDetails.vue'),
    props: true,
  },

  {
    path: '/menu-order',
    name: 'MenuOrder',
    component: () => import('@/views/MenuOrder.vue'),
  },
];

const router = createRouter({
  scrollBehavior() {
    return { top: 0 };
  },
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth);
  const isAuthenticated = getAuth().currentUser;
  
  if (requiresAuth && !isAuthenticated) {
    next('/signin');
  } else {
    next();
  }
});

export default router;
