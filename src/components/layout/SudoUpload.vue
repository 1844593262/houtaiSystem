<template>
   <div id="data-1" :class="[disabeld?'sudao-upload':'']">
       <el-upload ref="upload"
               :action="imgUrl"
               list-type="picture-card"

               :on-remove="handleRemove"
               :on-success="handleSuccess"
               :file-list="pictureList"
               :on-error="uplaodError"
       >
            <!-- :on-preview="handlePreview"  -->
           <!--:disabled="disabled"-->
           <i class="el-icon-plus"></i>
       </el-upload>
       <!--修改弹窗-->
       <!-- <el-dialog class="eg-upload-list" v-model="dialogVisible" size="tiny">
           <img width="100%" :src="dialogImageUrl" alt="">
       </el-dialog> -->
   </div>
</template>
<script>
   //  import {login as loginApi} from '../../api/index'
   export default{
       data(){
           return {
               imgUrl: '',
               dialogVisible: false,
               dialogImageUrl: "",
               pictureList:[]
           }
       },
       props: {
           type:{
              type:String,
           },
           clear:{
               type: Boolean,
               default(){
                   return true
               }
           },
           disabeld:{
               type: Boolean,
               default(){
                   return true
               }
           },
           id:{
               type: Number,
               default(){
                   return 1
               }
           },
           defaultList: {
               type: Array,
               default(){
                   return []
               }
           },
           uplaodSize: {
               type: Number,
               default(){
                   return 1
               }
           }
       },
       watch: {
           defaultList:{
               handler (val) {
                   this.pictureList =  val;
               },
               immediate: true,
               deep:true
           },
           'pictureList':function (newValue,oldValue) {
               this.uploadImage()
           }
       },

       computed: {
           disabled(){
               if (this.defaultList.length >= this.uplaodSize) {
                   return true
               } else {
                   return false
               }
           }
       },
       methods: {
           uplaodError(err, file, fileList){

           },
           handlePreview(file){
               this.dialogImageUrl = file.url;
               this.dialogVisible = true;
               //改
              //  this.$emit('preview', file)
           },
           handleSuccess(response, file, fileList){
               this.pictureList = fileList;
               console.log(fileList)
               this.$emit('success', response, file, fileList)
           },
           handleRemove(file, fileList){
               this.pictureList = fileList;
               this.$emit('remove', file, fileList)

           },
           uploadImage() {
               if (this.pictureList.length == this.uplaodSize) {
                      this.$refs.upload.$el.getElementsByClassName("el-upload--picture-card")[0].style.display="none";
//                    $('.el-upload--picture-card:eq(0)').hide()
               } else {
                     this.$refs.upload.$el.getElementsByClassName("el-upload--picture-card")[0].style.display="block";
//                    $('.el-upload--picture-card:eq(0)').show()
               }
           }
       },
       mounted(){
           var vm = this;
             this.$set(this, "imgUrl", '/api/commons/oss/uploadFile/' + this.type);
       }
   }

</script>
<style scoped>
   .sudao-upload .el-upload-list__item-actions{
     display: none;
   }
   .v-model{
      z-index:2004 !important;
   }

</style>
