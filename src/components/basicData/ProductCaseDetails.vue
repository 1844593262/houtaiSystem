<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
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
                          <el-input width="600px" placeholder="野外探险救援灯" v-model="queryParams.planInfo.title"></el-input>
                      </el-form-item>
                      <div class="twocase">
                          <el-form-item label="案例图片">
                              <el-upload  action=" " list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                 <i class="el-icon-plus"></i>
                             </el-upload>
                             <el-dialog v-model="dialogVisible" size="tiny">
                                 <img width="100%" :src="dialogImageUrl" alt="">
                             </el-dialog>
                          </el-form-item>
                          <!-- <el-form-item label="案例视频">
                              <el-upload  action=" " list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
                                 <i class="el-icon-plus"></i>
                             </el-upload>
                          </el-form-item>
                          <el-form-item label="案例描述"></br>
                               <el-input type="textarea" v-model="queryParams.planInfo.description"></el-input>
                          </el-form-item> -->
                      </div>
                  </el-form>
              </div>
          </el-col>
       </el-row>
      <el-row style="background-color:none;">
           <el-col :span="12" :push="1">
               <div class="grid-content">
                   <el-button align="left" style="width:120px;" @click="goback">取消</el-button>
               </div>
           </el-col>
           <el-col :span="12":push="10">
               <div class="grid-content">
                   <el-button type="primary" align="right" style="width:120px;" @click="save">保存</el-button>
               </div>
           </el-col>
      </el-row>
  </Page>
</template>
<script>
    import  Page from "@/components/layout/Page"
    import {IncreproductCaseApi} from '@/api/api'
    export default{
       data(){
          return {
            dialogImageUrl: '',
            dialogVisible: false,
            queryParams:{
              "ideaType": "IDEA",
              "planInfo": {
                "categoryId": 0,
                "description": "string",
                "title": "string",
                "planId": 0,
                "categoryName": "string",
                "coverImage": "string"
              }
            }
          }
       },
       components:{
          Page
       },
       methods: {
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
          save(){
            var self=this;
            IncreproductCaseApi(self.queryParams.planInfo).then(data => {
               console.log("----------"+data);
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
