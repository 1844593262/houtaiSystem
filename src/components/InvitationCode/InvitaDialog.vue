<template>
  <span class="dialog">
       <el-button   @click="generate" type="primary">生成</el-button>
       <el-dialog :Atitle="Atitle" v-model="dialogVisible" size="small" @open="open">
             <el-row>
                <el-col :span="4" style="margin-top:10px;">输入生成邀请码的数量</el-col>
                <el-col :span="8"><el-input v-model="queryParams.number"></el-input></el-col>
                <el-col :span="4" :push="1"><el-button type="primary" @click="sure">确定</el-button></el-col>
             </el-row>
     </el-dialog>
  </span>
</template>
<script>
    import {getInviteCodeApi} from '@/api/api'
    import {generateInviteCodeApi} from '@/api/api'
    export default{
        data(){
           return{
             Atitle:"",
             dialogVisible: false,
             queryParams:{
                  number:0,
                  "telephone": "string",
                  "status": "UN_USED",
             }
           }
        },
        methods:{
          open(){
              var self=this;
              self.queryParams.number="";
              // self.queryParams.contxt=self.content;
          },
          sure(){
              var vm=this;
              vm.dialogVisible=false;
              for (var i = 0; i <vm.queryParams.number; i++) {
                  generateInviteCodeApi().then(data => {
                        //  vm.queryParams.number="";
                        console.log("你好",data);
                          vm.$emit('reload');
                    }).catch((err) => {
                         vm.$message.error(err.message);
                    })
              }
          },
          generate(){
            this.dialogVisible=true;
          }
        },

    }
</script>
<style scoped>

</style>
