<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>文章管理</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
      <div class="classify">
       <!-- <el-row> -->
            <el-form :inline="true" :model="queryParams">
                <!-- <el-col :span="4"> -->
                    <el-form-item label="标题 :">
                        <el-input  v-model="queryParams.articleTitle"  placeholder="请输入文章的标题"></el-input>
                    </el-form-item>
                <!-- </el-col> -->
                <!-- <el-col :span="4"> -->
                    <el-form-item label="code:">
                        <el-input  v-model="queryParams.articleCode"   placeholder="请输入文章code"></el-input>
                    </el-form-item>
                <!-- </el-col> -->
                <!-- <el-col :span="6"> -->
                  <el-form-item>
                      <div class="CaseLeft" style="display:inline-block;">
                          <el-button type="primary" @click="search">搜索</el-button>
                          <el-button type="default" @click="reset">重置</el-button>
                      </div>
                  </el-form-item>
                <!-- </el-col> -->
                <!-- <el-col :span="6"> -->
                       <el-button type="primary"   @click='ProductCaseIncre'>新增</el-button>
                <!-- </el-col> -->
            </el-form>
      <!-- </el-row> -->
       <el-row>
          <el-col>
              <el-table  :data="tableData" border>
                   <el-table-column align="center" label="ID" prop="number">
                        <template scope="scope">
                             {{scope.row.articleId}}
                        </template>
                   </el-table-column>
                   <el-table-column align="center" label="文章标题" prop="Articletitle">
                       <template scope="scope">
                            {{scope.row.articleTitle}}
                       </template>
                   </el-table-column>
                   <el-table-column align="center" label="articleCode" prop="articleCode">
                       <template scope="scope">
                            {{scope.row.articleCode}}
                       </template>
                   </el-table-column>
                   <el-table-column align="center" label="创建时间" prop="createTime">
                       <template scope="scope">
                            {{scope.row.createTime|dateFilter}}
                       </template>
                   </el-table-column>
                   <el-table-column align="center" label="操作">
                        <template scope="scope">
                            <div class="opreator-cell">
                                <Dialogs :ids='scope.row.articleId'  :airtitles='scope.row.articleTitle'></Dialogs>
                                <el-button type="text" @click="editor(scope.row.articleId)">编辑</el-button>
                                <!-- <el-button type="text" style="color:red;" @click="del(scope.row.articleId)">删除</el-button> -->
                            </div>
                        </template>
                  </el-table-column>
              </el-table>
          </el-col>
       </el-row>
       <el-row>
            <el-col :span='24'>
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
  </div>
   </Page>
</template>
<style>
.el-table::after, .el-table::before {
    background-color:none;
}
.classify{
    margin-top:20px;
    padding:0 20px;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    import ArticleIncre   from '@/components/basicData/ArticleIncre'
    import  Dialogs from '@/components/basicData/Dialogs'
    import {ArticleManagementApi} from '@/api/api'
    import {DelArticleManagementApi} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    import {formatDate,date} from '@/util/date-format'
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };
    // import {formatDate} from '@/filter'
    export  default{
        mixins:[mixin],
        data(){
          return{
              total:0,
              values:"",
              tableData: [],
              dialogVisible: false,
              title:"",
              currentPage3: 3,
              queryParams:{
                  articleTitle:"",
                  articleCode:"",
                  articleContent:""
              }
          }
        },
        components:{
           Page,Dialogs
        },
        filters:{
             dateFilter,date
         },
        methods: {
            ProductCaseIncre(){
                this.$router.push('./ArticleIncre');
            },
            editor(params){
                var self=this;
                this.$router.push({
                    path:'./ArticleEditor',
                    query:{
                       articleId:params
                    }
                })
            },
            getList(params){
                ArticleManagementApi(params).then(data => {
                      var  ArticleManagementData=data.data;
                      this.tableData =ArticleManagementData.items;
                      this.total = ArticleManagementData.total;
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
                      DelArticleManagementApi(params).then(data => {
                          console.log(data.data);
                          // this.tableData=data.data.items;
                          self.getList(self.tableParams);
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
<style lang="css" type="text/css">
    .block{
        width:100%;
        text-align:center;
        margin-top:10px;
        margin-left:20px;
    }
</style>
