<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>创意分类</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div class="classify">
           <el-form :inline="true" :model="queryParams">
               <!--<el-row>-->
                  <!--<el-col :span="6">-->
                      <el-form-item label="分类名称">
                          <el-input  placeholder="请输入" v-model="queryParams.name" ></el-input>
                      </el-form-item>
                  <!--</el-col>-->
                    <!--<el-col :span="14">-->
                        <el-form-item>
                             <el-button type="primary" @click="search">搜索</el-button>
                             <el-button type="default" @click="reset">重置</el-button>
                        </el-form-item>
                  <!--</el-col>-->
                  <!--<el-col :span="4">-->
                  <!-- 新增按钮-->
                   <NewIncredialog @reload='reload'></NewIncredialog>
                 <!--</el-col>-->
              <!--</el-row>-->
           </el-form>
           <el-row>
               <el-col :span="24">
                    <el-table  :data="tableData" stripe border>
                          <el-table-column align="center" label="分类图标" prop="ClassifyIcon">
                                <template scope="scope">
                                   <img :src = "scope.row.image" style="width:50px;margin-top:10px"/>
                                </template>
                          </el-table-column>
                          <el-table-column align="center" label="分类名称" prop="ClassifyName">
                                <template scope="scope">
                                    {{scope.row.name}}
                                </template>
                          </el-table-column>
                          <el-table-column align="center" label="操作">
                               <template scope="scope">
                                   <div class="opreator-cell">
                                     <!-- 查看-->
                                        <Newdialog :ids='scope.row.categoryId'  :imgSrcs="scope.row.image"  @keepload='keepload'></Newdialog>
                                        <el-button type="text" @click="del(scope.row.categoryId)">删除</el-button>
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
   </Page>
</template>
<style scoped>
.el-table::after, .el-table::before {
      background-color:none;
}
.classify{
    padding:20px 20px;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    import Newdialog from './Newdialog'
    import NewIncredialog from './NewIncredialog'
    import {CreativityClassifyApi} from '@/api/api'
    import {ForbiddenClassifyDetailApi} from '@/api/api'
    import {DelClassifyDetailApi} from '@/api/api'
    import {mixin} from "@/mixins/seach"
    export  default{
        mixins:[mixin],
        data(){
          return{
              total:0,
              id:"",
              tableData:[],
              dialogVisible: false,
              title:"",
              currentPage3: 1,
              queryParams:{
                 name:'',
                 value:""
              },
          }
        },
        mounted(){
            console.log(this.$route.query);
        },
        components:{
           Newdialog,
           Page,
           NewIncredialog
        },
        methods: {
          //页面及时刷新
            reload(){
                this.getList(this.tableParams)
            },
            keepload(){
                this.getList(this.tableParams)
            },
            getList(params){
              CreativityClassifyApi(params).then(data => {
                  var creativeData=data.data;
                  this.tableData =creativeData.items;
                  this.total = creativeData.total;
              }).catch((err) => {
                  self.$message.error(err.message);
              })
            },
            dialog(){
                var sef=this;
                sef.$refs.dialogVisible.dialogVisible=true;
            },
            newIncredialog(){
                this.$refs.NewIncredialog.dialogVisible=true;
            },
            del(params){
              var self=this;
              this.$confirm('是否删除?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
              }).then(() => {
                  self.$nextTick(function(){
                      DelClassifyDetailApi(params).then(data => {
                          console.log(data.data);
                          this.tableData=data.data.items;
                          self.getList();
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
