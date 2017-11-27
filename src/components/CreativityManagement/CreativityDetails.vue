<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item :to="{ path: '/CreativityManagement/CreativityManagement' }">创意管理</el-breadcrumb-item>
                   <el-breadcrumb-item>创意迭代记录</el-breadcrumb-item>
                   <el-breadcrumb-item>创意详情</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
       <div class="CreativityIterations" style="margin-top:10px;" v-if="show">
           <el-row>
                <el-col :span="5">
                    <el-button type="text">创意标题:<span>{{tableData.title}}</span></el-button></br>
                    <el-button type="text">迭代用户:<span>{{tableData.ownerName}}</span></el-button>
                </el-col>
                <el-col :span="5">
                    <!-- <el-button type="text" align="left">状态:<span>{{tableData.audit}}</span></el-button></br> -->
                    <el-button type="text">迭代时间:<span>{{tableData.updateTime|dateFilter}}</span></el-button>
                </el-col>
                <el-col :span="5">
                    <!-- <el-button type="text">浏览数:<span>{{}}</span></el-button></br> -->
                    <el-button type="text">当前迭代版本:<span>{{tableData.planVersion}}</span></el-button>
                </el-col>
                <el-col :span="4">
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
                         <el-col :push="6" :span="12"><img :src="list.value" alt="" class="pic1" style="width:100%;height:100%;"> </el-col>
                    </el-row>
                    <el-row>
                      <el-col :span="12"  :push="6">
                          <div v-if="list.contextType=='VIDEO'">
                              <video  width="850"  height="850" controls>
                                   <source :src="list.value" type="video/ogg" />
                                   <source :src="list.value" type="video/mp4" />
                                   <embed :src="list.value" type="application/x-shockwave-flash"
                                   width="600" height="600" allowscriptaccess="always" allowfullscreen="true"></embed>
                               </video>
                          </div>
                    </el-col>
                  </el-row>
                </div>
                <!-- <div class="ConTex" style="width:60%;margin:0 auto;">
                </div> -->
          <el-row>
              <el-col :span="3" :push='21'>
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
    import {idealPlanDetailApi} from '@/api/api'
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
              none:false,
              bshow:true,
              dialogVisible: false,
              title:"",
              currentPage3: 3,
              queryParams:{

              },
              videshow:false
          }
        },
        components:{
           Page
        },
        filters:{
             dateFilter,date
         },
        mounted(){
             var params=this.$route.query.planId;
            //  var params1=this.$route.query.palnId;
             var vm=this;
             idealPlanDetailApi(params).then(data => {
                   console.log("adadasdasdsad",data.data);
                    vm.tableData=data.data.planResp;
                    if(vm.tableData.deleted==1){
                         vm.none=false;
                         vm.bshow=true;
                    }else{
                        vm.none=true;
                        vm.bshow=false;
                    }
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
                 vm.$message.error(err.message);
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
                   var prams=vm.tableData.planId;
                   var prams1=vm.tableData.ideaId;
                   console.log(prams)
                   HiddenIdealApi(prams).then(data => {
                   }).catch((err) => {
                        vm.$message.error(err.message);
                   })
                   this.bshow =false;
                   this.none =true;
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
                var prams=vm.tableData.planId;
                this.$confirm('是否取消隐藏?', '提示', {
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'warning'
                }).then(() => {
                    var prams=vm.tableData.planId;
                    showIdealApi(prams).then(data => {
                    }).catch((err) => {
                         vm.$message.error(err.message);
                    })
                      vm.bshow =true;
                      vm.none = false;
                    }).catch(err => {
                       vm.$message.error(err.message);
                    }).catch(() => {
                      vm.$message({
                      type: 'info',
                      message: '已取消'
                  });
                })
              }
        },
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
