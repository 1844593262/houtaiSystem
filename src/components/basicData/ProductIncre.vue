<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                  <el-breadcrumb-item>推荐案例</el-breadcrumb-item>
                   <el-breadcrumb-item>新增推荐案例</el-breadcrumb-item>
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
                       <div class="ImgSrcDrag drag" v-drag>
                            <el-form-item label="封面图片">
                                <SudoUpload  @success="uploadSuccess" @remove="uploadRemove"  :uplaodSize=1
                                :defaultList="imgList"  :disabeld="disabeld"  type="PRODUCT_CASE"
                                ></SudoUpload>
                             </el-form-item>
                       </div>
                      </div>
                  </el-form>
              </div>
          </el-col>
       </el-row>
      <el-row style="background-color:none;margin-top:100px;">
            <el-col :span="2" :push="1">
             <div class="grid-content">
                 <el-button align="left" style="width:120px;" @click="goback">取消</el-button>
             </div>
           </el-col>
           <el-col :span="2" :push="2">
              <el-button align="left" style="width:120px;" @click="save" type="primary">保存</el-button>
        </el-col>
      </el-row>
  </Page>
</template>
<script>
    import WangEditor from '@/components/basicData/WangEditor'
    import  Page from "@/components/layout/Page"
    import {IncreproductCaseApi} from '@/api/api'
    import  SudoUpload from "@/components/layout/SudoUpload"
    export default{
       data(){
          return {
            type:'IDEA',
            imgList:[],
            disabeld:false,
            videoList:[],
            dialogImageUrl: '',
            dialogVisible: false,
            videoSrc:"",
            vvTOF:true,
            vshow:false,
            playerOptions: {
               muted: true,
               sources: {
                 type: "video/mp4",
                 src: ""
               },
               language: 'zh-CN',
               autoplay: true,
               height:150,
               width:150,
               poster: "/images/index.jpg",
             },
            queryParams:{
                "ideaType": "PRODUCT_CASE",
                "planInfo": {
                  "planId": 0,
                  "categoryName":" ",
                  "coverImage": "",
                   "categoryId": 0,
                  "description":"",
                  "title": "",
                },
                "contextList": [
                 {
                   "value": " ",
                   "contextType": "TEXT"
                 }
               ]
            }
          }
       },
       mounted(){
           var oDiv=document.getElementsByClassName("ImgSrcDrag")[0];
           console.log(oDiv);
           oDiv.onmousedown=function(ev){
              var ev=ev||event;
              var disX=ev.clientX-oDiv.offsetLeft;
              var disY=ev.clientY-oDiv.offsetTop;
              if(oDiv.setCapture){
                 oDiv.setCapture();
              }
              document.onmousemove=function(ev){
                  var ev=ev||event;
                  oDiv.style.top=ev.clientY-disY+"px";
                  oDiv.style.left=ev.clientX-disX+"px";
              }
              document.onmouseup=function(){
                 document.onmousemove=null;
                 if(oDiv.releaseCapture){
                    oDiv.releaseCapture();
                 }
              }
              return false;
           }
       },
       components:{
          Page,SudoUpload,WangEditor
       },
       computed: {
          player() {
            return this.$refs.videoPlayer.player
          }
       },
       methods: {
         uploadSuccess(data){
             this.queryParams.planInfo.coverImage = data.data;
         },
         uploadRemove(){
              this.queryParams.planInfo.coverImage = "";
              this.imgList=[]
         },
           handlePictureCardPreview(file) {
             this.dialogImageUrl = file.url;
             this.dialogVisible = true;
          },
          goback(){
              this.$router.push('./ProductCase')
          },
          save(){
            // debugger;
            var self=this;
            // self.queryParams.contextList.value=self.queryParams.planInfo.airticle;
            IncreproductCaseApi(self.queryParams).then(data => {
               self.$emit('reload');
              //  self.queryParams.coverImage= "";
              //  self.queryParams.title="";
              //  self.imgList = []
               // self.getList();
            }).catch((err) => {
                self.$message.error(err.message);
            })
            self.$alert('', '新增案例已成功！', {
                confirmButtonText: '确定',
            });
            self.$router.go(-1);
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
