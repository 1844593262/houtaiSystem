<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>角色权限</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
      <el-row>
          <el-col>
              <div class="CharCont">
                  <el-form>
                     <el-table  :data="list"  border>
                         <el-table-column  prop="characterName"  label="角色名称" align="left">
                         </el-table-column>
                         <el-table-column  prop="characterDescript"  label="角色描述"  align="left">
                         </el-table-column>
                         <el-table-column  prop="operate"  label="操作"  align="center">
                              <template scope="scope">
                                  <div class="opreator-cell">
                                      <el-button type="text">详情</el-button>
                                      <el-button type="text">禁用</el-button>
                                      <el-button type="text">删除</el-button>
                                  </div>
                                </template>
                         </el-table-column>
                     </el-table>
                  </el-form>
              </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col>
            <div class="footer-btn">
                 <el-button type="primary" style="border-radius:5px;width:80px;margin-top:10px;" @click="NewIncre">新增</el-button>
            </div>
       </el-col>
    </el-row>
</Page>
</template>
<style scoped>
    .character{
        margin: 20px 20px;
        padding-left: 5%;
        padding-right: 10%;
    }
    .footer-btn{
        margin-top:10px;
        text-align:left;
    }
    .opreator-cell  .el-button-text{
        color:#1f2d3d;
    }
    .CharCont{
        padding:20px 20px;
    }
    .footer-btn{
       padding-left:20px;
    }
</style>
<script>
import Page from '@/components/layout/Page'
export default{
    data(){
       return{
         list: [
               {
               characterName: '系统管理员',
               characterDescript: '用于系统的管理配置',
               },
               {
               characterName: '客服',
               characterDescript: '负责任务处理、用户管理',
               },
         ]
       }
    },
    components:{
         Page
    },
    methods:{
        NewIncre(){
           this.$router.push('./NewCharacter');
        }
    }
}

</script>
