<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>运营管理员</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div class="bigOperation">
         <div class="operation">
             <el-form :inline="true">
               <el-row style="margin-top:20px;">
                  <el-col :span="5">
                      <el-form-item label="用户名">
                          <el-input  v-model="queryParams.enterpriseId"></el-input>
                      </el-form-item>
                  </el-col>
                  <el-col :span="5">
                       <el-form-item label="角色">
                            <el-select  placeholder="全部"  value="1">
                                <el-option label="系统管理员" value="1"></el-option>
                                <el-option label="客服" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                  </el-col>
                  <el-col :span="6">
                      <div class="ButRigt" style="display:inline-block;">
                          <el-button type="primary">搜索</el-button>
                          <el-button>重置</el-button>
                      </div>
                  </el-col>
                  <el-col :span="8">
                        <el-button type="primary" @click='ProductCaseIncre'>新增</el-button>
                  </el-col>
              </el-row>
              <el-row>
                 <el-col :span="24">
                     <el-table  border :data="tableData" style="margin-top:20px;" stripe>
                           <el-table-column  prop="userName"  label="用户名"  align="center">
                           </el-table-column>
                           <el-table-column  prop="charact"  label="角色"  align="center">
                           </el-table-column>
                           <el-table-column  prop="ctime"  label="创建时间"  align="center">
                           </el-table-column>
                           <el-table-column  prop="ltime"  label="最后登录时间"  align="center">
                           </el-table-column>
                           <el-table-column  prop="state"  label="状态"   align="center">
                           </el-table-column>
                           <el-table-column align="center" label="操作">
                                <template scope="scope">
                                    <div class="opreator-cell">
                                        <el-button type="text" @click="dialogVisible=true">编辑</el-button>
                                        <el-button type="text" @click="dialogVisible=true">禁用</el-button>
                                        <el-button type="text" @click="dialogVisible=true">删除</el-button>
                                    </div>
                                </template>
                          </el-table-column>
                    </el-table>
                 </el-col>
              </el-row>
             </el-form>
         </div>
       </div>
   </Page>
</template>
<script>
    import Page from '@/components/layout/Page';
    export default {
        data(){
            return {
               tableData: [
                 {
                   userName: 'admin',
                   charact: '系统管理员',
                   ctime: '2016-08-25 15:25',
                   ltime:'2016-08-25 15:25',
                   state:'启用',
                   opera:'详情 禁用 删除'
                 },
                 {
                   userName: 'chenxunfeng',
                   charact: '客服',
                   ctime: '2016-08-25 15:25',
                   ltime:'2016-08-25 15:25',
                   state:'启用',
                   opera:'详情 禁用 删除'
                 },
               ],
               queryParams:{

               }
            }
          },
          methods:{
               NewIncre(){
                   this.$router.push('./NewIncre')
               },
               ProductCaseIncre(){
                 
               }
            },
          components:{
                Page
          }
          }
  </script>
<style  type="text/css" scoped>
    .operation{
        padding:20px 20px;
    }
    .opreator-cell  .el-button-text{
        color: #20a0ff;
    }
</style>
