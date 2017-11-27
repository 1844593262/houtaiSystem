<template>
  <Page>
       <el-row slot="header" :span="24">
           <el-col :span="22">
               <el-breadcrumb separator=">">
                   <el-breadcrumb-item :to="{ path: '/CreativityManagement/CreativityManagement' }">创意管理</el-breadcrumb-item>
                   <el-breadcrumb-item>创意迭代记录</el-breadcrumb-item>
               </el-breadcrumb>
           </el-col>
           <el-col :span="2">
           </el-col>
       </el-row>
      <div class="CreativityIterations">
       <el-row>
                <el-col :span="5">
                    <el-button type="text">创意标题:<span>{{PersonalInfor.title}}</span></el-button></br>
                    <el-button type="text">创建人:<span>{{PersonalInfor.ownerName}}</span></el-button>
                </el-col>
                <el-col :span="5">
                    <!-- <el-button type="text" align="left">状态:<span>{{personObject.audit}}</span></el-button></br> -->
                    <el-button type="text">创建时间:<span>{{PersonalInfor.createTime|dateFilter}}</span></el-button>
                </el-col>
                <el-col :span="5">
                    <el-button type="text">当前迭代数:<span>{{PersonalInfor.planVersion}}</span></el-button>
                </el-col>
                <el-col :span="3" :push="3">
                    <el-button style="width:120px;height:40px;" @click="goback">返回</el-button>
                </el-col>
       </el-row>
       </div>
       <el-row>
           <el-col :span="24">
           <el-table  :data="ideatableData" stripe border>
                <el-table-column align="center" label="迭代序号">
                      <template scope="scope">
                        {{ideatableData.length - scope.$index}}
                        <!-- <span v-for="(index,value) in ideatableData" :v-key="value.index">{{index}}</span> -->
                      </template>

              </el-table-column>
                <el-table-column align="center" label="迭代用户" prop="IterationsUser">
                    <template scope="scope">
                        {{scope.row.updateUserName}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="迭代时间" prop="IterationsTime">
                    <template scope="scope">
                        {{scope.row.updateTime|dateFilter}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="浏览数" prop="BrowserNumber">
                    <template scope="scope">
                        {{scope.row.readCount}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="状态" prop="state">
                    <template scope="scope">
                         {{scope.row.strin}}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                     <template scope="scope">
                         <div class="opreator-cell">
                             <el-button type="text"  @click="gotosmalldetail(scope.row.planId)" style="color:#20a0ff;">详情</el-button>
                         </div>
                     </template>
               </el-table-column>
           </el-table>
         </el-col>
     </el-row>
       <el-row>
          <el-col :span='23'>
              <div class="block" style="width:100%;">
                  <el-pagination
                          @current-change="handleCurrentChange"
                          :current-page="tableParams.page"
                          layout="prev, pager, next"
                          :total="total">
                  </el-pagination>
              </div>
          </el-col>
       </el-row>
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
    margin-top:10px;
}
.el-button+.el-button {
    margin-left: 350px;
}
.el-button--text{
   color:#1F2D3D;
}
</style>
<script>
    import Page from '@/components/layout/Page'
    import  CreativityManagement from '@/components/CreativityManagement/CreativityManagement'
    import  CreativityDetails from '@/components/CreativityManagement/CreativityDetails'
    import {idealManagementDetaillApi} from '@/api/api'
    import {idealListApi} from '@/api/api'
    import {formatDate,date} from '@/util/date-format'
    import {mixin} from "@/mixins/seach"
    function dateFilter(time) {
       let date = new Date(time);
       return formatDate(date, 'yyyy-MM-dd hh:mm:ss');
   };
  //  function reverse(data){
  //    for(var i=data.length-1;i>=0;--i){
  //          return data[i];
  //        }
  //   };
   function reverse(data){
	  //  var  data = [1,2,3,4];
     for(let i=data.length-1;i>=0;--i){
           return  data[i];
         }
    };
    export  default{
        mixins:[mixin],
        data(){
          return{
              dialogVisible: false,
              currentPage3: 3,
              queryParams:{
                 ideaType:"IDEA",
              },
              title:"",
              total:0,
              startTime: '',
              endTime: '',
              PersonalInfor:{},
              ideatableData:[],
              strin:'',
              number:0,
              addParams:{}
          }
        },
        components:{
           Page
        },
        filters:{
             dateFilter,date,
             reverse:function(data){
               for(let i=data.length-1;i>=0;--i){
                     return  data[i];
                   }
              }
         },
        mounted(){
             var params1=this.$route.query.ideaId;
             var vm=this;
             vm.addParams.ideaId=this.$route.query.ideaId;
             idealManagementDetaillApi(params1).then(data => {
              console.log("dsfhsfhsfs",data.data);
                 vm.PersonalInfor=data.data.planResp;
             }).catch((err) => {
                  vm.$message.error(err.message);
             })
             idealListApi(vm.addParams).then(data=>{
                  vm.ideatableData=data.data.items;
                  vm.total=data.data.total;
                  vm.ideatableData.forEach(function(value){
                       var bz=value.deleted;
                       if(bz==1){
                           value.strin="正常";
                       }else if(bz==0){
                           value.strin="隐藏";
                       }
                  })
             }).catch((err)=>{
                 vm.$message.error(err.message);
             })
        },
        methods: {
            goback(){
                this.$router.push("./CreativityManagement")
            },
            getList(){
                  var params=this.$route.query.ideaId;
                  var vm=this;
                 idealManagementDetaillApi(params).then(data => {
                      vm.PersonalInfor=data.data.planResp;
                 }).catch((err) => {
                     vm.$message.error(err.message);
                 })
            },
            gotosmalldetail(prams1){
                // var params=this.$route.query.ideaId;
                this.$router.push({
                   path:'./CreativityDetails',
                   query:{
                       planId:prams1,
                  }
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
