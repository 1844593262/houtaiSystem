<template>
  <Page>
       <el-row slot="header">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>意见反馈</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
       </el-row>
       <!-- <el-row> -->
         <div class="classify" scoped>
            <el-form :inline="true" :model="queryParams">
              <!-- <el-col :span="10" style="margin-top:-12px;">
                <div class="block"> -->
                   <span class="demonstration">统计时间</span>
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
                  <!-- </div> -->
               <!-- </el-col>
                <el-col :span="6"> -->
                    <el-form-item label="手机号">
                        <el-input   v-model="queryParams.feedbackCellphone"></el-input>
                    </el-form-item>
                <!-- </el-col>
                <el-col :span="7"> -->
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
                  <el-table-column align="center" label="反馈人" prop="publish">
                      <template scope="scope">
                           {{scope.row.feedbackUsername}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="手机号" prop="iphoneNumber">
                      <template scope="scope">
                           {{scope.row.feedbackCellphone}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="反馈时间" prop="publishtime">
                      <template scope="scope">
                           {{scope.row.createTime |dateFilter}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="反馈内容" prop="CreativityTitle">
                      <template scope="scope">
                           {{scope.row.content}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="状态" prop="iterations">
                      <template scope="scope">
                           {{scope.row.readStatus|statu}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                       <template scope="scope">
                           <div class="opreator-cell">
                               <feedbackDetail :ides="scope.row.id"
                                v-on:listenToChildEvent="showMsgFromChild"
                                 @reload='reload'></feedbackDetail>
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
    import {formatDate, date} from '@/util/date-format'
    import Page from '@/components/layout/Page'
    import {AdvicefeedbackApi} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    import feedbackDetail from "./feedbackDetail"
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
                  value1:"",
                  value2:"",
                  ideaType:"IDEA",
                 feedbackCellphone:"",
              },
              beginTime:'',
              endTime:""
          }
        },
        components:{
           Page,feedbackDetail
        },
        filters:{
             dateFilter,date,
             statu:function (data) {
                 switch (data){
                     case 'FAIL_PASS':
                         return '未读'
                         break;
                     case 'PASSED':
                         return '已读'
                         break;
                 }
             },
         },
         computed :{
            startDate: function () {
                var self = this;
                return {
                    disabledDate(time) {
                         return time.getTime() >new Date(self.endTime).getTime();
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
                 if(this.beginTime !="" && this.endTime !=""){
                     params.beginTime=dateFilter(this.beginTime);
                     params.endTime=dateFilter(new Date(this.endTime).getTime()+24*60*60*1000-1000);
                 }

                AdvicefeedbackApi(params).then(data => {
                    var AdvicefeedbackData=data.data;
                    self.tableData =AdvicefeedbackData.items;
                    self.total = AdvicefeedbackData.total;
                //    AdvicefeedbackData.items.forEach(function(value){
                //       //  console.log(value.readStatus);
                //         if(value.readStatus=="FAIL_PASS"){
                //              self.tableData.forEach(function(value){
                //                console.log(value);
                //                 value.readStatus=="未读";
                //              })
                //         }else if(value.readStatus=="PASSED"){
                //              value.readStatus=="已读";
                //         }
                //  })
                //  console.log(self.tableData)
                }).catch((err) => {
                    self.$message.error(err.message);
                })
            },
            showMsgFromChild(data){
                 console.log(data);
            },
            reload(){
                this.getList(this.tableParams)
            },
            reset(){
                this.beginTime="";
                this.endTime="";
                this.queryParams.limit=10;
                this.queryParams.page=1;
                this.queryParams.feedbackCellphone="";
                this.getList(this.queryParams);
            },
        },
    }
</script>
<style lang="css" type="text/css">
    .block{
        width:100%;
        text-align:center;
        margin-top:10px;
        margin-left:20px;
    }
</style>
