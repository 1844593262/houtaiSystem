<template>
  <Page>
    <el-row slot="header" :span="24">
        <el-col :span="22">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item>新增管理员</el-breadcrumb-item>
            </el-breadcrumb>
        </el-col>
        <el-col :span="2">
        </el-col>
    </el-row>
    <div class="content">
        <el-form style="margin-top:50px;margin-left:20px;">
           <el-form-item label='用户名' label-width="120px">
               <el-input style="margin-left:30px;"></el-input>
           </el-form-item>
           <el-form-item label="角色" label-width="120px">
               <el-select value="1" placeholder="All" style="margin-left:30px;">
                   <el-option label="角色一" value="1"></el-option>
                   <el-option label="角色二" value="2"></el-option>
               </el-select>
           </el-form-item>
           <el-form-item label='登录密码' label-width="120px">
               <el-input style="margin-left:30px;"></el-input>
           </el-form-item>
           <el-form-item label='重复输入密码' label-width="120px">
               <el-input style="margin-left:30px;"></el-input>
           </el-form-item>
          <el-form-item label='是否启用' label-width="120px">
               <el-radio class="radio" v-model="radio"  style="margin-left:30px;" label="1">启用</el-radio>
                <el-radio class="radio" v-model="radio"  style="margin-left:30px;" label="2">禁用</el-radio>
         </el-form-item>
           <div class="dialog-footer">
               <el-button>取 消</el-button>
               <el-button type="primary">确 定</el-button>
           </div>
        </el-form>
    </div>
  </Page>
</template>
<script>
    import Page from '@/components/layout/Page'
    export default {
        name: 'staff',
        data() {
            return {
                radio: '1'
            }
        },
        mounted(){

        },
        methods: {

        },
        filters:{

        },
        components: {
           Page
        }
    }
</script>
<style scoped>
  .content{
      margin: 80px 20px;
      padding-left: 5%;
      padding-right: 10%;
  }
  .dialog-footer{
     width:100%;
     text-align:center;
  }
</style>
