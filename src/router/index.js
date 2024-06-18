import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import SponsorTable from '../components/SponsorTable.vue';
import SponsorForm from '../components/SponsorForm.vue';
import ProcessSponsor from '../components/ProcessSponsor.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/sponsor-table',
      name: 'SponsorTable',
      component: SponsorTable
    },
    {
      path: '/process-sponsor',
      name: 'ProcessSponsor',
      component: ProcessSponsor
    },
    {
      path: '/sponsor-form',
      name: 'SponsorForm',
      component: SponsorForm
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/'
    }
  ]
});

export default router;
