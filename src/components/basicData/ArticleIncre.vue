<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item>创建文章</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <el-row style="margin-top:20px;">
         <el-form>
             <el-form-item label="标题" label-width="120px">
                 <el-col :span="14">
                     <el-input placeholder="请输入文章标题" v-model="queryParams.articleTitle" ></el-input>
                 </el-col>
                 <el-col :span="10"></el-col>
             </el-form-item>
         </el-form>
       </el-row>
       <el-row>
           <el-form>
               <el-form-item label="articleCode" label-width="120px">
                   <el-col :span="14">
                       <el-input placeholder="请输入文章code" v-model="queryParams.articleCode"></el-input>
                   </el-col>
                   <el-col :span="10"></el-col>
               </el-form-item>
           </el-form>
       </el-row>
       <el-row>
           <el-form>
               <el-form-item label="正文" label-width="120px">
                     <el-col :span="18">
                          <WangEditor v-model="queryParams.articleContent"></WangEditor>
                     </el-col>
                     <el-col :span="4"></el-col>
               </el-form-item>
         </el-form>
      </el-row>
      <el-row :offset="2">
           <el-col :span="14" :push="10">
                <el-button type="primary" style="width:80px;" @click="SaveArticle">保存</el-button>
                <!-- <el-button type="primary"  style="width:80px;" @click="look">预览</el-button> -->
                <!-- 预览-->
                <ArticleDialog3 :title="queryParams.articleTitle" :code="queryParams.articleCode" :content="queryParams.articleContent"></ArticleDialog3>
                <el-button   style="width:80px;"  @click="goback">取消</el-button>
           </el-col>
      </el-row>
  </Page>
</template>
<script>
    import WangEditor from '@/components/basicData/WangEditor'
    import $config from '../../../config'
    import Page from '@/components/layout/Page'
    import  ArticleDialog3  from '@/components/basicData/ArticleDialog3'
    import {AditorarticleManagementApi} from '@/api/api'
    import {SavearticleApi} from '@/api/api'
    export default{
        data(){
            return {
              articleId:this.$route.query.articleId,
              queryParams:{
                  articleTitle:"",
                  articleCode:"",
                  articleContent:""
              }
            }
        },
        components:{
            Page,WangEditor,ArticleDialog3
        },
        props:['value','active','ids'],
        watch:{
            value(val){
                if(this.editor && this.editor.$txt){
                    if(val!=this.editor.$txt.html()){
                        this.editor.$txt.html(val);
                    }
                }
            }
        },
        methods:{
            SaveArticle(){
                var vm=this;
                SavearticleApi(vm.queryParams).then(data => {
                   vm.$router.go(-1);
                }).catch((err) => {
                    self.$message.error(err.message);
                })
                vm.$alert('', '文章已保存', {
               });
            },
            goback(){
                this.$router.push("./ArticleManagement")
            },
            look(){

            }
        },
        mounted(){
            // console.log(this.$route.query.id);
            //获取文章的信息
            // AditorarticleManagementApi(pram).then(data => {
            //   //  console.log(data.data);
            //    vm.queryParams.articleTitle=data.data.articleTitle;
            //    vm.queryParams.articleCode=data.data.articleCode;
            //    vm.queryParams.articleContent=data.data.articleContent;
            // }).catch((err) => {
            //     self.$message.error(err.message);
            // })
        }
    }

</script>
<style scoped>
</style>
