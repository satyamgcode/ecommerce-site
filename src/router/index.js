import { createRouter, createWebHistory } from "vue-router";
import footerPage from '../components/footerPage.vue'
import landingPage from "../components/landingPage.vue";
import RegisterPage from "../components/registerPage.vue";
import loginPage from "../components/loginPage.vue";
import AddDetails from "../components/getProductDetails.vue"
import ProductDetials from"../components/productDetails.vue"
import cart from  "../components/cart.vue"
import contact from "../components/contactPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: landingPage
    },
    {
        path: '/footer',
        name: 'footer',
        component: footerPage
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterPage
    },
    {
        path: '/login',
        name: 'login',
        component: loginPage
    },
    {
      path: '/addDetails',
      name: 'addDetals',
      component: AddDetails
    },
    {
      path: '/showDetails/:id',
      name: 'showDetails',
      component:  ProductDetials
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact
    },
    {
      path: '/discover',
      name: 'Discover',
      component: DiscoverPage,
    }
  ]
});

export default router
