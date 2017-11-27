<template>
    <Page>
      <el-row slot="header" :span="24">
          <el-col :span="22">
              <el-breadcrumb separator=">">
                  <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
              </el-breadcrumb>
          </el-col>
          <el-col :span="2">
          </el-col>
      </el-row>
     <el-form style="margin-top:10px;padding:0 20px;" :inline="true">
      <el-row>
          <el-col :span="24">
            <el-form-item label="标题"  label-width="120px">
                <el-input   v-model="queryParams.articleTitle"  style="margin-left:30px;"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
            <el-form-item label="articleCode"  label-width="120px">
                <el-input   v-model="queryParams.articleCode"  style="margin-left:30px;"></el-input>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row>
          <el-col :span="24">
                <el-form-item label="正文" label-width="120px">
                   <textarea  class="editor-main" style="height:400px;max-height:500px;" ref="input" v-model="queryParams.articleContent"></textarea>
                   {{queryParams.articleContent}}
               </el-form-item>
         </el-col>
      </el-row>
      <el-row style="text-align:center;margin-top:30px;">
        <el-col :span="24">
              <el-button type="primary" @click="SaveArticle()">保存</el-button>
              <Dialogs2 :ids='articleId'></Dialogs2>
              <el-button type="primary" @click="back">取消</el-button>
      </el-col>
      </el-row>
    </el-form>
  </Page>
</template>
<script>
    // import wangEditor from "wangeditor";
    import $config from '../../../config'
    import Page from '@/components/layout/Page'
    import ArticleManagement from '@/components/basicData/ArticleManagement'
    import Dialogs2 from '@/components/basicData/Dialogs2'
    import {AditorarticleManagementApi} from '@/api/api'
    import {SavearticleApi} from '@/api/api'
    export default{
        data(){
            return {
              articleId:this.$route.query.articleId,
              queryParams:{
                  articleTitle:"",
                  articleCode:"",
                  articleContent:"sdasdas"
              }
            }
        },
        components:{
            Page,Dialogs2
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
                   console.log(data.data);
                }).catch((err) => {
                    self.$message.error(err.message);
                })
            },
            back(){
                this.$router.push("./ArticleManagement")
            },
        },
        mounted(){
            // console.log(this.$route.query.id);
            var vm = this;
            var editor = new wangEditor(vm.$refs.input);
            var uploadeOps = "/img";
            var url = ''
            if($config.env == 'development'){
                editor.config.uploadImgUrl = $config.development+ '/image';
                url = $config.development+ '/image'
            }
            else {
                url = window.location.origin + '/api/image'
                editor.config.uploadImgUrl = url;
            }
            editor.config.uploadImgFileName = 'filename';
            editor.config.uploadImgFns.onload = function(result, xhr) {
                var json = JSON.parse(result);
                if (json.data.code == 200) {
                    var html='<img src="' + url + '/' + json.data.data.filename + '" alt="' + this.config.uploadImgFileName + '" style="max-width:100%;margin-right: 5px;"/>';
                    if(this.$txt.is(':focus')){
                        this.commandHooks.insertHtml(html);
                    }else{
//                        var p = this.$txt.find('p').append(html);
                        this.$txt.append(html);
//                        this.commandHooks.insertHtml(html);
//                       vm.$emit('input',this.$txt.html());
//                        $(".editor-main").focus();
                        this.$txt.focus();
                        this.onchange()

                    }
                }else {
                    this.$message.error('上传失败');
                }
            };
            editor.config.uploadImgFns.ontimeout =  function(xhr){
                this.$message.error('上传超时');
            };
            // 自定义error事件
            editor.config.uploadImgFns.onerror =  function(xhr) {
                this.$message.error('上传失败');
            };

            editor.onchange = function () {
                vm.$emit('input',this.$txt.html());
            };
            editor.create();
            this.editor=editor;
            var  pram=vm.$route.query.articleId;
            //获取文章的信息
            AditorarticleManagementApi(pram).then(data => {
              //  console.log(data.data);
               vm.queryParams.articleTitle=data.data.articleTitle;
               vm.queryParams.articleCode=data.data.articleCode;
               vm.queryParams.articleContent=data.data.articleContent;
            }).catch((err) => {
                self.$message.error(err.message);
            })

        }
    }

</script>
<style scoped>
    .edit-main{
        height: 500px;
    }
</style>
