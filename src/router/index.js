import Vue from 'vue'
import Router from 'vue-router'
import OperationManagement  from '@/components/systemManagement/OperationManagement'
import Character  from '@/components/systemManagement/Character'
import SystemManagement  from '@/components/systemManagement/SystemManagement'
import NewCharacter  from '@/components/systemManagement/NewCharacter'
import NewIncre  from '@/components/systemManagement/NewIncre'
import CreativityClassify  from '@/components/basicData/CreativityClassify'
import Login from '@/Login'
import Layout from '@/components/layout/Layout'
import ChangeRecord from '@/components/ChangeRecord'
import ReportOption from '@/components/basicData/ReportOption'
import ProductIncre from '@/components/basicData/ProductIncre'
import ProductCaseDetails from '@/components/basicData/ProductCaseDetails'
import ProductCase from '@/components/basicData/ProductCase'
import  CreativityManagement from '@/components/CreativityManagement/CreativityManagement'
import  CreativityIterLists from '@/components/CreativityManagement/CreativityIterLists'
import  UserManagement from '@/components/UserManagement/UserManagement'
import   inviteNewUser from '@/components/UserManagement/inviteNewUser'
import  UserManagementDetails from '@/components/UserManagement/UserManagementDetails'
import  UserMessagePush from '@/components/UserManagement/UserMessagePush'
import  UserReport from '@/components/UserReport/UserReport'
import  UserReportDealing  from '@/components/UserReport/UserReportDealing'
import   ValidReport  from '@/components/UserReport/ValidReport'
import  ReportDealed  from '@/components/UserReport/ReportDealed'
import  CreativityDetails from '@/components/CreativityManagement/CreativityDetails'
import  Advicefeedback from '@/components/Advicefeedback/Advicefeedback'
import  ArticleManagement from '@/components/basicData/ArticleManagement'
import  ArticleIncre from '@/components/basicData/ArticleIncre'
import  ArticleEditor from '@/components/basicData/ArticleEditor'
import   ProductDetails from '@/components/basicData/ProductDetails'
import  WangEditor from '@/components/basicData/WangEditor'
import  UserDetails from '@/components/UserManagement/UserDetails'
import  InvitationCode from '@/components/InvitationCode/InvitationCode'
import  Questionsurvery  from '@/components/Questionsurvery/Questionsurvery'
import { user as UserLogic, site as SiteLogic } from '@/logic';
Vue.use(Router)
 let router = new Router({
  routes: [
     {
       path: '/',
       component: Login,
       redirect: '/Login',
     },
     {
      path: '/systemManagement',
      component: Layout,
      redirect: '/Layout',
      children: [
        // 这个注释不能删
         {
            path: 'Character',
            name: 'Character',
            component:Character,
        },
        {
            path: 'SystemManagement',
            name: 'SystemManagement',
            component:SystemManagement,
       },
        {
          name: 'OperationManagement',
          path: 'OperationManagement',
          component:OperationManagement,
        },
        {
          name: 'NewCharacter',
          path: 'NewCharacter',
          component:NewCharacter,
        },
        {
          name: 'NewIncre',
          path: 'NewIncre',
          component:NewIncre,
        },
      ]
    },
    {
      path: '/basicData',
      component: Layout,
      // redirect: '/Layout',
      children: [
        // 这个注释不能删
         {
          path: 'CreativityClassify',
          name: 'CreativityClassify',
          component:CreativityClassify,
        },
        {
          name: 'ReportOption',
          path: 'ReportOption',
          component:ReportOption,
        },
        {
          name: 'ProductCase',
          path: 'ProductCase',
          component:ProductCase,
        },
        {
          name: 'ProductIncre',
          path: 'ProductIncre',
          component:ProductIncre,
        },
        {
          name: 'ArticleManagement',
          path: 'ArticleManagement',
          component:ArticleManagement,
        },
        {
          name: 'ProductCaseDetails',
          path: 'ProductCaseDetails',
          component:ProductCaseDetails,
        },
        {
          name: 'WangEditor',
          path: 'WangEditor',
          component:WangEditor,
        },
        {
            name: 'ArticleIncre',
            path: 'ArticleIncre',
            component:ArticleIncre,
        },
        {
            name: 'ArticleEditor',
            path: 'ArticleEditor',
            component:ArticleEditor,
        },
        {
            name: 'ProductDetails',
            path: 'ProductDetails',
            component:ProductDetails,
        }
      ]
    },
    {
      path: '/UserManagement',
      component: Layout,
      children: [
        {
         path: 'UserManagement',
         name: 'UserManagement',
         component:UserManagement,
       },
         {
          path: 'UserManagementDetails',
          name: 'UserManagementDetails',
          component:UserManagementDetails,
        },
        {
          path: 'UserMessagePush',
          name: 'UserMessagePush',
          component:UserMessagePush,
        },
        {
          path: 'UserDetails',
          name: 'UserDetails',
          component:UserDetails,
        },
        {
          path: 'inviteNewUser',
          name: 'inviteNewUser',
          component:inviteNewUser,
        }
      ]
    },
    {
      path: '/UserReport',
      component: Layout,
      children: [
         {
          path: 'UserReport',
          name: 'UserReport',
          component:UserReport,
        },
        {
         path: 'UserReportDealing',
         name: 'UserReportDealing',
         component:UserReportDealing,
       },
       {
        path: 'ReportDealed',
        name: 'ReportDealed',
        component:ReportDealed,
      },
      {
       path: 'ValidReport',
       name: 'ValidReport',
       component:ValidReport,
     },
      ]
    },
    {
      path: '/Advicefeedback',
      component: Layout,
      children: [
         {
          path: 'Advicefeedback',
          name: 'Advicefeedback',
          component:Advicefeedback,
        },
      ]
    },
    {
        path: '/CreativityManagement',
        component: Layout,
        children: [
           {
              path: 'CreativityManagement',
              name: 'CreativityManagement',
              component:CreativityManagement,
          },
          {
             path: 'CreativityIterLists',
             name: 'CreativityIterLists',
             component:CreativityIterLists,
         },
         {
            path: 'CreativityDetails',
            name: 'CreativityDetails',
            component:CreativityDetails,
        },
        ]
    },
    {
        path: '/UserReport',
        component: Layout,
        children: [
           {
            path: 'UserReport',
            name: 'UserReport',
            component:UserReport,
          }
        ]
    },
    {
        path: '/Advicefeedback',
        component: Layout,
        children: [
           {
            path: 'Advicefeedback',
            name: 'Advicefeedback',
            component:Advicefeedback,
          }
        ]
    },
    {
        path: '/InvitationCode',
        component: Layout,
        children: [
           {
            path: 'InvitationCode',
            name: 'InvitationCode',
            component:InvitationCode,
          }
        ]
    },
    {
        path: '/Questionsurvery',
        component: Layout,
        children: [
           {
            path: 'Questionsurvery',
            name: 'Questionsurvery',
            component:Questionsurvery,
          }
        ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    }
  ]
});
export default router;
