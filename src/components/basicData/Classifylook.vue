<template>
  <div class="dialog">
       <el-button   @click="dialogVisible=true" type="text">查看</el-button>
       <el-dialog :title="title" v-model="dialogVisible" size="small">
         231423141234
          <el-form>
              <el-form-item label="分类名称">
                    <el-input  placeholder="创意分类名称" style="display:inline-block;width:70%"></el-input>
              </el-form-item>
              123
              <el-form-item label="分类图标">
                  <CreativfyUpload></CreativfyUpload>
              </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
              <el-button @click="look">取 消</el-button>
              <el-button type="primary">保存</el-button>
          </div>
     </el-dialog>
  </div>
</template>
<style>
</style>
<script>
     export default{
         import CreativfyUpload from "./CreativfyUpload";
         data(){
            return{
                title:"查看创意分类",
                dialogVisible: false,
                props:["dialogVisible"]
            }
         },
         methods:{
           look(){
             debugger;
              this.dialogVisible=false
           }
         }
     }
</script>
<style>
</style>
