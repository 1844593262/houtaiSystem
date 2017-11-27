<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>举报选项</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div id="reportoption">
           <el-row style="margin:20px 0">
              <el-col :span="3" :push="21">
                <!-- <div class="classify"> -->
                    <ReportDialogIncre  @reload='reload'></ReportDialogIncre>
                <!-- </div> -->
              </el-col>
           </el-row>
           <div class="reportoption">
               <el-row>
               <el-col>
                    <el-table  :data="tableData" stripe border>
                        <el-table-column align="center" label="举报选项名称" prop="ReportOption">
                            <template scope="scope">
                                {{scope.row.valueDesc}}
                            </template>
                        </el-table-column>
                        <el-table-column align="center" label="操作">
                            <template scope="scope">
                                <div class="opreator-cell">
                                    <!-- <ReportDialogLook :ids='scope.row.reportId' @keepload='keepload'></ReportDialogLook> -->
                                    <el-button type="text" @click="del(scope.row.informationId)">删除</el-button>
                                </div>
                            </template>
                         </el-table-column>
                    </el-table>
               </el-col>
               </el-row>
         </div>
         <el-row>
           <el-col :span='23'>
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
   </Page>
</template>
<style scoped>
.el-table::after, .el-table::before {
      background-color:none;
}
#reportoption{
     background-color:none;
}
.reportoption{
     padding:0 20px;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    // import ReportDialogLook from "./ReportDialogLook"
    import ReportDialogIncre from "./ReportDialogIncre"
    import {ReporttypeMaintence} from '@/api/api'
    import {delReportApi} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    export  default{
        mixins:[mixin],
        data(){
          return{
              tableData: [
              ],
              total:0,
              dialogVisible: false,
              title:"",
              currentPage3: 1,
              queryParams:{

              },
              params:{
                  "type": "REPORT_TYPE",
              }
          }
        },
        components:{
           Page,ReportDialogIncre
        },
        mounted(){
           var vm=this;
            ReporttypeMaintence(vm.params).then(data => {
                var ReportOptData=data.data;
                 this.tableData=ReportOptData.items;
                 this.total = ReportOptData.total;
            }).catch((err) => {
                self.$message.error(err.message);
            })
        },
        methods: {
            reload(){
                this.getList(this.tableParams)
            },
            keepload(){
                this.getList(this.tableParams)
            },
            ReportDialogIncre(){
                this.$refs.ReportDialogIncre.dialogVisible=true;
            },
            ReportDialogLook(){
                this.$refs.ReportDialogLook.dialogVisible=true;
                this.$refs.ReportDialogLook.title='查看举报选项信息';
                this.$refs.ReportDialogLook.editor='编辑';
            },
            reload(){
               this.getList(this.tableParams)
            },
            getList(){
                ReporttypeMaintence(this.params).then(data => {
                    var ReportOptData=data.data;
                     this.tableData=ReportOptData.items;
                     this.total = ReportOptData.total;
                }).catch((err) => {
                    self.$message.error(err.message);
                })
          },
           del(params){
               var self=this;
               this.$confirm('是否删除?', '提示', {
                     confirmButtonText: '确定',
                     cancelButtonText: '取消',
                     type: 'warning'
               }).then(() => {
                   self.$nextTick(function(){
                       delReportApi(params).then(data => {
                           this.getList(this.tableParams)
                          // this.tableData=data.data.items;
                       }).catch((err) => {
                        self.$message.error(err.message);
                      })
                   })
               }).catch(err => {
                      this.$message.error(err.message);
               }).catch(() => {
                   this.$message({
                   type: 'info',
                   message: '已取消'
               });
              });
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
