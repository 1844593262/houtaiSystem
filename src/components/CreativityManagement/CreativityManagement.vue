<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>创意管理</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <!-- <el-row> -->
         <div class="classify" scoped>
            <el-form :inline="true" :model="queryParams">
                <!-- <el-col :span="9" style="margin-top:-12px;"> -->
                  <!-- <div class="block"> -->
                     <span class="demonstration" style="margin-left:20px;">统计时间</span>
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
                    <!-- </div>
                 </el-col> -->
                <!-- <el-col :span="4"> -->
                    <el-form-item label="创意标题" style="margin-left:30px;">
                        <el-input   v-model="queryParams.keyword"></el-input>
                    </el-form-item>
                <!-- </el-col> -->
                <!-- <el-col :span="4"> -->
                    <el-form-item>
                        <el-button type="primary" @click="search">搜索</el-button>
                        <el-button type="default" @click="reset">重置</el-button>
                    </el-form-item>
                <!-- </el-col> -->
            </el-form>
          </div>
      <!-- </el-row> -->
       <el-row style="padding:0 20px;">
         <el-col :span="24">
             <el-table  :data="tableData" stripe border>
                  <el-table-column align="center" label="发布人" prop="publish">
                      <template scope="scope">
                         <span @click="skip(scope.row.createUserId)">{{scope.row.ownerName}}</span>
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="发布时间" prop="publishtime">
                      <template scope="scope">
                           {{scope.row.createTime|dateFilter}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="创意标题" prop="CreativityTitle">
                      <template scope="scope">
                           {{scope.row.title}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="迭代次数" prop="iterations">
                      <template scope="scope">
                           {{scope.row.currentVersion}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="浏览数" prop="BrowerTimes">
                      <template scope="scope">
                           {{scope.row.readCount}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="状态" prop="BrowerTimes">
                      <template scope="scope">
                           <!-- {{scope.row}} -->
                           {{scope.row.strin}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="最近迭代时间" prop="RecentIterationsTime">
                      <template scope="scope">
                           {{scope.row.lastUpdate|dateFilter}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                       <template scope="scope">
                           <div class="opreator-cell">
                               <el-button type="text" @click="gotoDetail(scope.row.ideaId)">详情</el-button>
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
                        :page-size = 10
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
    import {idealManagementApi} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    import CreativityDetails from './CreativityDetails'
    import {formatDate,date} from '@/util/date-format.js'
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
              dialogVisible: false,
              title:"",
              currentPage3: 3,
              queryParams:{
                  ideaType:"IDEA",
                  keyword:""
              },
              endTime:"",
              beginTime:'',
           };
        },
        components:{
           Page
        },
        filters:{
             dateFilter,date
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
                   this.beginTime="";
                   this.endTime="";
                    this.queryParams.limit=10;
                   this.getList(this.queryParams);
               }
                  //  this.tableParams.beginTime="";
                  //  this.tableParams.endTime="";

              //  this.tableParams.ideaType = "IDEA";

          },
            getList(params){
                 params.ideaType = "IDEA";
                  var vm=this;
                  if(this.beginTime !="" && this.endTime !=""){
                      params.beginTime=dateFilter(this.beginTime);
                      params.endTime=dateFilter(new Date(this.endTime).getTime()+24*60*60*1000-1000);
                  }
                  idealManagementApi(params).then(data => {
                      var idealManagementData=data.data;
                      vm.tableData =idealManagementData.items;
                      vm.total = idealManagementData.total;
                      vm.tableData.forEach(function(value){
                          var bz=value.deleted;
                          if(bz==1){
                              value.strin="正常";
                          }else if(bz==0){
                              value.strin="隐藏";
                          }
                     })
              }).catch((err) => {
                  vm.$message.error(err.message);
              })
            },
            gotoDetail(params1,params2){
                var vm=this;
                vm.$router.push({
                    path:"./CreativityIterLists",
                    query:{
                        ideaId:params1
                    }
                })
            },
            skip(id){
                this.$router.push({
                    path:"../UserManagement/UserManagementDetails",
                    query:{
                      userId:id
                   }
            })
        },
        reset(){
            //  alert(222222);
             this.beginTime="";
             this.endTime="";
             this.queryParams.ideaType = "IDEA";
             this.queryParams.keyword = "";
             this.queryParams.limit=10;
             this.queryParams.page=1;
            //  {limit:10,page:1}
             this.getList(this.queryParams);
        },
    },
    computed :{
       startDate: function () {
           var self = this;
           return {
               disabledDate(time) {
                  //  if (self.queryParams.beginTime) {
                        return time.getTime() >  new Date(self.endTime).getTime();
                  //
               }
           }
       },
      endDate:function () {
                var self = this;
                return {
                    disabledDate(time) {
                        // if (self.queryParams.endTime) {
                            return time.getTime() < new Date(self.beginTime).getTime();
                        // }
                    }
                }
            },
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
