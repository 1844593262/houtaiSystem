<template>
    <!-- <div id="data-1">
        <el-upload ref="upload" :action="imgUrl" list-type="picture-card" :on-preview="handlePreview" :on-remove="handleRemove"
              :on-success="handleSuccess" :file-list="pictureList" :on-error="uplaodError">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog class="eg-upload-list" v-model="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
    </div> -->
    <div class="upload">
        <el-upload action=" " list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog v-model="dialogVisible" size="tiny">
           <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
  </div>
</template>
<script>
    export default {
        data() {
          return {
            dialogImageUrl: '',
            dialogVisible: true
          };
        },
        methods: {
          handleRemove(file, fileList) {
            // console.log(file, fileList);
          },
          handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
          }
        }
  }
</script>
<style>

</style>
