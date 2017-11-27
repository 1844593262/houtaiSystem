<template>
  <span class="dialog">
       <el-button   @click="dialogVisible=true" type="text">编辑</el-button>
        <el-dialog :title="title" v-model="dialogVisible" size="small" @open="open">
          <el-row>
              <el-col :span="3"><el-button type="text" style="color:black">分类名称</el-button></el-col>
              <el-col :span="18">
                   <el-input style="display:block;" v-model="queryParams.name"></el-input>
              </el-col>
         </el-row>
         <el-row style="margin-top:20px;">
             <el-col :span="3"><el-button type="text" style="color:black" >分类图标</el-button></el-col>
              <el-col :span="4">
                  <SudoUpload  @success="uploadSuccess" @remove="uploadRemove" :uplaodSize=1
                  type="PRODUCT_CASE" :defaultList="imgList" :disabeld="disabeld"  @preview="uploadSuccess"></SudoUpload>
             </el-col>
             <!-- <el-dialog :visible.sync="dialogVisible" size="tiny">
                 <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog> -->
         </el-row>
          <div slot="footer" class="dialog-footer" style="border-top:1px solid #ccc;padding-top:10px">
              <el-button type="primary" @click="dialogVisible=false">取消</el-button>
              <el-button type="primary"  @click="save()">保存</el-button>
          </div>
     </el-dialog>
  </span>
</template>
<script>
     import {CreativityClassifyDetailApi} from '@/api/api'
     import {SaveClassifyDetailApi} from '@/api/api'
     import {IncreClassifyDetailApi} from '@/api/api'
     import  SudoUpload from "@/components/layout/SudoUpload"
     export default{
         data(){
            return{
                defaultList:[],
                disabeld:false,
                title:"编辑创意分类",
                dialogVisible: false,
                imgList:[],
                pictureList:[],
                imgObjct:{},
                queryParams:{
                     name:'',
                     image:""
                },
            }
         },
         props:["ids","imgSrcs"],
         components:{
            SudoUpload
         },
         methods:{
           uploadSuccess(data){
              this.queryParams.image = data.data;
           },
           uploadRemove(){
               this.queryParams.image ="";
               this.imgList=[]
           },
           handlePreview(data){
                 this.queryParams.image = data.data;
                 this.dialogVisible = false;
           },
           open(){
             var self=this;
            //  self.imgObjct.url=self.imgSrcs;
            //  self.imgList[0]=self.imgObjct;
            //  self.imgSrc=self.imgSrcs;

             this.$nextTick(function(){
                CreativityClassifyDetailApi(self.ids).then(data => {
                     self.queryParams.name=data.data.name;
                     var p = {};
                     p.url = data.data.image;
                     self.imgList=[];
                    //  console.log("agfugfsudfsdf",data.data.image);
                     self.imgList.push(p);
                    //  self.imgList=[];
                }).catch((err) => {
                    self.$message.error(err.message);
                })
             })
           },
           save(){
               var vm=this;
               console.log("---------",vm.queryParams.image);
              //  this.uploadSuccess();
              //  vm.imgList[0].url=vm.queryParams.image;
              // if(vm.imgList[0].length!=0){
              //      vm.queryParams.image= vm.imgList[0].url;
              // }
               SaveClassifyDetailApi(vm.ids,vm.queryParams).then(data => {
                   vm.dialogVisible=false;
                   vm.$emit('keepload');
               }).catch((err) => {
                    vm.$message.error(err.message);
               })
              //  vm.imgList = [];

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
    .v-model{
       z-index:100 !important;
    }
    /*.dialog{
        margin-top:100px;
    }*/
</style>
