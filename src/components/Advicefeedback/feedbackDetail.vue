<template>
  <span class="dialog">
       <el-button   @click="dialogVisible=true" type="text">详情</el-button>
       <el-dialog :title="title" v-model="dialogVisible" size="small"  @open="open">
         <div class="feedbackInfor" style="background-color:#D8DCE5;margin-top:10px;padding-top:10px;padding-left:20px">
           <el-row justify="start">
               <el-col :span="12" :pull="4"><h2>反馈人信息</h2></el-col>
               <el-col :span="12"></el-col>
           </el-row>
            <el-form>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="反馈人" label-width="80px" align="left">
                            <el-input  style="display:inline-block;width:70%" v-model="queryParams.value" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="手机号码" label-width="80px" align="left" >
                            <el-input  style="display:inline-block;width:70%" v-model="queryParams.phone" readonly></el-input>
                        </el-form-item>
                    </el-col>
                   <el-col :span="12">
                        <el-form-item label="状态"  label-width="80px" align="left">
                            <el-input  style="display:inline-block;width:70%" v-model="queryParams.readStatus" readonly></el-input>
                        </el-form-item>
                        <el-form-item label="反馈时间" label-width="80px" align="left">
                            <el-input  style="display:inline-block;width:70%" v-model="queryParams.time" readonly></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div class="feedbackInfor">
               <el-row>
                   <el-col :span="12" :pull="4" style="margin-top:-10px"><h2>反馈信息</h2></el-col>
                   <el-col :span="12"></el-col>
               </el-row>
               <el-row>
                  <el-col :span="20" align="left" :push="2">
                     <p>{{mes}}</p>
                  </el-col>
               </el-row>
           </div>
        </div>
       <div class="feedbackInfor" style="background:#D8DCE5;margin-top:10px">
           <el-row>
              <el-col :span="5"><h2>反馈回复</h2></el-col>
              <el-col style="margin-top:20px" :span="3"><el-radio class="radio" v-model="radio" label="1" @click.native="backMes">消息回复</el-radio></el-col>
           </el-row>
      </div>
      <div class="feedbackInfor" style="background:#D8DCE5;margin-top:10px;padding:20px;" v-if="show2">
           <el-row>
            <el-col :span="18">
                <textarea  rows="6" cols="80" resize:none  style="padding-left:10px;padding-top:10px;"
                v-model="feedbackParams.notifyFeedback"></textarea>
            </el-col>
          </el-row>
     </div>
      <div slot="footer" class="dialog-footer" style="padding-top:10px;margin-left:70%;" v-if="disff">
            <el-button @click="dialogVisible=false">取 消</el-button>
            <span v-if="markButton1"><el-button type="primary" @click="alreadyreaded" :disabled="false">标记已读</el-button></span>
            <span v-if="markButton2"><el-button type="primary" @click="alreadyreaded" :disabled="true">标记已读</el-button></span>
      </div>
      <el-row>
          <el-col :span="4" :push="20">
            <div  v-if="sot" style="margin-top:10px;">
              <el-button @click="dialogVisible=false">取 消</el-button>
              <el-button @click="CerOrTrue" type="primary">确 认</el-button>
          </div></el-col>
      </el-row>
     </el-dialog>
  </span>
</template>
<script>
    import {AdviceDetailfeedbackApi} from '@/api/api'
    import {AdviceAlreadyApi} from '@/api/api'
    import {CertainFeedbackApi} from '@/api/api'
    import feedbackDetail from "./feedbackDetail"
      import {formatDate,date} from '@/util/date-format'
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
    };
     export default{
         data(){
            return{
                title:"意见反馈详情",
                dialogVisible: false,
                radio:"",
                mes:"",
                markButton1:true,
                markButton2:false,
                disff:true,
                sot:false,
                id:"",
                queryParams:{
                     value:"",
                     phone:"",
                     readStatus:"",
                     time:""
                },
                feedbackParams:{
                  "notifyFeedback": "您的反馈对我们非常重要，我们会及时改进！",
                   "createUserId": 0,
                   "id":0
                },
                show1:true,
                show2:false,
            }
         },
         components:{
            date
         },
         filters:{
              dateFilter,
              statu:function (data) {
                  switch (data){
                      case 'PASSED':
                          return '已读'
                          break;
                      case 'FAIL_PASS':
                          return '未读'
                          break;
                  }
              },
          },
         props:["ides"],
         methods:{
           open(){
             var self=this;
             this.$nextTick(function(){
                AdviceDetailfeedbackApi(self.ides).then(data => {
                     self.feedbackParams.createUserId=data.data.createUserId;
                     self.feedbackParams.id=data.data.id;
                     self.queryParams.value=data.data.feedbackUsername;
                     self.queryParams.phone=data.data.feedbackCellphone;
                     self.id=data.data.id;
                     self.queryParams.time= dateFilter(data.data.createTime);
                     self.queryParams.readStatus=data.data.readStatus;
                     if(self.queryParams.readStatus=="PASSED"){
                           self.queryParams.readStatus="已读";
                          self.markButton2=true;
                          self.markButton1=false;
                     }else if(self.queryParams.readStatus=="FAIL_PASS"){
                          self.queryParams.readStatus="未读";
                     }
                      self.mes=data.data.content;
                }).catch((err) => {
                    self.$message.error(err.message);
                })
             })
           },
           alreadyreaded(){
                this.queryParams.readStatus="PASSED";
                this.markButton2=!this.markButton2;
                this.markButton1=!this.markButton1;
                let parMath=this.queryParams.readStatus;
                var self=this;
                console.log(self.queryParams);
                AdviceAlreadyApi(self.id,self.queryParams).then(data => {
                    console.log(data);
                      this.queryParams.readStatus="已读";
                      self.$emit('reload');
                }).catch((err) => {
                    self.$message.error(err.message);
                })
                this.$emit("listenToChildEvent",parMath);
                this.dialogVisible=false;
           },
           backMes(){
               this.show2=true;
               this.disff=false;
               this.sot=true;
           },
           CerOrTrue(){
              var vm=this;
              vm.feedbackParams.notifyFeedback=vm.feedbackParams.notifyFeedback+vm.mes;
              CertainFeedbackApi(vm.feedbackParams).then(data => {
                 console.log(data.data);
             }).catch((err) => {
                  vm.$message.error(err.message);
             })
              vm.$alert('', '消息发送成功！', {
                  confirmButtonText: '确定',
             });
             vm.dialogVisible=false;
             vm.queryParams.readStatus="PASSED";
             AdviceAlreadyApi(vm.id,vm.queryParams).then(data => {
                 console.log(data);
                   vm.queryParams.readStatus="已读";
                   vm.$emit('reload');
             }).catch((err) => {
                 vm.$message.error(err.message);
             })
           }
         }
     }
</script>
<style scoped>
.el-dialog__body {
     padding:none;
}
.feedbackInfor{
   padding:10px auto;
}
.el-dialog__header {
    padding: 20px 20px 10px;
    background-color:#D8DCE5;
}
.el-dialog__headerbtn .el-dialog__close {
    display: none;
}
.dialog{
    margin-top:100px;
}
</style>
