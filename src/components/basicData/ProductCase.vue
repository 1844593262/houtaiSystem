<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>推荐案例</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
         <div id="classify">
             <el-form :inline="true" :model="queryParams">
                         <el-form-item label="案例名称" style="margin-left:30px;">
                             <el-input  v-model="queryParams.keyword"></el-input>
                         </el-form-item>
                       <el-form-item>
                           <div class="CaseLeft" style="display:inline-block;">
                               <el-button type="primary" @click="search">搜索</el-button>
                               <el-button type="default" @click="reset">重置</el-button>
                           </div>
                       </el-form-item>
                     <el-button type="primary"  @click='ProductCaseIncre'>新增</el-button>
           </el-form>
        </div>
      <el-row>
          <el-col :span="24">
              <el-table  :data="tableData" stripe border>
                   <el-table-column align="center" label="案例名称" prop="CaseName">
                       <template scope="scope">
                            {{scope.row.title}}
                       </template>
                   </el-table-column>
                   <el-table-column align="center" label="操作">
                        <template scope="scope">
                            <div class="opreator-cell">
                                <el-button type="text" @click="LookProductsDetail(scope.row.ideaId)">编辑</el-button>
                                <el-button type="text" @click="del(scope.row.ideaId)">删除</el-button>
                            </div>
                        </template>
                  </el-table-column>
              </el-table>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span='23'>
            <div class="block" style="width:100%;">
                <el-pagination  @current-change="handleCurrentChange"
                :current-page="tableParams.page" layout="prev, pager, next" :total="total">
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
    #classify{
        padding-top:30px;
        padding-bottom:30px;
    }
    .com-page-body{
        padding:0 36px 18px;
        margin-top:20px;
    }
</style>
<script>
    import Page from '@/components/layout/Page'
    import {productCaseApi} from '@/api/api'
    import {delRecommandCaseApi} from '@/api/api'
    import {LookCase} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    export  default{
        mixins:[mixin],
        data(){
          return{
              tableData: [],
              dialogVisible: false,
              title:"",
              total:0,
              currentPage3: 3,
              queryParams:{
                   value:"",
                   keyword:'',
                   ideaType:"PRODUCT_CASE"
              },
              planId:0
          }
        },
        components:{
           Page
        },
        methods: {
            ProductCaseIncre(){
                this.$router.push('./ProductIncre')
            },
            LookProductsDetail(params){
                this.$router.push({
                    path:"./ProductDetails",
                    query:{
                       ideaId:params,
                    }
                })
            },
            getList(params){
                 params.ideaType = "PRODUCT_CASE";
                 productCaseApi(params).then(data => {
                      var  productCaseData=data.data;
                      this.tableData =productCaseData.items;
                      this.total = productCaseData.total;
                      console.log(data);
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
                      LookCase(params).then(data => {
                           var planId =data.data.planContextList[0].planId;
                           self.$nextTick(function(){
                           delRecommandCaseApi(planId).then(data => {
                                 self.getList(self.tableParams);
                              }).catch((err) => {
                               self.$message.error(err.message);
                             })
                         })
                      }).catch((err) => {
                          self.$message.error(err.message);
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
<style lang="css" type="text/css">
    .block{
        width:100%;
        text-align:center;
        margin-top:10px;
        margin-left:20px;
    }
</style>
