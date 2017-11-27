<template>
  <span class="dialog">
       <el-button   @click="dialogVisible=true" type="primary">预览</el-button>
       <el-dialog :Atitle="Atitle" v-model="dialogVisible" size="small" @open="open">
          <el-row>
                <h3 style="text-align:center;margin-bottom:-10px;">{{queryParams.name}}</h3></br>
          </el-row>
          <el-row style="margn-top:10px">
                <p v-html="queryParams.contxt" style="padding-left:10px;text-align:left"></p>
               <el-col :span="2"></el-col>
          </el-row>
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
                  Atitle:"文章编辑预览",
                dialogVisible: false,
                queryParams:{
                     name:'',
                     contxt:""
                },
            }
         },
         props:["content","code","title"],
         methods:{
           open(){
             var self=this;
             self.$nextTick(function(){
             self.queryParams.name=self.title;
             self.queryParams.contxt=self.content;
           })
           }
         }
     }
</script>
<style scoped>
    .el-dialog__header {
        padding: 20px 20px 10px;
        background-color: #ccc;
    }
    .el-dialog__headerbtn .el-dialog__close {
        display: none;
    }
</style>
