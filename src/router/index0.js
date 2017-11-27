import Vue from 'vue'
import Router from 'vue-router'
import NewIncre from '@/components/systemManagement/NewIncre'
import OperationManagement  from '@/components/systemManagement/OperationManagement'
import Character  from '@/components/systemManagement/Character'
import NewCharacter  from '@/components/systemManagement/NewCharacter'
import CreativityClassify  from '@/components/basicData/CreativityClassify'
import Login from '@/components/Login'
import Layout from '@/components/layout/Layout'
import ChangeRecord from '@/components/ChangeRecord'
import ReportOption from '@/components/basicData/ReportOption'
import ProductCase from '@/components/basicData/ProductCase'
import ProductCaseDetails from '@/components/basicData/ProductCaseDetails'
import  CreativityManagement from '@/components/CreativityManagement/CreativityManagement'
import  CreativityIterLists from '@/components/CreativityManagement/CreativityIterLists'
import  CreativityDetails from '@/components/CreativityManagement/CreativityDetails'
import  UserManagement from '@/components/UserManagement/UserManagement'
import { user as UserLogic, site as SiteLogic } from '@/logic';
Vue.use(Router)

 let router = new Router({
  routes: [
    {
      path: '/',
      component: Layout,
      // redirect: '/Layout',
      children: [
        // 这个注释不能删
         {
          path: '/systemManagement',
          component:Character,
          children:[
            {
              name: 'Character',
              path: 'Character',
              component:Character,
            },
            {
              name: 'OperationManagement',
              path: 'OperationManagement',
              component:OperationManagement,
            },
          ]
        },
        {
         path: '/basicData',
         component:CreativityClassify,
         children:[
           {
             name: 'CreativityClassify',
             path: 'CreativityClassify',
             component:CreativityClassify,
           },
           {
             name: 'ReportOption',
             path: 'ReportOption',
             component:ReportOption,
           },
         ]
       },
       {
        path: '/CreativityManagement',
        // component:CreativityManagement,
         component:CreativityDetails,
         children:[
          // {
          //   name: 'CreativityManagement',
          //   path: 'CreativityManagement',
          //   component:CreativityManagement,
          // },
          {
            name: 'CreativityIterLists',
            path: 'CreativityIterLists',
            component:CreativityIterLists,
          },
          {
            name: 'CreativityDetails',
            path: 'CreativityDetails',
            component:CreativityDetails,
          },

        ],
      },
      {
       path: '/UserManagement',
       // component:CreativityManagement,
        component:UserManagement,
        children:[
         // {
         //   name: 'CreativityManagement',
         //   path: 'CreativityManagement',
         //   component:CreativityManagement,
         // },

       ],
     }
        //  {
        //   name: 'NewCharacter',
        //   path: '/systemManagement',
        //   component:NewCharacter,
        // },
        // {
        //   name:'CreativityClassify',
        //   path:'/basicData',
        //   component:CreativityClassify,
        // },
        // {
        //   name:'ReportOption',
        //   path:'/basicData',
        //   component:ReportOption,
        // },
        // {
        //   name:'ChangeRecord',
        //   path:'/ChangeRecord',
        //   component:ChangeRecord,
        // },
        // {
        //   name:'ChangeRecord',
        //   path:'/ChangeRecord',
        //   component:ChangeRecord,
        // },
        // {
        //   name:'ProductCase',
        //   path:'/basicData',
        //   component:ProductCase,
        // },
        // {
        //   name:'ProductCaseDetails',
        //   path:'/basicData',
        //   component:ProductCaseDetails,
        // },

      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
});


export default router;
