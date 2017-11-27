<template>
  <span class="dialog">
       <el-button   @click="dialogVisible=true" type="text">预览</el-button>
       <el-dialog   v-model="dialogVisible" size="small" @open="open">
          <el-form>
              <el-form-item>
                  <el-row>
                      <el-col :span="24"><h3>{{airticletitle}}</h3></el-col>
                  </el-row>
                  <el-row style="margn-top:10px;text-align:left">
                        <el-col :span="24">
                          <p v-html="articleContent"></p>
                        </el-col>
                  </el-row>
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
                airticletitle:"",
                articleContent:"",
                queryParams:{
                     name:'',
                     contxt:""
                },
            }
         },
         props:["ids","airCon","airtitles"],
         methods:{
           open(){
              var self=this;
              var Articleid=self.ids;
            //  var html = window.sessionStorage.getItem('aCon').replace(/\\"/g, "'").replace(/"/g, "");
            //
            //  self.airticletitle=self.airtitles;
            //  self.articleContent=html;
            //  console.log(html);
            ArticleLookApi(Articleid).then(data => {
                self.airticletitle=data.data.articleTitle;
                self.articleContent = data.data.articleContent
                console.log(data.data.articleContent);
                self.html=data.data.articleContent;
                self.html.replace(/\\"/g, "'").replace(/"/g, "")
             }).catch((err) => {
              self.$message.error(err.message);
            })
           }
         }
     }
</script>
<style scoped>
    .el-dialog__header {
        padding:0;
        background-color: #ccc;
    }
    .el-dialog__headerbtn .el-dialog__close {
        display: none;
    }
    .el-icon-close:before {
       content: " ";
    }
</style>
