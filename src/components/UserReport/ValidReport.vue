<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item :to="{ path: '/UserReport/UserReport' }">用户举报</el-breadcrumb-item>
                   <el-breadcrumb-item>举报详情</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div class="ReportInformation">
          <el-row>
                 <h2>举报信息</h2>
                <el-col :span="12" :push="1">
                 <div class="conLef">
                     <el-button type="text">举报人:
                          <span>{{tableData.createUserName}}</span>
                     </el-button></br>
                     <el-button type="text">手机号码:
                        <span>{{tableData.reportUserPhone}}</span>
                     </el-button></br>
                     <el-button type="text">举报类型:<span>{{tableData.reason}}</span></el-button>
                 </div>
              </el-col>
              <el-col :span="8" :push="4">
                   <!-- <el-button type="text" align="left">处理状态:<span>{{tableData.processStatus|statu}}</span></el-button></br> -->
                   <el-button type="text">举报迭代版本号:<span>{{tableData.reportVersion}}</span></el-button>
              </el-col>
          </el-row>
       </div>
       <div class="ReportCreInfor">
           <el-row>
                <h2>举报创意信息</h2>
                <el-col :span="8" :push="1">
                  <div class="conLef">
                      <el-button type="text">创意标题:<span>{{idealData.title}}</span></el-button></br>
                      <el-button type="text">创建人:<span>{{tableData.createUserName}}</span></el-button>
                  </div>
                </el-col>
                <el-col :span="8" :push="8">
                    <!--<el-button type="text" align="left">状态:<span>{{idealData.audit|statu}}</span></el-button></br>-->
                    <el-button type="text">创建时间:<span>{{idealData.createTime|dateFilter}}</span></el-button></br>
                    <el-button type="text">当前迭代数:<span>{{idealData.planVersion}}</span></el-button>
               </el-col>
         </el-row>
       </div>
       <el-row>
          <el-col :span="24">
               <div class="PictText" style="background-color:#EFF2F7;padding:50px 0;margin-top:10px;">
                   <el-row>
                      <el-col :span="11" :push="6">
                          <div class="woreditor">
                               <p>{{idealData.iterationDescription}}</p>
                               <p>{{idealData.description}}</p>
                          </div>
                      </el-col>
                   </el-row>
                   <div v-for="list in planContextList" :v-key="list.contextId">
                       <p v-if="list.contextType=='TEXT'">{{list.value}}</p>
                       <el-row v-if="list.contextType=='IMAGE'">
                            <el-col :span="16" :push="6"><img :src="list.value" alt="" class="pic1"> </el-col>
                       </el-row>
                       <el-row>
                         <el-col :span="11"  :push="6">
                             <div v-if="list.contextType=='VIDEO'">
                                 <video  width="600"  height="600" controls>
                                      <source :src="list.value" type="video/ogg" />
                                      <source :src="list.value" type="video/mp4" />
                                      <embed :src="list.value" type="application/x-shockwave-flash"
                                      width="320" height="240" allowscriptaccess="always" allowfullscreen="true"></embed>
                                  </video>
                             </div>
                       </el-col>
                     </el-row>
                   </div>
            </div>
            <!-- <div class="ConTex" style="width:60%;margin:0 auto;">
                 <p>{{tableArray1.value}}</p>
                 <p>{{tableArray1.value}}</p>
                 <el-row>
                      <el-col :span="16" :push="4"><img :src="tableArray2.value" alt="" class="pic1"> </el-col>
                 </el-row>
                 <el-row>
                      <el-col :span="16" :push="4"><img :src="tableArray2.value" alt="" class="pic1"> </el-col>
                 </el-row>
                <div v-if="videshow">
                    <video width="320" height="240" controls>
                         <source :src="tableArray3.value" type="video/ogg" />
                         <source :src="tableArray3.value" type="video/mp4" />
                         <embed :src="tableArray3.value" type="application/x-shockwave-flash"
                         width="320" height="240" allowscriptaccess="always" allowfullscreen="true"></embed>
                     </video>
                </div>
            </div> -->
          </el-col>
      </el-row>
      <div class="ReportDeal">
          <div class="CreaIterLef">
             <h2>举报处理</h2>
             <div class="repDeal" style="width:60%;  margin:20px auto;">
                <el-form :inline="true" :model="queryParams">
                  <el-form-item label="处理方式">
                       <!-- <el-radio class="radio" v-model="radio" label="1">无效举报</el-radio> -->
                       <span style="color:red">此举报已处理</span>
                  </el-form-item>

               </el-form>
             </div>
             <el-row>
               <div class="bottomBtn">
                 <el-col :span="4" :push="20">
                      <el-button  style="width:120px" @click="goback">返回</el-button>
                 </el-col>
               </div>
            </el-row>
          </div>
      </div>
   </Page>
</template>
<style scoped>
.el-table::after, .el-table::before {
    background-color:none;
}
.ReportInformation,.ReportCreInfor,.PictText,.ReportDeal{
    background-color:#EFF2F7;
    color:#1F2D3D;
    padding: 22px 70px;
    margin-bottom:12px;
}
.el-button--text{
   color:#1F2D3D;
}
.ReportInformation{
    margin-top:10px;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    import {UserReportDetailApi} from '@/api/api'
    import {idealPlanDetailApi} from '@/api/api'
    import {confirReportApi} from '@/api/api'
    import {formatDate,date} from '@/util/date-format'
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };
    export  default{
        data(){
          return{
              tableData:{},
              idealData:{},
              planContextList:[],
              dialogVisible: false,
              title:"",
              currentPage3: 3,
              queryParams:{
                "type": "PLAN",
                "title": "",
                "id": 0,
                "reason": "经鉴定，该创意版本存在违规，平台已隐藏该创意版本并对发布者进行警告，感谢您的反馈！"
              },
              radio:'1',
              textarea:'',
              videshow:false
          }
        },
        filters:{
             dateFilter,date,
             statu:function (data) {
                 switch (data){
                     case 'UN_CHECK':
                         return '未处理'
                         break;
                     case 'CHECK':
                         return '已处理'
                         break;
                     case 'EFFSOLVED':
                         return ' 有效举报'
                         break;
                     case 'PLAN':
                         return '案例'
                         break;
                     case 'INSOLVED':
                         return '无效举报'
                         break;
                 }
             },
         },
        components:{
           Page
        },
        mounted(){
            var params=this.$route.query.reportId;
            var params1=this.$route.query.ideaId;
            var vm=this;
            vm.queryParams.id=this.$route.query.reportId;
            UserReportDetailApi(params).then(data => {
              console.log(data.data);
                vm.tableData=data.data;
            }).catch((err) => {
                 vm.$message.error(err.message);
            })
            idealPlanDetailApi(params1).then(data => {
                 console.log(data.data);
                 vm.idealData=data.data.planResp;
                 vm.planContextList=data.data.planContextList;
                 vm.queryParams.title=data.data.planResp.title;
                //  var tc=vm.tableArray[0].contextType;
                //  if(tc=="TEXT"){
                //      vm.tableArray1.value=vm.tableArray[0].value;
                //  }
                //  if(tc=="IMAGE"){
                //      vm.tableArray2.value=vm.tableArray[0].value;
                //  }
                //  if(tc=="VIDEO"){
                //      vm.videshow=true;
                //      vm.tableArray3.value=vm.tableArray[0].value;
                //  }
            }).catch((err) => {
                 vm.$message.error(err.message);
            })
        },
        methods: {
            getList(params){
              var self=this;
              CreativityClassifyApi(params).then(data => {
                  var creativeData=data.data;
                  self.tableData =creativeData.items;
                  self.total = creativeData.total;
              }).catch((err) => {
                  self.$message.error(err.message);
              })
            },
            goback(){
                this.$router.go(-1);
            },
        },
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
