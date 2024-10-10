//创建一个路由器，并暴露出去

//1.引入createRouter
import { createRouter,createWebHashHistory} from "vue-router";
//引入一个一个可能要呈现的组件
import ShouYe from "@/views/ShouYe.vue";
import FaBu from "@/views/FaBu.vue";
import DengLu from "@/views/DengLu.vue";
import ZhuCe from "@/views/ZhuCe.vue";
import XiangMu from "@/views/XiangMu.vue";
import WoFabu from "@/views/WoFabu.vue";
import WoCanyu from "@/views/WoCanyu.vue";
import WoShenqing from "@/views/WoShenqing.vue";
import WoShenghe from "@/views/WoShenghe.vue";
import XiaoXi from "@/views/XiaoXi.vue";
import ProgramDetail from "@/views/ProgramDetail.vue";
import LiaoTian from "@/views/LiaoTian.vue";
import FaXian from "@/views/FaXian.vue";
import HomeProjectDetail from "@/views/HomeProjectDetail.vue";

//2.创建路由器
const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/',
            component:ShouYe
        },
        {
            path:'/shouye',
            component:ShouYe,
        },
        {
            path: '/project/:project',
            name: 'HomeProjectDetail',
            component: HomeProjectDetail,
            props: true // 这会使项目通过 props 传递
          },
          
          
        {
            name:'FaXian',
            path:'/faxian',
            component:FaXian
        },
        {
            name:'FaBu',
            path:'/fabu',
            component:FaBu
        },
        {
            path:'/denglu',
            component:DengLu
        },
        {
            path:'/zhuce',
            component:ZhuCe
        },
        {
            path:'/liaotian',
            component:LiaoTian
        },
        {
            path:'/xiangmu',
            component:XiangMu,
            children:[
                {
                    path: '',  
                    redirect: '/xiangmu/wofabu'
                },
                {
                    name:'WoFabu',
                    path:'wofabu',
                    component:WoFabu
                },
                {
                    path:'wocanyu',
                    component:WoCanyu
                },
                {
                    path:'woshenqing',
                    component:WoShenqing
                },
                {
                    path:'woshenghe',
                    component:WoShenghe
                },
                {
                    path:'xiaoxi',
                    component:XiaoXi
                }
            ]
        },
        {
            path: '/project/:id', // 动态路由
            name: 'ProgramDetail',
            component: ProgramDetail,
            props: true, // 允许将路由参数作为 props 传递给组件
          }
    ]
})

//3.暴露路由器
export default router