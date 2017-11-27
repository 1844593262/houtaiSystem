<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item :to="{ path: '/UserManagement/UserManagement' }">用户管理</el-breadcrumb-item>
                   <el-breadcrumb-item>用户详情</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div class="CreativityIterations" style="margin-top:15px;">
          <el-row>
               <el-col :span="8">
                   <el-button type="text">昵称:<span>{{tableData.nikeName}}</span></el-button></br>
                   <el-button type="text">注册时间:<span>{{tableData.createTime|dateFilter}}</span></el-button>
               </el-col>
                <el-col :span="12">
                    <el-button type="text" align="left">手机号码:<span>{{tableData.telephone}}</span></el-button></br>
                    <el-button type="text">最近登录时间:<span>{{tableData.lastUpdate|dateFilter}}</span></el-button>
                </el-col>
               <el-col :span="4">
                     <el-button style="width:120px;height:40px;margin-top: 32px;" @click="goback">返回</el-button>
              </el-col>
          </el-row>
       </div>
       <el-row>
            <el-col :span="23" :push="1">
                <el-tabs v-model="activeName"  style="margin-bottom:15px;">
                      <el-tab-pane label="发布的创意" name="publishNews"></el-tab-pane>
                      <el-tab-pane label="参与的创意" name="JoinIdeal"></el-tab-pane>
                      <el-tab-pane label="被举报的创意" name="ReportedIdeal"></el-tab-pane>
                </el-tabs>
            </el-col>
       </el-row>
       <el-row>
            <components :is="activeName"></components>
       </el-row>
   </Page>
</template>
<style scoped>
.el-table::after, .el-table::before {
    background-color:none;
}
.CreativityIterations{
    background-color:#EFF2F7;
    color:#1F2D3D;
    padding: 22px 70px;
    margin-bottom:12px;
}
.el-button+.el-button {
    margin-left: 350px;
}
.el-button--text{
   color:#1F2D3D;
}
.el-step__icon{
  display:none;
}
.el-tabs__header {
   width:24%;
}
</style>
<script>
    import {managerUserPublishApi} from '@/api/api'
    import {managerUserDetailApi} from '@/api/api'
    import Page from '@/components/layout/Page'
    import publishNews from '@/components/UserManagement/publishNews'
    import ReportedIdeal from '@/components/UserManagement/ReportedIdeal'
    import JoinIdeal from '@/components/UserManagement/JoinIdeal'
    import {formatDate,date} from '@/util/date-format'
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };
    export  default{
        data(){
          return{
              total:0,
              id:"",
              tableData:{},
              dialogVisible: false,
              title:"",
              currentPage3: 3,
              activeName: 'publishNews',
              queryParams:{
                 name:'',
                 value:""
              },
              userId : this.$route.query.userId
          }
        },
        components:{
           Page,publishNews,ReportedIdeal,JoinIdeal
        },
        methods: {
            goback(){
                this.$router.go(-1);
            }
        },
        filters:{
             dateFilter,date
         },
        mounted(){
             var vm=this;
             managerUserDetailApi(this.userId).then(data => {
                  vm.tableData=data.data;
                  vm.tableData.nikeName=data.data.nikeName;
                  vm.tableData.createTime=data.data.createTime;
                  vm.tableData.telephone=data.data.telephone;
                  vm.tableData.updateTime=data.data.updateTime;
             }).catch((err) => {
                 self.$message.error(err.message);
             })
          }
    }
</script>
<style lang="css" type="text/css" scoped>
    .block{
        width:100%;
        text-align:center;
        margin-top:10px;
        margin-left:20px;
    }
</style>
