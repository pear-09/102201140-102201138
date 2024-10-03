import Vue from 'vue';
import Router, { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path:"/",
    name:'home',
    component:() => import('../views/Home.vue')
  },
  {
    path:"/discover",
    name:'discover',
    component:() => import('../views/Discover.vue')
  }
  ,
  {
    path:"/messages",
    name:'messages',
    component:() => import('../views/Messages.vue')
  }
  ,
  {
    path:"/post",
    name:'post',
    component:() => import('../views/Post.vue')
  },
  {
    path:"/DiscoverDetails/:kind",
    name:'discoverDetails',
    component:() => import('../views/DiscoverDetails.vue')
  },
  {
    path:"/LeftSidebar",
    name:'leftSidebar',
    component:() => import('../views/LeftSidebar.vue')
  },
  {
    path:"/personalinformation",
    name:'personalinformation',
    component:() => import('../views/Personalinformation.vue')
  },
  {
    path:"/UserHeader",
    name:'userHeader',
    component:() => import('../views/UserHeader.vue')
  },
  {
    path:"/jianjie",
    name:"jianjie",
    component:() => import('../views/jianjie.vue')
  },
  {
    path:"/projectprocess",
    name:"projectprocess",
    component:() => import('../views/ProjectProcess.vue')
  },
  {
    path:"/joinapply",
    name:"joinapply",
    component:() => import('../views/JoinApply.vue')
  },
  {
    path:"/settings",
    name:"settings",
    component:() => import('../views/settings.vue')
  },
  {
    path:"/userlogin",
    name:"userlogin",
    component:() => import('../views/UserLogin.vue')
  },
  {
    path: '/project/:id',
    name: 'ProjectDetails',
    component:() => import('../views/ProjectDetail.vue')
  }
 
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})

export default router;