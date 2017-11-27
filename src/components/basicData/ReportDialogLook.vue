<template>
  <span class="dialog">
       <el-button   @click="dialogVisible=true" type="text">查看</el-button>
       <el-dialog :title="title" v-model="dialogVisible" size="small" @open="open">
          <el-form>
              <el-row>
                  <el-col :span="20">
                      <el-form-item label="举报选项名称">
                        <el-input  placeholder="广告或垃圾内容" style="display:inline-block;"  v-model="queryParams.title"></el-input>
                      </el-form-item>
                  </el-col>
              </el-row>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible=false">取消</el-button>
              <el-button type="primary" @click='editorReport'>保存</el-button>
          </div>
     </el-dialog>
  </span>
</template>
<script>
     import {SaveReportApi} from '@/api/api'
     import {SearchReportApi} from '@/api/api'
     export default{
         data(){
            return{
                title:"查看举报选项信息",
                dialogVisible: false,
                queryParams:{
                   title:""
                }
            }
         },
         props:["ids"],
         methods:{
           editorReport(){
                var self=this;
                SaveReportApi(self.ids,this.queryParams).then(data => {
                   console.log(data.data);
                   this.dialogVisible=false;
                   //这边是订阅
                   this.$emit('keepload');

                   // self.getList();
                }).catch((err) => {
                    self.$message.error(err.message);
                })
           },
           open(){
            var self=this;
            this.$nextTick(function(){
                SearchReportApi(self.ids).then(data => {
                    self.queryParams.title=data.data.title;
               }).catch((err) => {
                   self.$message.error(err.message);
               })
            })
          },
         }
     }
</script>
<style>
.el-dialog__header {
    padding: 20px 20px 10px;
    background-color: #ccc;
}
.el-dialog__headerbtn .el-dialog__close {
    display: none;
}
</style>
