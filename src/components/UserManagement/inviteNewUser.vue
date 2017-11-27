<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>邀请新用户</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div class="classify">
          <el-form :inline="true" :model="queryParams">
              <el-row>
                <el-col :span="4">
                    <el-form-item label="手机号">
                       <el-input   v-model="queryParams.telephone"></el-input>
                    </el-form-item>
               </el-col>
               <el-col :span="4">
                 <el-form-item label="昵称">
                     <el-input   v-model="queryParams.nickName">
                     </el-input>
                 </el-form-item>
              </el-col>
              <el-col :span="4">
             </el-col>
             <el-col :span="6">
            </el-col>
             <el-col :span="4">
               <el-form-item>
                   <el-button type="primary" @click="search">搜索</el-button>
                   <el-button type="default" style="margin-left:20px" @click="reset">重置</el-button>
               </el-form-item>
            </el-col>
              </el-row>
              <!-- <el-row>
                  <el-col :span="24">
                      <div class="Butbutton" style="margin-left:60px;margin-bottom:20px;">
                        <el-button type="primary" style="margin-left:20px;" @click="pushMessage">消息推送</el-button>
                      </div>
                  </el-col>
              </el-row> -->
          </el-form>
        </div>
       <el-row style="padding:0 20px;">
          <el-col :span="24">
             <el-table  :data="tableData" stripe border>
                  <el-table-column align="center" label="" prop="nickName">
                      <template scope="scope">
                          {{scope.row.nikeName}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="手机号" prop="iphoneNumber">
                      <template scope="scope">
                          {{scope.row.telephone}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="注册时间" prop="registertime">
                      <template scope="scope">
                          {{scope.row.createTime|dateFilter}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="最近登录时间" prop="recentRegister">
                      <template scope="scope">
                          {{scope.row.lastUpdate|dateFilter}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="发布的创意" prop="publishCreativity">
                      <template scope="scope">
                          {{tableDataPart.contributeIdeaNumber}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="参与的创意" prop="joinCreativity">
                      <template scope="scope">
                          {{scope.row.forkIdeaNumber}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="被举报的次数" prop="ReportedTimes">
                      <template scope="scope">
                         {{scope.row.publishedIdeaNumber}}
                      </template>
                  </el-table-column>
                  <el-table-column align="center" label="操作">
                       <template scope="scope">
                           <div class="opreator-cell">
                               <el-button type="text" @click="dialogVisible=true">发送激活码</el-button>
                           </div>
                       </template>
                 </el-table-column>
             </el-table>
           </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
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
    import {formatDate} from '@/util/date-format'
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };
    // import NewUser from './NewUser'
    export  default{
        mixins:[mixin],
        data(){
          return{
              tableData:[],
              total:0,
              tableDataPart:{},
              id:"",
              dialogVisible: false,
              title:"",
              currentPage3: 1,
              queryParams:{
                  telephone:"",
                  nikeName:"",
                  value:""
              },
              startTime: '',
              endTime: ''
          }
        },
        components:{
           Page
        },
        filters:{
             dateFilter
         },
        mounted(){
            this.getList();
            var vm=this;
             statistical().then(data => {
                console.log(data.data);
                vm.tableDataPart=data.data;
            }).catch((err) => {
                self.$message.error(err.message);
            })
        },
        computed:{
          dataList(){

          }
        },
        methods: {
          reload(){
              this.getList(this.tableParams)
            },
            getList(params){
               var self=this;
               var list = [];
               managerUserApi(params).then(data => {
                    var  UserData=data.data.items;

                    console.log(UserData);
                    self.total = UserData.total;

                    statistical().then(data => {
                       console.log(data.data);
                       self.tableDataPart=data.data;
                       UserData.forEach(function(v){
                         Object.assign(v,self.tableDataPart)
                        list.push(v)
                       })
                       self.tableData=list;
                   }).catch((err) => {
                       self.$message.error(err.message);
                   })
                }).catch((err) => {
                    self.$message.error(err.message);
                })
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
            pushMessage(){
                this.$router.push("./UserMessagePush");
            }
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
