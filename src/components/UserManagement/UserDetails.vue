<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item :to="{ path: '/UserManagement/UserManagement' }">用户管理</el-breadcrumb-item>
                   <el-breadcrumb-item >用户详情</el-breadcrumb-item>
                   <el-breadcrumb-item>创意详情</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div class="CreativityIterations" style="margin-top:10px;" v-if="show">
           <el-row>
                <el-col :span="7">
                    <el-button type="text">创意标题:<span>{{tableData.title}}</span></el-button></br>
                    <el-button type="text">迭代用户:<span>{{tableData.createUserName}}</span></el-button>
                </el-col>
                <el-col :span="7">
                    <el-button type="text">迭代时间:<span>{{tableData.lastUpdate|dateFilter}}</span></el-button>
                </el-col>
                <el-col :span="7">
                    <!--<el-button type="text">浏览数:<span>{{tableData.readCount}}</span></el-button></br>-->
                    <el-button type="text">当前迭代版本:<span>{{tableData.planVersion}}</span></el-button>
                </el-col>
                <el-col :span="3">
                    <div class="kuai">
                        <el-button   type="danger" style="width:100px" @click="TOF" v-if=bshow>确认隐藏</el-button>
                        <el-button   type="danger" style="width:100px" @click="FOH" v-if=none>取消隐藏</el-button>
                   </div>
                </el-col>
           </el-row>
       </div>
         <div class="PictText" style="background-color:#EFF2F7;padding:50px 0;margin-top:10px;">
                <el-row>
                   <el-col :span="11" :push="6">
                       <div class="woreditor">
                            <p>{{tableData.iterationDescription}}</p>
                            <p>{{tableData.description}}</p>
                       </div>
                   </el-col>
                </el-row>
                <div v-for="list in planContextList" :v-key="list.contextId">
                    <p v-if="list.contextType=='TEXT'">{{list.value}}</p>
                    <el-row v-if="list.contextType=='IMAGE'">
                         <el-col :span="11" :push="6"><img :src="list.value" alt="" class="pic1" style="width:100%;height:100%"> </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="11"  :push="6">
                          <div v-if="list.contextType=='VIDEO'">
                              <video  width="600"  height="600" controls>
                                   <source :src="list.value" type="video/ogg" />
                                   <source :src="list.value" type="video/mp4" />
                                   <embed :src="list.value" type="application/x-shockwave-flash"
                                   width="320" height="240" allowscriptaccess="always" allowfullscreen="true"></embed>
                               </video>
                          </div>
                    </el-col>
                  </el-row>
                </div>
               <el-row>
                    <el-col :span="3" :push='20' style="margin-top:20px;">
                        <el-button type="primary" style="width:100px"  @click="goback">返回</el-button>
                    </el-col>
               </el-row>
        </div>
   </Page>
</template>
<style scoped>
.el-table::after, .el-table::before {
    background-color:none;
}
.CreativityIterations{
    background-color:#EFF2F7;
    color:#1F2D3D;
    padding: 22px 70px;
    margin-bottom:12px;
}
.el-button+.el-button {
    margin-left: 350px;
}
.el-button--text{
   color:#1F2D3D;
}
.pic1,.pic2{
     width:800px;
     height:400px;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    import CreativityIterLists from '@/components/CreativityManagement/CreativityIterLists'
    import {idealManagementDetaillApi} from '@/api/api'
    import {HiddenIdealApi} from '@/api/api'
    import {showIdealApi} from '@/api/api'
    import {formatDate,date} from '@/util/date-format'
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };
    export  default{
        data(){
          return{
              tableData:{},
              planContextList:[],
              show:true,
              dialogVisible: false,
              title:"",
              currentPage3: 3,
              queryParams:{

              },
              videshow:false,
              none:false,
              bshow:true,
          }
        },
        components:{
           Page
        },
        filters:{
             dateFilter,date,
             statu:function (data) {
                 switch (data){
                     case 'UN_CHECK':
                         return '未处理'
                         break;
                     case 'CHECK':
                         return '处理'
                         break;
                 }
             },
         },
        mounted(){
             var params=this.$route.query.ideaId;
            //  console.log(this.$route.ideaId)
             var vm=this;
             idealManagementDetaillApi(params).then(data => {
                  console.log(data.data);
                  vm.tableData=data.data.planResp;
                  vm.planContextList=data.data.planContextList;
                  // var tc=vm.tableArray[0].contextType;
                  // if(tc=="TEXT"){
                  //     vm.tableArray1.value=vm.tableArray[0].value;
                  // }
                  // if(tc=="IMAGE"){
                  //     vm.tableArray2.value=vm.tableArray[0].value;
                  // }
                  // if(tc=="VIDEO"){
                  //     vm.videshow=true;
                  //     vm.tableArray3.value=vm.tableArray[0].value;
                  // }
             }).catch((err) => {
                 self.$message.error(err.message);
             })
        },
        methods: {
            goback(){
                this.$router.go(-1)
            },
            TOF(){
              var vm=this;
              this.$confirm('是否隐藏?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
              }).then(() => {
                  var prams=vm.tableArray[0].planId
                  HiddenIdealApi(prams).then(data => {
                  }).catch((err) => {
                       vm.$message.error(err.message);
                  })
                  this.bshow = !this.bshow;
                  this.none = !this.none;
              }).catch(err => {
                     this.$message.error(err.message);
              }).catch(() => {
                    this.$message({
                    type: 'info',
                    message: '已取消'
                });
             });
             },
             FOH(){
               var vm=this;
               var prams=vm.tableArray[0].planId;
               this.$confirm('是否隐藏?', '提示', {
                     confirmButtonText: '确定',
                     cancelButtonText: '取消',
                     type: 'warning'
               }).then(() => {
                   var prams=vm.tableArray[0].planId;
                   showIdealApi(prams).then(data => {
                   }).catch((err) => {
                        vm.$message.error(err.message);
                   })
                     vm.bshow = !vm.bshow;
                     vm.none = !vm.none;
                   }).catch(err => {
                      vm.$message.error(err.message);
                   }).catch(() => {
                     vm.$message({
                     type: 'info',
                     message: '已取消'
                 });
              })
           }
    }
  }
</script>
<style lang="css" type="text/css">
    .block{
        width:100%;
        text-align:center;
        margin-top:10px;
        margin-left:20px;
    }
</style>
