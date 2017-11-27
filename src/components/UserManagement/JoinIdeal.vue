<template>
   <div class="joinIdeal">
       <el-row>
           <el-col :span="24">
               <el-table  :data="tableData" stripe border>
                    <el-table-column align="center" label="创意标题" prop="creativityTitle">
                        <template scope="scope">
                            {{scope.row.title}}
                        </template>
                    </el-table-column>
                    <el-table-column align="center" label="发布用户" prop="publishTime">
                          <template scope="scope">
                              {{scope.row.createUserName}}
                          </template>
                     </el-table-column>
                    <el-table-column align="center" label="发布时间" prop="IterationsNumber">
                          <template scope="scope">
                              {{scope.row.createTime|dateFilter}}
                          </template>
                    </el-table-column>
                    <el-table-column align="center" label="总迭代数" prop="RecentIterTime">
                          <template scope="scope">
                              {{scope.row.currentVersion}}
                          </template>
                    </el-table-column>
                    <el-table-column align="center" label="参与迭代时间" prop="RecentIterTime">
                          <template scope="scope">
                              {{scope.row.lastUpdate|dateFilter}}
                          </template>
                    </el-table-column>
                    <el-table-column align="center" label="参与迭代版本号" prop="RecentIterTime">
                          <template scope="scope">
                              {{scope.row.currentVersion}}
                          </template>
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                         <template scope="scope">
                             <div class="opreator-cell">
                                 <el-button type="text"  @click="gotoDetail(scope.row.ideaId)" >详情</el-button>
                             </div>
                         </template>
                   </el-table-column>
               </el-table>
           </el-col>
       </el-row>
       <el-row>
         <el-col :span="3"  :push="12" style="margin-top:10px;">
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
    </div>
</template>
<script>
     import {managerUserJoinhApi} from '@/api/api'
     import {formatDate,date} from '@/util/date-format'
     import {mixin} from "@/mixins/seach"
     function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
     };
     export  default{
         mixins:[mixin],
         data(){
           return{
               total:0,
               tableData:[],
               currentPage3: 3,
              //  params:{
              //      targetUserId:this.$route.query.userId
              //  }
           }
         },
         filters:{
             dateFilter,date
         },
        //  mounted(){
        //     var vm=this;
        //     managerUserJoinhApi(this.params).then(data => {
        //             vm.tableData=data.data.items;
        //             // data.data.items.createTime;
        //             // data.data.items.currentVersion;
        //             // data.data.items.lastUpdate;
        //     }).catch((err) => {
        //         self.$message.error(err.message);
        //     })
        // },
         methods: {
           gotoDetail(prams){
              var vm=this;
              console.log(prams);
              this.$router.push({
                  path:'./UserDetails',
                   query:{
                      ideaId:prams
                  }
              });
           },
           handleCurrentChange(page){
                this.tableParams.page=page;
                console.log("asdadadasdasd",this.$route.query.userId);
                this.tableParams.targetUserId=this.$route.query.userId;
              //  console.log("asdadadasdasd",vm.$route.query.userId);
                this.getList(this.tableParams);
           },
           getList(params){
             var vm=this;
            //  console.log("asdadadasdasd",vm.$route.query.userId);
             params.targetUserId=vm.$route.query.userId;
             managerUserJoinhApi(params).then(data => {
                     vm.tableData=data.data.items;
                     vm.total=data.data.total;
                     data.data.items.createTime;
                     data.data.items.currentVersion;
                     data.data.items.lastUpdate;
             }).catch((err) => {
                  vm.$message.error(err.message);
             })
           }
         },
     }
</script>
