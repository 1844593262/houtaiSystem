<template>
  <div class="dialog">
       <el-dialog :title="title" v-model="dialogVisible" size="small">
         <div class="feedbackInfor" style="background-color:#ccc;margin-top:10px;padding-top:10px;padding-left:20px">
            <h2>反馈人信息</h2>
            <el-form>
              <div class="feedbacker" style="width:50%;float:left;">
                  <el-form-item label="反馈人" label-width="120px">
                      <el-input  style="display:inline-block;width:70%"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号码" label-width="120px" >
                      <el-input  style="display:inline-block;width:70%"></el-input>
                  </el-form-item>
              </div>
              <div class="stateFeedback" style="width:50%;float:left;">
                  <el-form-item label="状态" label-width="120px" align="left">
                      <el-input  style="display:inline-block;width:70%"></el-input>
                  </el-form-item>
                  <el-form-item label="反馈时间" label-width="120px" align="left">
                      <el-input  style="display:inline-block;width:70%"></el-input>
                  </el-form-item>
              </div>
            </el-form>
            <div class="feedbackInfor">
               <h2>反馈信息</h2>
               <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.
                 Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor.
                 Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                 Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
               </p>
           </div>
        </div>
       <div class="feedbackInfor" style="background:#ccc;padding-left:20px">
          <h2  id="htitle">反馈回复</h2>
          <el-input type="textarea"  :rows="2" placeholder="您的反馈对我们非常重要，我们会及时改进!" v-model="textarea"></el-input>
      </div>
      <div slot="footer" class="dialog-footer" style="padding-top:10px;margin-left:70%;">
          <el-button type="primary">返回</el-button>
      </div>
     </el-dialog>
  </div>
</template>
<script>
      import feedbackDetail from "./feedbackDetail"
      import {formatDate} from '@/util/date-format'
      function dateFilter(time) {
         let date = new Date(time);
         return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
      };
     export default{
         data(){
            return{
                title:"意见反馈详情",
                dialogVisible: false,
            }
         }
     }
</script>
<style>
#htitle{
    display:inline-block;
}
.el-dialog__body {
     padding:none;
}
.el-dialog__header {
    padding: 20px 20px 10px;
    background-color: #ccc;
}
.el-dialog__headerbtn .el-dialog__close {
    display: none;
}
.dialog{
    margin-top:100px;
}
</style>
