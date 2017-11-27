import Axios from 'axios'
let baseUrl = process.env.NODE_ENV === 'production'?'/api':'http://www.kaizao.dev.sudaotech.com/api';
let API = Axios.create({
    baseURL: baseUrl,
})
function loginApi (data) {
    return API.post('/cloud/component/managerUser/login', data).then(res => res.data)
}
function CreativityClassifyApi (data) {//创意分类
  return API.get('/category', {
      params: data
  }).then(res => res.data)
}
function CreativityClassifyDetailApi(id) {//查看创意分类
    return API.get(`/category/${id}`).then(res => res.data)
}
function IncreClassifyDetailApi(data) {//新增创意分类
    return API.post('/category/create',data).then(res => res.data)
}
function  SaveClassifyDetailApi(id,data) {//保存创意分类
    return API.post(`/category/update/${id}`,data).then(res => res.data)
}
function    DelClassifyDetailApi(id) {//删除创意分类
    return API.delete(`/category/delete/${id}`).then(res => res.data)
}
function ReporttypeMaintence(data) {//举报类型维护
  return API.get('/cloud/component/information', {
      params: data
  }).then(res => res.data)
}
function  IncreReportApi(data) {//新增举报类型
    return API.post('/cloud/component/information/createReportOption',data).then(res => res.data)
}
function  SearchReportApi(id) {//查看举报类型
    return API.get(`/report/${id}`).then(res => res.data)
}
function  LookCase(id) {//查看案例
    return API.get(`/idea/detail/all/${id}`).then(res => res.data)
}
function  SaveReportApi(id,data) {//保存举报类型
    return API.post(`/report/update/${id}`,data).then(res => res.data)
}
function ArticleManagementApi(data){//文章管理
   return API.get('/article',{
      params:data
   }).then(res=>res.data)
}
function  ArticleLookApi(id) {//文章预览
    return API.get(`/article/${id}`).then(res => res.data)
}
function  DelArticleManagementApi(id) {//删除文章管理
    return API.delete(`/article/${id}`,).then(res => res.data)
}
function  AditorarticleManagementApi(id) {//编辑文章
    return API.get(`/article/${id}`,).then(res => res.data)
}
function  SavearticleApi(data) {//保存文章
    return API.post('/article',data).then(res => res.data)
}
function   UpdateAriticle(id,data) {//更新文章
    return API.put(`/article/${id}`,data).then(res => res.data)
}
function productCaseApi(data){//推荐案例
   return API.get('/idea',{
      params:data
   }).then(res=>res.data)
}
function   editProductCaseApi(data) {//编辑推荐案例
    return API.put('/idea',data).then(res => res.data)
}
function  IncreproductCaseApi(data) {//新增推荐案例
    return API.post('/idea/new/idea',data).then(res => res.data)
}
function   EditorApi(id) {//编辑案例
    return API.post(`/idea/update/${id}`).then(res => res.data)
}
function   delRecommandCaseApi(id){//推荐案例的删除
    return API.delete(`/idea/plan/delete/${id}`).then(res => res.data)
}
function idealManagementApi(data){//创意管理
    return API.get('/idea/find/allInfo',{
       params:data
    }).then(res=>res.data)
 }
 function idealManagementDetaillApi(id){//创意管理的详情列表
     return API.get(`/idea/detail/all/${id}`).then(res=>res.data)
  }
  function idealListApi(data){//创意管理的详情列表的下半部分
      return API.get('/idea/backstage/versions',{params:data}).then(res=>res.data)
  }
   function idealPlanDetailApi(id){//创意某个plan的详情列表的下半部分
       return API.get(`/idea/detail/findAll/plan/${id}`).then(res=>res.data)
    }
  // function idealMangeDetail(id1){//创意管理具体的详情列表
  //     return API.get(`/idea/detail/${id1}`).then(res=>res.data)
  //  }
 function managerUserApi(data) {//用户管理
     return API.get('/cloud/component/user', {
         params: data
     }).then(res => res.data)
 }
 function  inviteUserApi(data) {//邀请新用户
     return API.get('/questionnaire/archives', {
         params: data
     }).then(res => res.data)
 }
 function   IncremanagerUserApi(data) {//新增用户
     return API.put(`/cloud/component/user/update/${id}`,data).then(res => res.data)
 }
 function  managerUserDetailApi(id){//用户管理的详情
     return API.get(`/cloud/component/user/${id}`).then(res=>res.data)
  }
  function  managerUserPublishApi(data){//用户发布的创意
      return API.get('/idea/publishes',{params:data}).then(res=>res.data)
   }
 function  managerUserJoinhApi(data){//用户参与的创意
     return API.get('/idea/contributes',{params:data}).then(res=>res.data)
  }
  function  managerUserReportedApi(data){//用户被举报的创意
      return API.get('/idea/beReports',{params:data}).then(res=>res.data)
   }
 function UserReportApi(data){//用户举报
     return API.get('/report',{
        params:data
     }).then(res=>res.data)
  }
  function  delReportApi(id){//用户举报的删除
      return API.delete(`/cloud/component/information/delete/${id}`).then(res=>res.data)
   }
  function UserReportDetailApi(id){//用户举报的详情
      return API.get(`/report/${id}`).then(res=>res.data)
   }
   function  confirReportApi(data) {//确认增加举报案例
       return API.post('/report/valid/report',data).then(res => res.data)
   }
   function  unEffectReportApi(id,data) {//无效举报的案例
       return API.post(`/report/update/${id}`,data).then(res => res.data)
   }
   function  pushMessageApi(data) {//推送消息
       return API.post('/pushMessage/push',data).then(res => res.data)
   }
  function AdvicefeedbackApi(data){//意见反馈
      return API.get('/feedback',{
         params:data
      }).then(res=>res.data)
   }
   function AdviceAlreadyApi(id,data){//标记已读
         return API.put(`/feedback/update/${id}`,data).then(res=>res.data)
   }
   function AdviceDetailfeedbackApi(id){//意见反馈的详情
       return API.get(`/feedback/${id}`).then(res=>res.data)
  }
  function  statistical(data){//获取发布，参与，被举报的信息
      return API.get('/cloud/component/user/statistical',{
         params:data
      }).then(res=>res.data)
  }
  // function  HiddenIdealApi(id) {//隐藏前台创意
  //     return API.delete(`/idea/plan/delete/${id}`).then(res => res.data)
  // }
  function  HiddenIdealApi(id) {//隐藏前台创意
      return API.delete(`idea/plan/delete/${id}`).then(res => res.data)
  }
  function   showIdealApi(id) {//显示前台创意
      return API.put(`idea/plan/normalPlan/${id}`).then(res => res.data)
  }
  function getInviteCodeApi(data){//获取激活码
     return API.get('/commons/invitation',{params:data}).then(res=>res.data)
  }
  function generateInviteCodeApi(){//生成激活码
     return API.post('/commons/invitation').then(res=>res.data)
  }
  function  questionSurveryApi(data){//问卷调查
     return API.get('/questionnaire/archives',{
        params:data
     }).then(res=>res.data)
  }
  function   CertainFeedbackApi(data){//意见反馈确认回复消息
     return API.post('/feedback/reply/feedback',data).then(res=>res.data)
  }
export{
    idealManagementDetaillApi,idealPlanDetailApi,
    loginApi,
    CreativityClassifyApi,ReporttypeMaintence,ArticleManagementApi,productCaseApi,idealManagementApi,AdvicefeedbackApi,
    CreativityClassifyDetailApi,IncreClassifyDetailApi,DelArticleManagementApi,AditorarticleManagementApi,UserReportApi,
    UserReportDetailApi,AdviceDetailfeedbackApi,managerUserApi,SavearticleApi,SaveClassifyDetailApi,IncreReportApi,SaveReportApi,
    SearchReportApi,IncreproductCaseApi,managerUserDetailApi,IncremanagerUserApi,
    managerUserPublishApi,ArticleLookApi,managerUserJoinhApi,managerUserReportedApi,pushMessageApi,LookCase,EditorApi,confirReportApi,
    DelClassifyDetailApi,delReportApi,statistical,delRecommandCaseApi,editProductCaseApi,inviteUserApi,getInviteCodeApi,generateInviteCodeApi,
    HiddenIdealApi,questionSurveryApi,UpdateAriticle,AdviceAlreadyApi,CertainFeedbackApi,idealListApi,showIdealApi,unEffectReportApi
}
