<template>
  <span class="dialog">
       <el-button   @click="dialogVisible=true" type="primary">新增</el-button>
       <el-dialog :title="title" v-model="dialogVisible" size="small">
          <el-form>
              <el-form-item label="手机号码">
                    <el-input  style="display:inline-block;width:70%" v-model="queryParams.Name"></el-input>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible=false">取 消</el-button>
              <el-button type="primary" @click="save()">保存</el-button>
          </div>
     </el-dialog>
  </span>
</template>
<script>
     import {IncremanagerUserApi} from '@/api/api'
     export default{
         data(){
            return{
                title:"新增用户",
                dialogVisible: false,
                props:["dialogVisible"],
                queryParams:{
                  Name:""
                }
            }
         },
         methods:{
              save(){
                  var self=this;
                  
                  IncremanagerUserApi(self.queryParams,).then(data => {
                     console.log(data.data);
                     this.dialogVisible=false;
                     //这边是订阅
                     this.$emit('reload')
                     // self.getList();
                  }).catch((err) => {
                      self.$message.error(err.message);
                  })
             }
         }
     }
</script>
