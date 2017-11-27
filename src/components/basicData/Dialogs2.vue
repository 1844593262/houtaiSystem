<template scoped>
  <span class="dialog">
       <el-button   @click="dialogVisible=true" type="primary">预览</el-button>
       <el-dialog :title="title" v-model="dialogVisible" size="small" @open="open">
          <el-form>
                <el-form-item label="文章标题">
                    <el-input  style="display:inline-block;width:70%" v-model="queryParams.name"></el-input>
                </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer" style="border-top:1px solid #ccc;padding-top:10px">
              <el-button type="primary" @click="dialogVisible=false">取消</el-button>
          </div>
     </el-dialog>
  </span>
</template>
<script>
    import {ArticleLookApi} from '@/api/api'
     export default{
         data(){
            return{
                title:"文章编辑预览",
                dialogVisible: false,
                queryParams:{
                     name:''
                },
            }
         },
         props:["ids"],
         methods:{
           open(){
             var self=this;
             this.$nextTick(function(){
               ArticleLookApi(self.ids).then(data => {
                     self.queryParams.name=data.data.articleTitle;
                }).catch((err) => {
                    self.$message.error(err.message);
                })
             })
           }
         }
     }
</script>
<style scoped>
    /*.el-dialog__header {
        padding: 20px 20px 10px;
        background-color: #ccc;
    }
    .el-dialog__headerbtn .el-dialog__close {
        display: none;
    }*/
</style>
