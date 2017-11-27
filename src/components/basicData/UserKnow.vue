<template>
    <textarea  class="editor-main" style="height:400px;max-height:500px;" ref="input"></textarea>
</template>
<script>
    import wangEditor from "wangeditor";
    // import $config from '$config'
    // import {login as imageApi} from "../../api/index"
    import { user as UserLogic, common } from '../../logic';
    wangEditor.config.printLog = false;

    export default{
        data(){
            return {}
        },
        props:['value','active'],
        watch:{
            value(val){
                if(this.editor && this.editor.$txt){
                    if(val!=this.editor.$txt.html()){
                        this.editor.$txt.html(val);
                    }
                }
            }
        },
        mounted(){
            var vm = this;
            var editor = new wangEditor(vm.$refs.input);
            var uploadeOps = imageApi.getUploadImageOptios();
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
        }
    }

</script>
<style>
    .edit-main{
        height: 500px;
    }
</style>
