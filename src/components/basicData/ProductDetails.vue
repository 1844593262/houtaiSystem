<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item :to="{ path: '/basicData/ProductCase' }">推荐案例</el-breadcrumb-item>
                   <el-breadcrumb-item>查看推荐案例</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <el-row>
          <el-col :span="24">
              <div class="grid-content ProductCaseDetails" style="padding:0 20px;">
                  <h3>案例信息</h3>
                  <el-form   label-width="80px">
                      <el-form-item label="案例名称">
                          <el-input width="600px"  v-model="queryParams.planInfo.title"></el-input>
                      </el-form-item>
                      <el-form-item label="分享链接">
                          <el-input width="600px"  v-model="queryParams.planInfo.description"></el-input>
                      </el-form-item>
                      <div class="twocase">
                          <el-form-item label="封面图片">
                                <SudoUpload  @success="uploadSuccess" @remove="uploadRemove" :uplaodSize=1
                                type="PRODUCT_CASE" :defaultList="imgList" :disabeld="disabeld"></SudoUpload>
                          </el-form-item>
                      </div>
                  </el-form>
              </div>
          </el-col>
       </el-row>
      <el-row style="background-color:none;">
              <el-col :span="3" :push="1">
               <div class="grid-content">
                   <el-button align="left" style="width:120px;" @click="goback">取消</el-button>
               </div>
             </el-col>
             <el-col :span="4" :push="1">
                <el-button align="left" style="width:120px;" @click="edit" type="primary">保存</el-button>
              </el-col>
      </el-row>
  </Page>
</template>
<script>
    import  Page from "@/components/layout/Page"
    import  SudoUpload  from "@/components/layout/SudoUpload"
    import WangEditor from '@/components/basicData/WangEditor'
    import {IncreproductCaseApi} from '@/api/api'
    import {LookCase} from '@/api/api'
    import {editProductCaseApi} from '@/api/api'
    export default{
       data(){
          return {
            imgList:[],
            dialogImageUrl: '',
            dialogVisible: false,
            imageSrc:"",
            disabeld:false,
            queryParams:{
                "ideaType": "PRODUCT_CASE",
                "planInfo": {
                  "planId": 0,
                  "categoryName":" ",
                  "coverImage": "",
                   "categoryId": 0,
                  "description":"",
                  "title": "",
                  "ideaId":this.$route.query.ideaId,
                },
                "contextList": [
                 {
                   "value": " ",
                   "contextType": "TEXT"
                 }
               ]
            },
            playerOptions: {
               muted: true,
               sources: {
                 type: "video/mp4",
                 src: ""
               },
               language: 'zh-CN',
               autoplay: true,
               height:200,
               width:200,
             },
          }
       },
       components:{
          Page,SudoUpload,WangEditor
       },
       mounted(){
         var self=this;
         var ideaId=this.$route.query.ideaId;
         LookCase(ideaId).then(data => {
           console.log("fsdfgsfgsdfgsdfgsdfsd",data.data);
             self.queryParams.planInfo.title=data.data.planResp.title;
             self.queryParams.planInfo.coverImage=data.data.planResp.coverImage;
             self.queryParams.planInfo.description=data.data.planResp.description;
             self.queryParams.planInfo.planId=data.data.planResp.planId;
            var p = {}
            p.url =data.data.planResp.coverImage;
            self.imgList.push(p);
         }).catch((err) => {
             self.$message.error(err.message);
         })
       },
       methods: {
           uploadSuccess(data){
               this.queryParams.planInfo.coverImage = data.data;
           },
           uploadRemove(){
             this.queryParams.planInfo.coverImage = "";
             this.imgList=[]
           },
           handleRemove(file, fileList) {
              // console.log(file, fileList);
           },
           handlePictureCardPreview(file) {
             this.dialogImageUrl = file.url;
             this.dialogVisible = true;
          },
          goback(){
              this.$router.push('./ProductCase')
          },
          edit(){
              var  vm=this;
              editProductCaseApi(vm.queryParams).then(data => {
                  console.log(vm.queryParams);
              }).catch((err) => {
                   vm.$message.error(err.message);
              })
                this.$router.go(-1);
          }
    }
  }
</script>
<style scoped>
.el-input, .el-input__inner {
    width: 60%;
}
.com-page-body{
    padding:0 36px 18px;
    background-color:#EFF2F7;
    margin-top:20px;
}
.el-textarea__inner{
  width:70%;
  padding-top:98px;
}
</style>
