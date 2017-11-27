<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="18">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item style="line-height:36px;font-size:13px;">邀请码</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="6">
               <!--生成邀请码-->
                <InvitaDialog  @reload='reload'></InvitaDialog>
                <el-button  @click="imp">导出</el-button>
           </el-col>
         </el-row>
           <div style="margin-top:20px;margin-left:20px;padding-right:20px;">
                 <el-row  style="border-left:1px solid lightgray;" align:middle>
                         <el-col :span="4"  v-for="item in  tableData"  :key="item.rentOrderItemId"
                         style="border-bottom: 1px solid lightgray;border-right:1px solid lightgray;border-top: 1px solid lightgray;text-align:center;">
                             <div style="height:100px;line-height:100px;text-align:center;">
                                   {{item.code}}
                             </div>
                         </el-col>
                 </el-row>
           </div>
           <el-row>
                <div class="block" style="width:100%;">
                  <el-col :span='4' :push="12"  style="margin-top:20px;">
                    <el-pagination
                            @current-change="handleCurrentChange"
                            :current-page="tableParams.page"
                            layout="prev, pager, next"
                            :page-size = 36
                            :total="total">
                    </el-pagination>
                    </el-col>
                </div>
           </el-row>
</Page>
</template>
<style scoped>
</style>
<script>
      import Page from '@/components/layout/Page'
      import {getInviteCodeApi} from '@/api/api'
      import InvitaDialog from "@/components/InvitationCode/InvitaDialog"
      import {mixin} from "@/mixins/seach"
      export default{
        mixins:[mixin],
        data(){
           return{
              Vmdata:0,
              total:0,
              tableData:[],
              queryParams:{

              },
              tableParams:{
                page:1,
                limit:36
              }
           }
         },
        components:{
             Page,InvitaDialog
        },
        methods:{
            reload(){
              this.tableData = [];
              this.getList();
            },
            handleCurrentChange(page){
                this.tableParams.page=page;
                this.getList();
            },
            getList(){
                var vm=this;
                getInviteCodeApi(vm.tableParams).then(data => {
                  console.log("dfsdfsd",data.data);
                    vm.total = data.data.total;
                    vm.tableData=[];
                    data.data.items.forEach(function(value,key){
                          // console.log("sddddddddddddddd"+value);
                          if(value.invitationStatus=="UN_USED"){
                              vm.tableData.push(value);
                          }
                      })
                }).catch((err) => {
                    vm.$message.error(err.message);
                })
            },
            imp(){
               window.print();
            }
        }
      }
</script>
