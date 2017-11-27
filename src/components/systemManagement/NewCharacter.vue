<template>
  <Page>
    <el-row slot="header" :span="24">
        <el-col :span="22">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>新增角色</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="2">
        </el-col>
    </el-row>
  <div class="bigNewCharacter">
     <div class="character">
         <el-form>
            <el-form-item label="角色名" label-width="80px" style="text-align:left">
                <el-input style="margin-left:30px;width:400px"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" label-width="80px" style="text-align:left">
                <el-input style="margin-left:30px;width:600px"></el-input>
            </el-form-item>
            <el-form-item label="权限设置" label-width="80px" style="text-align:left">
            </el-form-item>
         </el-form>
         <!--二级父选框-->
         <SecondChecked></SecondChecked>
         <div class="footer-btn">
              <el-button type="primary" style="border-radius:5px;width:80px;margin-top:15px;">保存</el-button>
              <el-button >取消</el-button>
         </div>
     </div>
   </div>
 </Page>
</template>
<style>
    .character{
        margin-top:30px;
        padding-left:40px;
    }
    .footer-btn{
        width:100%;
        text-align:center;
    }
</style>
<script>
    import Page from '@/components/layout/Page'
    import SecondChecked from './SecondChecked';
    export default{
      data(){
         return{

         }
      },
      methods: {

      },
      components:{
         SecondChecked,Page
      }

    }
</script>
