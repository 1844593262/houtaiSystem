<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>用户举报</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
         <div class="classify" scoped>
            <el-form :inline="true" :model="queryParams">
                   <span class="demonstration" style="margin-left:30px;">统计时间</span>
                   <el-date-picker
                     v-model="beginTime"
                     align="right"
                     type="date"
                     placeholder="开始时间"
                     :picker-options="startDate"   value-format="yyyy-MM-dd">
                   </el-date-picker>
                   <el-date-picker
                     v-model="endTime"
                     align="right"
                     type="date"
                     placeholder="结束时间"
                     :picker-options="endDate" value-format="yyyy-MM-dd">
                   </el-date-picker>
                    <el-form-item label="举报人" style="margin-left:30px;">
                        <el-input   v-model="queryParams.createUserName"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="search">搜索</el-button>
                        <el-button type="default" @click="reset">重置</el-button>
                    </el-form-item>
            </el-form>
          </div>
       <el-row style="padding:0 20px;">
         <el-col :span="24">
             <el-table  :data="tableData" stripe border>
                  <el-table-column align="center" label="举报人" prop="publish">
                      <template scope="scope">
                           {{scope.row.createUserName}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="举报人手机号" prop="iphoneNumber">
                      <template scope="scope">
                           {{scope.row.reportUserPhone}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="举报时间" prop="publishtime">
                      <template scope="scope">
                           {{scope.row.createTime|dateFilter}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="创意标题" prop="CreativityTitle">
                      <template scope="scope">
                           {{scope.row.title}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="举报迭代版本" prop="iterations">
                      <template scope="scope">
                           {{scope.row.reportVersion}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="被举报人" prop="BrowerTimes">
                      <template scope="scope">
                           {{scope.row.beReportedName}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="迭代次数" prop="RecentIterationsTime">
                      <template scope="scope">
                           {{scope.row.version}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="处理状态" prop="state">
                      <template scope="scope">
                           {{scope.row.processStatus|statu}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                       <template scope="scope">
                           <div class="opreator-cell">
                               <el-button type="text"
                               @click="gotoDetail(scope.row.reportId,scope.row.processStatus,
                               scope.row.relationId,scope.row.beReportedId)">详情</el-button>
                           </div>
                       </template>
                 </el-table-column>
             </el-table>
          </el-col>
        </el-row>
        <el-row>
            <el-col :span="23">
              <div class="block" style="width:100%;">
                <el-pagination
                        @current-change="handleCurrentChange"
                        :current-page="tableParams.page"
                        layout="prev, pager, next"
                        :total="total">
                </el-pagination>
              </div>
            </el-col>
        </el-row>
   </Page>
</template>
<style scoped>
.el-table::after, .el-table::before {
    background-color:none;
}
.classify{
   padding-left:20px;
   margin-top:20px;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    import {UserReportApi} from '@/api/api'
    import {idealManagementApi} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    import UserReportDealing from '@/components/UserReport/UserReportDealing'
    import {formatDate,date} from '@/util/date-format'
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };
    export  default{
        mixins:[mixin],
        data(){
          return{
              total:0,
              tableData: [
              ],
              tData:[],
              kongArray:[],
              pushMessageArray:[],
              pushMesArray:[],
              dialogVisible: false,
              title:"",
              currentPage3: 3,
              queryParams:{
                  ideaType:"PLAN",
                  // createUserName:"",
              },
              beginTime:"",
              endTime:"",
          }
        },
        components:{
           Page
        },
        filters:{
             dateFilter,date,
             statu:function (data) {
                 switch (data){
                     case 'UNSOLVED':
                         return '待处理'
                         break;
                     case 'EFFSOLVED':
                         return '有效已处理'
                         break;
                    case 'INSOLVED':
                        return '无效已处理'
                        break;
                 }
             },

         },
         computed :{
            startDate: function () {
                var self = this;
                return {
                    disabledDate(time) {
                        return time.getTime() > new Date(self.endTime).getTime();
                    }
                }
            },
           endDate:function () {
               var self = this;
               return {
                   disabledDate(time) {
                     return time.getTime() < new Date(self.beginTime).getTime();
                   }
               }
            },
         },
        methods: {
            handleCurrentChange(page){
                //  debugger;
                 if(this.beginTime !="" && this.endTime !=""){
                     this.tableParams.page=page;
                     this.tableParams.beginTime=dateFilter(this.beginTime);
                     this.tableParams.endTime=dateFilter(new Date(this.endTime).getTime()+24*60*60*1000-1000);
                     this.getList(this.tableParams);
                 }else{
                     this.queryParams.page=page;
                    //  this.queryParams.createUserName="";
                     this.beginTime="";
                     this.endTime="";
                     this.queryParams.limit=10;
                      this.getList(this.queryParams);
                 }
            },
            getList(params){
                var self=this;
                if(this.beginTime && this.endTime){
                    params.beginTime=dateFilter(this.beginTime);
                    params.endTime=dateFilter(new Date(this.endTime).getTime()+24*60*60*1000-1000);
                }
                //  params.ideaType = "IDEA";
                // idealManagementApi(params).then(data => {
                //     var idealManagementData=data.data;
                //     self.tData =idealManagementData.items;
                //   }).catch((err) => {
                //       self.$message.error(err.message);
                //   })
                //  var list=[];
              //  var kongArr=[];
                params.ideaType = "PLAN";
               UserReportApi(params).then(data => {
                    var UserReportData=data.data;
                     self.tableData =UserReportData.items;
                     self.total = UserReportData.total;

                }).catch((err) => {
                    self.$message.error(err.message);
                })
            },
            reset(){
                this.beginTime="";
                this.endTime="";
                this.queryParams.limit=10;
                this.queryParams.page=1;
                if(this.queryParams.createUserName){
                     delete this.queryParams.createUserName;
                }
                // this.queryParams.createUserName="";
                this.getList(this.queryParams);
            },
            gotoDetail(params1,params2,params3,params4){
              if(params2=="UNSOLVED"){
                  this.$router.push({
                    path:"./UserReportDealing",
                    query:{
                        reportId:params1,
                        ideaId:params3,
                        beReportedId:params4
                    }
                  })
                }else if(params2=="EFFSOLVED"){
                  this.$router.push({
                  path:"./ValidReport",
                  query:{
                      reportId:params1,
                      ideaId:params3,
                      beReportedId:params4
                  }
                })
               }else if(params2=="INSOLVED"){
                this.$router.push({
                  path:"./ReportDealed",
                  query:{
                      reportId:params1,
                      ideaId:params3,
                      beReportedId:params4
                  }
                })
              }
            }
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
