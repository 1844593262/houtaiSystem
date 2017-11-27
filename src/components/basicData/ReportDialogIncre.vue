<template>
    <span class="dialog">
         <el-button   @click="dialogVisible=true" type="primary">新增</el-button>
         <el-dialog :title="title" v-model="dialogVisible">
                <el-row>
                    <el-col :span="3">举报选项</el-col>
                    <el-col :span="18">
                        <el-input  v-model="queryParams.valueDesc"></el-input>
                    </el-col>
                    <el-col :span="2"></el-col>
                </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="cancel">取消</el-button>
                <el-button type="primary" @click="save">保存</el-button>
            </div>
       </el-dialog>
    </span>
</template>
<script>
     import {IncreReportApi} from '@/api/api'
     export default{
         data(){
            return{
                title:"新增举报选项",
                dialogVisible: false,
                queryParams:{
                     "valueDesc":""
                }
            }
         },
         methods:{
            save(){
                var self=this;
                IncreReportApi(this.queryParams).then(data => {
                  console.log(data);
                   this.dialogVisible=false;
                   self.queryParams.title="";
                   //这边是订阅
                   this.$emit('reload')
                    self.queryParams.valueDesc="";
                  //  self.getList();
                }).catch((err) => {
                    self.$message.error(err.message);
                })
            },
            cancel(){
                var vm=this;
                vm.dialogVisible=false;
                vm.queryParams.title="";
            }
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
