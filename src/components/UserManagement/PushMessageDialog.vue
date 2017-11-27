<template>
  <span class="dialog">
        <el-button   @click="dialogVisible=true" type="primary">消息推送</el-button>
        <el-dialog :title="title" v-model="dialogVisible" size="small" @open="open">
              <el-form :model="ruleForm"  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top:20px;">
                    <el-form-item  prop="pushType">
                      <el-row>
                          <el-col :span="6" :pull="3"><el-button type="text" style="color:black;">消息类型</el-button></el-col>
                          <el-col :span="14" :pull="1">
                                <el-select v-model="ruleForm.pushType" placeholder="系统消息">
                                    <el-option label="系统消息" value="CUSTOM"></el-option>
                                    <el-option label="项目通知 " value="CUSTOM2"></el-option>
                                    <!-- <el-option label="创意更新通知" value="IDEA_UPDATE"></el-option>
                                    <el-option label="举报回复通知" value="REPORT_ANSWER"></el-option>
                                    <el-option label="反馈回复通知" value="FEEDBACK_ANSWER"></el-option> -->
                                </el-select>
                         </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item  prop="content">
                         <el-row>
                            <el-col :span="3" :pull="2"><el-button type="text" style="width:100px;color:black">消息文本</el-button></el-col>
                            <el-col :span="10" :pull="1" style="margin-top:20px;"><textarea v-model="ruleForm.content" rows="10" cols="80"   resize:none></textarea></el-col>
                         </el-row>
                    </el-form-item>
              </el-form>
              <el-row>
                  <el-col :span="3" :push="4">
                       <el-button type="primary" @click="dialogVisible=false" style="width:100px">取消</el-button>
                  </el-col>
                  <el-col :span="4" :push="14">
                       <el-button @click="confir" type="danger" style="width:100px">确认推送</el-button>
                  </el-col>
              </el-row>
       </el-dialog>
  </span>
</template>
<script>
    import Page from '@/components/layout/Page'
    import  NewUser from './NewUser'
    import {pushMessageApi} from '@/api/api'
    export  default{
        data(){
          return{
            ruleForm: {
              title:"系统消息",
              userIds:[],
              pushType:'CUSTOM',
              content:""
            },
            title:"",
            dialogVisible:false,
          }
        },
        components:{
           Page,NewUser
        },
        props:["puMes"],
        methods: {
          submitForm() {

          },
          confir(){
            var vm= this;
            vm.ruleForm.userIds=vm.puMes;
            if(vm.ruleForm.pushType=="CUSTOM"){
                 vm.ruleForm.title="系统消息"
            }else if(vm.ruleForm.pushType=="CUSTOM2"){
                 vm.ruleForm.title="项目通知"
            }
            pushMessageApi(vm.ruleForm).then(data => {
                vm.ruleForm.content="";
                this.$alert('', '消息推送成功！', {
                     confirmButtonText: '确定',
                });
              }).catch((err) => {
                  self.$message.error(err.message);
              })
            vm.dialogVisible=false;

          },
          open(){

          }
        },
    }
</script>
<style lang="css" type="text/css" scoped>
</style>P
