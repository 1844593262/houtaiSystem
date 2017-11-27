<template>
    <div id="data-1">
        <el-upload ref="upload"
                :action="imgUrl"
                list-type="picture-card"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :file-list="pictureList"
                   :on-error="uplaodError">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog class="eg-upload-list" v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div>
</template>
<script>
    //  import {login as loginApi} from '../../api/index'
    // import {uploadImageApi} from '../../api/api'
    // import $config from '$config'
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
            default(){
              return ''
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
                    this.pictureList =  val
                },
                immediate: true,
                deep:true
            },
            // 'pictureList':function (newValue,oldValue) {
            //
            //     this.uploadImage()
            // }
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
            },
            handleSuccess(response, file, fileList){
                this.pictureList = fileList;
                console.log(fileList)
                this.uploadImage();
                this.$emit('success', response, file, fileList)
                this.defaultList=[];
                // this.uplaodSize=1;
            },
            handleRemove(file, fileList){
                this.pictureList = fileList;
                this.$emit('remove', file, fileList);
                this.uploadImage();
            },
            uploadImage() {
                if (this.pictureList.length == this.uplaodSize) {
                      this.$refs.upload.$el.getElementsByClassName("el-upload--picture-card")[0].style.display="none";
                } else {
                    this.$refs.upload.$el.getElementsByClassName("el-upload--picture-card")[0].style.display="block";
                }
            }
        },
        mounted(){
            var vm = this;
             this.$set(this, "imgUrl", 'http://172.19.71.10:8999/commons/oss/uploadFile/' + this.type);


        }
    }

</script>
<style>

</style>
