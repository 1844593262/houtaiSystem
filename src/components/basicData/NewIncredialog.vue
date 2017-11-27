<template>
  <span class="dialog">
       <el-button   @click="dialogVisible=true" type="primary">新增</el-button>
       <el-dialog :title="title" v-model="dialogVisible" size="small">
             <el-row>
                 <el-col :span="3"><el-button type="text" style="color:black">分类名称</el-button></el-col>
                 <el-col :span="18">
                      <el-input style="display:block;" v-model="queryParams.name"></el-input>
                 </el-col>
            </el-row>
            <el-row style="margin-top:20px;">
                <el-col :span="3"><el-button type="text" style="color:black;" >分类图标</el-button></el-col>
                <el-col :span="12">
                    <SudoUpload  @success="uploadSuccess" @remove="uploadRemove" :disabeld="disabeld"
                    :uplaodSize=1 type="CATEGORY" :defaultList="imgList"></SudoUpload>
                </el-col>
            </el-row>
          <div slot="footer" class="dialog-footer" style="border-top:1px solid #ccc;padding-top:10px">
              <el-button @click="cancel">取 消</el-button>
              <el-button type="primary" @click="save()">保存</el-button>
          </div>
     </el-dialog>
  </span>
</template>
<script>
     import {IncreClassifyDetailApi} from '@/api/api'
     import  SudoUpload from "@/components/layout/SudoUpload"
    //  import {CreativityClassifyApi} from '@/api/api'
    //  import {mixin} from "@/mixins/seach"
     export default{
        //  mixins:[mixin],
         data(){
            return{
              imgList:[],
              disabeld:false,
              title:"新增创意分类",
                dialogVisible: false,
                dialogImageUrl: '',
                queryParams:{
                  name:"",
                  image:""
                }
            }
         },
         props:["ids"],
         components:{
             SudoUpload
         },
         methods: {
           uploadSuccess(data){
              this.queryParams.image = data.data;
           },
           uploadRemove(){
               this.queryParams.image = "";
               this.imgList=[]
           },
           handleRemove(file, fileList) {
            //  console.log(file, fileList);
           },
           handlePictureCardPreview(file) {
             this.dialogImageUrl = file.url;
             this.dialogVisible = true;
           },
           save(){
               var self=this;
               IncreClassifyDetailApi(this.queryParams).then(data => {
                  // console.log(data.data);
                  self.dialogVisible=false;
                  //这边是订阅
                  self.$emit('reload')
                  self.queryParams.name="";
                  self.queryParams.image = "";
                  self.imgList = []
                  // self.getList();
               }).catch((err) => {
                   self.$message.error(err.message);
               })
           },
           cancel(){
               var self=this;
               self.dialogVisible=false;
               self.queryParams.name="";
               self.queryParams.image="";
           }

         }
     }
</script>
<style>
.el-dialog__header {
    padding: 20px 20px 10px;
    background-color: #ccc;
}
.el-dialog__headerbtn .el-dialog__close {
    display: none;
}
.dialog{
    margin-top:100px;
}
</style>
