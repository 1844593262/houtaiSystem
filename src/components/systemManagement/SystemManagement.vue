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
       <el-row>
            <div class="classify">
                <el-form :inline="true" :model="queryParams">
                      <el-col :span="5">
                          <el-form-item label="分类名称">
                              <el-input  v-model="queryParams.enterpriseId"></el-input>
                          </el-form-item>
                      </el-col>
                      <el-col :span="5">
                          <el-form-item label="状态">
                              <el-select  placeholder="全部" value="1">
                                  <el-option label="正常" value="1"></el-option>
                                  <el-option label="禁用" value="2"></el-option>
                              </el-select>
                          </el-form-item>
                      </el-col>
                      <el-col :span="6">
                          <el-form-item>
                                  <el-button type="primary">搜索</el-button>
                                  <el-button type="default">重置</el-button>
                          </el-form-item>
                      </el-col>
                      <el-col :span="8">
                            <el-button type="primary" @click='ProductCaseIncre'>新增</el-button>
                      </el-col>
                </el-form>
            </div>
       </el-row>
       <el-row style="padding:20px;">
          <el-col>
            <el-table  :data="tableData" stripe  border>
                 <el-table-column align="center" label="分类图标" prop="ClassifyIcon"></el-table-column>
                 <el-table-column align="center" label="分类名称" prop="ClassifyName"></el-table-column>
                 <el-table-column align="center" label="状态" prop="state"></el-table-column>
                 <el-table-column align="center" label="操作">
                      <template scope="scope">
                          <div class="opreator-cell">
                              <el-button type="text" @click="dialogVisible=true">编辑</el-button>
                              <el-button type="text" @click="dialogVisible=true">禁用</el-button>
                              <el-button type="text" @click="dialogVisible=true">删除</el-button>
                              <!-- <el-button type="text" @click="dialogVisible=false"   size="mini">禁用</el-button> -->
                          </div>
                      </template>
                </el-table-column>
            </el-table>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
              <div class="block" style="width:100%;">
                  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage3" :page-sizes="[10,20,30,40,50,60,70,80]"
                      :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="80">
                  </el-pagination>
              </div>
          </el-col>
      </el-row>
   </Page>
</template>
<style>
.el-table::after, .el-table::before {
      background-color:none;
}
.classify{
     padding:20px 20px;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    export  default{
        data(){
          return{
              tableData: [
                {
                  ClassifyIcon:'',
                  ClassifyName: '创意分类',
                  state:'启用'
                },
                {
                  ClassifyIcon:'',
                  ClassifyName: '创意分类',
                  state:'启用'
                },
              ],
              dialogVisible: false,
              title:"",
              currentPage3: 3,
              queryParams:{
              }
          }
        },
        components:{
           Page
        },
        methods: {
            handleSizeChange(val) {
              // console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
              // console.log(`当前页: ${val}`);
            },
            ProductCaseIncre(){
                this.$router.push('./ProductIncre')
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
