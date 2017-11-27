<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>用户管理</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div class="classify">
          <el-form :inline="true" :model="queryParams">
                 <el-form-item label="昵称">
                     <el-input   v-model="queryParams.nickName">
                     </el-input>
                 </el-form-item>
                  <el-form-item label="手机号">
                     <el-input   v-model="queryParams.telephone"></el-input>
                  </el-form-item>
               <el-form-item>
                   <el-button type="primary" @click="search">搜索</el-button>
                   <el-button type="default" style="margin-left:20px" @click="reset">重置</el-button>
                    <PushMessageDialog   :puMes="pushMesArray" style="margin-left:20px;"></PushMessageDialog>
               </el-form-item>

              <!-- <el-row>
                  <el-col :span="24">
                      <div class="Butbutton" style="margin-left:60px;margin-bottom:20px;">

                           <!-- <el-button   @click="pushMessage" type="primary">消息推送</el-button>
                      </div>
                  </el-col>
              </el-row> -->
          </el-form>
        </div>
       <el-row style="padding:0 20px;">
          <el-col :span="24">
             <el-table  :data="tableData" stripe border>
                  <el-table-column align="center" label="昵称" prop="nickName">
                      <template scope="scope">
                          {{scope.row.userInfo.nikeName}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="手机号" prop="iphoneNumber">
                      <template scope="scope">
                          {{scope.row.userInfo.telephone}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="注册时间" prop="registertime">
                      <template scope="scope">
                          {{scope.row.userInfo.createTime|dateFilter}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="最近登录时间" prop="recentRegister">
                      <template scope="scope">
                          {{scope.row.userInfo.lastUpdate|dateFilter}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="发布的创意" prop="publishCreativity">
                      <template scope="scope">
                          {{scope.row.publishCount}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="参与的创意" prop="joinCreativity">
                      <template scope="scope">
                          {{scope.row.contributeCount}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="被举报的次数" prop="ReportedTimes">
                      <template scope="scope">
                         {{scope.row.beReportCount}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                       <template scope="scope">
                           <div class="opreator-cell">
                               <el-button type="text" @click="gotoDetail(scope.row.userInfo.userId)">详情</el-button>
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
  margin-top:20px;
  padding:0 20px;
}
</style>
<script>
    import {managerUserApi} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    import Page from '@/components/layout/Page'
    import {statistical} from "@/api/api"
    import {formatDate,date} from '@/util/date-format'
    import PushMessageDialog from  "@/components/UserManagement/PushMessageDialog"
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };


    // import NewUser from './NewUser'
    export  default{
        mixins:[mixin],
        data(){
          return{
              pushMessageArray:[],
              pushMesArray:[],
              tableData:[],
              UserData:[],
              total:0,
              tableDataPart:{},
              id:"",
              dialogVisible: false,
              title:"",
              currentPage3: 1,
              queryParams:{
                  telephone:"",
                  nikeName:"",
                  // value:""
              },
              startTime: '',
              endTime: ''
          }
        },
        components:{
           Page,PushMessageDialog
        },
        filters:{
             dateFilter,date
         },
        mounted(){
            // this.getList();
            // debugger;
            // var vm=this;
            //  statistical(vm.queryParams).then(data => {
            //     // vm.tableDataPart=data.data;
            // }).catch((err) => {
            //     vm.$message.error(err.message);
            // })
        },
        // computed:{
        //   dataList(){
        //
        //   }
        // },
        methods: {
          reload(){
              // this.getList(this.tableParams)
            },
            getList(params){
               var self=this;
               var list = [];
              //  managerUserApi(params).then(data => {
              //       self.UserData=data.data.items;
              //       self.total = data.data.total;
                    // Array.prototype.unique = function(){
                    //  var res = [];
                    //  var json = {};
                    //  for(var i = 0; i < this.length; i++){
                    //     if(!json[this[i]]){
                    //        res.push(this[i]);
                    //         json[this[i]] = 1;
                    //     }
                    //  }
                    //      return res;
                    //   // self.tableData=a.concat(self.UserData);
                    // //  self.tableDataPart=data.data.items;
                    //  self.pushMessageArray.forEach(function(v){
                    //    Object.assign(v,self.UserData)
                    //     list.push(v)
                    //  }
                    self.pushMesArray=[];
                    statistical(self.queryParams).then(data => {
                        for (var i = 0; i < data.data.items.length; i++) {
                            self.pushMesArray.push(data.data.items[i].userInfo.userId);
                        }
                        var a=data.data.items;
                        self.total = data.data.total;
                       self.tableData=a;
//                       console.log("fsdfdfsf",self.tableData);
                   }).catch((err) => {
                       self.$message.error(err.message);
                   })
                // }).catch((err) => {
                //     self.$message.error(err.message);
                // })
            },
            gotoDetail(params){
                this.$router.push(
                  {
                     path:"./UserManagementDetails",
                     query:{
                         userId:params,
                    }
                  }
                )
            },
//            pushMessage(){
//                 var  self=this;
//                 console.log(self.pushMesArray);
//
//            }
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
