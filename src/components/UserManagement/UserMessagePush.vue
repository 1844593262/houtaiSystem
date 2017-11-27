<template>
  <Page>
       <!-- <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>消息推送</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row> -->
      <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:20px;">
            <el-form-item label="消息类型" prop="region">
                <el-select v-model="ruleForm.region" placeholder="系统消息">
                  <el-option label="区域一" value="shanghai"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="消息文本" prop="desc">
                 <textarea v-model="ruleForm.desc" rows="20" cols="130" resize:none></textarea>
            </el-form-item>
            <el-form-item>
               <el-row>
                   <el-col :span="4">
                   </el-col>
                   <el-col :span="5">
                      <el-button type="primary" @click="submitForm" style="width:100px">取消</el-button>
                   </el-col>
                   <el-col :span="9" :push="7">
                      <el-button @click="confir" type="danger" style="width:100px">确认推送</el-button>
                   </el-col>
                   <el-col :span="6"></el-col>
               </el-row>
            </el-form-item>
      </el-form>
      <!-- <NewUser></NewUser> -->
   </Page>
</template>
<script>
    import Page from '@/components/layout/Page'
    import  NewUser from './NewUser'
    import {pushMessageApi} from '@/api/api'
    export  default{
        data(){
          return{
            ruleForm: {
              region: '',
              desc: ''
            },
          }
        },
        components:{
           Page,NewUser
        },
        methods: {
          submitForm() {
              this.$router.push("./UserManagement");
          },
          confir(){
            var vm= this;
            pushMessageApi(vm.ruleForm).then(data => {
                console.log(data);
              }).catch((err) => {
                  self.$message.error(err.message);
              })
          }
        },
    }
</script>
<style lang="css" type="text/css" scoped>
</style>
